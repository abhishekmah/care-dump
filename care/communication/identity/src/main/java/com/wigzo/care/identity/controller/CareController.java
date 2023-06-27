package com.wigzo.care.identity.controller;

import com.wigzo.care.identity.dto.request.MtRequest;
import com.wigzo.care.identity.dto.request.QrRequest;
import com.wigzo.care.identity.dto.request.SrRequest;
import com.wigzo.care.identity.dto.response.BaseRestResponse;
import com.wigzo.care.identity.dto.response.MtResponse;
import com.wigzo.care.identity.dto.response.QrResponse;
import com.wigzo.care.identity.dto.response.SrResponse;
import com.wigzo.care.identity.service.MessageTemplateInterface;
import com.wigzo.care.identity.service.PostQuickResponse;
import com.wigzo.care.identity.service.ServiceRequestInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CareController {

    @Autowired
    private PostQuickResponse postQuickResponse;

    @Autowired
    private ServiceRequestInterface serviceRequest;

    @Autowired
    private MessageTemplateInterface messageTemplate;

    @GetMapping(path = "/quickResponse")
    public BaseRestResponse<Object> fetchData(@RequestParam(name = "id", required = false) Long id) {
        BaseRestResponse<Object> baseRestResponse = new BaseRestResponse<>();

        try {
            if (ObjectUtils.isEmpty(id)) {
                List<QrResponse> responses = postQuickResponse.fetchAllData();
                baseRestResponse.setData(responses);
            } else {
                QrResponse responses = postQuickResponse.getData(id);
                baseRestResponse.setData(responses);
            }
            baseRestResponse.setStatus(HttpStatus.OK.value());
            baseRestResponse.setSuccess(true);
            baseRestResponse.setMessage("Record Fetched successfully !!!!!");

        } catch (Exception e) {
            baseRestResponse.setSuccess(false);
            baseRestResponse.setStatus(HttpStatus.NOT_FOUND.value());
            baseRestResponse.setError((e.getMessage()));
        }

        return baseRestResponse;
    }


    @PostMapping("/quickResponse")
    public BaseRestResponse<QrResponse> quickResponse(@Valid @RequestBody QrRequest request) {

        BaseRestResponse<QrResponse> baseRestResponse = new BaseRestResponse<>();

        try {
            QrResponse resp = postQuickResponse.postData(request);

            baseRestResponse.setStatus(HttpStatus.CREATED.value());
            baseRestResponse.setSuccess(true);
            baseRestResponse.setMessage("Record inserted successfully !!!!!");
            baseRestResponse.setData(resp);
        } catch (Exception exception) {
            baseRestResponse.setSuccess(false);
            baseRestResponse.setError(("Error while storing the data into data base !!!!!!!!!!!!!"));
        }

        return baseRestResponse;
    }

    @PutMapping("/quickResponse/{id}")
    public BaseRestResponse<QrResponse> updateQuickResponse(@PathVariable Long id, @RequestBody QrRequest request) {

        BaseRestResponse<QrResponse> baseRestResponse = new BaseRestResponse<>();

        try {
            QrResponse response = postQuickResponse.updatedata(id, request);

            baseRestResponse.setStatus(HttpStatus.OK.value());
            baseRestResponse.setSuccess(true);
            baseRestResponse.setMessage("Record updated successfully !!!!!");
            baseRestResponse.setData(response);
        } catch (Exception e) {
            baseRestResponse.setSuccess(false);
            baseRestResponse.setStatus(HttpStatus.NOT_FOUND.value());
            baseRestResponse.setError((e.getMessage()));

        }

        return baseRestResponse;

    }

    @GetMapping(path = "/serviceRequest")
    public BaseRestResponse<Object> fetchServiceRequest(@RequestParam(name = "id", required = false) Long id) {
        BaseRestResponse<Object> baseRestResponse = new BaseRestResponse<>();

        try {
            if (ObjectUtils.isEmpty(id)) {
                List<SrResponse> responses = serviceRequest.fetchAllData();
                baseRestResponse.setData(responses);
            } else {
                SrResponse responses = serviceRequest.getData(id);
                baseRestResponse.setData(responses);
            }
            baseRestResponse.setStatus(HttpStatus.OK.value());
            baseRestResponse.setSuccess(true);
            baseRestResponse.setMessage("Record Fetched successfully !!!!!");

        } catch (Exception e) {
            baseRestResponse.setSuccess(false);
            baseRestResponse.setStatus(HttpStatus.NOT_FOUND.value());
            baseRestResponse.setError((e.getMessage()));
        }

        return baseRestResponse;
    }

    @PostMapping("/serviceRequest")
    public BaseRestResponse<SrResponse> quickResponse(@RequestBody SrRequest request) {

        BaseRestResponse<SrResponse> baseRestResponse = new BaseRestResponse<>();

        try {
            SrResponse resp = serviceRequest.postData(request);

            baseRestResponse.setStatus(HttpStatus.CREATED.value());
            baseRestResponse.setSuccess(true);
            baseRestResponse.setMessage("Record inserted successfully !!!!!");
            baseRestResponse.setData(resp);
        } catch (Exception exception) {
            baseRestResponse.setSuccess(false);
            baseRestResponse.setError(("Error while storing the data into data base !!!!!!!!!!!!!"));
        }

        return baseRestResponse;
    }

    @PutMapping("/serviceRequest/{id}")
    public BaseRestResponse<SrResponse> updateQuickResponse(@PathVariable Long id, @RequestBody SrRequest request) {

        BaseRestResponse<SrResponse> baseRestResponse = new BaseRestResponse<>();

        try {
            SrResponse response = serviceRequest.updatedata(id, request);

            baseRestResponse.setStatus(HttpStatus.OK.value());
            baseRestResponse.setSuccess(true);
            baseRestResponse.setMessage("Record updated successfully !!!!!");
            baseRestResponse.setData(response);
        } catch (Exception e) {
            baseRestResponse.setSuccess(false);
            baseRestResponse.setStatus(HttpStatus.NOT_FOUND.value());
            baseRestResponse.setError((e.getMessage()));

        }

        return baseRestResponse;

    }

    @PostMapping("/messageTemplate")
    public BaseRestResponse<MtResponse> quickResponse(@RequestBody MtRequest request) {

        BaseRestResponse<MtResponse> baseRestResponse = new BaseRestResponse<>();

        try {
            MtResponse resp = messageTemplate.postData(request);

            baseRestResponse.setStatus(HttpStatus.CREATED.value());
            baseRestResponse.setSuccess(true);
            baseRestResponse.setMessage("Record inserted successfully !!!!!");
            baseRestResponse.setData(resp);
        } catch (Exception exception) {
            baseRestResponse.setSuccess(false);
            baseRestResponse.setError(("Error while storing the data into data base !!!!!!!!!!!!!"));
        }

        return baseRestResponse;
    }

}
