package com.wigzo.care.identity.util;

import com.wigzo.care.identity.dto.request.RegistrationRequest;
import com.wigzo.care.identity.dto.response.BaseResponse;
import com.wigzo.care.identity.dto.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class Helper {

    @Autowired
    private ResourceLoader resourceLoader;

    public BaseResponse generateRegistrationResponse(RegistrationRequest request) {
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatus(201);
        baseResponse.setSuccess(true);
        baseResponse.setMessage("User Registered Successfully");
        return baseResponse;
    }

    public BaseResponse generateBaseResponse(LoginResponse response) {
        BaseResponse baseResponse = new BaseResponse();
        baseResponse.setStatus(200);
        baseResponse.setSuccess(true);
        baseResponse.setData(response);
        return baseResponse;
    }

    public String getHtmlContent() {
        Resource resource = resourceLoader.getResource("classpath:/templates/my-html-file.html");
        InputStream inputStream = null;
        String htmlContent = null;
        try {
            inputStream = resource.getInputStream();
            byte[] bytes = inputStream.readAllBytes();
            htmlContent = new String(bytes, StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new RuntimeException(e); // TODO: use custom exception
        }

        return htmlContent;
    }

    public void getTempFileDirPath(String data) {
        Path tempDir = Paths.get(System.getProperty("java.io.tmpdir"));
        Path htmlDir = tempDir.resolve("temp");

        if (!Files.exists(htmlDir)) {
            try {
                Files.createDirectories(htmlDir);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        Path htmlFile = htmlDir.resolve("example.html");
        try {
            Files.createFile(htmlFile);
        } catch (IOException e) {
            e.printStackTrace();
        }


        try {
            Files.write(htmlFile, data.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


}
