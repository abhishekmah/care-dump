package com.wigzo.care.chat.platform.whatsapp.dto.beam;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
@AllArgsConstructor
@NoArgsConstructor
public class BeamMessageRequest {
    private String orgToken;
    private String messageType;
    private String destination;
    private Media media;
    private String callBackUrl;
    private String businessPhone;
    private String text;
}
