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
public class RefundDTO {
    @NotNull(message = "Order ID is required")
    @Length(min = 8, max = 15, message = "Order ID must be between 8 and 15 characters")
    private String orderId;
    @NotNull(message = "Item ID is required")
    @Length(min = 8, max = 20, message = "Item ID must be between 8 and 20 characters")
    private String ItemId;
    @NotNull(message = "Description is required")
    @Length(max = 2, message = "Description must be 2 characters")
    private String size;
    @NotNull(message = "Quantity is required")
    private Integer qty;
}
