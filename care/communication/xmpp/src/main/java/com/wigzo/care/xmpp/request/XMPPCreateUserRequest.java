package com.wigzo.care.xmpp.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class XMPPCreateUserRequest {
    private String user;
    private String host;
    private String password;
}
