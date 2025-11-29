'use client';

import { ShoppingCart, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-white border-t border-white/10 relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-violet-500/5 to-transparent pointer-events-none"></div>

            <div className="container mx-auto px-6 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <ShoppingCart size={28} className="text-violet-500" />
                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">easyCart</h2>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Your one-stop destination for premium products. Experience shopping like never before with our curated collection and seamless delivery.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-violet-500 hover:text-white transition-all duration-300">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-violet-500 hover:text-white transition-all duration-300">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-violet-500 hover:text-white transition-all duration-300">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-violet-500 hover:text-white transition-all duration-300">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-violet-500 transition-colors flex items-center gap-2 group">
                                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-violet-500 transition-colors flex items-center gap-2 group">
                                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Shop
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-violet-500 transition-colors flex items-center gap-2 group">
                                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-violet-500 transition-colors flex items-center gap-2 group">
                                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400">
                                <MapPin size={20} className="text-violet-500 flex-shrink-0 mt-1" />
                                <span>123 Commerce St, Tech City, TC 90210</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Phone size={20} className="text-violet-500 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <Mail size={20} className="text-violet-500 flex-shrink-0" />
                                <span>support@easycart.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white">Newsletter</h3>
                        <p className="text-gray-400 mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
                        <form className="space-y-3">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
                                />
                            </div>
                            <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                                Subscribe <ArrowRight size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} easyCart. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
