import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="relative mt-20 overflow-hidden shrink-0">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMy4zMTQgMi42ODYtNiA2LTZzNi0yLjY4NiA2LTYtMi42ODYtNi02LTYtNiAyLjY4Ni02IDYgMi42ODYgNiA2IDZ6TTAgMTZjMC0zLjMxNCAyLjY4NiA2LTYtNnM2LTIuNjg2IDYtNi0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnpNMzYgNTJjMC0zLjMxNCAyLjY4NiA2IDYtNnM2LTIuNjg2IDYtNi0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnpNMCA1MmMwLTMuMzE0IDIuNjg2LTYgNi02czYtMi42ODYgNi02LTIuNjg2LTYtNi02LTYgMi42ODYtNiA2IDIuNjg2IDYgNiA2eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white rounded-2xl blur-lg opacity-20"></div>
                                <div className="relative bg-white/10 backdrop-blur-sm p-2.5 rounded-2xl border border-white/20">
                                    <ShoppingBag className="h-7 w-7 text-white" strokeWidth={2.5} />
                                </div>
                            </div>
                            <span className="text-2xl font-bold text-white">Orderly</span>
                        </div>
                        <p className="text-blue-100 leading-relaxed mb-6">
                            Quality products delivered with care. Your trusted partner for fashion.
                        </p>
                        <div className="flex space-x-3">
                            <button className="p-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/10 rounded-xl transition-all group">
                                <svg className="h-5 w-5 text-blue-100 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </button>
                            <button className="p-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/10 rounded-xl transition-all group">
                                <svg className="h-5 w-5 text-blue-100 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                            </button>
                            <button className="p-2.5 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/10 rounded-xl transition-all group">
                                <svg className="h-5 w-5 text-blue-100 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" /></svg>
                            </button>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg mb-4">Shop</h3>
                        <ul className="space-y-3">
                            <li className="text-blue-100 hover:text-white transition-colors cursor-pointer">New Arrivals</li>
                            <li className="text-blue-100 hover:text-white transition-colors cursor-pointer">Men's Fashion</li>
                            <li className="text-blue-100 hover:text-white transition-colors cursor-pointer">Women's Fashion</li>
                            <li className="text-blue-100 hover:text-white transition-colors cursor-pointer">Accessories</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li className="text-blue-100 hover:text-white transition-colors cursor-pointer">About Us</li>
                            <li className="text-blue-100 hover:text-white transition-colors cursor-pointer">Contact</li>
                            <li className="text-blue-100 hover:text-white transition-colors cursor-pointer">Careers</li>
                            <li className="text-blue-100 hover:text-white transition-colors cursor-pointer">Blog</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li className="text-blue-100 hover:text-white transition-colors cursor-pointer">Help Center</li>
                            <li className="text-blue-100 hover:text-white transition-colors cursor-pointer">Shipping Info</li>
                            <li className="text-blue-100 hover:text-white transition-colors cursor-pointer">Returns</li>
                            <li className="text-blue-100 hover:text-white transition-colors cursor-pointer">Privacy Policy</li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-blue-100 text-sm">
                            &copy; 2025 Orderly. All rights reserved. Made with <span className="text-red-400">❤️</span> for fresh living.
                        </p>
                        <div className="flex space-x-6 text-sm text-blue-100">
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
