package com.nadunkawishika.helloshoesapplicationserver.api;

import com.nadunkawishika.helloshoesapplicationserver.dto.CustomerDTO;
import com.nadunkawishika.helloshoesapplicationserver.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/customers")
@RequiredArgsConstructor
@EnableMethodSecurity(securedEnabled = true)
public class Customer {
    private final CustomerService customerService;
    private final Logger LOGGER = LoggerFactory.getLogger(Customer.class);


    @Secured({"ADMIN", "USER"})
    @GetMapping
    public List<CustomerDTO> getCustomers(@RequestParam(required = false) String pattern, @RequestParam(name = "page", defaultValue = "0") int page, @RequestParam(name = "limit", defaultValue = "20") int limit) {
        if (pattern != null) {
            LOGGER.info("Filter Customers Request: {}", pattern);
            return customerService.filterCustomers(pattern);
        } else {
            LOGGER.info("Get All Customers Request");
            return customerService.getCustomers(page, limit);
        }

    }

    @Secured({"ADMIN", "USER"})
    @GetMapping("/{id}")
    public CustomerDTO getCustomer(@PathVariable String id) {
        LOGGER.info("Get Customer Request: {}", id);
        return customerService.getCustomer(id);
    }

    //Authorize Methods
    @Secured("ADMIN")
    @PostMapping
    public void addCustomer(@Validated @RequestBody CustomerDTO customerDTO) {
        LOGGER.info("Add Customer Request: {}", customerDTO);
        customerService.addCustomer(customerDTO);
    }

    @Secured("ADMIN")
    @PutMapping("/{id}")
    public void updateCustomer(@PathVariable String id, @Validated @RequestBody CustomerDTO customerDTO) {
        LOGGER.info("Update Customer Request: {}", customerDTO);
        customerService.updateCustomer(id, customerDTO);
    }

    @Secured("ADMIN")
    @DeleteMapping("/{id}")
    public void deleteCustomer(@PathVariable String id) {
        LOGGER.info("Delete Customer Request: {}", id);
        customerService.deleteCustomer(id);
    }

}
