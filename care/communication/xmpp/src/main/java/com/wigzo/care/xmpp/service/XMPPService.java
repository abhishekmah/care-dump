package com.wigzo.care.xmpp.service;

import com.wigzo.care.xmpp.request.XMPPCreateUserRequest;
import com.wigzo.care.xmpp.response.UserCreateResponse;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;

public interface XMPPService {
    UserCreateResponse createUserOnXmpp(XMPPCreateUserRequest request);
}
