package com.nadunkawishika.helloshoesapplicationserver.dto.resAndReq;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class LoginRequest {
    @NotNull(message = "Email is required")
    @NotEmpty(message = "Email is required")
    @Email
    private String email;

    @NotNull(message = "Password is required")
    @NotEmpty(message = "Password is required")
    private String password;
}
