package com.wigzo.care.identity.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wigzo.care.identity.constants.Constants;
import com.wigzo.care.identity.dto.request.*;
import com.wigzo.care.identity.dto.response.BaseResponse;
import com.wigzo.care.identity.dto.response.LoginResponse;
import com.wigzo.care.identity.dto.response.XmppCreateUserResponse;
import com.wigzo.care.identity.entity.Agent;
import com.wigzo.care.identity.entity.Organization;
import com.wigzo.care.identity.entity.Role;
import com.wigzo.care.identity.exception.CustomException;
import com.wigzo.care.identity.repository.AgentRepo;
import com.wigzo.care.identity.repository.OrganizationRepository;
import com.wigzo.care.identity.repository.RoleRepository;
import com.wigzo.care.identity.service.AgentService;
import com.wigzo.care.identity.util.GenericMustacheTemplate;
import com.wigzo.care.identity.util.Helper;
import com.wigzo.care.identity.util.RedisService;
import com.wigzo.care.identity.util.TokenManager;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.*;


@Service
@Slf4j
public class AgentServiceImpl implements AgentService {

    @Autowired
    Helper helper;
    @Autowired
    RestTemplate restTemplate;
    @Autowired
    AgentRepo agentRepo;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    OrganizationRepository organizationRepository;
    @Autowired
    ObjectMapper objectMapper;
    @Autowired
    private MailSender mailSender;
    @Autowired
    private RedisService redisService;
    @Autowired
    private CustomUserDetailsService customUserDetailsService;
    @Autowired
    private TokenManager tokenManager;
    @Value("${beam.mailer.url}")
    private String beamUrl;

    @Value("${beam.token}")
    private String beamToken;

    @Value("${sparkpost.api.key}")
    private String sparkApiKey;
    @Value("${mail.from}")
    private String mailFrom;
    @Value("${mail.reply.to}")
    private String replyTo;
    @Value("${xmpp.service.base.url}")
    private String xmppUrl;
    @Value("${xmpp.create.user.url}")
    private String createXmppUserUrl;

    @Value("${spring.profiles.active}")
    private String activeProfile;


    @Override
    public ResponseEntity<?> registerUser(RegistrationRequest request) {
        BaseResponse response = new BaseResponse();
        if (!validateRegistrationRequest(request)) {
            return new ResponseEntity<>(
                    "Email, password and organisation domain are mandatory",
                    HttpStatus.BAD_REQUEST
            );
        }
        try {
            Agent agent = new Agent();
            log.info("[Start][AgentServiceImpl][registerUser] {}", request.getEmail());
            BeanUtils.copyProperties(request, agent);

            Set<Role> roles = fetchAgentRoles(request);
            if (!CollectionUtils.isEmpty(roles)) {
                agent.setRoles(roles);
            }
            Set<Organization> organizations = fetchAgentOrganizations(request);
            if (!CollectionUtils.isEmpty(organizations)) {
                agent.setOrganization(organizations);
            }
            agent.setPassword(DigestUtils.sha1Hex(request.getPassword()));
            createNewUserOnXmpp(agent);
            agentRepo.save(agent);
            response = helper.generateRegistrationResponse(request);
        } catch (Exception e) {
            log.error("[Error][AgentServiceImpl][registerUser] {}", request.getEmail());
            return new ResponseEntity<>(
                    "Email already exist",
                    HttpStatus.BAD_REQUEST
            );
        }
        log.info("[End][AgentServiceImpl][registerUser] {}", request.getEmail());
        sendMailViaBeam(request.getEmail(), "", request.getName(), Constants.REGISTER);
        return new ResponseEntity<>(
                response,
                HttpStatus.CREATED
        );
    }

    private void createNewUserOnXmpp(Agent agent) {
        // creating new user on xmpp server for agent
        XmppCreateUserResponse xmppResponse = createUserOnXmpp(agent);
        log.debug(String.valueOf(xmppResponse));
        if(!ObjectUtils.isEmpty(xmppResponse)) {
            agent.setXmppUserName(xmppResponse.getUser());
            agent.setXmppPassword(xmppResponse.getPassword());
        }
    }

    private Boolean validateRegistrationRequest(RegistrationRequest request) {
        if (StringUtils.isAnyEmpty(request.getEmail(), request.getPassword(), request.getOrgDomain())) {
            return false;
        }
        return true;
    }

    public Set<Role> fetchAgentRoles(RegistrationRequest request) {
        Set<Role> roles = new HashSet<>();
        List<Integer> ids = new ArrayList<>();
        ids.add(1);
        ids.add(2);
        List<Role> rolesList = roleRepository.findAllById(ids);
        for (Role role : rolesList) {
            roles.add(role);
        }
        return roles;
    }

