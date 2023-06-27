package com.wigzo.care.chat.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageRequest {
    private String userPhone;
    private String messageId;
    private String platform;
    private String direction;
    private String message;
    private Long agentId;
    private String note;
    private UUID replyTo;
    private List<UUID> mentions;
    public String orgToken;
    public String messageType;
    public String label;
    public BigDecimal cost;
    private String status;
    public String sourceUuid;
    public String templateButtons;
    public String headers;



}
