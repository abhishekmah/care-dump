package com.wigzo.care.chat.platform.whatsapp.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wigzo.care.chat.entity.BusinessContact;
import com.wigzo.care.chat.entity.Message;
import com.wigzo.care.chat.platform.whatsapp.dao.ContactRepository;
import com.wigzo.care.chat.platform.whatsapp.dto.request.IncomingEventWebhook;
import com.wigzo.care.chat.platform.whatsapp.dto.request.IncomingMessageWebhook;
import com.wigzo.care.chat.platform.whatsapp.dto.xmpp.XmppMessage;
import com.wigzo.care.chat.platform.whatsapp.dto.xmpp.XmppMessageBody;
import com.wigzo.care.chat.platform.whatsapp.model.WhatsAppContact;
import com.wigzo.care.chat.platform.whatsapp.service.WebhookService;
import com.wigzo.care.chat.repository.BusinessContactsRepo;
import com.wigzo.care.chat.repository.MessageRepository;
import com.wigzo.care.chat.utils.CommonUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
public class WebhookServiceImpl implements WebhookService {
    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    BusinessContactsRepo businessContactsRepo;

    @Autowired
    ContactRepository contactRepository;

    @Autowired
    MessageRepository messageRepository;

    @Autowired
    CommonUtils commonUtils;

    @Autowired
    private RestTemplate restTemplate;

    @Value("${xmpp.url}")
    private String xmppUrl;

