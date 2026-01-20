import React from 'react';
import { ArrowRight } from 'lucide-react';

const categories = [
    { name: 'Fashion', img: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=200&auto=format&fit=crop' },
    { name: 'Electronics', img: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=200&auto=format&fit=crop' },
    { name: 'Home & Kitchen', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=200&auto=format&fit=crop' },
    { name: 'Toys & Baby Products', img: '/category-toys.jpg' },
    { name: 'Books', img: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=200&auto=format&fit=crop' },
    { name: 'Grocery', img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=200&auto=format&fit=crop' },
    { name: "TV's & Appliances", img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=200&auto=format&fit=crop' },
];

const Categories = () => {
    return (
        <section className="px-4 md:px-8 py-8">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Featured Categories</h2>
            </div>

            <div className="flex items-start justify-between gap-4 overflow-x-auto no-scrollbar py-2">
                {categories.map((cat, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-3 min-w-[100px] group cursor-pointer">
                        <div className="w-24 h-24 rounded-full overflow-hidden shadow-sm border border-gray-100 group-hover:shadow-md transition-all">
                            <img
                                src={cat.img}
                                alt={cat.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                        <span className="text-sm font-semibold text-gray-800 text-center leading-tight max-w-[100px]">
                            {cat.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
