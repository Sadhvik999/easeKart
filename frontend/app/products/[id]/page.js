"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingCart, Star, ArrowLeft, Plus, Minus, Heart, Share2, Package, Truck, Shield, Search } from 'lucide-react';
import { FullScreenLoading } from '../../../components/ui/loading';
import Navbar from '../../../components/Navbar';

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);


    const [user, setUser] = useState(null);
    const [addingToCart, setAddingToCart] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    useEffect(() => {
        async function fetchUserAndCart() {
            try {
                const backend = process.env.NEXT_PUBLIC_BACKEND;
                const res = await fetch(`${backend}/api/profile`, {
                    credentials: 'include'
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);

                    if (id && data.accountType !== 'SELLER') {
                        const cartRes = await fetch(`${backend}/api/cart`, { credentials: 'include' });
                        if (cartRes.ok) {
                            const cartData = await cartRes.json();
                            const exists = cartData.items?.some(item => item.product.id === id || item.productId === id);
                            setIsAddedToCart(!!exists);
                        }
                    }
                }
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        }
        fetchUserAndCart();
    }, [id]);

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

        setAddingToCart(true);

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
                setIsAddedToCart(true);
            } else {
                const data = await res.json();
                alert(data.message || 'Failed to add to cart');
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred');
        } finally {
            setAddingToCart(false);
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
            <React.Suspense fallback={<div className="h-20 bg-black/80" />}>
                <Navbar />
            </React.Suspense>

            <div className='pt-24 pb-16'>
                <div className='container mx-auto px-6'>
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                        <div className='space-y-4'>
                            <div className='relative aspect-auto rounded-3xl overflow-hidden bg-white/5 border border-white/10'>
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>


                        <div className='space-y-6'>

                            {product.Category && (
                                <div className='inline-block px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm'>
                                    {product.Category}
                                </div>
                            )}


                            <h1 className='text-2xl md:text-3xl font-bold text-white'>{product.name}</h1>


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


                            <div className='flex items-baseline gap-4'>
                                <span className='text-5xl font-bold text-violet-400'>₹{product.price}</span>
                            </div>


                            {product.description && (
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-white'>Description</h3>
                                    <p className='text-gray-400 leading-relaxed'>{product.description}</p>
                                </div>
                            )}


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


                            <div className='flex gap-4'>
                                {isAddedToCart ? (
                                    <>
                                        <button
                                            onClick={() => router.push('/profile?tab=cart')}
                                            className='flex-1 px-8 py-4 font-bold rounded-full bg-green-500 text-black hover:bg-green-400 hover:scale-105 transition-all flex items-center justify-center gap-2'
                                        >
                                            <ShoppingCart size={20} />
                                            Go to Cart
                                        </button>
                                        <button
                                            onClick={() => setIsAddedToCart(false)} 
                                            className='px-4 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors'
                                            title="Add more"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={user?.accountType === 'SELLER' || addingToCart}
                                        className={`flex-1 px-8 py-4 font-bold rounded-full transition-all flex items-center justify-center gap-2 ${user?.accountType === 'SELLER'
                                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                            : addingToCart
                                                ? 'bg-white/50 text-black cursor-wait pointer-events-none'
                                                : 'bg-white text-black hover:bg-gray-200 hover:scale-105'
                                            }`}
                                    >
                                        {addingToCart ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                                                Adding...
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart size={20} />
                                                {user?.accountType === 'SELLER' ? 'Sellers Cannot Buy' : 'Add to Cart'}
                                            </>
                                        )}
                                    </button>
                                )}

                                <button className='h-14 w-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center'>
                                    <Heart size={20} />
                                </button>
                                <button className='h-14 w-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center'>
                                    <Share2 size={20} />
                                </button>
                            </div>

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