package com.nadunkawishika.helloshoesapplicationserver.dto;

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
public class SupplierDTO {
    private String supplierId;

    @NotEmpty(message = "Name Required")
    @Length(min = 3, max = 100, message = "Name too long or too short")
    private String name;

    @NotEmpty(message = "Lane is Required")
    @Length(min = 3, max = 30)
    private String lane;

    @Length(min = 3, max = 30, message = "City too long or too short")
    @NotEmpty(message = "City is Required")
    private String city;

    @Length(min = 3, max = 20, message = "State too long or too short")
    @NotEmpty(message = "State is Required")
    private String state;

    @Length(min = 3, max = 10, message = "Postal Code too long or too short")
    @NotEmpty(message = "Postal Code is Required")
    private String postalCode;

    @Length(min = 3, max = 20)
    @NotEmpty(message = "Country is Required")
    private String country;

    @NotEmpty(message = "Contact Number Required")
    @Length(min = 10, max = 12, message = "Not Validate Number")
    private String contactNo1;

    @NotEmpty(message = "Contact Number Required")
    @Length(min = 10, max = 12, message = "Not Validate Number")
    private String contactNo2;

    @NotEmpty(message = "Email Required")
    @Email(message = "Invalid Email")
    private String email;
}
