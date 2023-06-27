package com.wigzo.care.identity.service;

import com.wigzo.care.identity.dto.request.MtRequest;
import com.wigzo.care.identity.dto.response.MtResponse;

public interface MessageTemplateInterface {
    MtResponse postData(MtRequest request);
}
