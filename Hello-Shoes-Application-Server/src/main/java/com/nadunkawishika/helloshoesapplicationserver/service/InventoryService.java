package com.nadunkawishika.helloshoesapplicationserver.service;

import com.nadunkawishika.helloshoesapplicationserver.dto.CustomDTO;
import com.nadunkawishika.helloshoesapplicationserver.dto.ItemDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface InventoryService {
    List<ItemDTO> getAllByAvailability(Boolean availability, int page, int limit);

    void addItem(String dto, MultipartFile image) throws IOException;

    void updateItem(String id, String itemDTO, MultipartFile image) throws IOException;

    void deleteItem(String id);

    List<ItemDTO> filterItems(String pattern);

    ItemDTO getItem(String id);

    List<CustomDTO> getAllStocks(int page, int limit);

    void updateStock(String id, CustomDTO dto);

    List<CustomDTO> filterStocks(String pattern);

    CustomDTO getStock(String id);

    void activateItem(String id);

    ItemDTO getPopularItem(Integer filter);
}
