"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    ArrowLeft,
    Mail,
    Phone,
    User,
    ShoppingBag,
    Package,
    Calendar,
    Clock,
    MapPin,
    CreditCard
} from 'lucide-react';

export default function AdminUserDetailsPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const res = await fetch(`${backend}/api/admin/users/${id}`, {
                    credentials: 'include'
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    console.error("Failed to fetch user details. Status:", res.status, res.statusText);
                    router.push('/admin');
                }
            } catch (err) {
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchDetails();
    }, [id, backend, router]);

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;
    if (!user) return <div className="min-h-screen bg-black flex items-center justify-center text-white">User not found</div>;

    const isCustomer = user.accountType === 'CUSTOMER';

    // Calculate total spend or earnings
    let totalValue = 0;
    if (isCustomer) {
        totalValue = user.orders?.reduce((acc, order) => acc + parseFloat(order.totalAmount || 0), 0) || 0;
    } else {
        // For sellers: sum of all sold items
        user.products?.forEach(p => {
            p.orderItems?.forEach(item => {
                totalValue += (parseFloat(item.unitPrice) * item.quantity);
            });
        });
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans p-8">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
            >
                <ArrowLeft size={20} />
                Back to Dashboard
            </button>

            {/* Header Card */}
            <div className="bg-zinc-900 border border-white/10 rounded-2xl p-8 mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-start gap-6">
                        <div className={`h-20 w-20 rounded-2xl flex items-center justify-center text-3xl font-bold ${isCustomer ? 'bg-blue-500/20 text-blue-500' : 'bg-violet-500/20 text-violet-500'}`}>
                            {user.name[0]}
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold">{user.name}</h1>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${isCustomer ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-violet-500/10 text-violet-400 border-violet-500/20'}`}>
                                    {user.accountType}
                                </span>
                            </div>
                            <div className="flex flex-col gap-2 text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} />
                                    {user.email}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone size={16} />
                                    {user.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    Joined {new Date(user.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end justify-center bg-white/5 p-6 rounded-xl border border-white/5 min-w-[200px]">
                        <span className="text-gray-400 text-sm mb-1">{isCustomer ? 'Total Spent' : 'Total Sales'}</span>
                        <span className="text-3xl font-bold text-white">₹{totalValue}</span>
                        {isCustomer ? (
                            <span className="text-xs text-blue-400 mt-2">{user.orders?.length || 0} Orders placed</span>
                        ) : (
                            <span className="text-xs text-violet-400 mt-2">{user.products?.length || 0} Products listed</span>
                        )}
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    {isCustomer ? <ShoppingBag className="text-blue-500" /> : <Package className="text-violet-500" />}
                    {isCustomer ? 'Order History' : 'Sales History'}
                </h2>

                {isCustomer ? (
                    // Customer Orders View
                    user.orders && user.orders.length > 0 ? (
                        <div className="space-y-4">
                            {user.orders.map((order) => (
                                <div key={order.id} className="bg-zinc-900 border border-white/10 rounded-xl overflow-hidden">
                                    <div className="p-4 border-b border-white/10 flex flex-wrap justify-between items-center bg-white/5 gap-4">
                                        <div className="flex items-center gap-4">
                                            <span className="font-mono text-gray-400">#{order.id.slice(0, 8)}</span>
                                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                                <Clock size={14} />
                                                {new Date(order.createdAt).toLocaleString()}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <StatusBadge status={order.status} />
                                            <span className="font-bold text-lg">₹{order.totalAmount}</span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        {/* Items */}
                                        <div className="grid gap-4 mb-6">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded bg-white/10 flex items-center justify-center overflow-hidden">
                                                        {item.product.imageUrl ? (
                                                            <img src={item.product.imageUrl} className="w-full h-full object-cover" alt="" />
                                                        ) : (
                                                            <span className="text-xs">{item.product.name[0]}</span>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="font-medium">{item.product.name}</div>
                                                        <div className="text-sm text-gray-400">Qty: {item.quantity} × ₹{item.unitPrice}</div>
                                                    </div>
                                                    <div className="font-medium">₹{item.quantity * item.unitPrice}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Address & Payment Info */}
                                        <div className="flex flex-wrap gap-8 pt-4 border-t border-white/5">
                                            {order.address && (
                                                <div className="text-sm text-gray-400">
                                                    <div className="flex items-center gap-2 text-gray-300 mb-1 font-medium">
                                                        <MapPin size={14} /> Shipping Address
                                                    </div>
                                                    <p>{order.shippingAddress}</p>
                                                </div>
                                            )}
                                            <div className="text-sm text-gray-400">
                                                <div className="flex items-center gap-2 text-gray-300 mb-1 font-medium">
                                                    <CreditCard size={14} /> Payment Status
                                                </div>
                                                <p>{order.status === 'CANCELLED' ? 'Refunded/Cancelled' : 'Paid'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center bg-zinc-900 rounded-2xl border border-white/10 text-gray-500">
                            There are no orders placed.
                        </div>
                    )
                ) : (
                    // Seller Sales View
                    // Need to flatten products -> orderItems
                    (() => {
                        const allSales = [];
                        user.products?.forEach(p => {
                            p.orderItems?.forEach(item => {
                                allSales.push({
                                    ...item,
                                    product: p
                                });
                            });
                        });
                        // Sort by date desc
                        allSales.sort((a, b) => new Date(b.order.createdAt) - new Date(a.order.createdAt));

                        if (allSales.length === 0) {
                            return (
                                <div className="p-12 text-center bg-zinc-900 rounded-2xl border border-white/10 text-gray-500">
                                    No orders selled.
                                </div>
                            );
                        }

                        return (
                            <div className="bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden">
                                <table className="w-full text-left text-sm text-gray-400">
                                    <thead className="bg-white/5 text-gray-200 uppercase font-medium">
                                        <tr>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Product</th>
                                            <th className="px-6 py-4">Buyer</th>
                                            <th className="px-6 py-4">Quantity</th>
                                            <th className="px-6 py-4">Total</th>
                                            <th className="px-6 py-4">Order Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {allSales.map((sale, idx) => (
                                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                                                <td className="px-6 py-4">{new Date(sale.order.createdAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded bg-white/10 overflow-hidden">
                                                        {sale.product.imageUrl && <img src={sale.product.imageUrl} className="w-full h-full object-cover" />}
                                                    </div>
                                                    <span className="text-white font-medium">{sale.product.name}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>{sale.order.user.name}</div>
                                                    <div className="text-xs text-gray-500">{sale.order.user.email}</div>
                                                </td>
                                                <td className="px-6 py-4">{sale.quantity}</td>
                                                <td className="px-6 py-4 font-bold text-white">₹{sale.quantity * sale.unitPrice}</td>
                                                <td className="px-6 py-4"><StatusBadge status={sale.order.status} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );
                    })()
                )}
            </div>
        </div>
    );
}

function StatusBadge({ status }) {
    const styles = {
        PENDING: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        PROCESSING: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
        SHIPPED: 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20',
        DELIVERED: 'bg-green-500/10 text-green-500 border-green-500/20',
        CANCELLED: 'bg-red-500/10 text-red-500 border-red-500/20',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status] || 'bg-gray-500/10 text-gray-500'}`}>
            {status}
        </span>
    );
}
