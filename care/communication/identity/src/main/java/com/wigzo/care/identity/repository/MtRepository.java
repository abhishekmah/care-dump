package com.wigzo.care.identity.repository;

import com.wigzo.care.identity.entity.MessageTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MtRepository extends JpaRepository<MessageTemplate, Long> {
}
