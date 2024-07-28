package com.nadunkawishika.helloshoesapplicationserver.entity;

import com.nadunkawishika.helloshoesapplicationserver.enums.Gender;
import com.nadunkawishika.helloshoesapplicationserver.enums.Level;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Customer {
    @Id
    @Column(length = 20)
    private String customerId;

    @Column(nullable = false, length = 100)
    private String name;
    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;
    @Column(nullable = false, length = 30)
    private String lane;
    @Column(length = 30, nullable = false)
    private String city;
    @Column(length = 30, nullable = false)
    private String state;
    @Column(length = 10, nullable = false)
    private String postalCode;
    @Column(unique = true, nullable = false, length = 12)
    private String contact;
    @Column(unique = true, nullable = false, length = 50)
    private String email;
    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Level level;
    @Column(nullable = false)
    private LocalDate doj;
    @Column(nullable = false)
    private Double totalPoints;
    @Column(nullable = false)
    private LocalDateTime recentPurchaseDateAndTime;

}
