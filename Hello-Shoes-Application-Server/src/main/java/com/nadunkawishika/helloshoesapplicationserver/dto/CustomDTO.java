package com.nadunkawishika.helloshoesapplicationserver.dto;

import com.nadunkawishika.helloshoesapplicationserver.entity.Item;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CustomDTO {

    private String stockId;
    private String supplierId;
    private String supplierName;
    private String itemId;
    private String description;

    @NotNull(message = "Size 40 cannot be empty")
    private Integer size40;

    @NotNull(message = "Size 41 cannot be empty")
    private Integer size41;

    @NotNull(message = "Size 42 cannot be empty")
    private Integer size42;

    @NotNull(message = "Size 43 cannot be empty")
    private Integer size43;

    @NotNull(message = "Size 44 cannot be empty")
    private Integer size44;

    @NotNull(message = "Size 45 cannot be empty")
    private Integer size45;

    private Item item;
}
