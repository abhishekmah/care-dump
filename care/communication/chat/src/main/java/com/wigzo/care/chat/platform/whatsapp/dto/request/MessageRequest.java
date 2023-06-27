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
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageRequest {
    private String message;
    private String toPhone;
    private String orgToken;
    private String type;
    private String channel;
    private String caption;
    private String mediaUrl;
    private ContactParams contactParams;
}
