package com.nadunkawishika.helloshoesapplicationserver.service;

import org.springframework.http.ResponseEntity;

public interface MailService {
    void sendOTP(String email);

    ResponseEntity<Object> verifyOTP(String otp);

    String getOTPMessage(String otp);
}
