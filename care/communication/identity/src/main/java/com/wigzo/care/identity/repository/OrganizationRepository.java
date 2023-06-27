package com.wigzo.care.identity.repository;

import com.wigzo.care.identity.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    Organization findByDomain(String domain);
}
