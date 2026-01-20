import React from 'react';

const products = [
    { name: 'Beauty', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=300&auto=format&fit=crop' },
    { name: 'Appliances', img: '/product-appliances.jpg' },
    { name: 'Bedding', img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=300&auto=format&fit=crop' },
    { name: 'Coffee', img: '/product-coffee.jpg' },
];

const CustomersLovedProducts = () => {
    return (
        <section className="px-4 md:px-8 py-8">
            <div className="bg-[#FEF9E3] rounded-2xl p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Customers most loved products
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products.map((product, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        >
                            <div className="aspect-square">
                                <img
                                    src={product.img}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CustomersLovedProducts;
