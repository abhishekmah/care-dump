package com.wigzo.care.identity.dto.request;

import com.wigzo.care.identity.constants.Constants;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class RegistrationRequest {


    @NotBlank(message = "Email is required!")
    @Email(message = Constants.INVALID_EMAIL, flags = {Pattern.Flag.CASE_INSENSITIVE})
    private String email;
    @NotBlank(message = "phone is required")
    private String phone;
    private String name;
    @NotBlank(message = "Password is required!")
    private String password;
    private String orgName;
    private String orgDomain;
}
