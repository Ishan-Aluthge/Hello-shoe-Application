package com.nadunkawishika.helloshoesapplicationserver.repository;

import com.nadunkawishika.helloshoesapplicationserver.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, String> {

    @Query(value = "SELECT * FROM employee  WHERE (name LIKE %?1% OR email LIKE %?1% OR contact LIKE %?1% OR lane LIKE %?1% OR city LIKE %?1% OR designation LIKE %?1% OR status LIKE %?1% OR role LIKE %?1% OR state LIKE %?1% OR dob LIKE %?1% OR doj LIKE %?1% OR postal_code LIKE %?1% OR attach_branch LIKE %?1 OR gender LIKE %?1% OR guardian_name LIKE %?1% OR guardian_contact LIKE %?1% OR status LIKE %?1%) LIMIT 20", nativeQuery = true)
    List<Employee> filterEmployee(String pattern);

    Optional<Employee> getEmployeeByEmail(String email);

    Optional<Employee> getEmployeeByContact(String contact);
}
