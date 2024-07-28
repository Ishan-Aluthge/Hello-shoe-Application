package com.nadunkawishika.helloshoesapplicationserver.dto;

import com.nadunkawishika.helloshoesapplicationserver.enums.Level;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;
import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CustomerDTO {
    private String customerId;

    @NotEmpty(message = "Name is required")
    @Length(min = 3, max = 100, message = "Name must be between 3 and 30 characters")
    private String name;

    @NotEmpty(message = "Gender is required")
    @Length(min = 4, max = 6)
    private String gender;


    @NotEmpty(message = "Lane is required")
    @Length(min = 3, max = 30, message = "Lane must be between 3 and 30 characters")
    private String lane;

    @NotEmpty(message = "City is required")
    @Length(min = 3, max = 30, message = "City must be between 3 and 30 characters")
    private String city;

    @NotEmpty(message = "State is required")
    @Length(min = 3, max = 30, message = "State must be between 3 and 30 characters")
    private String state;

    @NotEmpty(message = "Postal code is required")
    @Length(min = 4, max = 10, message = "Postal code must be between 3 and 10 characters")
    private String postalCode;

    @NotEmpty(message = "Contact is required")
    @Length(min = 10, max = 12, message = "Contact must be between 10 and 12 characters")
    private String contact;

    @NotEmpty(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    private Level level;

    private LocalDate doj;

    private Double totalPoints;

    private LocalDateTime recentPurchaseDateAndTime;
}
