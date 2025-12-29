// This is a placeholder for the thought process. I need to use view_file on App.jsx.
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Heart, Star, Share2 } from 'lucide-react';
import { getProductImage } from '../../lib/productImages';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock data fetching (in real app, use useQuery with getProductById)
    // For now, we simulate finding the product to show the UI
    const product = {
        id: id,
        name: 'Urban Chic Trench', // Placeholder
        description: 'A stylish beige trench coat perfect for the modern woman. tailored for a flattering fit.',
        price: 4999,
        discountedPrice: 4249.15,
        discountPercentage: 15,
        categoryName: 'Outerwear',
        sellerName: 'FashionHub',
        rating: 4.8,
        reviews: 124,
        images: [1, 2, 3] // Mock images
    };

    // Deterministic image based on ID
    const imageIndex = ((parseInt(id || '1') - 1) % 16) + 1;
    const mainImage = getProductImage(imageIndex);

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 p-4 z-50 flex justify-between items-center bg-white/80 backdrop-blur-md">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </button>
                <div className="flex space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Share2 className="w-6 h-6 text-gray-800" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ShoppingBag className="w-6 h-6 text-gray-800" />
                    </button>
                </div>
            </nav>

            <div className="pt-0 pb-20 md:pt-20 max-w-7xl mx-auto px-0 md:px-6 flex flex-col md:flex-row gap-0 md:gap-12">
                {/* Product Image Section */}
                <div className="w-full md:w-1/2 relative h-[60vh] md:h-[80vh]">
                    <div className="w-full h-full overflow-hidden md:rounded-3xl bg-gray-100">
                        <img
                            src={mainImage}
                            alt={product.name}
                            className="w-full h-full object-cover animate-fade-in-up"
                        />
                    </div>
                    <div className="absolute top-4 right-4 md:hidden">
                        <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg">
                            <Heart className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Product Info Section */}
                <div className="w-full md:w-1/2 px-6 py-8 md:py-0 flex flex-col justify-center animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <div className="mb-4">
                        <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                            {product.categoryName}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-2">
                            {product.name}
                        </h1>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{product.rating}</span>
                            <span>({product.reviews} reviews)</span>
                            <span>•</span>
                            <span>By {product.sellerName}</span>
                        </div>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="space-y-6">
                        {/* Size Selector Mockup */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Select Size</h3>
                            <div className="flex space-x-3">
                                {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                    <button key={size} className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center hover:border-black hover:bg-black hover:text-white transition-all">
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Price and Add to Cart */}
                        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                            <div>
                                <p className="text-3xl font-bold text-gray-900">₹{product.discountedPrice}</p>
                                <p className="text-sm text-gray-400 line-through">₹{product.price}</p>
                            </div>
                            <button className="px-8 py-4 bg-black text-white rounded-full text-lg font-bold hover:shadow-xl hover:scale-105 transition-all flex items-center space-x-2">
                                <ShoppingBag className="w-5 h-5" />
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
