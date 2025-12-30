import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, ShoppingCart, User, Search, Star, TrendingUp, Package, Heart, LogOut } from 'lucide-react';
import { productsAPI } from '../../lib/api';
import { getProductImage, getProductCardHeight } from '../../lib/productImages';
import useAuthStore from '../../store/authStore';

const LandingPage = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuthStore();

    // Fetch featured products from API
    const { data: featuredProducts = [], isLoading } = useQuery({
        queryKey: ['featuredProducts'],
        queryFn: () => productsAPI.getFeatured().then(res => res.data),
    });

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fadeInUp 0.6s ease-out forwards;
                }
            `}</style>
            {/* Premium Navigation Header */}
            <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-gray-200/50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div
                            className="flex items-center space-x-3 cursor-pointer group"
                            onClick={() => navigate('/')}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2.5 rounded-2xl">
                                    <ShoppingBag className="h-7 w-7 text-white" strokeWidth={2.5} />
                                </div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                Orderly
                            </span>
                        </div>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-xl mx-8">
                            <div className="relative w-full group">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            {!isAuthenticated ? (
                                <>
                                    <Link
                                        to="/login"
                                        className="hidden sm:block text-gray-700 hover:text-blue-600 font-semibold transition-colors"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-105 font-semibold transition-all"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors group">
                                        <Heart className="h-6 w-6 text-gray-600 group-hover:text-red-500 transition-colors" />
                                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                                    </button>
                                    <button className="relative p-3 rounded-xl hover:bg-gray-100 transition-colors group">
                                        <ShoppingCart className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                                        <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                            3
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (user?.roles?.includes('SELLER')) navigate('/seller');
                                            else if (user?.roles?.includes('ADMIN')) navigate('/admin');
                                            else if (user?.roles?.includes('DELIVERY_BOY')) navigate('/delivery');
                                            else navigate('/dashboard');
                                        }}
                                        className="flex items-center space-x-3 p-2 pr-4 rounded-xl hover:bg-gray-100 transition-colors"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                                            <User className="h-5 w-5 text-white" />
                                        </div>
                                        <span className="hidden md:block text-sm font-semibold text-gray-700">{user?.name}</span>
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="p-3 rounded-xl hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors group"
                                        title="Logout"
                                    >
                                        <LogOut className="h-6 w-6" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Fashion Themed */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10"></div>
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <div className="text-left space-y-8">
                            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                                <TrendingUp className="h-4 w-4" />
                                <span>New Collection 2025</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                <span className="block">Discover</span>
                                <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                    Your Style
                                </span>
                                <span className="block">Everyday</span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                                Explore the latest trends in fashion. curated collections for men and women delivered straight to your doorstep.
                            </p>
                            {!isAuthenticated && (
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link
                                        to="/register"
                                        className="group relative inline-flex items-center justify-center"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                                        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transition-all flex items-center space-x-2">
                                            <span>Shop Now</span>
                                            <Package className="h-5 w-5" />
                                        </div>
                                    </Link>
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 rounded-2xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all"
                                    >
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Right Content - Feature Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2 bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-200/50">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-green-100 rounded-xl">
                                        <Package className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Free Shipping</h3>
                                        <p className="text-sm text-gray-600">On all orders above ₹999</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 text-white shadow-lg">
                                <h3 className="text-3xl font-bold mb-2">500+</h3>
                                <p className="text-blue-100">New Arrivals</p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl p-6 text-white shadow-lg">
                                <h3 className="text-3xl font-bold mb-2">24/7</h3>
                                <p className="text-purple-100">Style Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Products Section - Masonry Layout */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <Star className="h-4 w-4 fill-current" />
                        <span>Featured Collection</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Trending Now
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Handpicked styles just for you
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl p-6 shadow-lg animate-pulse">
                                <div className="h-64 bg-gray-200 rounded-2xl mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : featuredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No featured products available</p>
                    </div>
                ) : (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {featuredProducts.map((product, index) => {
                            // Use index to ensure deterministic mapping between seeded data order and image order
                            // This fixes the mismatch where "Red Handbag" showed a "White Dress" due to ID shifts
                            const imageIndex = (index % 16) + 1;

                            return (
                                <div
                                    key={product.id}
                                    className="break-inside-avoid mb-6 opacity-0 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div
                                        className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200"
                                        onClick={() => navigate(`/product/${product.id}`)}
                                    >
                                        {/* Product Image - Dynamic Height based on index */}
                                        <div className={`relative ${getProductCardHeight(imageIndex)} bg-gray-100 overflow-hidden`}>
                                            <div className="absolute top-4 right-4 z-10">
                                                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                                                    <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
                                                </button>
                                            </div>
                                            {product.discountPercentage > 0 && (
                                                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10">
                                                    {product.discountPercentage}% OFF
                                                </div>
                                            )}
                                            {/* Real Product Image */}
                                            <img
                                                src={getProductImage(imageIndex)}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                                                <span className="inline-block bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-blue-600 shadow-md whitespace-nowrap">
                                                    {product.categoryName}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-5">
                                            <div className="mb-2">
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                                                    {product.description}
                                                </p>
                                            </div>

                                            {/* Price & Actions */}
                                            <div className="flex items-center justify-between mt-4">
                                                {product.discountPercentage > 0 ? (
                                                    <div className="flex flex-col">
                                                        <span className="text-xl font-bold text-gray-900">
                                                            ₹{product.discountedPrice}
                                                        </span>
                                                        <span className="text-xs text-gray-400 line-through">
                                                            ₹{product.basePrice}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xl font-bold text-gray-900">
                                                        ₹{product.basePrice}
                                                    </span>
                                                )}
                                                <button
                                                    className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all transform hover:scale-105"
                                                    disabled={!product.inStock}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (!isAuthenticated) navigate('/register');
                                                    }}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Footer removed: now handled globally by MainLayout with Footer component */}
        </div>
    );
};

export default LandingPage;
