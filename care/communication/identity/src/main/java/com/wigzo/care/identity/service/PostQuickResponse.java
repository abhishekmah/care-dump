package com.wigzo.care.identity.service;

import com.wigzo.care.identity.dto.request.QrRequest;
import com.wigzo.care.identity.dto.response.QrResponse;

import java.util.List;

public interface PostQuickResponse {


    QrResponse postData(QrRequest request);

    QrResponse updatedata(Long id, QrRequest request) throws Exception;

    QrResponse getData(Long id) throws Exception;

    List<QrResponse> fetchAllData();
}
