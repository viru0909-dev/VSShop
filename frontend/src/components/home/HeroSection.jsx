import React from 'react';

const HeroSection = () => {
    return (
        <section className="px-4 md:px-8 py-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[350px]">

                {/* Main Left Hero Card */}
                <div className="lg:col-span-7 bg-[#F3F0FA] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-center">
                    {/* Content */}
                    <div className="z-10 relative max-w-xs">
                        <div className="flex items-baseline gap-2 mb-1">
                            <span className="text-5xl font-black text-black tracking-tight">50%</span>
                            <span className="text-2xl font-medium text-black">off</span>
                        </div>
                        <h2 className="text-2xl text-gray-700 font-normal mb-4">Summer linen sale</h2>

                        <button className="bg-[#1A1F2C] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                            explore now
                        </button>
                    </div>

                    {/* Hero Image composite */}
                    <div className="absolute right-0 bottom-0 h-full w-2/3 pointer-events-none">
                        <div className="relative w-full h-full">
                            {/* User-provided hero image - masked/positioned */}
                            <img
                                src="/hero-man.png"
                                alt="Summer Fashion"
                                className="absolute bottom-0 right-0 h-full object-cover object-top mask-image-b"
                                style={{ maskImage: 'linear-gradient(to left, black 80%, transparent)' }}
                            />
                            {/* Small circle inset image as seen in figma */}
                            <div className="absolute bottom-4 right-[30%] w-20 h-20 rounded-full border-2 border-white overflow-hidden shadow-lg z-20 hidden md:block">
                                <img
                                    src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400&auto=format&fit=crop"
                                    alt="Fashion Detail"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="absolute bottom-2 right-[30%] text-[10px] font-medium text-gray-500 z-20 transform translate-y-full pt-1 text-center w-20 hidden md:block">Fashion</p>
                        </div>
                    </div>
                </div>

                {/* Right Column Grid */}
                <div className="lg:col-span-5 grid grid-rows-2 gap-6">

                    {/* Top Right Card */}
                    <div className="bg-[#E5F9F0] rounded-2xl p-0 relative overflow-hidden flex items-end justify-between h-full">
                        <div className="absolute bottom-0 left-0 w-auto max-w-[50%] h-full z-10 flex items-end">
                            <img
                                src="/hero-woman-white-sunglasses.png"
                                alt="Summer Sale"
                                className="h-full w-auto object-cover object-bottom"
                            />
                        </div>
                        <div className="w-1/2 text-right z-10 p-4 ml-auto">
                            <span className="inline-block px-2 py-0.5 border border-black/30 rounded-full text-[10px] font-medium mb-2">summer sale</span>
                            <h3 className="text-lg font-black text-black leading-tight uppercase">EXCLUSIVE<br />OFFERS</h3>
                        </div>
                    </div>

                    {/* Bottom Right Card */}
                    <div className="bg-[#EBF7FF] rounded-2xl p-0 relative overflow-hidden flex items-end h-full">
                        <div className="absolute bottom-0 left-0 w-1/2 h-full flex items-end justify-center z-10">
                            <img
                                src="/hero-woman-hat.png"
                                alt="Fashion"
                                className="w-full h-auto object-contain object-bottom drop-shadow-xl"
                            />
                        </div>
                        <div className="w-1/2 ml-auto p-4 z-10">
                            <h3 className="text-base font-bold text-gray-900 leading-tight mb-2">Smarter Tech for Modern Living</h3>
                            <button className="bg-[#1A1F2C] text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors">
                                explore now
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
