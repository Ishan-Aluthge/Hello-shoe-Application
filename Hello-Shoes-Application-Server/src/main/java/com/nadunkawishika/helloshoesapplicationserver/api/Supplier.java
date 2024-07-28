package com.nadunkawishika.helloshoesapplicationserver.api;

import com.nadunkawishika.helloshoesapplicationserver.dto.SupplierDTO;
import com.nadunkawishika.helloshoesapplicationserver.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/suppliers")
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class Supplier {
    private final SupplierService supplierService;
    private final Logger LOGGER = LoggerFactory.getLogger(Supplier.class);

    @Secured({"ADMIN","USER"})
    @GetMapping
    public List<SupplierDTO> getSuppliers(@RequestParam(required = false) String pattern, @RequestParam(name = "page", defaultValue = "0") int page, @RequestParam(name = "limit", defaultValue = "20") int limit){
        LOGGER.info("Get Suppliers Request");
        if (pattern == null) {
            LOGGER.info("Get All Suppliers Request");
            return supplierService.getSuppliers(page,limit);
        } else {
            LOGGER.info("Filter Suppliers Request: {}", pattern);
            return supplierService.filterSuppliers(pattern);
        }
    }

    @Secured({"ADMIN","USER"})
    @GetMapping("/{id}")
    public SupplierDTO getSupplier(@PathVariable String id) {
        LOGGER.info("Get Supplier Request: {}", id);
        return supplierService.getSupplier(id);
    }

    //Authorize Methods
    @PostMapping
    @Secured("ADMIN")
    public void addSupplier(@Validated @RequestBody SupplierDTO supplierDTO) {
        LOGGER.info("Add Supplier Request: {}", supplierDTO);
        supplierService.addSupplier(supplierDTO);
    }

    @PutMapping("/{id}")
    @Secured("ADMIN")
    public void addSupplier(@PathVariable String id, @RequestBody SupplierDTO supplierDTO) {
        LOGGER.info("Update Supplier Request: {}", supplierDTO);
        supplierService.updateSupplier(id, supplierDTO);
    }

    @Secured("ADMIN")
    @DeleteMapping("/{id}")
    public void addSupplier(@PathVariable String id) {
        LOGGER.info("Delete Supplier Request: {}", id);
        supplierService.deleteSupplier(id);
    }
}
