package com.nadunkawishika.helloshoesapplicationserver.repository;

import com.nadunkawishika.helloshoesapplicationserver.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, String> {
    @Query(value = "SELECT * FROM supplier WHERE (name LIKE %?1% OR lane LIKE %?1% OR city LIKE %?1% OR state LIKE %?1% OR postal_code LIKE %?1% OR supplier_id LIKE %?1% OR contact_no1 LIKE %?1% OR contact_no2 LIKE %?1%) LIMIT 20", nativeQuery = true)
    List<Supplier> filterByPattern(String pattern);
}
