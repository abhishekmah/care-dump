package com.wigzo.care.chat.platform.whatsapp.dao;

import com.wigzo.care.chat.platform.whatsapp.model.WhatsAppContact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends JpaRepository<WhatsAppContact, Long> {

    WhatsAppContact findByOrgTokenAndUserPhone(String orgToken, String userPhone);

    Page<WhatsAppContact> findByOrgToken(String orgToken, Pageable page);

    Page<WhatsAppContact>
    findByOrgTokenAndUserNameContainingIgnoreCase(String orgToken, String userName, Pageable page);

    Page<WhatsAppContact>
    findByOrgTokenAndUserPhoneContainingIgnoreCase(String orgToken, String userPhone, Pageable page);


}
