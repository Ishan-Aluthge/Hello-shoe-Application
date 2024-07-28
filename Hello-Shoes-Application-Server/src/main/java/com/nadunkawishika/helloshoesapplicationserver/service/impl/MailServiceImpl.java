package com.nadunkawishika.helloshoesapplicationserver.service.impl;

import com.nadunkawishika.helloshoesapplicationserver.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender javaMailSender;
    private final Random random = new Random();
    private String otp = null;

    @Override
    public void sendOTP(String email) {
        otp = String.valueOf(this.random.nextInt(9999));
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("kawishikam@gmail.com");
        message.setTo(email);
        message.setSubject("Verify Your Identity: One-Time Password for Hello Shoes PVT LTD.");
        otp = String.format("%04d", Integer.parseInt(otp));
        message.setText(getOTPMessage(otp));
        javaMailSender.send(message);
    }

    @Override
    public ResponseEntity<Object> verifyOTP(String otp) {
        if (otp.equals(this.otp)) {
            return ResponseEntity.ok("verified");
        } else {
            return ResponseEntity.ok("not-verified");
        }
    }

    @Override
    public String getOTPMessage(String otp) {
        return "We have sent you a one-time password (OTP) to verify your identity.\n\n" +
                "A one-time password (OTP) is a temporary code that is used for security purposes. It is valid for a short period of time and can only be used once.\n\n" +
                "Please use the following OTP to complete your request: " +
                otp +
                "\n\n" +
                "This OTP is valid for a limited time. For your security, please do not share this OTP with anyone.";
    }
}
