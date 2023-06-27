package com.wigzo.care.chat.platform.whatsapp.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "whatsapp_contacts")
public class WhatsAppContact {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String orgToken;
    private String businessPhone;
    private String userPhone;
    @JsonFormat(pattern = "yyyy-dd-MM'T'HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime lastUpdatedAt;
    @JsonFormat(pattern = "yyyy-dd-MM'T'HH:mm:ss.SSS", shape = JsonFormat.Shape.STRING)
    private LocalDateTime createdAt;
    private String userName;
    private String remarks;
    private String lastMessage;
    private String userEmail;
    private String labelName;
    private String labelColor;
    private String source;
    private long unreadMessageCount;
//    private long readMessageCount;
//    private long sentMessageCount;
//    private long deliveredMessageCount;
//    private String failedMessageReason;
}
