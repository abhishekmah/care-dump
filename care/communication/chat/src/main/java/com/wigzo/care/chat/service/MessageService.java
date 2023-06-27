package com.wigzo.care.chat.service;

import com.wigzo.care.chat.factory.PlatformFactory;
import com.wigzo.care.chat.platform.whatsapp.dto.request.MessageRequest;
import com.wigzo.care.chat.platform.whatsapp.dto.request.WhatsappBusinessRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MessageService {

    @Autowired
    PlatformFactory platformFactory;

    public ResponseEntity<?> uploadFile(MultipartFile request) {
        PlatformService platformService = platformFactory.getService("whatsapp");
        return platformService.uploadFile(request);
    }


    public ResponseEntity<?> sendMessage(MessageRequest request) {
        PlatformService platformService = platformFactory.getService("whatsapp");
        return platformService.sendMessage(request);
    }

    public ResponseEntity<?> getMessages(String userPhone, String orgToken, Integer pageNo) {
        PlatformService platformService = platformFactory.getService("whatsapp");
        return platformService.getMessages(userPhone, orgToken, pageNo);
    }


    public ResponseEntity<?> getContacts(int page, String userPhone, String userName, String orgToken) {
        PlatformService platformService = platformFactory.getService("whatsapp");
        return platformService.getContacts(page, userPhone, userName, orgToken);
    }

    public ResponseEntity<?> registerBusinessNumber(WhatsappBusinessRequest request) {
        PlatformService platformService = platformFactory.getService("whatsapp");
        return platformService.registerBusinessNumber(request);
    }

}
