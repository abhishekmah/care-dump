package com.wigzo.care.identity.entity;

import com.wigzo.care.identity.enums.ERole;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Data
@Entity
@Table(name = "roles")
public class Role {
    @Id
    @Column(name = "role_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "code")
    private String code;
    @Enumerated(EnumType.STRING)
    @Column(name = "name")
    private ERole name;
    @Column(name = "is_active")
    private Boolean isActive;
}
