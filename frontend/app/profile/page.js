'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Phone, LogOut, ShoppingCart, CircleUser, ArrowLeft, Package, CreditCard, Calendar, MapPin, ChevronRight, Trash2 } from 'lucide-react';


export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';
                const res = await fetch(`${backend}/api/profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (res.status === 401) {
                    router.push('/auth');
                    return;
                }

                if (!res.ok) {
                    throw new Error('Failed to fetch profile');
                }

                const data = await res.json();
                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    const handleLogout = async () => {
        try {
            const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';
            await fetch(`${backend}/api/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            router.push('/auth');
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative font-sans">
            {/* Background Effect */}
            <div style={{ backgroundImage: "url('/image.png')", backgroundSize: 'cover', opacity: "0.06", width: "100vw", height: "100vh" }} className='absolute inset-0 bg-cover bg-center z-0 pointer-events-none'></div>

            {/* Header */}
            <div className='relative z-10 flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/10 backdrop-blur-md bg-black/50 sticky top-0'>
                <div className='cursor-pointer flex items-center gap-2' onClick={() => router.push('/')}>
                    <ShoppingCart size={24} className="text-violet-500" />
                    <h1 className='text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500'>easyCart</h1>
                </div>
                <div className='hidden md:flex gap-8 text-gray-400 font-medium'>
                    <a href="/" className="hover:text-white transition-colors">Home</a>
                    <a href="#" className="hover:text-white transition-colors">Shop</a>
                    <a href="#" className="hover:text-white transition-colors">Orders</a>
                </div>
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-500 ring-2 ring-violet-500/20">
                        <span className="font-bold text-lg">{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors group"
                >
                    <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar / Tabs */}
                    <div className="lg:col-span-3 space-y-2">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <User size={20} />
                                <span className="font-medium">Profile</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <Package size={20} />
                                <span className="font-medium">Orders</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('cart')}
                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'cart' ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                            >
                                <ShoppingCart size={20} />
                                <span className="font-medium">Cart</span>
                                {user.cart?.items?.length > 0 && (
                                    <span className="ml-auto bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
                                        {user.cart.items.length}
                                    </span>
                                )}
                            </button>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 mt-4">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
                            >
                                <LogOut size={20} />
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-9">
                        {activeTab === 'profile' && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
                                    <div className="h-32 w-32 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 p-1 shadow-2xl shadow-violet-500/20">
                                        <div className="h-full w-full rounded-full bg-black flex items-center justify-center">
                                            <span className="text-4xl font-bold text-white">{user.name.charAt(0).toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <div className="text-center md:text-left">
                                        <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
                                        <p className="text-gray-400 mb-4">Member since {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                            <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm border border-violet-500/20">Premium Member</span>
                                            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm border border-green-500/20">Verified</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-violet-500/30 transition-colors group">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                                                <Mail size={20} />
                                            </div>
                                            <span className="text-sm text-gray-400 uppercase tracking-wider font-medium">Email Address</span>
                                        </div>
                                        <p className="text-lg text-white pl-12">{user.email}</p>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-violet-500/30 transition-colors group">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="p-2 rounded-lg bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                                <Phone size={20} />
                                            </div>
                                            <span className="text-sm text-gray-400 uppercase tracking-wider font-medium">Phone Number</span>
                                        </div>
                                        <p className="text-lg text-white pl-12">{user.phone}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
                                {user.orders && user.orders.length > 0 ? (
                                    user.orders.map((order) => (
                                        <div key={order.id} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-violet-500/30 transition-all">
                                            <div className="p-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 bg-white/[0.02]">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 rounded-xl bg-violet-500/10 text-violet-500">
                                                        <Package size={24} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-400">Order ID</p>
                                                        <p className="font-mono text-white text-sm">#{order.id.slice(0, 8)}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-8">
                                                    <div>
                                                        <p className="text-sm text-gray-400">Date Placed</p>
                                                        <p className="text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-400">Total Amount</p>
                                                        <p className="text-white font-bold">${Number(order.totalAmount).toFixed(2)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-400">Status</p>
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'DELIVERED' ? 'bg-green-500/10 text-green-400' :
                                                                order.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-400' :
                                                                    'bg-blue-500/10 text-blue-400'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-6">
                                                <div className="space-y-4">
                                                    {order.items.map((item) => (
                                                        <div key={item.id} className="flex items-center gap-4">
                                                            <div className="h-16 w-16 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                                                                <img src={item.product.imageUrl} alt={item.product.name} className="h-full w-full object-cover" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="text-white font-medium">{item.product.name}</h4>
                                                                <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                                                            </div>
                                                            <p className="text-white font-medium">${Number(item.unitPrice).toFixed(2)}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                                        <Package size={48} className="mx-auto text-gray-600 mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">No orders yet</h3>
                                        <p className="text-gray-400">Start shopping to see your orders here.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'cart' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold text-white mb-6">Shopping Cart</h2>
                                {user.cart && user.cart.items && user.cart.items.length > 0 ? (
                                    <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 overflow-hidden">
                                        <div className="p-6 space-y-6">
                                            {user.cart.items.map((item) => (
                                                <div key={item.id} className="flex items-center gap-6 p-4 rounded-2xl bg-black/20 hover:bg-black/40 transition-colors border border-white/5">
                                                    <div className="h-24 w-24 rounded-xl bg-white/5 overflow-hidden flex-shrink-0">
                                                        <img src={item.product.imageUrl} alt={item.product.name} className="h-full w-full object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-bold text-white mb-1">{item.product.name}</h3>
                                                        <p className="text-gray-400 text-sm mb-2 line-clamp-2">{item.product.description}</p>
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-violet-400 font-bold text-lg">${Number(item.unitPrice).toFixed(2)}</span>
                                                            <span className="text-gray-500 text-sm">Qty: {item.quantity}</span>
                                                        </div>
                                                    </div>
                                                    <button className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-6 bg-white/[0.02] border-t border-white/10 flex items-center justify-between">
                                            <div>
                                                <p className="text-gray-400 text-sm">Total Items</p>
                                                <p className="text-white font-bold text-xl">{user.cart.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                                            </div>
                                            <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2">
                                                Checkout <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                                        <ShoppingCart size={48} className="mx-auto text-gray-600 mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">Your cart is empty</h3>
                                        <p className="text-gray-400 mb-6">Looks like you haven't added anything to your cart yet.</p>
                                        <button onClick={() => router.push('/')} className="px-6 py-2 bg-violet-500 text-white rounded-full font-medium hover:bg-violet-600 transition-colors">
                                            Start Shopping
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}