    public Set<Organization> fetchAgentOrganizations(RegistrationRequest request) {
        Set<Organization> organizations = new HashSet<>();
        try {
            Organization organization = organizationRepository.findByDomain(request.getOrgDomain());
            if (ObjectUtils.isEmpty(organization)) {
                Organization newOrganization = new Organization();
                newOrganization.setName(request.getOrgName());
                newOrganization.setDomain(request.getOrgDomain());
                newOrganization.setCreatedAt(LocalDateTime.now());
                newOrganization.setUpdatedAt(LocalDateTime.now());
                newOrganization.setIsActive(true);
                newOrganization.setOrgToken(UUID.randomUUID());
                organizationRepository.save(newOrganization);
                organizations.add(newOrganization);
            } else {
                organizations.add(organization);
            }
        } catch (Exception e) {
            log.error("error while fetching organisation for : {}", request.getOrgDomain());
        }
        return organizations;
    }

    @Override
    public ResponseEntity<?> loginUser(UserLoginRequest request) {
        log.info("[Start][AgentService][loginUser] {}", request.getUserName());
        try {
            Agent agent = agentRepo.findByEmail(request.getUserName());
            if (!ObjectUtils.isEmpty(agent)) {
                //todo:use stringutils for equalignorecase and remove null check above
                if (request.getUserName().equalsIgnoreCase(agent.getEmail())
                        && DigestUtils.sha1Hex(request.getPassword()).equals(agent.getPassword())) {
                    final UserDetails userDetails = customUserDetailsService.loadUserByUsername(request.getUserName());
                    final String jwtToken = tokenManager.generateJwtToken(userDetails);
                    List<UUID> orgTokens = new ArrayList<>();
                    if (!CollectionUtils.isEmpty(agent.getOrganization())) {
                        for (Organization organization : agent.getOrganization()) {
                            orgTokens.add(organization.getOrgToken());
                        }
                    }
                    log.info("[End][AgentService][loginUser] {}", request.getUserName());
                    LoginResponse loginResponse = LoginResponse.builder()
                            .id(agent.getId())
                            .email(agent.getEmail())
                            .name(agent.getName())
                            .jwt(jwtToken)
                            .orgTokens(orgTokens)
                            .xmppUserName(agent.getXmppUserName())
                            .xmppPassword(agent.getXmppPassword())
                            .build();
                    BaseResponse response = helper.generateBaseResponse(loginResponse);
                    return new ResponseEntity<>(
                            response,
                            HttpStatus.OK
                    );

                }
            }
        } catch (Exception e) {
            log.error("[Error][AgentService][loginUser] {}", request.getUserName());
        }
        return new ResponseEntity<>(
                "Invalid credentials",
                HttpStatus.NOT_FOUND
        );
    }

    private XmppCreateUserResponse createUserOnXmpp(Agent agent) {
        log.info("[Start][AgentService][createUserOnXmpp] {}", agent.getEmail());
        ResponseEntity<XmppCreateUserResponse> response = null;
        try {
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(xmppUrl + createXmppUserUrl);
            HttpHeaders headers = new HttpHeaders();
            String userName = generateUsernameForXMPP(agent.getEmail());
            XMPPCreateUserRequestBody xmppCreateUserRequestBody = XMPPCreateUserRequestBody.builder()
                    .user(userName)
                    .password("password")
                    .build();
            HttpEntity<Object> requestEntity = new HttpEntity<>(xmppCreateUserRequestBody, headers);
            response = restTemplate.exchange(uriBuilder.toUriString(), HttpMethod.POST, requestEntity, XmppCreateUserResponse.class);
            log.info("[End][AgentService][createUserOnXmpp] {}", agent.getEmail());
        } catch (Exception e) {
            log.error("Error while sending request to xmpp service to create a new user ");
        }
        return response.getBody();
    }

    private String generateUsernameForXMPP(String email) {
        String userNameFirstPart = email.substring(0, email.indexOf('@'));
        String userNameSecondPart = email.substring(email.indexOf('@') + 1, email.length());
        String userName = userNameFirstPart + "." + userNameSecondPart;
        return userName;
    }

