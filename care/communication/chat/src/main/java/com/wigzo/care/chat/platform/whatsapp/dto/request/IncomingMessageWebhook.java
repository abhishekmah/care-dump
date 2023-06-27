package com.wigzo.care.chat.platform.whatsapp.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class IncomingMessageWebhook extends BaseDto {

    @NotNull(message = "orgToken Should not be blank")
    private String orgToken;

    private String provider;

    @NotNull(message = "userPhone Should not be blank")
    private String userPhone;

    private String userName;

    @NotNull(message = "businessPhone Should not be blank")
    private String businessPhone;

    @NotNull(message = "messageId Should not be blank")
    private String messageId;

    private String messageType;

    private String time;

    @NotNull(message = "message should not be blank")
    private MessageText message;

    private JsonNode error;

    private BigDecimal cost;
}
