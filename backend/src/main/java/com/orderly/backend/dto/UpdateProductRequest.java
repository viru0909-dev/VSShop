package com.orderly.backend.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO for updating an existing product
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProductRequest {

    private String name;
    private String description;

    @DecimalMin(value = "0.0", message = "Price must be positive")
    private BigDecimal basePrice;

    @DecimalMin(value = "0.0", message = "Discount must be positive")
    @DecimalMax(value = "100.0", message = "Discount cannot exceed 100%")
    private BigDecimal discountPercentage;

    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stockQuantity;

    private String sku;
    private String brand;
    private String unit;
    private Long categoryId;
    private Boolean isActive;
    private Boolean isFeatured;
}
