package com.wigzo.care.identity.dto.request;

import lombok.Data;

@Data
public class UserLoginRequest {
    private String userName;
    private String password;

}
