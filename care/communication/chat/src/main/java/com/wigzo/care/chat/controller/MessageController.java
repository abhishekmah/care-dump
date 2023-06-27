package com.wigzo.care.chat.controller;

import com.wigzo.care.chat.platform.whatsapp.dto.request.MessageRequest;
import com.wigzo.care.chat.platform.whatsapp.dto.request.WhatsappBusinessRequest;
import com.wigzo.care.chat.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/whatsapp")
public class MessageController {

    @Autowired
    MessageService messageService;
    @PostMapping("/message")
    public ResponseEntity<?> sendMessage(@RequestBody MessageRequest request) {
        return messageService.sendMessage(request);
    }

    @GetMapping("/messages")
    public ResponseEntity<?> getWhatsappMessages(@RequestParam String userPhone,
                                                 @RequestParam String orgToken,
                                                 @RequestParam(defaultValue = "0") Integer pageNo) {
        return messageService.getMessages(userPhone, orgToken, pageNo);
    }

    @GetMapping("/contacts")
    public ResponseEntity<?> fetchAllContacts(@RequestParam(defaultValue = "0") int page,
                                              @RequestParam(name = "userPhone", required = false) String userPhone,
                                              @RequestParam(name = "userName", required = false) String userName,
                                              @RequestParam(name = "orgToken") String orgToken) {
        return messageService.getContacts(page, userPhone, userName, orgToken);
    }
//    @PostMapping("/message")
//    public ResponseEntity<?> uploadMedia( @RequestPart MultipartFile document) {
//        return messageService.uploadFile(document);
//    }

    @PostMapping("/register")
    public ResponseEntity<?> registerWhatsappBusiness(@RequestBody WhatsappBusinessRequest request) {
        return messageService.registerBusinessNumber(request);
    }

}
