package com.wigzo.care.identity.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResetPasswordMailBody {
    private List<Recipient> recipients;
    private String subject;
    private String body;
    private Credentials credentials;
    private Campaign campaign;

}
