package com.wigzo.care.identity.service.impl;

import com.wigzo.care.identity.dto.request.OrgRegistrationRequest;
import com.wigzo.care.identity.dto.response.BaseResponse;
import com.wigzo.care.identity.dto.response.OrganizationResponse;
import com.wigzo.care.identity.entity.Organization;
import com.wigzo.care.identity.repository.AgentRepo;
import com.wigzo.care.identity.repository.OrganizationRepository;
import com.wigzo.care.identity.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OrganizationServiceImpl implements OrganizationService {

    @Autowired
    OrganizationRepository organizationRepository;

    @Autowired
    AgentRepo agentRepo;

    @Override
    public ResponseEntity<?> registerOrganization(OrgRegistrationRequest request) throws Exception {
        Organization organization = new Organization();
        organization.setDomain(request.getDomain());
        organization.setCreatedAt(LocalDateTime.now());
        organization.setUpdatedAt(LocalDateTime.now());
        organization.setName(request.getName());
        organizationRepository.save(organization);
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatus(201);
        baseResponse.setSuccess(true);
        baseResponse.setData(organization);
        return new ResponseEntity<>(
                baseResponse,
                HttpStatus.CREATED
        );

    }

    @Override
    public OrganizationResponse getOrganization(Long id) {

        Optional<Organization> organizationOptional = organizationRepository.findById(id);
        Organization organization = organizationOptional.get();
        OrganizationResponse response = OrganizationResponse.builder()
                .id(organization.getId())
                .domain(organization.getDomain())
                .isActive(true)
                .createdAt(organization.getCreatedAt())
                .build();
        return response;
    }
}
