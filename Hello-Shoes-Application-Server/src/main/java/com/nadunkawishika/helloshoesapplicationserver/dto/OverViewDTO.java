package com.nadunkawishika.helloshoesapplicationserver.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class OverViewDTO {
    private Double totalSales;
    private Double totalProfit;
    private Integer totalBills;
}
