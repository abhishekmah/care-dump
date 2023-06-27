package com.wigzo.care.identity.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.HashSet;
import java.util.Set;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "agents",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "email")
        })
public class Agent extends Auditable {
    @Id
    @Column(name = "agent_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String token;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "name")
    private String name;
    @Column(name = "email_verified")
    private Boolean emailVerified = true;
    @Column(name = "phone_verified")
    private Boolean phoneVerified = true;
    @Column(name = "password")
    private String password;
    @Column(name = "xmpp_user_name")
    private String xmppUserName;
    @Column(name = "xmpp_password")
    private String xmppPassword;
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "agents_roles",
            joinColumns = @JoinColumn(name = "agent_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    @Column(name = "is_active")
    private Boolean isActive = true;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinTable(name = "agent_organization",
            joinColumns = @JoinColumn(name = "agent_id"),
            inverseJoinColumns = @JoinColumn(name = "organization_id"))
    private Set<Organization> organization;

    //ToDO     profile_photo_id : FK (media)

}
