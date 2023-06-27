package com.wigzo.care.identity.service;

import com.wigzo.care.identity.dto.request.SrRequest;
import com.wigzo.care.identity.dto.response.SrResponse;

import java.util.List;

public interface ServiceRequestInterface {

    SrResponse postData(SrRequest request);

    SrResponse updatedata(Long id, SrRequest request) throws Exception;

    List<SrResponse> fetchAllData();

    SrResponse getData(Long id) throws Exception;
}
