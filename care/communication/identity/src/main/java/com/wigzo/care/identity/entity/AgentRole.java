package com.wigzo.care.identity.entity;


import lombok.Data;

import javax.persistence.Id;

@Data
public class AgentRole {

    @Id
    private Long id;
    private String agentId;
    private String orgId;
    private String roleId;

}
