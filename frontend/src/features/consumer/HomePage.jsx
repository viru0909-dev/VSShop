import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ShoppingBag, ShoppingCart, User, Search, Star, TrendingUp, Package, Heart, LogOut, ChevronRight, Bell, Grid, LayoutGrid, Filter, Plus } from 'lucide-react';
import { productsAPI } from '../../lib/api';
import { getProductImage } from '../../lib/productImages';
import useAuthStore from '../../store/authStore';

const HomePage = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

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
        <div className="min-h-screen bg-[#f2f1eb]">
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

            {/* Soft UI Consumer Navbar - Floating Pills */}
            <nav className="fixed top-6 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
                <div
                    className="pointer-events-auto bg-white/80 backdrop-blur-xl px-6 py-3 rounded-full shadow-sm border border-white/50 flex items-center space-x-3 cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    <div className="bg-black p-1.5 rounded-full">
                        <ShoppingBag className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900 tracking-tight">Orderly.</span>
                </div>

                <div className="pointer-events-auto flex items-center space-x-3">
                    <div className="hidden md:flex bg-white/80 backdrop-blur-xl pl-4 pr-1 py-1.5 rounded-full shadow-sm border border-white/50 items-center">
                        <Search className="w-4 h-4 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Find your style..."
                            className="bg-transparent border-none focus:outline-none text-sm w-48 placeholder:text-gray-400"
                        />
                        <button className="bg-black text-white p-2 rounded-full hover:scale-105 transition-transform">
                            <Search className="w-3 h-3" />
                        </button>
                    </div>

                    <button className="bg-white/80 backdrop-blur-xl p-3 rounded-full shadow-sm border border-white/50 hover:bg-white transition-colors relative group" onClick={() => navigate('/cart')}>
                        <ShoppingCart className="w-4 h-4 text-gray-600 group-hover:text-blue-600" />
                        <span className="absolute top-2.5 right-2 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    </button>

                    <div className="bg-white/80 backdrop-blur-xl p-1.5 pr-4 rounded-full shadow-sm border border-white/50 flex items-center space-x-2 cursor-pointer hover:bg-white transition-colors">
                        <div className="bg-gray-100 p-1.5 rounded-full">
                            <User className="w-5 h-5 text-gray-600" />
                        </div>
                        <span className="text-sm font-semibold text-gray-700 hidden sm:block">{user?.name || 'Guest'}</span>
                    </div>

                    <button onClick={handleLogout} className="bg-white/80 backdrop-blur-xl p-3 rounded-full shadow-sm border border-white/50 hover:bg-red-50 hover:text-red-600 transition-colors">
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="pt-28 pb-12 px-6">
                <div className="max-w-[1600px] mx-auto">

                    {/* Dashboard Welcome / Hero */}
                    <div className="bg-[#e8e6d9] rounded-[3rem] p-12 mb-8 relative overflow-hidden min-h-[400px] flex items-center">
                        <div className="relative z-10 max-w-xl">
                            <div className="inline-flex items-center space-x-2 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-gray-700 mb-6">
                                <span>Welcome Back, {user?.name?.split(' ')[0]}</span>
                            </div>
                            <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Discover Your <br /> Daily Style.
                            </h1>
                            <div className="flex items-center space-x-4 mb-8">
                                <span className="text-6xl font-outline-2 text-transparent font-bold stroke-black opacity-20">01</span>
                                <div className="h-px bg-gray-400 w-24"></div>
                                <div className="text-gray-600">
                                    <p className="font-bold text-gray-900">Personalized Feed</p>
                                    <p className="text-sm">Curated just for you</p>
                                </div>
                            </div>
                            <button className="bg-[#ccff00] text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center space-x-2">
                                <span>Browse Collection</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="absolute top-0 right-0 w-[50%] h-full">
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#e8e6d9] z-10"></div>
                            <img
                                src={getProductImage(9)} // Fashion image
                                alt="Style Hero"
                                className="w-full h-full object-cover object-center opacity-90"
                            />
                        </div>
                    </div>

                    {/* Bento Grid layout for Categories/Offers */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {/* Category 1 */}
                        <div
                            className="bg-white rounded-[2.5rem] p-8 shadow-sm col-span-1 flex flex-col justify-between h-[350px] cursor-pointer hover:shadow-xl transition-all group overflow-hidden"
                            onClick={() => navigate('/category/dresses')}
                        >
                            <div className="flex justify-between items-start z-10">
                                <h3 className="text-2xl font-bold group-hover:translate-x-1 transition-transform">Women's <br /> Dresses</h3>
                                <div className="bg-gray-100 p-3 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex-1 mt-4 relative rounded-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=800&q=80"
                                    alt="Dresses"
                                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </div>

                        {/* Category 2 */}
                        <div
                            className="bg-white rounded-[2.5rem] p-8 shadow-sm col-span-1 flex flex-col justify-between h-[350px] cursor-pointer hover:shadow-xl transition-all group overflow-hidden"
                            onClick={() => navigate('/category/outerwear')}
                        >
                            <div className="flex justify-between items-start z-10">
                                <h3 className="text-2xl font-bold group-hover:translate-x-1 transition-transform">Luxury <br /> Outerwear</h3>
                                <div className="bg-gray-100 p-3 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex-1 mt-4 relative rounded-2xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
                                    alt="Outerwear"
                                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                        </div>

                        {/* Offers Card */}
                        <div className="bg-black text-white rounded-[2.5rem] p-8 shadow-sm col-span-1 flex flex-col justify-between h-[350px] relative overflow-hidden group cursor-pointer">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black z-0"></div>
                            {/* Abstract Shapes */}
                            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-gray-800/30 rounded-full blur-3xl group-hover:bg-gray-700/30 transition-colors"></div>
                            <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-[#ccff00]/10 rounded-full blur-3xl group-hover:bg-[#ccff00]/20 transition-colors"></div>

                            <div className="relative z-10">
                                <span className="bg-[#ccff00] text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">LIMITED TIME</span>
                                <h3 className="text-4xl font-bold mt-6 leading-tight group-hover:scale-105 transition-transform origin-left">50% OFF <br /> Summer Sale</h3>
                                <p className="text-gray-400 mt-2 font-medium">On selected items</p>
                            </div>
                            <button className="relative z-10 bg-white text-black px-8 py-4 rounded-full font-bold w-fit hover:bg-[#ccff00] hover:scale-105 transition-all flex items-center shadow-lg shadow-white/10">
                                Shop Sale
                                <ChevronRight className="w-4 h-4 ml-2" />
                            </button>
                        </div>
                    </div>


                    {/* Products Section */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Featured For You</h2>
                        <div className="flex space-x-2">
                            <button className="bg-white p-2 rounded-full border border-gray-200 hover:bg-gray-50">
                                <Filter className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-80 bg-gray-200 rounded-3xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                            {featuredProducts.map((product, index) => {
                                const imageIndex = (index % 16) + 1;
                                return (
                                    <div
                                        key={product.id}
                                        className="break-inside-avoid mb-6 opacity-0 animate-fade-in-up"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div
                                            className="group bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
                                            onClick={() => navigate(`/product/${product.id}`)}
                                        >
                                            <div className="relative bg-gray-100 overflow-hidden">
                                                <div className="absolute top-4 right-4 z-10">
                                                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                                                        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
                                                    </button>
                                                </div>
                                                {product.discountPercentage > 0 && (
                                                    <div className="absolute top-4 left-4 bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg z-10">
                                                        -{product.discountPercentage}%
                                                    </div>
                                                )}
                                                {/* h-auto for dynamic masonry sizing based on image */}
                                                <img
                                                    src={getProductImage(imageIndex)}
                                                    alt={product.name}
                                                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-bold text-gray-900 truncate mb-1">{product.name}</h3>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="text-gray-500 text-xs">{product.categoryName}</span>
                                                        {product.discountPercentage > 0 ? (
                                                            <div className="flex items-center space-x-2 mt-1">
                                                                <span className="font-bold text-gray-900">₹{product.discountedPrice}</span>
                                                                <span className="text-xs text-gray-400 line-through">₹{product.basePrice}</span>
                                                            </div>
                                                        ) : (
                                                            <span className="font-bold text-gray-900 mt-1">₹{product.basePrice}</span>
                                                        )}
                                                    </div>
                                                    <button className="bg-black text-white p-2.5 rounded-full hover:bg-gray-800 transition-transform hover:scale-110 shadow-lg shadow-black/20">
                                                        <ShoppingBag className="h-4 w-4" />
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
            </div>
        </div>
    );
};

export default HomePage;
