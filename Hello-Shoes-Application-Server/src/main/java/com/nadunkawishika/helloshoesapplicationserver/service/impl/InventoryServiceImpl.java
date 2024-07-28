package com.nadunkawishika.helloshoesapplicationserver.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nadunkawishika.helloshoesapplicationserver.dto.CustomDTO;
import com.nadunkawishika.helloshoesapplicationserver.dto.ItemDTO;
import com.nadunkawishika.helloshoesapplicationserver.entity.Item;
import com.nadunkawishika.helloshoesapplicationserver.entity.Stock;
import com.nadunkawishika.helloshoesapplicationserver.entity.Supplier;
import com.nadunkawishika.helloshoesapplicationserver.exception.customExceptions.NotFoundException;
import com.nadunkawishika.helloshoesapplicationserver.repository.InventoryRepository;
import com.nadunkawishika.helloshoesapplicationserver.repository.SaleDetailsRepository;
import com.nadunkawishika.helloshoesapplicationserver.repository.StocksRepository;
import com.nadunkawishika.helloshoesapplicationserver.repository.SupplierRepository;
import com.nadunkawishika.helloshoesapplicationserver.service.InventoryService;
import com.nadunkawishika.helloshoesapplicationserver.util.Base64Encoder;
import com.nadunkawishika.helloshoesapplicationserver.util.GenerateId;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {
    private final InventoryRepository inventoryRepository;
    private final StocksRepository stocksRepository;
    private final ObjectMapper objectMapper;
    private final Base64Encoder base64Encoder;
    private final SupplierRepository supplierRepository;
    private final Logger LOGGER = org.slf4j.LoggerFactory.getLogger(InventoryServiceImpl.class);
    private final DecimalFormat df = new DecimalFormat("0.00");
    private final SaleDetailsRepository saleDetailsRepository;


    @Override
    public List<ItemDTO> getAllByAvailability(Boolean availability, int page, int limit) {
        LOGGER.info("Get All Items Request");
        Pageable pageable = PageRequest.of(page, limit);
        return inventoryRepository.findByAvailability(availability, pageable).stream().map(item -> ItemDTO
                .builder()
                .itemId(item.getItemId())
                .description(item.getDescription())
                .image(item.getImage())
                .expectedProfit(item.getExpectedProfit())
                .profitMargin(item.getProfitMargin())
                .quantity(item.getQuantity())
                .supplierName(item.getSupplierName())
                .supplierId(item.getSupplier().getSupplierId())
                .buyingPrice(item.getBuyingPrice())
                .sellingPrice(item.getSellingPrice())
                .category(item.getCategory())
                .build()
        ).toList();
    }

    private void getItemDTOs(List<ItemDTO> itemDTOS, Item item) {
        LOGGER.info("Item Found: {}", item.getItemId());
        ItemDTO dto = ItemDTO
                .builder()
                .itemId(item.getItemId())
                .description(item.getDescription())
                .image(item.getImage())
                .expectedProfit(item.getExpectedProfit())
                .profitMargin(item.getProfitMargin())
                .quantity(item.getQuantity())
                .supplierName(item.getSupplierName())
                .supplierId(item.getSupplier().getSupplierId())
                .buyingPrice(item.getBuyingPrice())
                .sellingPrice(item.getSellingPrice())
                .category(item.getCategory())
                .build();
        itemDTOS.add(dto);
    }

    @Override
    public void addItem(String itemDTO, MultipartFile image) throws IOException {
        ItemDTO dto = objectMapper.readValue(itemDTO, ItemDTO.class);
        String id = (dto.getOccasion() + dto.getVerities() + dto.getGender() + GenerateId.getId("")).toLowerCase();
        String stockId = GenerateId.getId("STK").toLowerCase();

        Double expectedProfit = dto.getSellingPrice() - dto.getBuyingPrice();
        Double profitMargin = (expectedProfit / dto.getBuyingPrice()) * 100;
        profitMargin = Double.parseDouble(df.format(profitMargin));

        Supplier supplier = supplierRepository.findById(dto.getSupplierId().toLowerCase()).orElseThrow(() -> new NotFoundException("Supplier Not Found"));

        Stock stock = Stock
                .builder()
                .stockId(stockId)
                .size40(0)
                .size41(0)
                .size42(0)
                .size43(0)
                .size44(0)
                .size45(0)
                .build();

        Item item = Item
                .builder()
                .description(dto.getDescription().toLowerCase())
                .itemId(id)
                .category((dto.getOccasion() + "/" + dto.getVerities() + "/" + dto.getGender()).toLowerCase())
                .image(image != null ? base64Encoder.encodeImage(image) : null)
                .buyingPrice(dto.getBuyingPrice())
                .sellingPrice(dto.getSellingPrice())
                .quantity(0)
                .supplierName(supplier.getName())
                .expectedProfit(expectedProfit)
                .profitMargin(profitMargin)
                .supplier(supplier)
                .stock(stock)
                .availability(true)
                .build();

        stock.setItem(item);
        inventoryRepository.save(item);
        LOGGER.info("Item Added: {}", item.getItemId());
    }

    @Override
    public void updateItem(String id, String itemDTO, MultipartFile image) throws IOException {
        ItemDTO dto = objectMapper.readValue(itemDTO, ItemDTO.class);
        Item item = inventoryRepository.findById(id).orElseThrow(() -> new NotFoundException("Item Not Found"));
        Supplier supplier = supplierRepository.findById(dto.getSupplierId().toLowerCase()).orElseThrow(() -> new NotFoundException("Supplier Not Found"));

        Double expectedProfit = dto.getSellingPrice() - dto.getBuyingPrice();
        Double profitMargin = (expectedProfit / dto.getBuyingPrice()) * 100;
        profitMargin = Double.parseDouble(df.format(profitMargin));

        item.setDescription(dto.getDescription().toLowerCase());
        item.setCategory((dto.getOccasion() + "/" + dto.getVerities() + "/" + dto.getGender()).toLowerCase());
        item.setBuyingPrice(dto.getBuyingPrice());
        item.setSellingPrice(dto.getSellingPrice());
        item.setSupplierName(supplier.getName());
        item.setExpectedProfit(expectedProfit);
        item.setProfitMargin(profitMargin);
        item.setSupplier(supplier);
        item.setImage(image != null ? base64Encoder.encodeImage(image) : item.getImage());
        inventoryRepository.save(item);
        LOGGER.info("Item Updated: {}", item.getItemId());
    }

    @Override
    public void deleteItem(String id) {
        Item item = inventoryRepository.findById(id).orElseThrow(() -> new NotFoundException("Item Not Found"));
        item.setAvailability(false);
        inventoryRepository.save(item);
        LOGGER.info("Item Deleted: {}", id);
    }

    @Override
    public List<ItemDTO> filterItems(String pattern) {
        return inventoryRepository.filterItems(pattern).stream().map(item -> ItemDTO
                .builder()
                .itemId(item.getItemId())
                .description(item.getDescription())
                .image(item.getImage())
                .expectedProfit(item.getExpectedProfit())
                .profitMargin(item.getProfitMargin())
                .quantity(item.getQuantity())
                .supplierName(item.getSupplierName())
                .supplierId(item.getSupplier().getSupplierId())
                .buyingPrice(item.getBuyingPrice())
                .sellingPrice(item.getSellingPrice())
                .category(item.getCategory())
                .build()
        ).toList();
    }

    @Override
    public ItemDTO getItem(String id) {
        LOGGER.info("Get Item Request: {}", id);
        Item item = inventoryRepository.findByAvailabilityAndItemId(true, id).orElseThrow(() -> new NotFoundException("Item Not Found"));
        return ItemDTO
                .builder()
                .itemId(item.getItemId())
                .description(item.getDescription())
                .image(item.getImage())
                .expectedProfit(item.getExpectedProfit())
                .profitMargin(item.getProfitMargin())
                .quantity(item.getQuantity())
                .supplierName(item.getSupplierName())
                .supplierId(item.getSupplier().getSupplierId())
                .buyingPrice(item.getBuyingPrice())
                .sellingPrice(item.getSellingPrice())
                .category(item.getCategory())
                .build();
    }

    @Override
    public List<CustomDTO> getAllStocks(int page, int limit) {
        LOGGER.info("Get All Stocks Request");
        Pageable pageable = PageRequest.of(page, limit);
        return stocksRepository.findAll(pageable).getContent().stream().map(stock -> CustomDTO
                .builder()
                .itemId(stock.getItem().getItemId())
                .stockId(stock.getStockId())
                .description(stock.getItem().getDescription())
                .supplierId(stock.getItem().getSupplier().getSupplierId())
                .supplierName(stock.getItem().getSupplierName())
                .size40(stock.getSize40())
                .size41(stock.getSize41())
                .size42(stock.getSize42())
                .size43(stock.getSize43())
                .size44(stock.getSize44())
                .size45(stock.getSize45())
                .build()
        ).toList();
    }

    @Override
    public void updateStock(String id, CustomDTO dto) {
        Stock stock = stocksRepository.findById(id).orElseThrow(() -> new NotFoundException("Stock Not Found"));
        Item item = inventoryRepository.findById(stock.getItem().getItemId()).orElseThrow(() -> new NotFoundException("Item Not Found"));
        int totalStock = dto.getSize40() + dto.getSize41() + dto.getSize42() + dto.getSize43() + dto.getSize44() + dto.getSize45();
        item.setQuantity(totalStock);
        stock.setSize40(dto.getSize40());
        stock.setSize41(dto.getSize41());
        stock.setSize42(dto.getSize42());
        stock.setSize43(dto.getSize43());
        stock.setSize44(dto.getSize44());
        stock.setSize45(dto.getSize45());
        stock.setItem(item);

        stocksRepository.save(stock);
        LOGGER.info("Stock Updated: {}", stock.getStockId());
    }

    @Override
    public List<CustomDTO> filterStocks(String pattern) {
        LOGGER.info("Filtered Stocks");
        return stocksRepository.filterStocks(pattern).stream().map(object -> CustomDTO
                        .builder()
                        .itemId(object[0].toString())
                        .stockId(object[1].toString())
                        .description(object[2].toString())
                        .supplierId(object[3].toString())
                        .supplierName(object[4].toString())
                        .size40(Integer.parseInt(object[5].toString()))
                        .size41(Integer.parseInt(object[6].toString()))
                        .size42(Integer.parseInt(object[7].toString()))
                        .size43(Integer.parseInt(object[8].toString()))
                        .size44(Integer.parseInt(object[9].toString()))
                        .size45(Integer.parseInt(object[10].toString()))
                        .build())
                .toList();

    }

    @Override
    public CustomDTO getStock(String id) {
        return stocksRepository.findByItemId(id).map(stock -> CustomDTO
                .builder()
                .size40(stock.getSize40())
                .size41(stock.getSize41())
                .size42(stock.getSize42())
                .size43(stock.getSize43())
                .size44(stock.getSize44())
                .size45(stock.getSize45())
                .itemId(stock.getItem().getItemId())
                .build()).orElseThrow(() -> new NotFoundException("Stock Not Found"));
    }

    @Override
    public void activateItem(String id) {
        Item item = inventoryRepository.findById(id).orElseThrow(() -> new NotFoundException("Item Not Found"));
        item.setAvailability(true);
        inventoryRepository.save(item);
        LOGGER.info("Item Activated: {}", id);
    }

    @Override
    public ItemDTO getPopularItem(Integer range) {
        List<Object[]> popularItem = saleDetailsRepository.findPopularItem(range).orElseThrow(() -> new NotFoundException("Popular Item Not Found"));
        if (popularItem.isEmpty()) throw new NotFoundException("Popular Item Not Found");
        String itemId = popularItem.getFirst()[0].toString();
        Item item = inventoryRepository.findById(itemId).orElseThrow(() -> new NotFoundException("Item Not Found"));
        LOGGER.info("Popular Item Found: {}", itemId);
        return ItemDTO
                .builder()
                .itemId(item.getItemId())
                .description(item.getDescription())
                .image(item.getImage())
                .expectedProfit(item.getExpectedProfit())
                .profitMargin(item.getProfitMargin())
                .quantity(item.getQuantity())
                .supplierName(item.getSupplierName())
                .supplierId(item.getSupplier().getSupplierId())
                .buyingPrice(item.getBuyingPrice())
                .sellingPrice(item.getSellingPrice())
                .category(item.getCategory())
                .build();
    }
}
