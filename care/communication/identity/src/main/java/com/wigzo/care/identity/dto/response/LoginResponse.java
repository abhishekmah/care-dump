package com.wigzo.care.identity.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private Long id;
    private String name;
    private String email;
    private List<UUID> orgTokens;
    private String orgName;
    private String jwt;
    private String xmppUserName;
    private String xmppPassword;
}
