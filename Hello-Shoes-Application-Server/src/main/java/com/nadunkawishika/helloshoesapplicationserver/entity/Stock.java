package com.nadunkawishika.helloshoesapplicationserver.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Stock {
    @Id
    @Column(length = 20)
    private String stockId;

    @Column(nullable = false, length = 10)
    private Integer size40;

    @Column(nullable = false, length = 10)
    private Integer size41;

    @Column(nullable = false, length = 10)
    private Integer size42;

    @Column(nullable = false, length = 10)
    private Integer size43;

    @Column(nullable = false, length = 10)
    private Integer size44;

    @Column(nullable = false, length = 10)
    private Integer size45;

    @OneToOne(cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id")
    private Item item;
}
