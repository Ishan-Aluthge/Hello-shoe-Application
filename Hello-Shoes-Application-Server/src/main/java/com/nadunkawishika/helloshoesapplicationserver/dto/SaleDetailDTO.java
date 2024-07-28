package com.nadunkawishika.helloshoesapplicationserver.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SaleDetailDTO {
   private Integer id;
   @NotNull(message = "Item ID is required")
   @Length(min = 8, max = 20, message = "Item ID must be between 8 and 20 characters")
   private String itemId;
   @NotNull(message = "Description is required")
   @Length(min = 5, max = 50, message = "Description must be between 5 and 50 characters")
   private String description;
   @NotNull(message = "Size is required")
   @Length(min = 1, max = 10, message = "Size must be between 1 and 10 characters")
   private String size;
   @NotNull(message = "Quantity is required")
   @Length(min = 1, max = 10, message = "Quantity must be between 1 and 10 characters")
   private Integer quantity;
   @NotNull(message = "Price is required")
   @Length(min = 1, max = 10, message = "Price must be between 1 and 10 characters")
   private Double price;
   @NotNull(message = "Total is required")
   private Double total;
}
