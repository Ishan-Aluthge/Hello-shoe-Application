package com.nadunkawishika.helloshoesapplicationserver.dto.resAndReq;

import com.nadunkawishika.helloshoesapplicationserver.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class RegisterRequest {
    @NotEmpty(message = "Email is required")
    @Email(message = "Email is invalid")
    private String email;

    @NotEmpty(message = "Password is required")
    @Length(min = 8, message = "Password must be at least 6 characters and maximum 20characters", max = 20)
    private String password;
}
