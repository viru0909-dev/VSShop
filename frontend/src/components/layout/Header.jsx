import React from 'react';
import { Search, ShoppingCart, Menu, ChevronDown, MapPin, Share2, Bell } from 'lucide-react';

const Header = () => {
    return (
        <header className="w-full bg-white font-sans">
            {/* Top Bar */}
            <div className="border-b border-gray-100 py-3 px-4 md:px-8 flex items-center justify-between gap-4">

                {/* Left Side: Lang & Address */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center text-xs font-semibold text-gray-600 cursor-pointer">
                        EN <ChevronDown className="w-3 h-3 ml-1" />
                    </div>

                    <button className="flex items-center px-3 py-1.5 border border-purple-100 rounded text-xs text-purple-400 font-medium bg-purple-50/50">
                        Address
                    </button>
                </div>

                {/* Center: Search Bar */}
                <div className="flex-1 max-w-xl mx-auto relative">
                    <div className="relative flex items-center bg-gray-100/50 rounded-lg overflow-hidden border border-transparent focus-within:border-gray-200 transition-colors">
                        <Menu className="w-4 h-4 text-gray-400 ml-3" />
                        <input
                            type="text"
                            placeholder="Search Products"
                            className="w-full py-2 px-3 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
                        />
                        <Search className="w-4 h-4 text-gray-400 mr-3" />
                    </div>
                </div>

                {/* Right Side: Auth & Actions */}
                <div className="flex items-center gap-3 shrink-0">
                    <button className="px-5 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded hover:bg-gray-50 transition-colors">
                        Register
                    </button>

                    <button className="px-5 py-1.5 text-xs font-medium text-white bg-indigo-400/90 rounded shadow-sm hover:bg-indigo-500 transition-colors">
                        sign in
                    </button>

                    <div className="relative p-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full absolute top-0 right-0 border border-white"></div>
                        <Bell className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Navigation Bar */}
            <div className="py-3 px-4 md:px-8 flex items-center justify-between">
                <div className="flex items-center gap-6 overflow-x-auto no-scrollbar flex-1">
                    {/* All Categories Trigger */}
                    <button className="flex items-center gap-2 text-sm font-bold text-gray-800 shrink-0">
                        <Menu className="w-4 h-4" />
                        All Categories
                    </button>

                    {/* Nav Links */}
                    <nav className="flex items-center gap-4 flex-1 justify-between">
                        {['Best sellers', 'Mobiles', 'Todays Deals', 'New Releases', 'Fashion', 'Electronics', 'Home and Kitchen'].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-sm font-medium text-gray-500 hover:text-gray-900 whitespace-nowrap"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Right Side Icons */}
                <div className="flex items-center gap-4 pl-4 shrink-0">
                    <Share2 className="w-5 h-5 text-blue-500" />
                    <ShoppingCart className="w-5 h-5 text-indigo-400" />
                </div>
            </div>
        </header>
    );
};

export default Header;
