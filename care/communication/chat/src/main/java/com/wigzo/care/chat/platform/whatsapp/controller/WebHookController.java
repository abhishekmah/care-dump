package com.wigzo.care.chat.platform.whatsapp.controller;

import com.wigzo.care.chat.platform.whatsapp.dto.request.IncomingEventWebhook;
import com.wigzo.care.chat.platform.whatsapp.dto.request.IncomingMessageWebhook;
import com.wigzo.care.chat.platform.whatsapp.service.WebhookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/webhooks")
public class WebHookController {

    @Autowired
    private WebhookService webhookService;

    @PostMapping("/message")
    public ResponseEntity<?> incomingWebhookMessages(@RequestBody IncomingMessageWebhook request) {
        return webhookService.saveIncomingMessages(request);
    }

    @PostMapping("/event")
    public ResponseEntity<?> eventWebhook(@RequestBody IncomingEventWebhook request) {
        return webhookService.updateWhatsAppMessage(request);
    }
}
