package com.wigzo.care.identity.service;

import com.wigzo.care.identity.dto.request.RegistrationRequest;
import com.wigzo.care.identity.dto.request.ResetPasswordRequest;
import com.wigzo.care.identity.dto.request.UserLoginRequest;
import org.springframework.http.ResponseEntity;

public interface AgentService {
    ResponseEntity<?> registerUser(RegistrationRequest request);

    ResponseEntity<?> loginUser(UserLoginRequest request);

    ResponseEntity<?> processForgetPassword(String email);

    ResponseEntity<?> processResetPassword(ResetPasswordRequest request);

    ResponseEntity<?> validateToken(String token);
}
