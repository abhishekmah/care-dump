package com.wigzo.care.chat.service.impl;

import com.wigzo.care.chat.service.ChatBoatService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class ChatBoatServiceImpl implements ChatBoatService {

    @Override
    public ResponseEntity<?> trackOrder(String phone){
        return null;
    }

    @Override
    public ResponseEntity<?> cancelOrder(String phone) {
        return null;
    }

    @Override
    public ResponseEntity<?> returnOrder(String phone) {
        return null;
    }

    @Override
    public ResponseEntity<?> deliveryIssue(String phone) {
        return null;
    }

    @Override
    public ResponseEntity<?> refundStatus(String phone) {
        return null;
    }
}
