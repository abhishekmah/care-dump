package com.wigzo.care.chat.platform.whatsapp.dao;

import com.wigzo.care.chat.entity.BusinessContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessContactRepository extends JpaRepository<BusinessContact, Long> {
}
