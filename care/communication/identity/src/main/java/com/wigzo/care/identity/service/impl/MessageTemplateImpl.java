package com.wigzo.care.identity.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wigzo.care.identity.dto.request.MtRequest;
import com.wigzo.care.identity.dto.response.MtResponse;
import com.wigzo.care.identity.entity.MessageTemplate;
import com.wigzo.care.identity.repository.MtRepository;
import com.wigzo.care.identity.service.MessageTemplateInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageTemplateImpl implements MessageTemplateInterface {

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    MtRepository mtRepository;

    @Override
    public MtResponse postData(MtRequest request) {
        MessageTemplate messageTemplate = objectMapper.convertValue(request, MessageTemplate.class);
        mtRepository.save(messageTemplate);
        return objectMapper.convertValue(messageTemplate, MtResponse.class);    }
}
