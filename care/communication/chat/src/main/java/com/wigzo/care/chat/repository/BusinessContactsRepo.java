package com.wigzo.care.chat.repository;

import com.wigzo.care.chat.entity.BusinessContact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BusinessContactsRepo extends JpaRepository<BusinessContact, Long> {

    BusinessContact findByBusinessPhone(String businessPhone);
}
