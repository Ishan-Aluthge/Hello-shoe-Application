package com.nadunkawishika.helloshoesapplicationserver.service;

import com.nadunkawishika.helloshoesapplicationserver.dto.resAndReq.LoginRequest;
import com.nadunkawishika.helloshoesapplicationserver.dto.resAndReq.LoginResponse;
import com.nadunkawishika.helloshoesapplicationserver.dto.resAndReq.RegisterRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    void register(RegisterRequest registerRequest);
    void updatePassword(RegisterRequest registerRequest);
    LoginResponse authenticate(LoginRequest loginRequest);
    void forgotPassword(String email);
}
