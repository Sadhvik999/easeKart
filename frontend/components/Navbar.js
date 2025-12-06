'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShoppingCart, CircleUser, Search } from 'lucide-react';

export default function Navbar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('search') || '';

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState(initialSearch);

    // Sync state with URL param only if we are on the products page and param changes
    useEffect(() => {
        setSearchQuery(initialSearch);
        if (initialSearch) {
            setSearchOpen(true);
        }
    }, [initialSearch]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
        } else {
            router.push('/products');
        }
    };

    return (
        <nav className='fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10'>
            <div className='container mx-auto px-6 md:px-10 py-4'>
                <div className='flex items-center justify-between'>
                    {/* Logo */}
                    <div className='flex items-center gap-2 cursor-pointer' onClick={() => router.push('/')}>
                        <ShoppingCart size={24} className="text-violet-500" />
                        <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500'>easyCart</h1>
                    </div>

                    {/* Centered Navigation Links or Search Bar */}
                    <div className='hidden md:flex absolute left-1/2 -translate-x-1/2 transition-all duration-300'>
                        {!searchOpen ? (
                            <div className='flex gap-8 text-gray-300 font-medium'>
                                <button onClick={() => router.push('/')} className="hover:text-white transition-colors">Home</button>
                                <button onClick={() => router.push('/products')} className="hover:text-white transition-colors">Shop</button>
                                <button onClick={() => router.push('/#features')} className="hover:text-white transition-colors">Features</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSearch} className='relative w-96'>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className='w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all'
                                />
                                <button type="submit" className="absolute left-0 top-0 bottom-0 px-3 flex items-center justify-center text-gray-500 hover:text-white transition-colors">
                                    <Search className="w-5 h-5" />
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Right Side Icons */}
                    <div className='flex items-center gap-4'>
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className='hover:scale-110 transition-transform'
                        >
                            <Search size={24} className="text-gray-300 hover:text-white" />
                        </button>
                        <button onClick={() => router.push('/profile?tab=cart')} className='hover:scale-110 transition-transform'>
                            <ShoppingCart size={24} className="text-gray-300 hover:text-white" />
                        </button>
                        <button onClick={() => router.push('/profile')} className='hover:scale-110 transition-transform'>
                            <CircleUser size={24} className="text-violet-500" />
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {searchOpen && (
                    <div className='md:hidden mt-4 pb-2 animate-in fade-in slide-in-from-top-2'>
                        <form onSubmit={handleSearch} className='relative w-full'>
                            <input
                                type="text"
                                placeholder="Search products..."
                                autoFocus
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className='w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 pl-10 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all'
                            />
                            <button type="submit" className="absolute left-0 top-0 bottom-0 px-3 flex items-center justify-center text-gray-500 hover:text-white transition-colors">
                                <Search className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </nav>
    );
}