    @Override
    public ResponseEntity<?> processForgetPassword(String email) {
        log.info("[Start][AgentService][processForgetPassword] {}", email);
        if (StringUtils.isEmpty(email)) {
            return new ResponseEntity<>("email is mandatory", HttpStatus.BAD_REQUEST);
        }
        ResponseEntity<?> response = null;
        try {
            Agent agent = agentRepo.findByEmail(email);
            if (agent == null) {
                throw new CustomException("Data Not found", HttpStatus.NOT_FOUND);
            }
            String token = UUID.randomUUID().toString();
            redisService.setKeyWithTTL(token, email, 150);
            if (activeProfile.equals("local")) {
                sendMailViaBeam(agent.getEmail(), token, agent.getName(), Constants.PASSWORD);
            } else {
                sendForgetPasswordEmail(agent.getEmail(), token, agent.getName());
            }
        } catch (Exception e) {
            log.error("[Error while processing forgot password] {}", email);
        }
        log.info("[Start][End][processForgetPassword] {}", email);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private void sendForgetPasswordEmail(String toEmail, String token, String name) {
        String subject = "Reset Your Password";
        //todo: remove static path. add server url from config
        String resetLink = "http://localhost:3000/reset-password?token=" + token;

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(toEmail);
        simpleMailMessage.setSubject(subject);
        Map<String, Object> model = Map.of("resetLink", resetLink);
        String html = String.valueOf(GenericMustacheTemplate.compileUsingMustache(helper.getHtmlContent(), model));
        simpleMailMessage.setText(html);
        helper.getTempFileDirPath(html);
//        mailSender.send(simpleMailMessage);

    }

    private void sendMailViaBeam(String toEmail, String token, String name, String label) {
        log.info("[Start][AgentService][sendMailViaBeam] {}", toEmail);
        ResponseEntity<?> response = null;
        String url = beamUrl + beamToken;
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url);

        String resetLink = "http://mobius.wigzopush.com/reset-password?token=" + token;
        Map<String, Object> model = Map.of("resetLink", resetLink);
        String html = String.valueOf(GenericMustacheTemplate.compileUsingMustache(helper.getHtmlContent(), model));
        HttpHeaders headers = new HttpHeaders();
        Context context = Context.builder()
                .name(name)
                .email(toEmail)
                .build();
        Recipient recipient = Recipient.builder()
                .to(toEmail)
                .context(context)
                .build();
        Credentials credentials = Credentials.builder()
                .backend(Constants.BACKEND)
                .apiKey(sparkApiKey)
                .from(mailFrom)
                .replyTo(replyTo)
                .organization("1")
                .copyTransactional(true)
                .build();
        Campaign campaign = Campaign.builder()
                .organization(1)
                .type(null)
                .campaignId(null)
                .build();
        List<Recipient> recipientList = new ArrayList<>();
        recipientList.add(recipient);
        ResetPasswordMailBody body = ResetPasswordMailBody.builder()
                .recipients(recipientList)
                .subject(label.equalsIgnoreCase(Constants.PASSWORD)
                        ? Constants.RESET_PASSWORD_LINK : Constants.REGISTRATION_SUCCESSFUL)
                .body(label.equalsIgnoreCase(Constants.PASSWORD) ? html : Constants.REGISTRATION_BODY)
                .credentials(credentials)
                .campaign(campaign)
                .build();

        HttpEntity<Object> requestEntity = new HttpEntity<>(body, headers);
        try {
            response = restTemplate.exchange(uriBuilder.toUriString(), HttpMethod.POST, requestEntity, String.class);
            if (response.getStatusCode() != HttpStatus.OK) {
                log.error("Error from Wigzo mail sender: " + response.getBody());
            }
        } catch (Exception e) {
            log.error("Error while sending mail via beam");
        }
        log.info("[End][AgentService][sendMailViaBeam] {}", toEmail);
    }

    @Override
    public ResponseEntity<?> processResetPassword(ResetPasswordRequest request) {
        if (ObjectUtils.isEmpty(redisService.getValue(request.getToken()))) {
            return new ResponseEntity<>(
                    "Invalid token",
                    HttpStatus.BAD_REQUEST
            );
        }
        if (StringUtils.isEmpty(request.getPassword())) {
            return new ResponseEntity<>(
                    "Password can't be blank",
                    HttpStatus.BAD_REQUEST
            );
        }
        String email = (String) redisService.getValue(request.getToken());
        Agent agent = agentRepo.findByEmail(email);
        agent.setPassword(DigestUtils.sha1Hex(request.getPassword()));
        agentRepo.save(agent);
        redisService.deleteKey(request.getToken());
        return new ResponseEntity<>(
                "password updated successfully",
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<?> validateToken(String token) {
        String data = (String) redisService.getValue(token);
        if (ObjectUtils.isEmpty(data)) {
            return new ResponseEntity<>(
                    "invalid token",
                    HttpStatus.NOT_FOUND
            );
        }
        return new ResponseEntity<>(
                HttpStatus.OK
        );
    }
}
