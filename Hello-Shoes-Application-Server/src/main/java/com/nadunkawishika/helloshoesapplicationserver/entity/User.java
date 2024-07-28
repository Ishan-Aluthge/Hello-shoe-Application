package com.nadunkawishika.helloshoesapplicationserver.entity;

import com.nadunkawishika.helloshoesapplicationserver.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
@Entity
@Table
public class User implements UserDetails {
    @Id
    private String id;

    @Column(nullable = false, length = 50, unique = true)

    @JoinColumn(name = "email")
    private String email;

    @Column(nullable = false, length = 384)
    private String password;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @JoinColumn(referencedColumnName = "role")
    private Role role;

    @OneToOne(cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH})
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(this.role.name()));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
