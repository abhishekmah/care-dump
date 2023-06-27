package com.wigzo.care.identity.controller;

import com.wigzo.care.identity.dto.request.OrgRegistrationRequest;
import com.wigzo.care.identity.dto.response.OrganizationResponse;
import com.wigzo.care.identity.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/organization")
public class OrganizationController {

    @Autowired
    OrganizationService organizationService;

    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody OrgRegistrationRequest request) throws Exception {
        return organizationService.registerOrganization(request);

    }


    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public OrganizationResponse getOrganization(@PathVariable("id") Long id) {
        return organizationService.getOrganization(id);

    }
}
