package com.wigzo.care.chat.service;

import org.springframework.http.ResponseEntity;

public interface ChatBoatService {
     ResponseEntity<?> trackOrder(String phone);
     ResponseEntity<?> cancelOrder(String phone);
     ResponseEntity<?> returnOrder(String phone);
     ResponseEntity<?> deliveryIssue(String phone);
     ResponseEntity<?> refundStatus(String phone);

}
