package com.orderly.backend.controller;

import com.orderly.backend.dto.CreateProductRequest;
import com.orderly.backend.dto.ProductDTO;
import com.orderly.backend.dto.UpdateProductRequest;
import com.orderly.backend.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

/**
 * Seller-only REST controller for product management
 */
@RestController
@RequestMapping("/api/v1/seller/products")
@RequiredArgsConstructor
public class SellerProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getMyProducts(
            Authentication authentication,
            Pageable pageable) {
        Long sellerId = getUserId(authentication);
        return ResponseEntity.ok(productService.getProductsBySeller(sellerId, pageable));
    }

    @PostMapping
    public ResponseEntity<ProductDTO> createProduct(
            @Valid @RequestBody CreateProductRequest request,
            Authentication authentication) {
        Long sellerId = getUserId(authentication);
        ProductDTO created = productService.createProduct(request, sellerId);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody UpdateProductRequest request,
            Authentication authentication) {
        Long sellerId = getUserId(authentication);
        ProductDTO updated = productService.updateProduct(id, request, sellerId);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id,
            Authentication authentication) {
        Long sellerId = getUserId(authentication);
        productService.deleteProduct(id, sellerId);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}/stock")
    public ResponseEntity<ProductDTO> updateStock(
            @PathVariable Long id,
            @RequestParam Integer quantity,
            Authentication authentication) {
        Long sellerId = getUserId(authentication);
        ProductDTO updated = productService.updateStock(id, quantity, sellerId);
        return ResponseEntity.ok(updated);
    }

    private Long getUserId(Authentication authentication) {
        // TODO: Extract user ID from JWT token
        // For now, return a placeholder
        return 1L;
    }
}
