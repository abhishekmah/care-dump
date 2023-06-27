
package com.wigzo.care.identity.service.impl;


import com.wigzo.care.identity.entity.Agent;
import com.wigzo.care.identity.model.CustomAgent;
import com.wigzo.care.identity.repository.AgentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AgentRepo agentRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Agent agent = agentRepo.findByEmail(username);

        if (agent == null) {
            throw new UsernameNotFoundException("Could not find user");
        }

        return new CustomAgent(agent);
    }
}