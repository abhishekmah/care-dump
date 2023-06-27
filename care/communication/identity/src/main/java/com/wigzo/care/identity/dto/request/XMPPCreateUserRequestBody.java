package com.wigzo.care.identity.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class XMPPCreateUserRequestBody {
    private String user;
    private String password;
}