    @Override
    public ResponseEntity<?> saveIncomingMessages(IncomingMessageWebhook request) {
        try {
            //todo if we are getting any error from webhook
            checkIfGettingError(request.getError());
            checkBusinessContact(request.getBusinessPhone());
            Message message = createWhatsAppMessages(request);
            WhatsAppContact contact = createOrUpdateWhatsAppContact(request);
            sendMessageToXMPPClient(message, contact);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("Message Saved Successfully", HttpStatus.ACCEPTED);
    }

    private void sendMessageToXMPPClient(Message message, WhatsAppContact contact) throws Exception {
        XmppMessageBody xmppMessageBody = prepareXMPPMessageBody(message, contact);
        JsonNode node = objectMapper.convertValue(xmppMessageBody, JsonNode.class);

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(xmppUrl);
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Object> requestEntity = new HttpEntity<>(node, headers);
        try {
            String response =
                    String.valueOf(restTemplate.exchange(uriBuilder.toUriString(), HttpMethod.POST, requestEntity, String.class));
        } catch (Exception e) {
            log.error("Error while sending message through xmpp client ");
        }
    }

    public XmppMessageBody prepareXMPPMessageBody(Message message, WhatsAppContact contact) {
        XmppMessageBody xmppMessageBody = new XmppMessageBody();
        XmppMessage xmppMessage = new XmppMessage();
        BeanUtils.copyProperties(message, xmppMessage);
        xmppMessageBody.setMessage(xmppMessage);
        xmppMessageBody.setContact(contact);
        return xmppMessageBody;
    }

    private void checkIfGettingError(JsonNode error) {


    }

    @Override
    public ResponseEntity<?> updateWhatsAppMessage(IncomingEventWebhook request) {
        try {
            updateWhatsappMessageStatus(request);
            updateContact(request);
        } catch (Exception e) {
            log.error("Error while updating message and contact details");
        }
        return new ResponseEntity<>("Event Saved Successfully", HttpStatus.ACCEPTED);
    }

    private void updateContact(IncomingEventWebhook request) {
        try {
            WhatsAppContact contact =
                    contactRepository.findByOrgTokenAndUserPhone(request.getOrgToken(), request.getUserPhone());
            LocalDateTime time = commonUtils.convertDateToString(request.getTime());
            if (!ObjectUtils.isEmpty(contact)) {
                contact.setLastUpdatedAt(time);
                contactRepository.save(contact);
            }
        } catch (Exception e) {
            log.error("Error while updating contact for message status");
        }
    }

    private void updateWhatsappMessageStatus(IncomingEventWebhook request) {
        try {
            Message whatsAppMessage =
                    messageRepository.findByOrgTokenAndUserPhoneAndMessageId(request.getOrgToken(),
                            request.getUserPhone(),
                            request.getMessageId());
            LocalDateTime time = commonUtils.convertDateToString(request.getTime());
            if (!ObjectUtils.isEmpty(whatsAppMessage)) {
                whatsAppMessage.setStatus(request.getStatus());
                switch (request.getStatus()) {
                    case "sent":
                        whatsAppMessage.setSentTime(time);
                        break;
                    case "delivered":
                        whatsAppMessage.setDeliveryTime(time);
                        break;
                    case "read":
                        whatsAppMessage.setReadTime(time);
                        break;
                    case "received":
                        whatsAppMessage.setDeliveryTime(time);
                        whatsAppMessage.setTime(time);
                        break;
                    default:
                        whatsAppMessage.setTime(time);
                }
                messageRepository.save(whatsAppMessage);
            }
        } catch (Exception e) {
            log.error("Error while updating message status");
        }
    }


    private WhatsAppContact createOrUpdateWhatsAppContact(IncomingMessageWebhook request) {
        WhatsAppContact result = new WhatsAppContact();
        try {
            log.info("[Start][WebhookServiceImpl][createOrUpdateWhatsAppContact] {}", request.getUserPhone());
            result = contactRepository.findByOrgTokenAndUserPhone(request.getOrgToken(), request.getUserPhone());
            LocalDateTime time = commonUtils.convertDateToString(request.getTime());
            if (ObjectUtils.isEmpty(result)) {
                WhatsAppContact whatsAppContact = WhatsAppContact.builder()
                        .businessPhone(request.getBusinessPhone())
                        .orgToken(request.getOrgToken())
                        .createdAt(LocalDateTime.now())
                        .lastUpdatedAt(LocalDateTime.now())
                        .userName(request.getUserName())
                        .userPhone(request.getUserPhone())
                        .lastMessage(request.getMessage().getText() == null ? "" : request.getMessage().getText())
                        .unreadMessageCount(1).labelColor("red")
                        .labelName("test").build();
                return contactRepository.save(whatsAppContact);
            } else {
                result.setLastUpdatedAt(LocalDateTime.now());
                result.setLastMessage(request.getMessage().getText() == null ? "" : request.getMessage().getText());
                result.setUnreadMessageCount(result.getUnreadMessageCount() + 1);
                return contactRepository.save(result);
            }
        } catch (Exception e) {
            log.error("Error while create or update contact {}", request.getUserPhone());
        }
        log.info("[End][WebhookServiceImpl][createOrUpdateWhatsAppContact] {}", request.getUserPhone());
        return result;
    }


    private Message createWhatsAppMessages(IncomingMessageWebhook request) {
        Message message = new Message();
        try {
            log.info("[Start][WebhookServiceImpl][createWhatsAppMessages] {}", request.getMessageId());
            String textMessage = request.getMessage().getText();
            String messageDirection = "inbound";
            String status = "received";
            LocalDateTime time = commonUtils.convertDateToString(request.getTime());
            message.setMessageId(request.getMessageId());
            message.setKey(UUID.randomUUID());
            message.setMessageType(request.getMessageType());
            message.setMessage(textMessage);
            message.setOrgToken(request.getOrgToken());
            message.setUserPhone(request.getUserPhone());
            message.setTime(LocalDateTime.now());
            message.setDirection(messageDirection);
            message.setStatus(status);
            message.setCost((request.getCost() != null) ? request.getCost() : BigDecimal.ZERO);
            messageRepository.save(message);
        } catch (Exception e) {
            log.error("Error while creating message for care database");
        }
        log.info("[Start][WebhookServiceImpl][createWhatsAppMessages] {}", request.getMessageId());
        return message;
    }

    private void checkBusinessContact(String businessPhone) {
        BusinessContact contacts = businessContactsRepo.findByBusinessPhone(businessPhone);
        if (ObjectUtils.isEmpty(contacts)) {
            throw new RuntimeException("Business Contact Not Found");
        }
    }
}
