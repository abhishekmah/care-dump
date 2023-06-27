package com.wigzo.care.xmpp.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.wigzo.care.xmpp.config.XmppConfig;
import com.wigzo.care.xmpp.request.XMPPCreateUserRequest;
import com.wigzo.care.xmpp.response.UserCreateResponse;
import com.wigzo.care.xmpp.service.XMPPService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/xmpp")
public class XMPPController {

    @Autowired
    XMPPService xmppService;

    @PostMapping(value = "/send-message")
    public void register(@RequestBody JsonNode request) throws Exception {
        XmppConfig xmppConfig = new XmppConfig();
        xmppConfig.sendMessage(request);
    }

    @PostMapping(value = "/create-user")
    public UserCreateResponse createUser(@RequestBody XMPPCreateUserRequest request) {
        return xmppService.createUserOnXmpp(request);
    }
}
