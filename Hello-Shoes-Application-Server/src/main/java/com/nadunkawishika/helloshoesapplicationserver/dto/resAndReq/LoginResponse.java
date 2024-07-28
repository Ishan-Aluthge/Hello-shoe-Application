package com.nadunkawishika.helloshoesapplicationserver.dto.resAndReq;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class LoginResponse {
    private String token;
    private Collection<? extends GrantedAuthority> role;
}
