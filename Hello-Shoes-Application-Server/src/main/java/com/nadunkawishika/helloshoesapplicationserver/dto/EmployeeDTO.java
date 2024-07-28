package com.nadunkawishika.helloshoesapplicationserver.dto;

import com.nadunkawishika.helloshoesapplicationserver.enums.CivilStatus;
import com.nadunkawishika.helloshoesapplicationserver.enums.Gender;
import com.nadunkawishika.helloshoesapplicationserver.enums.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EmployeeDTO {
    private String employeeId;

    @NotEmpty(message = "Name is required")
    @Length(min = 3, max = 100, message = "Name must be between 3 and 50 characters")
    private String name;

    @Enumerated(EnumType.STRING)
    private CivilStatus status;

    @NotEmpty(message = "Image is required")
    private String image;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @NotEmpty(message = "Designation is required")
    @Length(min = 3, max = 50, message = "Designation must be between 3 and 50 characters")
    private String designation;

    @NotEmpty(message = "Attachment Branch is required")
    @Length(min = 3, max = 30, message = "Attachment Branch must be between 3 and 30 characters")
    private String attachBranch;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDate dob;
    private LocalDate doj;

    @NotEmpty(message = "Contact is required")
    @Length(min = 10, max = 12, message = "Contact must be between 10 and 12 characters")
    private String contact;

    @NotEmpty(message = "Email is required")
    @Email(message = "Email should be valid")
    private String email;

    @NotEmpty(message = "Lane is required")
    @Length(min = 3, max = 30, message = "Lane must be between 3 and 30 characters")
    private String lane;

    @NotEmpty(message = "City is required")
    @Length(min = 3, max = 30, message = "City must be between 3 and 30 characters")
    private String city;

    @NotEmpty(message = "State is required")
    @Length(min = 3, max = 30, message = "State must be between 3 and 30 characters")
    private String state;

    @NotEmpty(message = "Postal Code is required")
    @Length(min = 3, max = 10, message = "Postal Code must be between 3 and 10 characters")
    private String postalCode;

    @NotEmpty(message = "Guarding Name is required")
    @Length(min = 3, max = 100, message = "Guarding Name must be between 3 and 50 characters")
    private String guardianName;

    @NotEmpty(message = "Guarding Contact is required")
    @Length(min = 10, max = 12, message = "Guarding Contact must be between 10 and 12 characters")
    private String guardianContact;
}
