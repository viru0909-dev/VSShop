package com.orderly.backend.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

/**
 * DTO for creating a new product
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateProductRequest {

    @NotBlank(message = "Product name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Base price is required")
    @DecimalMin(value = "0.0", message = "Price must be positive")
    private BigDecimal basePrice;

    @DecimalMin(value = "0.0", message = "Discount must be positive")
    @DecimalMax(value = "100.0", message = "Discount cannot exceed 100%")
    private BigDecimal discountPercentage;

    @NotNull(message = "Stock quantity is required")
    @Min(value = 0, message = "Stock cannot be negative")
    private Integer stockQuantity;

    private String sku;
    private String brand;
    private String unit;

    @NotNull(message = "Category is required")
    private Long categoryId;

    private Boolean isFeatured;
}
