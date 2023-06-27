package com.wigzo.care.chat.platform.whatsapp.repository;

import com.wigzo.care.chat.platform.whatsapp.model.WhatsAppContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WhatsAppContactRepo extends JpaRepository<WhatsAppContact, Long> {

}
