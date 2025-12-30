import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Plus, Trash2, Maximize2 } from 'lucide-react';

const ProductStackModal = ({ isOpen, onClose, product, isEditing = false, onSave }) => {
    const [images, setImages] = useState(product?.images || []);
    const [activeImage, setActiveImage] = useState(0);
    const [formData, setFormData] = useState({
        name: product?.name || '',
        price: product?.price || '',
        category: product?.category || 'Dresses',
        description: product?.description || '',
        stock: product?.stock || 0
    });

    // Reset form when product changes
    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: product?.name || '',
                price: product?.price || '',
                category: product?.category || 'Dresses',
                description: product?.description || '',
                stock: product?.stock || 0
            });
            setImages(product?.images || []);
        }
    }, [isOpen, product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (onSave) {
            onSave({
                ...formData,
                id: product?.id, // Preserve ID if editing
                images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'], // Default or selected
                status: 'Active' // Default status
            });
        }
    };

    if (!isOpen) return null;

    // "Stack Pop-out" Animation classes
    // We render this in a portal or z-50 overlay
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            ></div>

            <div className="relative w-full max-w-5xl bg-[#f2f1eb] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-stack-pop">
                <style>{`
                    @keyframes stackPop {
                        0% { opacity: 0; transform: scale(0.9) translateY(20px); }
                        100% { opacity: 1; transform: scale(1) translateY(0); }
                    }
                    .animate-stack-pop {
                        animation: stackPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                `}</style>

                {/* Left Side: Image Stack / Gallery */}
                <div className="w-full md:w-1/2 bg-white p-6 md:p-8 flex flex-col relative">
                    <button
                        className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur rounded-full z-10 hover:bg-black hover:text-white transition-colors"
                        onClick={() => { }} // Could be expand view
                    >
                        <Maximize2 className="w-4 h-4" />
                    </button>

                    <div className="flex-1 relative rounded-2xl overflow-hidden mb-4 bg-gray-50 group">
                        {images.length > 0 || product?.image ? (
                            <img
                                src={images.length > 0 ? images[activeImage] : product.image}
                                alt="Product Main"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                            <img
                                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                                alt="Default"
                                className="w-full h-full object-cover opacity-50"
                            />
                        )}
                    </div>

                    {/* Thumbnail Stack */}
                    <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                        <button className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-black transition-colors">
                            <Upload className="w-6 h-6 text-gray-400" />
                        </button>
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${activeImage === i - 1 ? 'border-black scale-105' : 'border-transparent hover:border-gray-200'
                                    }`}
                                onClick={() => setActiveImage(i - 1)}
                            >
                                <img
                                    src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&w=200&q=80`}
                                    className="w-full h-full object-cover"
                                    alt="thumbnail"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Details & Actions */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                                {isEditing ? 'EDIT MODE' : 'NEW PRODUCT'}
                            </span>
                            <h2 className="text-3xl font-bold text-gray-900 mt-4 leading-tight">
                                {formData.name || 'Untitled Product'}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-6 flex-1">
                        {/* Form Fields Mockup */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                                <input
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Vintage Denim Jacket"
                                    className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-black/5"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                        <input
                                            name="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={handleChange}
                                            className="w-full pl-8 pr-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-black/5"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-black/5 text-gray-600"
                                    >
                                        <option>Dresses</option>
                                        <option>Tops</option>
                                        <option>Outerwear</option>
                                        <option>Accessories</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Size Variants</label>
                                <div className="flex flex-wrap gap-2">
                                    {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                                        <button key={size} className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-black hover:text-white hover:border-black transition-colors font-medium text-sm">
                                            {size}
                                        </button>
                                    ))}
                                    <button className="w-10 h-10 rounded-lg border border-dashed border-gray-400 hover:bg-gray-100 flex items-center justify-center">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-xl bg-white border-none focus:ring-2 focus:ring-black/5 resize-none"
                                    placeholder="Describe your product..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-gray-200 flex items-center space-x-4">
                        <button
                            onClick={handleSave}
                            className="flex-1 bg-black text-white py-4 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform shadow-xl shadow-black/10"
                        >
                            {isEditing ? 'Save Changes' : 'Publish Product'}
                        </button>
                        {isEditing && (
                            <button className="p-4 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors">
                                <Trash2 className="w-6 h-6" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductStackModal;
