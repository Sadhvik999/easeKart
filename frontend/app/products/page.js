'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShoppingCart, Star, ArrowLeft, Filter, Search, X } from 'lucide-react';
import { BackgroundGradient } from "../../components/ui/background-gradient";

export default function ProductsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchOpen, setSearchOpen] = useState(false);
    const [sortBy, setSortBy] = useState('default');
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
    const [searchQuery, setSearchQuery] = useState(searchParam || '');

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const backend = process.env.NEXT_PUBLIC_BACKEND;
                let url = `${backend}/api/getAllProducts`;

                if (searchParam) {
                    url = `${backend}/api/searchProducts?query=${searchParam}`;
                } else if (categoryParam && categoryParam !== 'all') {
                    url = `${backend}/api/getProductByCategory/${categoryParam}`;
                }

                const res = await fetch(url);
                const fetchedData = await res.json();
                if (Array.isArray(fetchedData)) {
                    setProducts(fetchedData);
                }
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [categoryParam, searchParam]);

    // Update selected category when URL param changes
    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        } else {
            setSelectedCategory('all');
        }
    }, [categoryParam]);

    // Update search query when URL param changes
    useEffect(() => {
        if (searchParam) {
            setSearchQuery(searchParam);
            setSearchOpen(true);
        }
    }, [searchParam]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${searchQuery}`);
        } else {
            router.push('/products');
        }
    };

    const sortProducts = (productsToSort) => {
        const sorted = [...productsToSort];

        switch (sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => a.price - b.price);
            case 'price-high':
                return sorted.sort((a, b) => b.price - a.price);
            default:
                return sorted;
        }
    };

    const displayedProducts = sortProducts(products);
    const categories = ['all', ...new Set(products.map(p => p.Category).filter(Boolean))];

    return (
        <div className='min-h-screen bg-black text-white font-sans'>
            {/* Navigation */}
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
                                    <a href="/" className="hover:text-white transition-colors">Home</a>
                                    <a href="/products" className="text-white">Shop</a>
                                    <a href="#" className="hover:text-white transition-colors">Features</a>
                                </div>
                            ) : (
                                <form onSubmit={handleSearch} className='relative w-96'>
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        autoFocus
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className='w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all'
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
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
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className='pt-24 pb-16'>
                <div className='container mx-auto px-6'>
                    {/* Header */}
                    <div className='mb-12'>
                        <button
                            onClick={() => router.back()}
                            className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors group"
                        >
                            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            Back
                        </button>

                        <h1 className='text-4xl md:text-5xl font-bold mb-4'>All Products</h1>
                        <p className='text-gray-400 text-lg'>Browse our complete collection of premium tech products</p>
                    </div>

                    {/* Sort and Filter Bar */}
                    <div className='mb-8 flex items-center justify-between flex-wrap gap-4'>
                        <div className='flex items-center gap-3'>
                            {selectedCategory !== 'all' && (
                                <div className='flex items-center gap-2 bg-violet-500/20 border border-violet-500/30 rounded-full px-4 py-2'>
                                    <span className='text-sm text-violet-300'>
                                        Category: <span className='font-semibold text-white'>{selectedCategory}</span>
                                    </span>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory('all');
                                            router.push('/products');
                                        }}
                                        className='hover:bg-violet-500/30 rounded-full p-1 transition-colors'
                                    >
                                        <X size={14} className="text-violet-300" />
                                    </button>
                                </div>
                            )}
                            <div className='text-gray-400'>
                                Showing {displayedProducts.length} {displayedProducts.length === 1 ? 'product' : 'products'}
                            </div>
                        </div>

                        <div className='flex items-center gap-3 flex-wrap'>
                            {/* Category Filter */}
                            <div className='flex items-center gap-2'>
                                <Filter size={18} className="text-gray-400" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => {
                                        setSelectedCategory(e.target.value);
                                        if (e.target.value === 'all') {
                                            router.push('/products');
                                        } else {
                                            router.push(`/products?category=${e.target.value}`);
                                        }
                                    }}
                                    className='bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all cursor-pointer hover:bg-white/10'
                                >
                                    <option value="all" className='bg-zinc-900'>All Categories</option>
                                    {categories.filter(c => c !== 'all').map((category) => (
                                        <option key={category} value={category} className='bg-zinc-900'>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort Dropdown */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className='bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all cursor-pointer hover:bg-white/10'
                            >
                                <option value="default" className='bg-zinc-900'>Default</option>
                                <option value="price-low" className='bg-zinc-900'>Price: Low to High</option>
                                <option value="price-high" className='bg-zinc-900'>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className='flex items-center justify-center py-20'>
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {displayedProducts.map((item) => (
                                    <div key={item.id} onClick={() => router.push(`/products/${item.id}`)} className="cursor-pointer group">
                                        <BackgroundGradient className="rounded-3xl bg-zinc-900 p-6 h-full hover:scale-105 transition-transform duration-300">
                                            <div className="relative p-2 h-full w-full rounded-2xl mb-4 overflow-hidden bg-white/5">
                                                <img src={item.imageUrl} alt={item.name} className="w-full h-full group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className='space-y-2'>
                                                <h3 className="font-bold text-xl text-white line-clamp-1">{item.name}</h3>
                                                <p className="text-2xl font-bold text-violet-400">₹ {item.price}</p>
                                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                                    <span>{item.rating}</span>
                                                </div>
                                            </div>
                                        </BackgroundGradient>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
