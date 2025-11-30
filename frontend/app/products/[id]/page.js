"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingCart, Star, ArrowLeft, Plus, Minus, Heart, Share2, Package, Truck, Shield, Search } from 'lucide-react';
import { FullScreenLoading } from '../../../components/ui/loading';

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [searchOpen, setSearchOpen] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const backend = process.env.NEXT_PUBLIC_BACKEND;
                const res = await fetch(`${backend}/api/profile`, {
                    credentials: 'include'
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (err) {
                console.error("Error fetching user:", err);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        async function fetchProductById() {
            try {
                const backend = process.env.NEXT_PUBLIC_BACKEND;
                const res = await fetch(`${backend}/api/getProductById/${id}`);
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`HTTP ${res.status}: ${text}`);
                }
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product by ID:", err);
                setError(err.message || String(err));
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchProductById();
    }, [id]);

    const handleQuantityChange = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCart = async () => {
        if (user?.accountType === 'SELLER') {
            alert("Sellers cannot buy products.");
            return;
        }

        try {
            const backend = process.env.NEXT_PUBLIC_BACKEND;
            const res = await fetch(`${backend}/api/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    productId: product.id,
                    quantity: quantity
                })
            });

            if (res.status === 401) {
                router.push('/auth');
                return;
            }

            if (res.ok) {
                alert('Product added to cart!');
            } else {
                const data = await res.json();
                alert(data.message || 'Failed to add to cart');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred');
        }
    };

    if (loading) {
        return <FullScreenLoading />;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-4">Error: {error}</div>
                    <button onClick={() => router.back()} className="px-6 py-2 bg-violet-600 rounded-full hover:bg-violet-700 transition-colors">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="text-xl mb-4">No product found.</div>
                    <button onClick={() => router.back()} className="px-6 py-2 bg-violet-600 rounded-full hover:bg-violet-700 transition-colors">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

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
                                    <a href="/products" className="hover:text-white transition-colors">Shop</a>
                                    <a href="#" className="hover:text-white transition-colors">Features</a>
                                </div>
                            ) : (
                                <div className='relative w-96'>
                                    <input
                                        type="text"
                                        placeholder="Search products..."
                                        autoFocus
                                        className='w-full bg-white/5 border border-white/10 rounded-full px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all'
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                </div>
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
                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>

                    {/* Product Details */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                        {/* Image Section */}
                        <div className='space-y-4'>
                            <div className='relative aspect-auto rounded-3xl overflow-hidden bg-white/5 border border-white/10'>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Product Info Section */}
                        <div className='space-y-6'>
                            {/* Category Badge */}
                            {product.Category && (
                                <div className='inline-block px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm'>
                                    {product.Category}
                                </div>
                            )}

                            {/* Product Name */}
                            <h1 className='text-2xl md:text-3xl font-bold text-white'>{product.name}</h1>

                            {/* Rating */}
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center gap-2'>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            className={i < Math.floor(product.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-600"}
                                        />
                                    ))}
                                </div>
                                <span className='text-gray-400'>{product.rating} / 5</span>
                            </div>

                            {/* Price */}
                            <div className='flex items-baseline gap-4'>
                                <span className='text-5xl font-bold text-violet-400'>₹{product.price}</span>
                            </div>

                            {/* Description */}
                            {product.description && (
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-white'>Description</h3>
                                    <p className='text-gray-400 leading-relaxed'>{product.description}</p>
                                </div>
                            )}

                            {/* Quantity Selector */}
                            <div className='space-y-3'>
                                <h3 className='text-lg font-bold text-white'>Quantity</h3>
                                <div className='flex items-center gap-4'>
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={user?.accountType === 'SELLER'}
                                        className={`h-12 w-12 rounded-full border border-white/10 flex items-center justify-center transition-colors ${user?.accountType === 'SELLER'
                                                ? 'bg-white/5 opacity-50 cursor-not-allowed'
                                                : 'bg-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <span className='text-2xl font-bold w-12 text-center'>{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={user?.accountType === 'SELLER'}
                                        className={`h-12 w-12 rounded-full border border-white/10 flex items-center justify-center transition-colors ${user?.accountType === 'SELLER'
                                                ? 'bg-white/5 opacity-50 cursor-not-allowed'
                                                : 'bg-white/5 hover:bg-white/10'
                                            }`}
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className='flex gap-4'>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={user?.accountType === 'SELLER'}
                                    className={`flex-1 px-8 py-4 font-bold rounded-full transition-all flex items-center justify-center gap-2 ${user?.accountType === 'SELLER'
                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-black hover:bg-gray-200 hover:scale-105'
                                        }`}
                                >
                                    <ShoppingCart size={20} />
                                    {user?.accountType === 'SELLER' ? 'Sellers Cannot Buy' : 'Add to Cart'}
                                </button>
                                <button className='h-14 w-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center'>
                                    <Heart size={20} />
                                </button>
                                <button className='h-14 w-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center'>
                                    <Share2 size={20} />
                                </button>
                            </div>

                            {/* Features */}
                            <div className='grid grid-cols-3 gap-4 pt-6 border-t border-white/10'>
                                <div className='text-center space-y-2'>
                                    <div className='h-12 w-12 rounded-full bg-violet-500/10 flex items-center justify-center mx-auto'>
                                        <Truck size={24} className="text-violet-500" />
                                    </div>
                                    <p className='text-sm text-gray-400'>Free Shipping</p>
                                </div>
                                <div className='text-center space-y-2'>
                                    <div className='h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto'>
                                        <Shield size={24} className="text-green-500" />
                                    </div>
                                    <p className='text-sm text-gray-400'>Secure Payment</p>
                                </div>
                                <div className='text-center space-y-2'>
                                    <div className='h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto'>
                                        <Package size={24} className="text-blue-500" />
                                    </div>
                                    <p className='text-sm text-gray-400'>Easy Returns</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}