package com.wigzo.care.chat.platform.whatsapp.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
//@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ContactRequest {
    private String orgToken;
    private String businessPhone;
    private String userPhone;
    private String userName;
    private String remarks;
    private String userEmail;
    private String source;
    private String sourceUuid;
}
