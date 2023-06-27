package com.wigzo.care.chat.controller;

import com.wigzo.care.chat.service.ChatBoatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/chat-bot")
public class ChatBotController {

    @Autowired
    ChatBoatService chatBoatService;
    @PostMapping("/track-order")
    public ResponseEntity<?> trackOrder(@RequestBody String request) {
        return chatBoatService.trackOrder(request);
    }

    @PostMapping("/cancel-order")
    public ResponseEntity<?> cancelOrder(@RequestBody String request) {
        return chatBoatService.trackOrder(request);
    }

    @PostMapping("/return-order")
    public ResponseEntity<?> returnOrder(@RequestBody String request) {
        return chatBoatService.trackOrder(request);
    }

    @PostMapping("/delivery-issue")
    public ResponseEntity<?> deliveryIssue(@RequestBody String request) {
        return chatBoatService.trackOrder(request);
    }

    @PostMapping("/refund-status")
    public ResponseEntity<?> refundStatus(@RequestBody String request) {
        return chatBoatService.trackOrder(request);
    }

}
