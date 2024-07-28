package com.nadunkawishika.helloshoesapplicationserver.service;

import com.nadunkawishika.helloshoesapplicationserver.dto.OverViewDTO;
import com.nadunkawishika.helloshoesapplicationserver.dto.RefundDTO;
import com.nadunkawishika.helloshoesapplicationserver.dto.SaleDTO;
import com.nadunkawishika.helloshoesapplicationserver.dto.SaleDetailDTO;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;

public interface SaleService {
    ResponseEntity<String> addSale(SaleDTO sale) throws IOException;

    SaleDTO getSale(String id);

    List<SaleDetailDTO> getSaleItem(String id, String itemId);

    void refundSaleItem(RefundDTO dto);

    OverViewDTO getOverview();

    ResponseEntity<String> getAInvoice(String id) throws IOException;

    ResponseEntity<String> getLastInvoice() throws IOException;

    List<SaleDTO> getSales(Integer page, Integer limit);

    List<SaleDTO> searchSales(String search);
}
