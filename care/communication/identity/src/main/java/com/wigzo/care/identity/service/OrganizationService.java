package com.wigzo.care.identity.service;

import com.wigzo.care.identity.dto.request.OrgRegistrationRequest;
import com.wigzo.care.identity.dto.response.OrganizationResponse;
import org.springframework.http.ResponseEntity;

public interface OrganizationService {

    ResponseEntity<?> registerOrganization(OrgRegistrationRequest request) throws Exception;

    OrganizationResponse getOrganization(Long id);
}
