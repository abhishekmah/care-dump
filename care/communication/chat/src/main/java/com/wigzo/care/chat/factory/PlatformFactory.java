package com.wigzo.care.chat.factory;

import com.wigzo.care.chat.dto.enums.MessagePlatformEnum;
import com.wigzo.care.chat.platform.whatsapp.service.impl.WhatsappServiceImpl;
import com.wigzo.care.chat.service.PlatformService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PlatformFactory {

    @Autowired
    WhatsappServiceImpl whatsappServiceImpl;


    public PlatformService getService(String platformName) {
        switch (MessagePlatformEnum.valueOf(platformName.toUpperCase())) {
            case WHATSAPP:
                return whatsappServiceImpl;
            case FACEBOOK:
                return null;
            default:
                return null;
        }
    }
}
