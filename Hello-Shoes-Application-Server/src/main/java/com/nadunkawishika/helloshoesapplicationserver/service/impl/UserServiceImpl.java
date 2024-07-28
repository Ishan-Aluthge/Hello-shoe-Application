package com.nadunkawishika.helloshoesapplicationserver.service.impl;

import com.nadunkawishika.helloshoesapplicationserver.dto.resAndReq.LoginRequest;
import com.nadunkawishika.helloshoesapplicationserver.dto.resAndReq.LoginResponse;
import com.nadunkawishika.helloshoesapplicationserver.dto.resAndReq.RegisterRequest;
import com.nadunkawishika.helloshoesapplicationserver.entity.Employee;
import com.nadunkawishika.helloshoesapplicationserver.entity.User;
import com.nadunkawishika.helloshoesapplicationserver.enums.Role;
import com.nadunkawishika.helloshoesapplicationserver.exception.customExceptions.AlreadyExistException;
import com.nadunkawishika.helloshoesapplicationserver.repository.EmployeeRepository;
import com.nadunkawishika.helloshoesapplicationserver.repository.UserRepository;
import com.nadunkawishika.helloshoesapplicationserver.service.JWTService;
import com.nadunkawishika.helloshoesapplicationserver.service.MailService;
import com.nadunkawishika.helloshoesapplicationserver.service.UserService;
import com.nadunkawishika.helloshoesapplicationserver.util.GenerateId;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;
    private final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;
    private final EmployeeRepository employeeRepository;

    @Override
    public void register(RegisterRequest registerRequest) {
        Optional<User> byEmail = userRepository.findByEmail(registerRequest.getEmail().toLowerCase());
        if (byEmail.isPresent()) {
            LOGGER.error("Email already exists");
            throw new AlreadyExistException("Email already exists");
        }
        Employee employee = employeeRepository.getEmployeeByEmail(registerRequest.getEmail().toLowerCase()).orElseThrow(() -> {
            LOGGER.error("Email does not exist");
            return new AlreadyExistException("Email does not exist");
        });

        User user = User
                .builder()
                .email(registerRequest.getEmail().toLowerCase())
                .id(GenerateId.getId("USR").toLowerCase())
                .role(Role.USER)
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .build();

        user.setRole(employee.getRole());
        user.setEmployee(employee);

        employeeRepository.save(employee);
        userRepository.save(user);
        LOGGER.info("User Registered");
    }

    @Override
    public void updatePassword(RegisterRequest registerRequest) {
        Optional<User> byEmail = userRepository.findByEmail(registerRequest.getEmail());
        if (byEmail.isPresent()) {
            User user = byEmail.get();
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            userRepository.save(user);
            LOGGER.info("Password Updated ID: {}", user.getId());
        } else {
            LOGGER.error("Email does not exist");
            throw new AlreadyExistException("Email does not exist");
        }
    }

    @Override
    public LoginResponse authenticate(LoginRequest loginRequest) {
        try {
            Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail().toLowerCase(), loginRequest.getPassword()));
            if (authenticate.isAuthenticated()) {
                String token = jwtService.generateToken(loginRequest.getEmail().toLowerCase());
                LOGGER.info("User Authenticated: {}", loginRequest.getEmail().toLowerCase());
                LOGGER.info("Token: {}", token);
                return LoginResponse.builder().token(token).role(authenticate.getAuthorities()).build();
            } else {
                LOGGER.error("Invalid Credentials");
                throw new BadCredentialsException("Invalid Credentials");
            }
        } catch (Exception e) {
            LOGGER.error(e.getLocalizedMessage().toUpperCase());
            throw new BadCredentialsException("Invalid Credentials");
        }
    }

    @Override
    public void forgotPassword(String email) {
        Optional<User> byEmail = userRepository.findByEmail(email);

        if (byEmail.isPresent()) {
            LOGGER.info("Sending OTP to: {}", email);
            mailService.sendOTP(email);
        } else {
            LOGGER.error("User does not exist");
            throw new UsernameNotFoundException("User does not exist");
        }
    }

}
