package com.nadunkawishika.helloshoesapplicationserver.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;
import java.util.function.Function;

public interface JWTService {
    String generateToken(String userName);
    String extractUsername(String token);
    Date extractExpiration(String token);
    <T>T extractClaim(String token, Function<Claims,T> claimsResolver);
    boolean validateToken(String token, UserDetails userDetails);
}
