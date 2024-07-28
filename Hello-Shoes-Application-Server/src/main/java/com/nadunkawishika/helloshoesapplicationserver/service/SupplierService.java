package com.nadunkawishika.helloshoesapplicationserver.service;

import com.nadunkawishika.helloshoesapplicationserver.dto.SupplierDTO;

import java.util.List;

public interface SupplierService {
    List<SupplierDTO> getSuppliers(int page, int limit);
    SupplierDTO getSupplier(String id);
    List<SupplierDTO> filterSuppliers(String pattern);
    void updateSupplier(String id, SupplierDTO dto);
    void addSupplier(SupplierDTO dto);
    void deleteSupplier(String id);
}
