package com.wigzo.care.chat.platform.whatsapp.service.impl;

import com.datastax.driver.core.utils.UUIDs;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wigzo.care.chat.entity.BusinessContact;
import com.wigzo.care.chat.entity.Message;
import com.wigzo.care.chat.platform.whatsapp.dao.BusinessContactRepository;
import com.wigzo.care.chat.platform.whatsapp.dao.ContactRepository;
import com.wigzo.care.chat.platform.whatsapp.dto.beam.BeamMessageRequest;
import com.wigzo.care.chat.platform.whatsapp.dto.beam.BeamMessageResponse;
import com.wigzo.care.chat.platform.whatsapp.dto.beam.Media;
import com.wigzo.care.chat.platform.whatsapp.dto.beam.ProviderCredentials;
import com.wigzo.care.chat.platform.whatsapp.dto.request.*;
import com.wigzo.care.chat.platform.whatsapp.model.WhatsAppContact;
import com.wigzo.care.chat.repository.BusinessContactsRepo;
import com.wigzo.care.chat.repository.MessageRepository;
import com.wigzo.care.chat.service.PlatformService;
import com.wigzo.care.chat.utils.CommonUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.cassandra.core.CassandraOperations;
import org.springframework.data.cassandra.core.query.CassandraPageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Service
@Slf4j
public class WhatsappServiceImpl implements PlatformService {

    @Value("${beam.whatsapp.url}")
    private String beamWhatsappUrl;

    @Value("${beam.business.register.url}")
    private String beamBusinessRegisterUrl;
    @Value("${beam.token}")
    private String beamToken;
    @Autowired
    CassandraOperations cassandraTemplate;
    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private BusinessContactRepository businessContactRepository;
    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private BusinessContactsRepo businessContactsRepo;

    @Autowired
    private CommonUtils commonUtils;

    @Autowired
    ObjectMapper objectMapper;

