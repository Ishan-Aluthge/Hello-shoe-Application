package com.nadunkawishika.helloshoesapplicationserver.service.impl;

import com.nadunkawishika.helloshoesapplicationserver.dto.CustomerDTO;
import com.nadunkawishika.helloshoesapplicationserver.entity.Customer;
import com.nadunkawishika.helloshoesapplicationserver.enums.Gender;
import com.nadunkawishika.helloshoesapplicationserver.exception.customExceptions.AlreadyExistException;
import com.nadunkawishika.helloshoesapplicationserver.exception.customExceptions.NotFoundException;
import com.nadunkawishika.helloshoesapplicationserver.repository.CustomerRepository;
import com.nadunkawishika.helloshoesapplicationserver.service.CustomerService;
import com.nadunkawishika.helloshoesapplicationserver.util.GenerateId;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {
    private final CustomerRepository customerRepository;
    private final Logger LOGGER = LoggerFactory.getLogger(CustomerServiceImpl.class);

    public List<CustomerDTO> getCustomers(int page, int limit) {
        LOGGER.info("Get All Customers Request");
        Pageable pageable = PageRequest.of(page, limit);
        return customerRepository.findAll(pageable).getContent().stream().map(customer -> CustomerDTO.builder().customerId(customer.getCustomerId()).doj(customer.getDoj()).gender(customer.getGender().toString()).name(customer.getName()).lane(customer.getLane()).city(customer.getCity()).state(customer.getState()).postalCode(customer.getPostalCode()).contact(customer.getContact()).email(customer.getEmail()).recentPurchaseDateAndTime(customer.getRecentPurchaseDateAndTime()).totalPoints(customer.getTotalPoints()).level(customer.getLevel()).build()).toList();
    }

    @Override
    public CustomerDTO getCustomer(String id) {
        return customerRepository.findByCustomerIdOrEmailOrContact(id, id, id).map(customer -> CustomerDTO.builder().customerId(customer.getCustomerId()).gender(customer.getGender().toString()).doj(customer.getDoj()).name(customer.getName()).lane(customer.getLane()).city(customer.getCity()).state(customer.getState()).postalCode(customer.getPostalCode()).contact(customer.getContact()).email(customer.getEmail()).recentPurchaseDateAndTime(customer.getRecentPurchaseDateAndTime()).totalPoints(customer.getTotalPoints()).level(customer.getLevel()).build()).orElseThrow(() -> new NotFoundException("Customer Not Found"));
    }

    @Override
    public List<CustomerDTO> filterCustomers(String pattern) {
        return customerRepository.filterCustomers(pattern).stream().map(customer -> CustomerDTO.builder().customerId(customer.getCustomerId()).doj(customer.getDoj()).gender(customer.getGender().toString()).name(customer.getName()).lane(customer.getLane()).city(customer.getCity()).state(customer.getState()).postalCode(customer.getPostalCode()).contact(customer.getContact()).email(customer.getEmail()).recentPurchaseDateAndTime(customer.getRecentPurchaseDateAndTime()).totalPoints(customer.getTotalPoints()).level(customer.getLevel()).build()).toList();
    }

    @Override
    public void updateCustomer(String id, CustomerDTO dto) {
        customerRepository.findById(id).ifPresentOrElse(customer -> {
            customer.setName(dto.getName().toLowerCase());
            customer.setLane(dto.getLane().toLowerCase());
            customer.setCity(dto.getCity().toLowerCase());
            customer.setState(dto.getState().toLowerCase());
            customer.setPostalCode(dto.getPostalCode());
            customer.setContact(dto.getContact());
            customer.setEmail(dto.getEmail().toLowerCase());
            if (dto.getGender().equalsIgnoreCase("FEMALE"))
                customer.setGender(Gender.FEMALE);

            if (dto.getGender().equalsIgnoreCase("MALE"))
                customer.setGender(Gender.MALE);

            if (dto.getGender().equalsIgnoreCase("RN"))
                customer.setGender(Gender.RATHER_NOT_SAY);

            customerRepository.save(customer);
        }, () -> {
            LOGGER.error("Customer Not Found: {}", id);
            throw new NotFoundException("Customer Not Found");
        });
    }

    @Override
    public void addCustomer(CustomerDTO dto) {
        Optional<Customer> one = customerRepository.findByContact(dto.getContact());
        if (one.isPresent()) {
            LOGGER.error("Customer Already Exists: {}", dto.getContact());
            throw new AlreadyExistException("Contact Already Exists");
        }
        if (customerRepository.findByEmail(dto.getEmail()).isPresent()) {
            LOGGER.error("Customer Already Exists: {}", dto.getEmail());
            throw new AlreadyExistException("Email Already Exists");
        }
        String id = GenerateId.getId("CUST").toLowerCase();
        Customer customer = Customer
                .builder()
                .customerId(id)
                .name(dto.getName().toLowerCase())
                .lane(dto.getLane().toLowerCase())
                .city(dto.getCity().toLowerCase())
                .state(dto.getState().toLowerCase())
                .postalCode(dto.getPostalCode().toLowerCase())
                .contact(dto.getContact())
                .email(dto.getEmail().toLowerCase())
                .level(dto.getLevel())
                .doj(LocalDate.now())
                .totalPoints(dto.getTotalPoints())
                .recentPurchaseDateAndTime(LocalDateTime.now())
                .build();

        if (dto.getGender().equalsIgnoreCase("FEMALE"))
            customer.setGender(Gender.FEMALE);

        if (dto.getGender().equalsIgnoreCase("MALE"))
            customer.setGender(Gender.MALE);

        if (dto.getGender().equalsIgnoreCase("RN"))
            customer.setGender(Gender.RATHER_NOT_SAY);
        LOGGER.info("Customer Added ID: {}", customer.getCustomerId());
        customerRepository.save(customer);
    }

    @Override
    public void deleteCustomer(String id) {
        customerRepository.deleteById(id);
    }
}
