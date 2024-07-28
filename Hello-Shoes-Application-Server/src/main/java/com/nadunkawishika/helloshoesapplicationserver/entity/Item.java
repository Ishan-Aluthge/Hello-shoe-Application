package com.nadunkawishika.helloshoesapplicationserver.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Entity
public class Item {
    @Id
    @Column(length = 20)
    private String itemId;

    @Column(nullable = false, length = 50)
    private String description;

    @Column(columnDefinition = "LONGTEXT")
    private String image;

    @Column(nullable = false)
    private int quantity;
    @Column(nullable = false)
    private String category;
    @Column(nullable = false, length = 50)
    private Double buyingPrice;
    @Column(nullable = false, length = 50)
    private Double sellingPrice;
    @Column(nullable = false, length = 50)
    private Double expectedProfit;
    @Column(nullable = false, length = 50)
    private Double profitMargin;
    @Column(nullable = false, length = 5,columnDefinition = "boolean default true")
    private Boolean availability;

    @JoinColumn(referencedColumnName = "supplier_name")
    private String supplierName;

    @ManyToOne(cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JoinColumn(name = "supplier_Id")
    private Supplier supplier;

    @OneToOne(cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JoinColumn(name = "stock_id")
    private Stock stock;

    @OneToMany(cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.MERGE,CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JoinColumn(name = "item_id")
    private List<SaleDetails> saleDetailsList;

}
