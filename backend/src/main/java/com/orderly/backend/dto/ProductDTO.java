package com.orderly.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO for Product responses
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal basePrice;
    private BigDecimal discountPercentage;
    private BigDecimal discountedPrice;
    private Integer stockQuantity;
    private String sku;
    private String brand;
    private String unit;
    private Boolean isActive;
    private Boolean isFeatured;
    private Boolean inStock;

    private Long sellerId;
    private String sellerName;

    private Long categoryId;
    private String categoryName;

    private List<ProductImageDTO> images;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
