package com.wigzo.care.identity.dto.request;

import lombok.Data;



@Data
public class RoleRequest {
    private String code;
    private String name;
    private Boolean isActive;
}
