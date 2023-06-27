package com.wigzo.care.identity.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Credentials {
    private String backend;
    private String apiKey;
    private String from;
    private String replyTo;
    private String organization;
    private Boolean copyTransactional;
}
