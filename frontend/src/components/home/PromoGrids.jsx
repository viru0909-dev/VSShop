import React from 'react';

const PromoGrids = () => {
    return (
        <section className="px-4 md:px-8 py-8 space-y-6">
            {/* Two cards row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Card - Appliances */}
                <div className="bg-[#EBF7FF] rounded-2xl p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Appliances for your home | upto 55% off
                    </h3>

                    <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-sm">
                        <img
                            src="/promo-appliances.jpg"
                            alt="Home Appliances"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <a href="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-4">
                        See more
                    </a>
                </div>

                {/* Right Card - Home Essentials */}
                <div className="bg-[#E5F9F0] rounded-2xl p-6 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Deals for Home Essentials | Starting from ₹49
                    </h3>

                    <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-sm">
                        <img
                            src="/promo-home-essentials.jpg"
                            alt="Home Essentials"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <a href="#" className="text-sm text-green-600 hover:text-green-800 font-medium mt-4">
                        See more
                    </a>
                </div>
            </div>
        </section>
    );
};

export default PromoGrids;
