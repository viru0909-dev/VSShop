package com.orderly.backend.service;

import com.orderly.backend.dto.*;
import com.orderly.backend.entity.Category;
import com.orderly.backend.entity.Product;
import com.orderly.backend.entity.ProductImage;
import com.orderly.backend.entity.User;
import com.orderly.backend.exception.ResourceNotFoundException;
import com.orderly.backend.repository.CategoryRepository;
import com.orderly.backend.repository.ProductRepository;
import com.orderly.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service for product operations
 */
@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<ProductDTO> getAllProducts(Pageable pageable) {
        return productRepository.findByIsActiveTrue(pageable)
                .map(this::toDTO);
    }

    @Transactional(readOnly = true)
    public ProductDTO getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return toDTO(product);
    }

    @Transactional(readOnly = true)
    public Page<ProductDTO> searchProducts(String keyword, Pageable pageable) {
        return productRepository.searchByKeyword(keyword, pageable)
                .map(this::toDTO);
    }

    @Transactional(readOnly = true)
    public Page<ProductDTO> getProductsByCategory(Long categoryId, Pageable pageable) {
        return productRepository.findByCategoryIdAndIsActiveTrue(categoryId, pageable)
                .map(this::toDTO);
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getFeaturedProducts() {
        return productRepository.findByIsFeaturedTrueAndIsActiveTrue().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Page<ProductDTO> getProductsBySeller(Long sellerId, Pageable pageable) {
        return productRepository.findBySellerIdAndIsActiveTrue(sellerId, pageable)
                .map(this::toDTO);
    }

    @Transactional
    public ProductDTO createProduct(CreateProductRequest request, Long sellerId) {
        User seller = userRepository.findById(sellerId)
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found"));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .basePrice(request.getBasePrice())
                .discountPercentage(
                        request.getDiscountPercentage() != null ? request.getDiscountPercentage() : BigDecimal.ZERO)
                .stockQuantity(request.getStockQuantity())
                .sku(request.getSku())
                .brand(request.getBrand())
                .unit(request.getUnit())
                .seller(seller)
                .category(category)
                .isActive(true)
                .isFeatured(request.getIsFeatured() != null ? request.getIsFeatured() : false)
                .build();

        product = productRepository.save(product);
        return toDTO(product);
    }

    @Transactional
    public ProductDTO updateProduct(Long id, UpdateProductRequest request, Long sellerId) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // Verify ownership
        if (!product.getSeller().getId().equals(sellerId)) {
            throw new IllegalArgumentException("You can only update your own products");
        }

        if (request.getName() != null)
            product.setName(request.getName());
        if (request.getDescription() != null)
            product.setDescription(request.getDescription());
        if (request.getBasePrice() != null)
            product.setBasePrice(request.getBasePrice());
        if (request.getDiscountPercentage() != null)
            product.setDiscountPercentage(request.getDiscountPercentage());
        if (request.getStockQuantity() != null)
            product.setStockQuantity(request.getStockQuantity());
        if (request.getSku() != null)
            product.setSku(request.getSku());
        if (request.getBrand() != null)
            product.setBrand(request.getBrand());
        if (request.getUnit() != null)
            product.setUnit(request.getUnit());
        if (request.getIsActive() != null)
            product.setIsActive(request.getIsActive());
        if (request.getIsFeatured() != null)
            product.setIsFeatured(request.getIsFeatured());

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            product.setCategory(category);
        }

        product = productRepository.save(product);
        return toDTO(product);
    }

    @Transactional
    public void deleteProduct(Long id, Long sellerId) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // Verify ownership
        if (!product.getSeller().getId().equals(sellerId)) {
            throw new IllegalArgumentException("You can only delete your own products");
        }

        productRepository.delete(product);
    }

    @Transactional
    public ProductDTO updateStock(Long id, Integer quantity, Long sellerId) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // Verify ownership
        if (!product.getSeller().getId().equals(sellerId)) {
            throw new IllegalArgumentException("You can only update your own products");
        }

        product.setStockQuantity(quantity);
        product = productRepository.save(product);
        return toDTO(product);
    }

    private ProductDTO toDTO(Product product) {
        List<ProductImageDTO> imageDTOs = product.getImages() != null ? product.getImages().stream()
                .map(this::toImageDTO)
                .collect(Collectors.toList()) : List.of();

        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .basePrice(product.getBasePrice())
                .discountPercentage(product.getDiscountPercentage())
                .discountedPrice(calculateDiscountedPrice(product))
                .stockQuantity(product.getStockQuantity())
                .sku(product.getSku())
                .brand(product.getBrand())
                .unit(product.getUnit())
                .isActive(product.getIsActive())
                .isFeatured(product.getIsFeatured())
                .inStock(product.isInStock())
                .sellerId(product.getSeller().getId())
                .sellerName(product.getSeller().getName())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .images(imageDTOs)
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    private ProductImageDTO toImageDTO(ProductImage image) {
        return ProductImageDTO.builder()
                .id(image.getId())
                .imageUrl(image.getImageUrl())
                .displayOrder(image.getDisplayOrder())
                .isPrimary(image.getIsPrimary())
                .build();
    }

    private BigDecimal calculateDiscountedPrice(Product product) {
        if (product.getDiscountPercentage() == null
                || product.getDiscountPercentage().compareTo(BigDecimal.ZERO) == 0) {
            return product.getBasePrice();
        }
        BigDecimal discount = product.getBasePrice()
                .multiply(product.getDiscountPercentage())
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        return product.getBasePrice().subtract(discount);
    }
}
