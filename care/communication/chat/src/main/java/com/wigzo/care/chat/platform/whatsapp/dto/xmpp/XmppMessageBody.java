package com.wigzo.care.chat.platform.whatsapp.dto.xmpp;

import com.wigzo.care.chat.platform.whatsapp.model.WhatsAppContact;
import lombok.Data;

@Data
public class XmppMessageBody {
    private XmppMessage message;
    private WhatsAppContact contact;
}
