package com.wigzo.care.identity.controller;

import com.wigzo.care.identity.dto.request.RoleRequest;
import com.wigzo.care.identity.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/role")
public class RoleController {

    @Autowired
    RoleService roleService;

    @PostMapping(value = "/create")
    public ResponseEntity<?> register(@RequestBody RoleRequest request) {
        return roleService.createRole(request);

    }
}
