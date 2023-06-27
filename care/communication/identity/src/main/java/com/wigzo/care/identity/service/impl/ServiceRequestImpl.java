package com.wigzo.care.identity.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wigzo.care.identity.dto.request.SrRequest;
import com.wigzo.care.identity.dto.response.SrResponse;
import com.wigzo.care.identity.entity.ServiceRequest;
import com.wigzo.care.identity.exception.TemplateNotFound;
import com.wigzo.care.identity.repository.SrRepository;
import com.wigzo.care.identity.service.ServiceRequestInterface;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceRequestImpl implements ServiceRequestInterface {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private SrRepository srRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public SrResponse postData(SrRequest request) {
        ServiceRequest serviceRequest = objectMapper.convertValue(request, ServiceRequest.class);
        srRepository.save(serviceRequest);
        return objectMapper.convertValue(serviceRequest, SrResponse.class);
    }

    @Override
    public SrResponse updatedata(Long id, SrRequest request) throws TemplateNotFound {

        ServiceRequest serviceRequest = findDetails(id);

        serviceRequest.setRequestNumber(request.getRequestNumber());
        serviceRequest.setAgentId(request.getAgentId());
        serviceRequest.setPriority(request.getPriority());
        serviceRequest.setConsumerFeedback(request.getConsumerFeedback());
        serviceRequest.setAgentNotes(request.getAgentNotes());
        serviceRequest.setOrganisationId(request.getOrganisationId());

        srRepository.save(serviceRequest);

        return objectMapper.convertValue(serviceRequest, SrResponse.class);

    }

    @Override
    public List<SrResponse> fetchAllData() {
        List<ServiceRequest> responses = srRepository.findAll();
        List<SrResponse> responseList = responses.stream().map(response -> modelMapper
                        .map(response, SrResponse.class))
                .collect(Collectors.toList());
        return responseList;
    }

    @Override
    public SrResponse getData(Long id) throws TemplateNotFound {
        ServiceRequest serviceRequest = srRepository.findById(id).orElseThrow(TemplateNotFound::new);

        return objectMapper.convertValue(serviceRequest, SrResponse.class);
    }

    private ServiceRequest findDetails(Long id) throws TemplateNotFound {
        return srRepository.findById(id).orElseThrow(TemplateNotFound::new);
    }
}
