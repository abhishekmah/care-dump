package com.wigzo.care.chat.dto.enums;

public enum MessagePlatformEnum {
    WHATSAPP("whatsapp"),
    FACEBOOK("facebook");

    final String name;

    MessagePlatformEnum(String name) {
        this.name = name;
    }

    ;
}