    public ResponseEntity<?> getMessages(String userPhone, String orgToken, Integer pageNo) {
        log.info("[Start][DashboardServiceImpl][getWhatsappMessages] {}", userPhone);
        Slice<Message> messageList;
        int currpage = 0;
        Slice<Message> slice =
                messageRepository.findByOrgTokenAndUserPhoneOrderByTimeDesc(orgToken, userPhone, CassandraPageRequest.first(20));
        while (slice.hasNext() && currpage < pageNo) {
            slice =
                    messageRepository.findByOrgTokenAndUserPhoneOrderByTimeDesc(orgToken, userPhone, slice.nextPageable());
            currpage++;
        }
        log.info("[Start][DashboardServiceImpl][getWhatsappMessages] {}", userPhone);
        return new ResponseEntity<>(
                slice,
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<?> sendMessage(MessageRequest request) {
        log.info("[Start][DashboardServiceImpl][sendWhatsappMessage] {}", request.getToPhone());
        SendMessageResponse response = new SendMessageResponse();
        try {
//            KaleyraMessageResponse response = sendMessageToKaleyra(request);
            BeamMessageResponse beamResponse = sendMessageToBeam(request);
            Message message = constructMessage(request, beamResponse);
            WhatsAppContact contact =updateWhatsappContact(request, beamResponse);
             response = generateMessageResponse(message, contact);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        log.info("[End][DashboardServiceImpl][sendWhatsappMessage] {}", request.getToPhone());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    private SendMessageResponse generateMessageResponse(Message message, WhatsAppContact contact) {
        SendMessageResponse data = new SendMessageResponse();
        data.setContact(contact);
        data.setMessage(message);
        return data;
    }

    private BeamMessageResponse sendMessageToBeam(MessageRequest request) {
        log.info("[Start][DashboardServiceImpl][sendMessageToBeam] {}", request.getToPhone());
        ResponseEntity<BeamMessageResponse> response = null;
        String url = beamWhatsappUrl + beamToken;
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url);
        HttpHeaders headers = new HttpHeaders();
        BeamMessageRequest body = constructBeamMessageRequest(request);
        HttpEntity<Object> requestEntity = new HttpEntity<>(body, headers);
        try {
            response =
                    restTemplate.exchange(uriBuilder.toUriString(), HttpMethod.POST, requestEntity, BeamMessageResponse.class);
            if (response.getStatusCode() != HttpStatus.OK) {
                log.error("Error from Beam while sending message: " + response.getStatusCode());
            }
        } catch (Exception e) {
            log.error("Error while sending message via Beam");
        }
        log.info("[End][DashboardServiceImpl][sendMessageToBeam] {}", request.getToPhone());
        return response.getBody();
    }

    private BeamMessageRequest constructBeamMessageRequest(MessageRequest request) {
        BeamMessageRequest messageRequest = new BeamMessageRequest();
        messageRequest.setOrgToken(request.getOrgToken());
        messageRequest.setDestination(request.getToPhone());
        messageRequest.setBusinessPhone("+917799721319");
//        messageRequest.setChannel(request.getChannel());
        messageRequest.setMessageType(request.getType());
        messageRequest.setText(request.getMessage());
        messageRequest.setCallBackUrl(
                "https://dark-knight.wigzopush.com/whatsapp/webhook/incoming/kaleyra/pF3NmMonSuaRiJ2M6eDv4A");
        if (request.getType().equalsIgnoreCase("media")) {
            Media media = new Media();
            if (null != request.getCaption())
                media.setCaption(request.getCaption());
            if (null != request.getMediaUrl())
                media.setUrl(request.getMediaUrl());
            messageRequest.setMedia(media);
        }

//        if (request.getType().equalsIgnoreCase("contacts")) {
//            if (!ObjectUtils.isEmpty(request.getContactParams())) {
//                ContactParams contactParams = objectMapper.convertValue(request.getContactParams(), ContactParams.class);
//                try {
//                    messageRequest.setParam_contacts(objectMapper.writeValueAsString(contactParams));
//                } catch (JsonProcessingException e) {
//                    log.error("Error while converting contact params from json to string");
//                }
//            }
//        }
        return messageRequest;
    }

    private Message constructMessage(MessageRequest request, BeamMessageResponse response) {
        Message message = new Message();
        try {
            log.info("[Start][DashboardServiceImpl][constructMessage] {}", request.getMessage());
            message.setKey(UUIDs.timeBased());
            message.setMessageType(request.getType());
            message.setTime(LocalDateTime.now());
            message.setMessage(request.getMessage());
            message.setDirection("outBound");
            message.setOrgToken(request.getOrgToken());
            message.setUserPhone(request.getToPhone());
            message.setPlatform(request.getChannel());
            // todo store media url, caption and contact details in our database
            if (!ObjectUtils.isEmpty(response)) {
                message.setMessageId(response.getMessageId());
                message.setStatus("sent");
                message.setSentTime(LocalDateTime.now());
            }
            messageRepository.save(message);
            log.info("[End][DashboardServiceImpl][constructMessage] {}", request.getMessage());
        } catch (Exception e) {
            log.error("Error while saving message {}", request.getMessage());
        }
        return message;
    }


    private WhatsAppContact updateWhatsappContact(MessageRequest request, BeamMessageResponse response) {
        try {
            log.info("[Start][DashboardServiceImpl][updateWhatsappContact] for user phone {}", request.getToPhone());
            WhatsAppContact contact =
                    contactRepository.findByOrgTokenAndUserPhone(response.getOrgToken(), request.getToPhone());
            contact.setBusinessPhone(contact.getBusinessPhone());
            contact.setLastUpdatedAt(LocalDateTime.now());
            contact.setLastMessage(response.getMessageType() == "media" ? "" : request.getMessage());
            contact.setUnreadMessageCount(contact.getUnreadMessageCount() + 1);
            contactRepository.save(contact);
            log.info("[End][DashboardServiceImpl][updateWhatsappContact] for user phone {}", request.getToPhone());
            return contact;
        } catch (Exception e) {
            log.error("Error while updating contact information{}", request.getToPhone());
        }
        return null;
    }

    public KaleyraMessageResponse sendMessageToKaleyra(MessageRequest request) {
        ResponseEntity<KaleyraMessageResponse> response = null;
        String url = "https://api.kaleyra.io/v1/HXIN1719294468IN/messages";
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url);

        HttpHeaders headers = new HttpHeaders();
        headers.put("api-key", Collections.singletonList("A4338b88d4360d274b10b2cb9629f208e"));
        headers.put("CONTENT_TYPE", Collections.singletonList("application/json"));
        KaleyraWhatsappMessageRequest body = constructWhatsappMessageRequest(request);


        HttpEntity<Object> requestEntity = new HttpEntity<>(body, headers);
        try {
            response = restTemplate.exchange(
                    uriBuilder.toUriString(), HttpMethod.POST, requestEntity, KaleyraMessageResponse.class);
            if (response.getStatusCode() != HttpStatus.ACCEPTED) {
                log.error("Error from kaleyra while sending message: " + response.getStatusCode());
            }
        } catch (Exception e) {
            log.error("Error while sending message via kaleyra");

        }
        return response.getBody();
    }

    private KaleyraWhatsappMessageRequest constructWhatsappMessageRequest(MessageRequest request) {
        KaleyraWhatsappMessageRequest messageRequest = new KaleyraWhatsappMessageRequest();
        messageRequest.setTo(request.getToPhone());
        messageRequest.setFrom("+917799721319");
        messageRequest.setChannel(request.getChannel());
        messageRequest.setType(request.getType());
        messageRequest.setBody(request.getMessage());
        if (request.getType().equalsIgnoreCase("media")) {
            if (null != request.getCaption())
                messageRequest.setCaption(request.getCaption());
            if (null != request.getMediaUrl())
                messageRequest.setMediaUrl(request.getMediaUrl());
        }
        if (request.getType().equalsIgnoreCase("contacts")) {
            if (!ObjectUtils.isEmpty(request.getContactParams())) {
                ContactParams contactParams = objectMapper.convertValue(request.getContactParams(), ContactParams.class);
                try {
                    messageRequest.setParamContacts(objectMapper.writeValueAsString(contactParams));
                } catch (JsonProcessingException e) {
                    log.error("Error while converting contact params from json to string");
                }
            }
        }
        return messageRequest;
    }

    @Override
    public ResponseEntity<?> getContacts(int page, String userPhone, String userName, String orgToken) {
        Page<WhatsAppContact> allContacts = null;
        log.info("[Start][WhatsappServiceImpl][getContacts] {}", orgToken);
        Pageable pageable = PageRequest.of(page, 10, Sort.by("lastUpdatedAt").descending());
        if (StringUtils.isEmpty(userName) && StringUtils.isEmpty(userPhone)) {
            allContacts = contactRepository.findByOrgToken(orgToken, pageable);
        } else if (!StringUtils.isEmpty(userName)) {
            allContacts = contactRepository.findByOrgTokenAndUserNameContainingIgnoreCase(orgToken, userName, pageable);
        } else if (!StringUtils.isEmpty(userPhone)) {
            allContacts = contactRepository.findByOrgTokenAndUserPhoneContainingIgnoreCase(orgToken, userPhone, pageable);
        }
        log.info("[End][WhatsappServiceImpl][getContacts] {}", orgToken);
        return new ResponseEntity<>(
                allContacts,
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<?> registerBusinessNumber(WhatsappBusinessRequest request) {
        if (StringUtils.isAnyEmpty(request.getBusinessPhone(), request.getOrgToken(), request.getProvider())) {
            return new ResponseEntity<>(
                    "Business phone, Provider and organisation token are mandatory",
                    HttpStatus.BAD_REQUEST
            );
        }
        try {
            BusinessContact contact = new BusinessContact();
            contact.setBusinessPhone(request.getBusinessPhone());
            contact.setOrgToken(request.getOrgToken());
            contact.setProvider(request.getProvider());
            businessContactRepository.save(contact);
            registerBusinessOnBeam(contact);
        } catch (Exception e) {
            log.error("Error while registering business contact");
        }
        return null;
    }

    private ResponseEntity<?> registerBusinessOnBeam(BusinessContact contact) {
        ResponseEntity<?> response = null;
        try {
            log.info("[Start][WhatsappServiceImpl][registerBusinessOnBeam] {}", contact.getOrgToken());
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(beamBusinessRegisterUrl + beamToken);
            HttpHeaders headers = new HttpHeaders();
            ProviderCredentials providerCredentials = new ProviderCredentials();
            providerCredentials.setProvider(contact.getProvider());
            providerCredentials.setBusinessPhone(contact.getBusinessPhone());
            providerCredentials.setOrgToken(contact.getOrgToken());
            providerCredentials.setAuth("A4338b88d4360d274b10b2cb9629f208e");
            providerCredentials.setAccount("HXIN1719294468IN");
            providerCredentials.setRemarks("WigzoTesting");
            HttpEntity<Object> requestEntity = new HttpEntity<>(providerCredentials, headers);
            response = restTemplate.exchange(uriBuilder.toUriString(), HttpMethod.POST, requestEntity, Object.class);
        }catch (Exception e){
            log.error("Error while registering whatsapp business number on beam");
        }
        return (ResponseEntity<?>) response.getBody();
    }

    @Override
    public ResponseEntity<?> uploadFile(MultipartFile request) {
        return null;
    }

}