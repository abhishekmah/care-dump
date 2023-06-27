package com.wigzo.care.chat.platform.whatsapp.service;

import com.wigzo.care.chat.platform.whatsapp.dto.request.IncomingEventWebhook;
import com.wigzo.care.chat.platform.whatsapp.dto.request.IncomingMessageWebhook;
import org.springframework.http.ResponseEntity;

public interface WebhookService {

    ResponseEntity<?> saveIncomingMessages(IncomingMessageWebhook request);

    ResponseEntity<?> updateWhatsAppMessage(IncomingEventWebhook request);
}
