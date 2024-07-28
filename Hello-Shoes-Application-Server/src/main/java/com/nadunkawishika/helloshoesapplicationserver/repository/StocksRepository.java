package com.nadunkawishika.helloshoesapplicationserver.repository;

import com.nadunkawishika.helloshoesapplicationserver.entity.Stock;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StocksRepository extends JpaRepository<Stock, String> {
    @Query(value = "SELECT item.stock_id,item.supplier_id,supplier.name,item.item_id,item.description,size40,size41,size42,size43,size44,size45 FROM item INNER JOIN supplier ON supplier.supplier_id = item.supplier_id INNER JOIN stock ON item.item_id = stock.item_id WHERE (name LIKE %?1% OR item.supplier_id LIKE  %?1% OR item.stock_id LIKE %?1% OR supplier_name LIKE %?1% OR item.item_id LIKE %?1% OR description LIKE %?1% OR stock.size40 LIKE %?1% OR size41 LIKE %?1% OR size42 LIKE %?1% OR size43 LIKE %?1% OR size44 LIKE %?1% OR size45 LIKE %?1%) LIMIT 20", nativeQuery = true)
    List<Object[]> filterStocks(String pattern);

    @Query(value = "SELECT * FROM stock WHERE item_id = ?1", nativeQuery = true)
    Optional<Stock> findByItemId(String itemId);
}
