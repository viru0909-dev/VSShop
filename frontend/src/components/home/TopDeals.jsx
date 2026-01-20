import React from 'react';
import { ArrowRight } from 'lucide-react';

const deals = [
    { name: 'Monitors', price: 'From 6579 onwards', img: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?q=80&w=300&auto=format&fit=crop' },
    { name: 'Projectors', price: 'From 6990 onwards', img: '/product-projector.jpg' },
    { name: 'SmartWatch', price: 'From 1399 onwards', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&auto=format&fit=crop' },
    { name: 'TWS', price: 'Grab Now', img: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=300&auto=format&fit=crop' }
];

const TopDeals = () => {
    return (
        <section className="px-4 md:px-8 py-2">
            <div className="bg-[#F3F0FA] rounded-2xl p-6 relative">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">Top Deals</h2>
                    <button className="p-2 hover:bg-white/50 rounded-full transition-colors">
                        <ArrowRight className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {deals.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center h-full">
                            <div className="w-full h-32 mb-4 flex items-center justify-center">
                                <img src={item.img} alt={item.name} className="max-h-full max-w-full object-contain" />
                            </div>
                            <h3 className="text-gray-500 font-medium mb-1">{item.name}</h3>
                            <p className="text-black font-bold text-sm w-3/4 leading-tight">{item.price}</p>
                        </div>
                    ))}

                    {/* Floating Arrow on right desktop */}
                    <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform hidden md:block">
                        <ArrowRight className="w-5 h-5 text-gray-600" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopDeals;
