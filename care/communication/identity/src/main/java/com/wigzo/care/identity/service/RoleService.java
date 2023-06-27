package com.wigzo.care.identity.service;

import com.wigzo.care.identity.dto.request.RoleRequest;
import org.springframework.http.ResponseEntity;

public interface RoleService {

    ResponseEntity<?> createRole(RoleRequest request);
}
