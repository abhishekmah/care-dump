package com.wigzo.care.chat.platform.whatsapp.dto.xmpp;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class XmppMessage {
    private String messageId;
    private String platform;
    private String direction;
    private String status;
    private Long agentId;
    private String note;
    private UUID replyTo;
    public String orgToken;
    private String userPhone;
    public String messageType;
    public String label;
    public String message;
    private LocalDateTime time;
}
