package com.wigzo.care.chat.platform.whatsapp.dto.request;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.wigzo.care.chat.entity.Message;
import com.wigzo.care.chat.platform.whatsapp.model.WhatsAppContact;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class SendMessageResponse {
    private Message message;
    private WhatsAppContact contact;
}
