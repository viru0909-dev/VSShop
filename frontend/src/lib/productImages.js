// Product image mapping for fashion/clothing items
// Maps product IDs to their fashion image files with varied layouts
const productImages = {
    1: '/src/assets/products/photo-1483985988355-763728e1935b.avif', // Fashion Model 1
    2: '/src/assets/products/photo-1529139574466-a303027c1d8b.avif', // Red Handbag
    3: '/src/assets/products/photo-1515886657613-9f3515b0c78f.avif', // Casual Wear
    4: '/src/assets/products/photo-1588117260148-b47818741c74.avif', // Blue Denim
    5: '/src/assets/products/premium_photo-1675186049419-d48f4b28fe7c.avif', // White Dress
    6: '/src/assets/products/premium_photo-1675186049563-000f7ac02c44.avif', // Fashion Accessories
    7: '/src/assets/products/photo-1512068549487-5e79d74c7fc3.avif', // Stylish Coat
    8: '/src/assets/products/photo-1495385794356-15371f348c31.avif', // Summer Dress
    9: '/src/assets/products/photo-1509631179647-0177331693ae.avif', // Formal Shirt
    10: '/src/assets/products/photo-1612215327100-60fc5c4d7938.avif', // Winter Jacket
    11: '/src/assets/products/premium_photo-1664202526559-e21e9c0fb46a.avif', // Premium Suit
    12: '/src/assets/products/photo-1601762603339-fd61e28b698a.avif', // Orange Hoodie
    13: '/src/assets/products/photo-1566206091558-7f218b696731.avif', // Green Jacket
    14: '/src/assets/products/photo-1557022971-af40cfaf8f80.avif', // Red Suit
    15: '/src/assets/products/premium_photo-1707932495000-5748b915e4f2.avif', // Designer Wear
    16: '/src/assets/products/premium_photo-1729523163169-7b4c521615c8.avif', // Trendy Outfit
};

// Define card heights for masonry layout (in Tailwind height classes)
export const productCardHeights = {
    1: 'h-80',  // Tall
    2: 'h-64',  // Medium
    3: 'h-72',  // Medium-tall
    4: 'h-80',  // Tall
    5: 'h-96',  // Extra tall
    6: 'h-64',  // Medium
    7: 'h-72',  // Medium-tall
    8: 'h-80',  // Tall
    9: 'h-64',  // Medium
    10: 'h-72', // Medium-tall
    11: 'h-96', // Extra tall
    12: 'h-80', // Tall
    13: 'h-64', // Medium
    14: 'h-96', // Extra tall
    15: 'h-72', // Medium-tall
};

export const getProductImage = (productId) => {
    // 1-based index (1-16) from any ID
    const index = ((productId - 1) % 16) + 1;
    return productImages[index] || productImages[1];
};

export const getProductCardHeight = (productId) => {
    const index = ((productId - 1) % 16) + 1;
    return productCardHeights[index] || 'h-72';
};

export default productImages;
