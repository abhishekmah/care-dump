package com.wigzo.care.chat.service;

import com.wigzo.care.chat.platform.whatsapp.dto.request.MessageRequest;
import com.wigzo.care.chat.platform.whatsapp.dto.request.WhatsappBusinessRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public interface PlatformService {
    ResponseEntity<?> sendMessage(MessageRequest request);

    ResponseEntity<?> getMessages(String userPhone, String orgToken, Integer pageNo);

    ResponseEntity<?> getContacts(int page, String userPhone, String userName, String orgToken);

    ResponseEntity<?> registerBusinessNumber(WhatsappBusinessRequest request);

    ResponseEntity<?> uploadFile(MultipartFile request);


}
