package com.nadunkawishika.helloshoesapplicationserver.dto;

import com.nadunkawishika.helloshoesapplicationserver.entity.Sale;
import com.nadunkawishika.helloshoesapplicationserver.entity.Stock;
import com.nadunkawishika.helloshoesapplicationserver.entity.Supplier;
import com.nadunkawishika.helloshoesapplicationserver.enums.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ItemDTO {

    private String itemId;

    @NotEmpty(message = "Description cannot be empty")
    @Length(min = 3, max = 50, message = "Description must be between 3 and 50 characters")
    private String description;

    private String image;
    private Double expectedProfit;
    private Double profitMargin;
    private int quantity;
    private String supplierName;
    private String category;

    @NotEmpty(message = "Category cannot be empty")
    @Length(min = 3, max = 50, message = "Category must be between 3 and 50 characters")
    private String gender;

    @NotEmpty(message = "Occasion cannot be empty")
    @Length(min = 3, max = 50, message = "Occasion must be between 3 and 50 characters")
    private String occasion;

    @NotEmpty(message = "Varieties cannot be empty")
    @Length(min = 3, max = 50, message = "Varieties must be between 3 and 50 characters")
    private String verities;

    @NotEmpty(message = "Buying Price cannot be empty")
    @Length(min = 3, max = 50, message = "Buying Price must be between 3 and 50 characters")
    private Double buyingPrice;

    @NotEmpty(message = "Selling Price cannot be empty")
    @Length(min = 3, max = 50, message = "Selling Price must be between 3 and 50 characters")
    private Double sellingPrice;

    @NotEmpty(message = "Supplier name cannot be empty")
    private String supplierId;

}
