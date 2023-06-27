package com.wigzo.care.identity.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.wigzo.care.identity.dto.request.QrRequest;
import com.wigzo.care.identity.dto.response.QrResponse;
import com.wigzo.care.identity.entity.QuickResponse;
import com.wigzo.care.identity.exception.CustomException;
import com.wigzo.care.identity.exception.TemplateNotFound;
import com.wigzo.care.identity.repository.QrRepository;
import com.wigzo.care.identity.service.PostQuickResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostQuickResponseImpl implements PostQuickResponse {

    @Autowired
    private QrRepository qrRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public QrResponse postData(QrRequest request) {
        QuickResponse quickResponse = objectMapper.convertValue(request, QuickResponse.class);
        qrRepository.save(quickResponse);
        return objectMapper.convertValue(quickResponse, QrResponse.class);
    }

    @Override
    public QrResponse updatedata(Long id, QrRequest request) throws Exception {

        QuickResponse quickResponse = findDetails(id);

        quickResponse.setText(request.getText());
        quickResponse.setTitle(request.getTitle());
        quickResponse.setTemplate(request.getTemplate());
        quickResponse.setType(request.getType());
        quickResponse.setSubTitle(request.getSubTitle());
        quickResponse.setTitle(request.getTitle());
        quickResponse.setMediaId(request.getMediaId());
        quickResponse.setIsActive(request.getIsActive());

        qrRepository.save(quickResponse);

        return objectMapper.convertValue(quickResponse, QrResponse.class);

    }

    @Override
    public QrResponse getData(Long id) throws CustomException {
        QuickResponse quickResponse = qrRepository.findById(id).orElseThrow(TemplateNotFound::new);
        if (Boolean.FALSE.equals(quickResponse.getIsActive())) {
            throw new CustomException("Not an Active Data !!!!", HttpStatus.CONFLICT);
        }
        return objectMapper.convertValue(quickResponse, QrResponse.class);
    }

    @Override
    public List<QrResponse> fetchAllData() {
        List<QuickResponse> responses = qrRepository.findAll();
        List<QrResponse> responseList = responses.stream().map(response -> modelMapper
                        .map(response, QrResponse.class))
                .collect(Collectors.toList());
        return responseList;

    }

    private QuickResponse findDetails(Long id) throws TemplateNotFound {
        return qrRepository.findById(id).orElseThrow(TemplateNotFound::new);

    }

}
