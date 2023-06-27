package com.wigzo.care.identity.repository;

import com.wigzo.care.identity.entity.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SrRepository extends JpaRepository<ServiceRequest, Long> {
}
