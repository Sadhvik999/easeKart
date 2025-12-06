'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShoppingCart, Star, ArrowLeft, Filter, Search, X, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { BackgroundGradient } from "../../components/ui/background-gradient";
import { Loading, FullScreenLoading } from '../../components/ui/loading';
import Navbar from "../../components/Navbar";

function ProductsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [sortBy, setSortBy] = useState('default');
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [categoriesList, setCategoriesList] = useState(['all']);

    // Fetch categories
    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/categories`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setCategoriesList(['all', ...data.map(c => c.name)]);
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        async function fetchProducts() {
            setLoading(true);
            try {
                const backend = process.env.NEXT_PUBLIC_BACKEND;
                let url = `${backend}/api/getAllProducts?page=${page}&limit=12`;

                if (searchParam) {
                    url = `${backend}/api/searchProducts?query=${searchParam}&page=${page}&limit=12`;
                } else if (categoryParam && categoryParam !== 'all') {
                    url = `${backend}/api/getProductByCategory/${categoryParam}?page=${page}&limit=12`;
                }

                const res = await fetch(url);
                const fetchedData = await res.json();
                if (fetchedData.products) {
                    setProducts(fetchedData.products);
                    setTotalPages(fetchedData.totalPages);
                }
            } catch (err) {
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [categoryParam, searchParam, page]);

    // Reset page when category/search changes
    useEffect(() => {
        setPage(1);
    }, [categoryParam, searchParam]);

    // Update selected category when URL param changes
    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        } else {
            setSelectedCategory('all');
        }
    }, [categoryParam]);





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

    return (
        <div className='min-h-screen bg-black text-white font-sans'>
            {/* Navigation */}
            <Navbar />

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
                                    {categoriesList.map((category) => (
                                        <option key={category} value={category} className='bg-zinc-900'>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

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

                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex flex-wrap justify-center mt-12 gap-2 items-center">
                                    <button
                                        disabled={page === 1}
                                        onClick={() => setPage(1)}
                                        className="p-2 sm:px-4 sm:py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label="First page"
                                    >
                                        <ChevronsLeft size={20} />
                                    </button>
                                    <button
                                        disabled={page === 1}
                                        onClick={() => setPage(p => p - 1)}
                                        className="p-2 sm:px-4 sm:py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Previous page"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>

                                    <div className="flex gap-2">
                                        {(() => {
                                            const pages = [];
                                            // Always show current page
                                            // Show prev page if exists
                                            if (page > 1) pages.push(page - 1);
                                            pages.push(page);
                                            // Show next page if exists
                                            if (page < totalPages) pages.push(page + 1);
                                            // Show +2 if we are at start
                                            if (page === 1 && page + 2 <= totalPages) pages.push(page + 2);
                                            // Show -2 if we are at end
                                            if (page === totalPages && page - 2 > 0) pages.unshift(page - 2);

                                            return pages.sort((a, b) => a - b).map((p) => (
                                                <button
                                                    key={p}
                                                    onClick={() => setPage(p)}
                                                    className={`w-10 h-10 rounded-lg transition-colors flex items-center justify-center font-medium ${page === p
                                                        ? 'bg-violet-600 text-white'
                                                        : 'bg-white/5 hover:bg-white/10 text-gray-400'
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            ));
                                        })()}
                                    </div>

                                    <button
                                        disabled={page === totalPages}
                                        onClick={() => setPage(p => p + 1)}
                                        className="p-2 sm:px-4 sm:py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Next page"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                    <button
                                        disabled={page === totalPages}
                                        onClick={() => setPage(totalPages)}
                                        className="p-2 sm:px-4 sm:py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Last page"
                                    >
                                        <ChevronsRight size={20} />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<FullScreenLoading />}>
            <ProductsContent />
        </Suspense>
    );
}
