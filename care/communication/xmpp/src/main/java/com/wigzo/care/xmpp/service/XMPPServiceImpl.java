package com.wigzo.care.xmpp.service;

import com.wigzo.care.xmpp.request.XMPPCreateUserRequest;
import com.wigzo.care.xmpp.response.UserCreateResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import static com.wigzo.care.xmpp.constants.Constants.BEARER;

@Service
@Slf4j
public class XMPPServiceImpl implements XMPPService {

    @Autowired
    RestTemplate restTemplate;

    @Value("${xmpp.auth.token}")
    private String xmppAuth;

    @Value("${xmpp.server.hostname}")
    private String hostname;

    @Override
    public UserCreateResponse createUserOnXmpp(XMPPCreateUserRequest request) {
        log.info("[Start][XMPPServiceImpl][createUserOnXMpp] {}", request.getUser());
        ResponseEntity<?> response = null;
        try {
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl("http://" + hostname + ":5443" + "/api/register");
            HttpHeaders headers = new HttpHeaders();
            headers.set(HttpHeaders.AUTHORIZATION, BEARER + xmppAuth);
            XMPPCreateUserRequest xmppCreateUserRequestBody = XMPPCreateUserRequest.builder()
                    .user(request.getUser())
                    .password(request.getPassword())
                    .host(hostname)
                    .build();
            HttpEntity<Object> requestEntity = new HttpEntity<>(xmppCreateUserRequestBody, headers);
            response = restTemplate.exchange(uriBuilder.toUriString(), HttpMethod.POST, requestEntity, String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                return generteUserCreateResponse(xmppCreateUserRequestBody);
            }
            log.info("[End][XMPPServiceImpl][createUserOnXMpp] {}", request.getUser());
        } catch (Exception e) {
            log.error("Error while creating new user at xmpp server ");
        }
        return  null;
    }

    private UserCreateResponse generteUserCreateResponse(XMPPCreateUserRequest xmppCreateUserRequestBody) {
        UserCreateResponse userCreateResponse = new UserCreateResponse();
        BeanUtils.copyProperties(xmppCreateUserRequestBody, userCreateResponse);
        return  userCreateResponse;
    }

}
