package com.wigzo.care.identity.repository;

import com.wigzo.care.identity.entity.Agent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgentRepo extends JpaRepository<Agent, Long> {
    Agent findByEmail(String email);

}
