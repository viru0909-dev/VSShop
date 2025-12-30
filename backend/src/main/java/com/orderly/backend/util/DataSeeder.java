package com.orderly.backend.util;

import com.orderly.backend.entity.Category;
import com.orderly.backend.entity.Product;
import com.orderly.backend.entity.Role;
import com.orderly.backend.entity.User;
import com.orderly.backend.repository.CategoryRepository;
import com.orderly.backend.repository.ProductRepository;
import com.orderly.backend.repository.RoleRepository;
import com.orderly.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * Database initializer to seed initial data
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

        private final RoleRepository roleRepository;
        private final CategoryRepository categoryRepository;
        private final ProductRepository productRepository;
        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;

        @Override
        public void run(String... args) {
                seedRoles();
                seedCategories();
                seedDemoSellerAndProducts();
        }

        private void seedRoles() {
                // Create roles if they don't exist
                for (Role.RoleName roleName : Role.RoleName.values()) {
                        if (!roleRepository.existsByRoleName(roleName)) {
                                Role role = Role.builder()
                                                .roleName(roleName)
                                                .description(getDescriptionForRole(roleName))
                                                .build();
                                roleRepository.save(role);
                                log.info("Created role: {}", roleName);
                        }
                }
        }

        private void seedCategories() {
                if (categoryRepository.count() > 0) {
                        // Check if we need to switch to pure fashion
                        if (categoryRepository.findByName("Groceries").isPresent()
                                        || categoryRepository.findByName("Men").isPresent()) {
                                log.info("Cleaning up old data to pure Women's Fashion...");
                                productRepository.deleteAll();
                                categoryRepository.deleteAll();
                        } else {
                                return; // Already seeded
                        }
                }

                // Create top-level categories
                Category clothing = createCategory("Clothing", "Women's Apparel", null);
                Category accessories = createCategory("Accessories", "Bags, Jewelry & More", null);
                Category collections = createCategory("Collections", "Curated Sets", null);

                // Create sub-categories
                createCategory("Dresses", "Elegant Dresses & Gowns", clothing);
                createCategory("Tops & Shirts", "Casual & Formal Tops", clothing);
                createCategory("Outerwear", "Coats, Jackets & Blazers", clothing);
                createCategory("Ethnic Wear", "Traditional & Fusion Wear", clothing);
                createCategory("Bags & Handbags", "Luxury Bags & Clutches", accessories);
                createCategory("Jewelry", "Necklaces, Earrings & Rings", accessories);

                log.info("Seeded women's fashion categories");
        }

        private Category createCategory(String name, String description, Category parent) {
                Category category = Category.builder()
                                .name(name)
                                .description(description)
                                .parent(parent)
                                .isActive(true)
                                .build();
                return categoryRepository.save(category);
        }

        private void seedDemoSellerAndProducts() {
                if (productRepository.count() > 0) {
                        return;
                }

                Role sellerRole = roleRepository.findByRoleName(Role.RoleName.SELLER)
                                .orElseThrow(() -> new IllegalStateException("SELLER role not found"));

                User demoSeller = userRepository.findByEmail("seller@orderly.com")
                                .orElseGet(() -> {
                                        User seller = User.builder()
                                                        .name("Fashion Seller")
                                                        .email("seller@orderly.com")
                                                        .passwordHash(passwordEncoder.encode("password123"))
                                                        .phone("9876543210")
                                                        .provider("LOCAL")
                                                        .isActive(true)
                                                        .emailVerified(true)
                                                        .build();
                                        seller = userRepository.save(seller);
                                        seller.addRole(sellerRole);
                                        return userRepository.save(seller);
                                });

                // Get categories
                Category dresses = categoryRepository.findByName("Dresses").orElseThrow();
                Category tops = categoryRepository.findByName("Tops & Shirts").orElseThrow();
                Category outerwear = categoryRepository.findByName("Outerwear").orElseThrow();
                Category bags = categoryRepository.findByName("Bags & Handbags").orElseThrow();
                Category jewelry = categoryRepository.findByName("Jewelry").orElseThrow();

                // Seed 16 Women's Fashion Products

                // 1. Fashion Model 1 (Coat)
                createProduct("Urban Chic Trench", "Stylish beige trench coat for the modern woman",
                                new BigDecimal("4999"), new BigDecimal("15"), 50, "piece", outerwear, demoSeller, true);

                // 2. Red Handbag
                createProduct("Scarlet Luxury Bag", "Premium red leather handbag with gold hardware",
                                new BigDecimal("2499"), new BigDecimal("10"), 30, "piece", bags, demoSeller, true);

                // 3. Casual Wear
                createProduct("Summer Breeze Set", "Lightweight two-piece co-ord set", new BigDecimal("1999"),
                                new BigDecimal("0"), 100, "set", dresses, demoSeller, false);

                // 4. Blue Denim -> Denim Jacket
                createProduct("Vintage Denim Jacket", "Classic oversized denim jacket", new BigDecimal("2999"),
                                new BigDecimal("5"), 80, "piece", outerwear, demoSeller, true);

                // 5. White Dress
                createProduct("Ethereal White Gown", "Floor-length evening gown for special occasions",
                                new BigDecimal("3499"), new BigDecimal("20"), 40, "piece", dresses, demoSeller, true);

                // 6. Accessories
                createProduct("Gold Statement Jewelry", "Bold gold-plated necklace set", new BigDecimal("999"),
                                new BigDecimal("0"), 150, "set", jewelry, demoSeller, false);

                // 7. Stylish Coat
                createProduct("Woolen Overcoat", "Warm and sophisticated camel overcoat", new BigDecimal("5999"),
                                new BigDecimal("10"), 25, "piece", outerwear, demoSeller, true);

                // 8. Summer Dress
                createProduct("Floral Midi Dress", "Romantic floral print dress with puff sleeves",
                                new BigDecimal("1499"), new BigDecimal("0"), 120, "piece", dresses, demoSeller, false);

                // 9. Formal Shirt -> Women's Shirt
                createProduct("Crisp White Blouse", "Tailored formal shirt for office wear", new BigDecimal("1299"),
                                new BigDecimal("15"), 200, "piece", tops, demoSeller, false);

                // 10. Winter Jacket -> Women's Puffer
                createProduct("Thermo-Insulated Puffer", "High-gloss winter protection jacket", new BigDecimal("3999"),
                                new BigDecimal("10"), 60, "piece", outerwear, demoSeller, false);

                // 11. Premium Suit -> Women's Grey Suit
                createProduct("Power Grey Suit", "Modern cut blazer and trouser set", new BigDecimal("8999"),
                                new BigDecimal("25"), 15, "set", outerwear, demoSeller, true);

                // 12. Orange Hoodie
                createProduct("Sunset Oversized Hoodie", "Cozy streetwear essential in vibrant orange",
                                new BigDecimal("1499"), new BigDecimal("0"), 100, "piece", tops, demoSeller, false);

                // 13. Green Jacket -> Bomber
                createProduct("Olive Cropped Bomber", "Chic military-inspired cropped jacket", new BigDecimal("2499"),
                                new BigDecimal("5"), 70, "piece", outerwear, demoSeller, false);

                // 14. Red Suit
                createProduct("Crimson Power Suit", "Bold red blazer and pant suit", new BigDecimal("7999"),
                                new BigDecimal("20"), 20, "set", outerwear, demoSeller, true);

                // 15. Designer Wear
                createProduct("Embroidered Gala Gown", "Hand-embroidered masterpiece for galas",
                                new BigDecimal("12999"), new BigDecimal("30"), 10, "piece", dresses, demoSeller, true);

                // 16. Trendy Outfit
                createProduct("City Chic Ensemble", "Trendsetting top and skirt combination", new BigDecimal("3499"),
                                new BigDecimal("10"), 45, "set", dresses, demoSeller, false);

                log.info("Seeded women's fashion products");
        }

        private void createProduct(String name, String description, BigDecimal price, BigDecimal discount,
                        int stock, String unit, Category category, User seller, boolean featured) {
                Product product = Product.builder()
                                .name(name)
                                .description(description)
                                .basePrice(price)
                                .discountPercentage(discount)
                                .stockQuantity(stock)
                                .unit(unit)
                                .category(category)
                                .seller(seller)
                                .isActive(true)
                                .isFeatured(featured)
                                .build();
                productRepository.save(product);
        }

        private String getDescriptionForRole(Role.RoleName roleName) {
                return switch (roleName) {
                        case CONSUMER -> "Regular customer who can browse and purchase products";
                        case SELLER -> "Vendor who can list and manage products";
                        case ADMIN -> "Platform administrator with full access";
                        case DELIVERY_BOY -> "Delivery personnel for order fulfillment";
                };
        }
}
