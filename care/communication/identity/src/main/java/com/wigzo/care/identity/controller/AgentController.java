package com.wigzo.care.identity.controller;

import com.wigzo.care.identity.dto.request.RegistrationRequest;
import com.wigzo.care.identity.dto.request.ResetPasswordRequest;
import com.wigzo.care.identity.dto.request.UserLoginRequest;
import com.wigzo.care.identity.service.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotBlank;

@RestController
@RequestMapping("/api/v1/agent")
public class AgentController {

    @Autowired
    private AgentService agentService;


    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@RequestBody RegistrationRequest request) {
        return agentService.registerUser(request);
    }

    @PostMapping(value = "/user-login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest request) {
        return agentService.loginUser(request);
    }


    @PostMapping("/forget-password")
    public ResponseEntity<?> forgetPassword(@RequestParam @NotBlank String email) {
        return agentService.processForgetPassword(email);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        return agentService.processResetPassword(request);
    }

    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestParam @NotBlank String token) {
        return agentService.validateToken(token);
    }

}
