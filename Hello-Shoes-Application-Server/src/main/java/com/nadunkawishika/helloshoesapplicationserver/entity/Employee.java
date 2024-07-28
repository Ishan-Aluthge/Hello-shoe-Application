package com.nadunkawishika.helloshoesapplicationserver.entity;

import com.nadunkawishika.helloshoesapplicationserver.enums.CivilStatus;
import com.nadunkawishika.helloshoesapplicationserver.enums.Gender;
import com.nadunkawishika.helloshoesapplicationserver.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Employee {
    @Id
    @Column(length = 20)
    private String employeeId;

    @Column(nullable = false, length = 50)
    private String name;

    @Enumerated(EnumType.STRING)
    private CivilStatus status;

    @Column(columnDefinition = "LONGTEXT")
    private String image;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(nullable = false, length = 100)
    private String designation;

    @Column(nullable = false, length = 30)
    private String attachBranch;

    @Enumerated(EnumType.STRING)
    private Role role;

    private LocalDate dob;
    private LocalDate doj;

    @Column(nullable = false, length = 12)
    private String contact;

    @Column(length = 50, unique = true)
    private String email;

    @Column(nullable = false, length = 30)
    private String lane;

    @Column(nullable = false, length = 30)
    private String city;

    @Column(nullable = false, length = 30)
    private String state;

    @Column(nullable = false, length = 10)
    private String postalCode;

    @Column(nullable = false, length = 100)
    private String guardianName;

    @Column(nullable = false, length = 12)
    private String guardianContact;

}
