package com.wigzo.care.identity.service.impl;

import com.wigzo.care.identity.dto.request.RoleRequest;
import com.wigzo.care.identity.dto.response.BaseResponse;
import com.wigzo.care.identity.entity.Role;
import com.wigzo.care.identity.enums.ERole;
import com.wigzo.care.identity.service.RoleService;
import com.wigzo.care.identity.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepository roleRepository;
    @Override
    public ResponseEntity<?> createRole(RoleRequest request) {
      Role role = new Role();
      role.setName(ERole.valueOf(request.getName()));
      role.setCode(request.getCode());
      role.setIsActive(true);
      roleRepository.save(role);

        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatus(201);
        baseResponse.setSuccess(true);
        baseResponse.setData(role);
        return new ResponseEntity<>(
                baseResponse,
                HttpStatus.CREATED
        );

    }

}
