package com.wigzo.care.chat.platform.whatsapp.dto.beam;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BeamMessageResponse {
    private Integer status;
    private String orgToken;
    private String userPhone;
    private String businessPhone;
    private String messageId;
    private String messageType;
    private String provider;
}
