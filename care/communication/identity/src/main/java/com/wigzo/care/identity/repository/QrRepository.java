package com.wigzo.care.identity.repository;

import com.wigzo.care.identity.entity.QuickResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QrRepository extends JpaRepository<QuickResponse, Long> {


}
