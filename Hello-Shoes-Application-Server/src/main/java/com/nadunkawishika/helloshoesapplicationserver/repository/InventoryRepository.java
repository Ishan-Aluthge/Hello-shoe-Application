package com.nadunkawishika.helloshoesapplicationserver.repository;

import com.nadunkawishika.helloshoesapplicationserver.entity.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Item, String> {
    @Query(value = "SELECT * from item where (description LIKE %?1% OR item_id LIKE %?1% OR buying_price LIKE %?1% OR category LIKE %?1% OR selling_price LIKE %?1% OR expected_profit LIKE %?1% OR profit_margin LIKE %?1% OR supplier_id LIKE %?1% OR stock_id LIKE %?1% OR supplier_name LIKE %?1% OR quantity LIKE %?1%) AND availability=1 LIMIT 20", nativeQuery = true)
    List<Item> filterItems(String pattern);

    Page<Item> findByAvailability(Boolean availability, Pageable pageable);

    Optional<Item> findByAvailabilityAndItemId(Boolean availability, String itemId);
}