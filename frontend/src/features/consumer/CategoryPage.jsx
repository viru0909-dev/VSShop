import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Heart, Filter } from 'lucide-react';
import { getProductImage } from '../../lib/productImages';

const CategoryPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    // Mock data based on category (in real app, fetch from API)
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

    // Simulate fetching products for this category
    const products = Array.from({ length: 8 }).map((_, i) => ({
        id: i + 1,
        name: `${categoryName} Item ${i + 1}`,
        price: (i + 1) * 1500,
        image: getProductImage((i % 16) + 1)
    }));

    return (
        <div className="min-h-screen bg-[#f2f1eb]">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 p-4 z-50 flex justify-between items-center bg-white/80 backdrop-blur-md">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="text-xl font-bold">{categoryName}</h1>
                <div className="flex space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ShoppingBag className="w-6 h-6 text-gray-800" />
                    </button>
                </div>
            </nav>

            <div className="pt-24 pb-12 px-6 max-w-[1600px] mx-auto">
                {/* Hero / Header */}
                <div className="bg-white rounded-[2.5rem] p-8 mb-8 flex items-center justify-between shadow-sm">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">Shop {categoryName}</h1>
                        <p className="text-gray-500">Discover the latest trends in {categoryName.toLowerCase()}</p>
                    </div>
                    <button className="p-3 bg-gray-100 rounded-full hover:bg-black hover:text-white transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                </div>

                {/* Product Grid */}
                <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="break-inside-avoid bg-white rounded-[2rem] p-4 hover:shadow-xl transition-all duration-300 group cursor-pointer mb-6"
                            onClick={() => navigate(`/product/${product.id}`)}
                        >
                            <div className="relative bg-gray-100 rounded-[1.5rem] mb-4 overflow-hidden">
                                <div className="absolute top-3 right-3 z-10">
                                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                                        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                                    </button>
                                </div>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                            </div>
                            <div className="px-2">
                                <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                                <p className="text-gray-500 mt-1">₹{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
