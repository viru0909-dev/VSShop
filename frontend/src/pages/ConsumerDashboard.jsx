import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ConsumerDashboard = () => {
    const navigate = useNavigate();

    // Mock Data
    const [user] = useState({
        name: "Sarthak Sonawane",
        email: "sarthak@example.com",
        avatar: "👨‍🚀",
        credits: "₹ 2,450",
        membership: "Titanium"
    });

    const [orders] = useState([
        { id: "ORD-8859", product: "Quantum Headset X", date: "Today, 10:23 AM", status: "Out for Delivery", progress: 80, price: "₹12,999", image: "🎧" },
        { id: "ORD-8858", product: "CyberPunk Keyboard", date: "Yesterday", status: "Delivered", progress: 100, price: "₹4,599", image: "⌨️" },
        { id: "ORD-8855", product: "Holographic Display", date: "24 Dec 2024", status: "Processing", progress: 25, price: "₹45,000", image: "🖥️" },
    ]);

    return (
        <div className="min-h-screen bg-[#b6fbff] text-gray-900 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden relative">
            {/* Background Gradients (Subtle for light mode) */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/30 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-400/30 rounded-full blur-[120px]"></div>
            </div>

            {/* Navbar */}
            <nav className="border-b border-white/30 bg-white/40 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                                V
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-indigo-900 to-indigo-700 bg-clip-text text-transparent">
                                VSShop
                            </span>
                        </div>

                        <div className="flex items-center gap-6">
                            <button className="text-gray-600 hover:text-gray-900 transition-colors relative">
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </button>
                            <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                                    <p className="text-xs text-indigo-600">{user.membership}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-white border border-white/50 flex items-center justify-center text-xl shadow-sm">
                                    {user.avatar}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-xl">
                            <div className="flex flex-col items-center mb-8">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 p-[2px] mb-4 shadow-lg shadow-purple-500/20">
                                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl">
                                        {user.avatar}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
                                <p className="text-gray-600 text-sm">{user.email}</p>
                            </div>

                            <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6"></div>

                            <nav className="space-y-2">
                                {['Overview', 'Orders', 'Wishlist', 'Address', 'Settings'].map((item, idx) => (
                                    <button key={item}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-3
                    ${idx === 0
                                                ? 'bg-white/60 border border-white/60 text-indigo-700 shadow-sm'
                                                : 'text-gray-600 hover:bg-white/40 hover:text-gray-900'}`}
                                    >
                                        <span>{idx === 0 ? '📊' : idx === 1 ? '📦' : idx === 2 ? '❤️' : idx === 3 ? '📍' : '⚙️'}</span>
                                        {item}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 relative overflow-hidden group text-white shadow-lg">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] rounded-full group-hover:bg-white/20 transition-all duration-500"></div>
                            <h4 className="text-indigo-100 text-sm font-semibold mb-1">VSShop Credits</h4>
                            <p className="text-3xl font-bold mb-4 tracking-tight">{user.credits}</p>
                            <button className="w-full py-2 bg-white/20 hover:bg-white/30 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors backdrop-blur-sm">
                                Top Up
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-8">

                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { label: 'Total Orders', val: '24', icon: '🛍️', color: 'from-blue-200 to-cyan-200', text: 'text-blue-700' },
                                { label: 'Pending Reviews', val: '2', icon: '⭐', color: 'from-orange-200 to-yellow-200', text: 'text-orange-700' },
                                { label: 'Returns', val: '0', icon: '↩️', color: 'from-pink-200 to-rose-200', text: 'text-pink-700' }
                            ].map((stat, i) => (
                                <div key={i} className={`bg-white/40 border border-white/50 rounded-2xl p-6 flex items-center justify-between shadow-sm`}>
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold mb-1">{stat.label}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.val}</p>
                                    </div>
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-inner`}>
                                        {stat.icon}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Active Orders */}
                        <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    Active Orders <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full border border-indigo-200">Live Tracking</span>
                                </h2>
                                <button className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors">View All &rarr;</button>
                            </div>

                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order.id} className="group flex flex-col md:flex-row items-center gap-6 p-4 rounded-xl bg-white/60 border border-white/60 hover:border-indigo-300 transition-all duration-300 relative overflow-hidden shadow-sm hover:shadow-md">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

                                        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-3xl shadow-inner border border-gray-200">
                                            {order.image}
                                        </div>

                                        <div className="flex-1 w-full text-center md:text-left">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors">{order.product}</h3>
                                                <span className="font-mono text-indigo-600 font-semibold">{order.price}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Order ID: {order.id}</p>

                                            {/* Tracking Bar */}
                                            <div className="relative pt-1">
                                                <div className="flex mb-2 items-center justify-between">
                                                    <div>
                                                        <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full 
                                                            ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className="text-right">
                                                        <span className="text-xs font-semibold inline-block text-indigo-600">
                                                            {order.progress}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                                                    <div style={{ width: `${order.progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommendations / Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                                <h3 className="font-bold text-white mb-2">Exclusive Offer</h3>
                                <p className="text-indigo-100 text-sm mb-4">Get 20% off on your next tech purchase with Premium membership.</p>
                                <div className="w-full h-32 rounded-lg bg-white/10 border border-dashed border-white/30 flex items-center justify-center backdrop-blur-sm">
                                    <span className="text-white text-sm font-mono tracking-widest">VS-PREMIUM-20</span>
                                </div>
                            </div>
                            <div className="bg-white/40 border border-white/50 rounded-2xl p-6 flex items-center justify-between cursor-pointer hover:bg-white/60 transition-colors shadow-sm">
                                <div>
                                    <h3 className="font-bold text-gray-900">Need Help?</h3>
                                    <p className="text-gray-500 text-sm">Chat with our AI support</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-xl">
                                    💬
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsumerDashboard;
