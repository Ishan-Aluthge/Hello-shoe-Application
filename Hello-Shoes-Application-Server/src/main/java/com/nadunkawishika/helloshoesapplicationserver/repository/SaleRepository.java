package com.nadunkawishika.helloshoesapplicationserver.repository;

import com.nadunkawishika.helloshoesapplicationserver.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SaleRepository extends JpaRepository<Sale, String> {
    @Query(value = "SELECT DISTINCT COUNT(sale_id) FROM sale WHERE created_at LIKE %?1%", nativeQuery = true)
    List<Object[]> findBillCount(String date);

    @Query(value = "SELECT * FROM sale WHERE created_at LIKE %?1%", nativeQuery = true)
    Optional<List<Sale>> getAllTodaySales(String date);

    @Query(value = "SELECT * FROM sale ORDER BY created_at DESC LIMIT 1;", nativeQuery = true)
    Optional<Sale> findLatestInvoice();

    @Query(value = "SELECT * FROM sale WHERE sale_id LIKE %?1% OR cashier_name LIKE %?1% OR customer_id LIKE %?1% OR payment_description LIKE %?1% OR created_at LIKE %?1%", nativeQuery = true)
    List<Sale> filterSales(String search);
}
