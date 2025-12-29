import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Grid, Plus, Package, LogOut, Search, Bell, Settings, ChevronRight, ShoppingBag, TrendingUp, Edit2 } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import { getProductImage } from '../../lib/productImages';
import ProductStackModal from '../../components/ProductStackModal';

const SellerDashboard = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    // State for grid density preference: 'compact' | 'spacious'
    const [gridDensity, setGridDensity] = useState('spacious');

    // Modal State
    const [isStackOpen, setStackOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Initial Mock Data (Moved to state)
    const [products, setProducts] = useState(Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        name: `Fashion Item ${i + 1}`,
        price: (i + 1) * 1200,
        stock: 12 + i,
        status: i % 3 === 0 ? 'Low Stock' : 'Active',
        image: getProductImage(i + 1)
    })));

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const openProductStack = (product = null) => {
        setSelectedProduct(product);
        setStackOpen(true);
    };

    const handleStackSave = (productData) => {
        if (selectedProduct) {
            // Update existing
            setProducts(products.map(p => p.id === productData.id ? { ...p, ...productData } : p));
        } else {
            // Add new
            const newProduct = {
                ...productData,
                id: products.length + 100, // simple ID generation
                image: productData.image || getProductImage((products.length % 16) + 1) // Cycle images if none provided
            };
            setProducts([newProduct, ...products]);
        }
        setStackOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#f2f1eb]"> {/* Soft beige/gray background */}

            {/* Top Navigation - Floating Pill Style */}
            <nav className="fixed top-6 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto bg-white/80 backdrop-blur-xl px-6 py-3 rounded-full shadow-sm border border-white/50 flex items-center space-x-3">
                    <div className="bg-black p-1.5 rounded-full">
                        <ShoppingBag className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-bold text-gray-900 tracking-tight">Orderly.</span>
                </div>

                <div className="pointer-events-auto flex items-center space-x-3">
                    <div className="bg-white/80 backdrop-blur-xl pl-4 pr-1 py-1.5 rounded-full shadow-sm border border-white/50 flex items-center">
                        <Search className="w-4 h-4 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            className="bg-transparent border-none focus:outline-none text-sm w-48 placeholder:text-gray-400"
                        />
                        <button className="bg-black text-white p-2 rounded-full hover:scale-105 transition-transform">
                            <Search className="w-3 h-3" />
                        </button>
                    </div>

                    <button className="bg-white/80 backdrop-blur-xl p-3 rounded-full shadow-sm border border-white/50 hover:bg-white transition-colors relative">
                        <Bell className="w-4 h-4 text-gray-600" />
                        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="bg-white/80 backdrop-blur-xl p-1.5 pr-4 rounded-full shadow-sm border border-white/50 flex items-center space-x-2 cursor-pointer hover:bg-white transition-colors" onClick={handleLogout}>
                        <img
                            src={`https://ui-avatars.com/api/?name=${user?.name || 'Seller'}&background=random`}
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-semibold text-gray-700">{user?.name?.split(' ')[0]}</span>
                    </div>
                </div>
            </nav>

            {/* Sidebar - Floating Card */}
            <div className="fixed top-24 left-6 bottom-6 w-20 flex flex-col items-center py-8 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white/50 shadow-sm hidden md:flex z-20">
                <div className="space-y-6 w-full flex flex-col items-center">
                    <button className="p-3 bg-black text-white rounded-2xl shadow-lg hover:scale-110 transition-transform">
                        <LayoutGrid className="w-6 h-6" />
                    </button>
                    <button
                        className="p-3 text-gray-400 hover:text-black hover:bg-gray-100/50 rounded-2xl transition-all"
                        onClick={() => openProductStack(null)}
                    >
                        <Plus className="w-6 h-6" />
                    </button>
                </div>

                <div className="mt-auto">
                    <button onClick={handleLogout} className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                        <LogOut className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="pt-28 pb-12 px-6 md:pl-32 transition-all duration-300">
                <div className="max-w-[1600px] mx-auto">

                    {/* Hero / Header Card */}
                    <div className="bg-[#e8e6d9] rounded-[3rem] p-12 mb-8 relative overflow-hidden min-h-[400px] flex items-center">
                        <div className="relative z-10 max-w-xl">
                            <div className="inline-flex items-center space-x-2 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-gray-700 mb-6">
                                <span>New Season 2025</span>
                            </div>
                            <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Timeless Style <br /> & Elegance.
                            </h1>
                            <div className="flex items-center space-x-4 mb-8">
                                <span className="text-6xl font-outline-2 text-transparent font-bold stroke-black opacity-20">01</span>
                                <div className="h-px bg-gray-400 w-24"></div>
                                <div className="text-gray-600">
                                    <p className="font-bold text-gray-900">Summer Collection</p>
                                    <p className="text-sm">Discover the latest trends in fashion</p>
                                </div>
                            </div>
                            <button className="bg-[#ccff00] text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center space-x-2">
                                <span>View Collection</span>
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Hero Image */}
                        <div className="absolute top-0 right-0 w-[50%] h-full">
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#e8e6d9] z-10"></div>
                            <img
                                src={getProductImage(3)} // Use a specific fashion image (e.g. Woman in coat)
                                alt="Hero Fashion"
                                className="w-full h-full object-cover object-top opacity-90"
                            />
                        </div>
                    </div>

                    {/* Bento Grid Layout for Widgets */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Best Selling Widget */}
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm col-span-1 md:col-span-1 flex flex-col justify-between h-[400px] cursor-pointer hover:shadow-xl transition-all group overflow-hidden">
                            <div className="flex justify-between items-start z-10">
                                <div>
                                    <h3 className="text-xl font-bold group-hover:translate-x-1 transition-transform">Best Selling <br /> Summer Dress</h3>
                                </div>
                                <div className="bg-gray-100 p-3 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex-1 flex items-center justify-center overflow-hidden my-4 rounded-2xl relative">
                                <img
                                    src={getProductImage(5)}
                                    alt="Best Seller"
                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <button className="bg-white border border-gray-200 p-3 rounded-full w-12 h-12 flex items-center justify-center hover:bg-black hover:text-white transition-colors self-end z-10">
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Colors Widget */}
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm col-span-1 flex flex-col justify-center items-center h-[400px] hover:shadow-xl transition-all group">
                            <h3 className="text-xl font-bold mb-8 group-hover:scale-105 transition-transform">Trending Palettes</h3>
                            <div className="flex space-x-4">
                                {['bg-[#E6C6B3]', 'bg-[#8B5E3C]', 'bg-[#2E4053]', 'bg-[#95A5A6]'].map((color, i) => (
                                    <div
                                        key={i}
                                        className={`${color} w-16 h-16 rounded-full shadow-lg ring-4 ring-white cursor-pointer hover:scale-125 transition-transform duration-300 hover:shadow-2xl`}
                                    ></div>
                                ))}
                            </div>
                            <p className="mt-8 text-gray-500 text-sm text-center font-medium">Curated colors for <br /> the modern wardrobe</p>
                            <button className="mt-6 text-xs text-gray-400 hover:text-black border-b border-transparent hover:border-black transition-all">View Analytics</button>
                        </div>

                        {/* New Arrival Widget */}
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-[2.5rem] p-8 shadow-sm col-span-1 relative overflow-hidden h-[400px] group cursor-pointer hover:shadow-xl transition-all">
                            <div className="absolute top-8 right-8 bg-white p-3 rounded-full z-10 group-hover:bg-black group-hover:text-white transition-colors">
                                <ChevronRight className="w-5 h-5" />
                            </div>
                            <div className="mt-12 relative z-10 pointer-events-none">
                                <h3 className="text-2xl font-bold mb-2 group-hover:translate-x-1 transition-transform">Urban Street <br /> Jacket</h3>
                                <p className="text-gray-500 font-medium">Premium Denim Collection</p>
                            </div>
                            <img
                                src={getProductImage(12)}
                                alt="New Arrival"
                                className="absolute bottom-0 right-0 w-[85%] h-[85%] object-cover object-top rounded-tl-[3rem] shadow-2xl group-hover:scale-105 group-hover:rotate-2 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Inventory Grid - Masonry */}
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Inventory</h2>
                            <button
                                onClick={() => openProductStack(null)}
                                className="bg-black text-white px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform flex items-center space-x-2"
                            >
                                <Plus className="w-4 h-4" />
                                <span>Add Product</span>
                            </button>
                        </div>

                        {/* Dynamic Masonry Logic using CSS Columns with NATURAL image heights */}
                        <div className={`columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6`}>
                            {products.map((product, index) => {
                                return (
                                    <div
                                        key={product.id}
                                        className="break-inside-avoid bg-white rounded-[2rem] p-4 hover:shadow-xl transition-all duration-300 group cursor-pointer mb-6"
                                        onClick={() => openProductStack(product)}
                                    >
                                        <div className={`relative bg-gray-100 rounded-[1.5rem] mb-4 overflow-hidden`}>
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-full text-[10px] font-bold uppercase z-10">
                                                {product.status}
                                            </div>
                                            {/* h-auto allows the image to dictate height */}
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="px-2">
                                            <h3 className="font-bold text-gray-900 truncate">{product.name}</h3>
                                            <div className="flex justify-between items-center mt-2">
                                                <span className="text-gray-500 text-sm">₹{product.price}</span>
                                                <button className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                                                    <Edit2 className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Stack Modal */}
            <ProductStackModal
                isOpen={isStackOpen}
                onClose={() => setStackOpen(false)}
                product={selectedProduct}
                isEditing={!!selectedProduct}
                onSave={handleStackSave}
            />
        </div>
    );
};

export default SellerDashboard;
