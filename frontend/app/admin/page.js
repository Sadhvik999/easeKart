"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    Users,
    ShoppingBag,
    Package,
    Truck,
    LayoutDashboard,
    LogOut,
    Search,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';

export default function AdminPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('sellers');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${backend}/api/profile`, {
                    credentials: 'include'
                });
                if (res.status === 401) {
                    router.push('/auth');
                    return;
                }
                const userData = await res.json();
                if (userData.accountType !== 'ADMIN') {
                    router.push('/');
                    return;
                }
                setUser(userData);
            } catch (err) {
                console.error("Auth check failed:", err);
                router.push('/auth');
            }
        };
        fetchProfile();
    }, [router, backend]);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const endpoint = `${backend}/api/admin/${activeTab}`;
                const res = await fetch(endpoint, { credentials: 'include' });
                if (res.ok) {
                    const result = await res.json();
                    setData(result);
                } else {
                    console.error(`Failed to fetch ${activeTab}`);
                }
            } catch (err) {
                console.error(`Error fetching ${activeTab}:`, err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab, user, backend]);

    const filteredData = data.filter(item => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        // Dynamic search based on active tab mostly checking name or related ID
        if (activeTab === 'orders') return item.id.toLowerCase().includes(term) || item.user?.email.toLowerCase().includes(term);
        if (activeTab === 'products') return item.name.toLowerCase().includes(term);
        return item.name?.toLowerCase().includes(term) || item.email?.toLowerCase().includes(term);
    });

    if (!user) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-black text-white font-sans flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 p-6 flex flex-col fixed h-full bg-black z-10">
                <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => router.push('/')}>
                    <div className="h-8 w-8 rounded-lg bg-linear-to-tr from-violet-600 to-indigo-600 flex items-center justify-center">
                        <LayoutDashboard size={18} className="text-white" />
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                        Admin
                    </span>
                </div>

                <nav className="space-y-2 flex-1">
                    <SidebarItem
                        icon={Users}
                        label="Sellers"
                        active={activeTab === 'sellers'}
                        onClick={() => setActiveTab('sellers')}
                    />
                    <SidebarItem
                        icon={ShoppingBag}
                        label="Customers"
                        active={activeTab === 'customers'}
                        onClick={() => setActiveTab('customers')}
                    />
                    <SidebarItem
                        icon={Package}
                        label="Products"
                        active={activeTab === 'products'}
                        onClick={() => setActiveTab('products')}
                    />
                </nav>

                <button
                    onClick={() => router.push('/api/logout')} // Assuming generic logout or handle proper logout function
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-colors mt-auto"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold capitalize">{activeTab}</h1>
                        <p className="text-gray-400 mt-1">Manage {activeTab} information</p>
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-2 pl-10 text-white focus:outline-none focus:border-violet-500 w-64"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
                    </div>
                </header>

                {/* Content Table/List */}
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden">
                    {loading ? (
                        <div className="p-12 text-center text-gray-400">Loading data...</div>
                    ) : filteredData.length === 0 ? (
                        <div className="p-12 text-center text-gray-400">No records found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-400">
                                <thead className="bg-zinc-900 text-gray-200 uppercase font-medium border-b border-white/10">
                                    <tr>
                                        {activeTab === 'sellers' && (
                                            <>
                                                <th className="px-6 py-4">Name</th>
                                                <th className="px-6 py-4">Email</th>
                                                <th className="px-6 py-4">Phone</th>
                                                <th className="px-6 py-4 text-center">Products</th>
                                                <th className="px-6 py-4 text-center">Orders</th>
                                                <th className="px-6 py-4">Joined</th>
                                            </>
                                        )}
                                        {activeTab === 'customers' && (
                                            <>
                                                <th className="px-6 py-4">Name</th>
                                                <th className="px-6 py-4">Email</th>
                                                <th className="px-6 py-4">Phone</th>
                                                <th className="px-6 py-4 text-center">Orders</th>
                                                <th className="px-6 py-4">Joined</th>
                                            </>
                                        )}
                                        {activeTab === 'products' && (
                                            <>
                                                <th className="px-6 py-4">Product Name</th>
                                                <th className="px-6 py-4">Seller</th>
                                                <th className="px-6 py-4">Price</th>
                                                <th className="px-6 py-4">Category</th>
                                                <th className="px-6 py-4">Rating</th>
                                            </>
                                        )}
                                        {activeTab === 'orders' && (
                                            <>
                                                <th className="px-6 py-4">Order ID</th>
                                                <th className="px-6 py-4">Customer</th>
                                                <th className="px-6 py-4">Items</th>
                                                <th className="px-6 py-4">Total</th>
                                                <th className="px-6 py-4">Status</th>
                                                <th className="px-6 py-4">Date</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredData.map((item, idx) => (
                                        <React.Fragment key={idx}>
                                            <tr
                                                onClick={() => {
                                                    // Only navigate if it's a user row (Sellers/Customers)
                                                    if (activeTab === 'sellers' || activeTab === 'customers') {
                                                        router.push(`/admin/users/${item.id}`);
                                                    }
                                                }}
                                                className={`hover:bg-white/5 transition-colors border-b border-white/5 ${activeTab !== 'products' ? 'cursor-pointer' : ''}`}
                                            >
                                                {activeTab === 'sellers' && (
                                                    <>
                                                        <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                                                        <td className="px-6 py-4">{item.email}</td>
                                                        <td className="px-6 py-4">{item.phone}</td>
                                                        <td className="px-6 py-4 text-center">
                                                            <span className="inline-block px-2 py-1 rounded bg-violet-500/10 text-violet-400 text-xs">
                                                                {item._count?.products || 0}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            <div className="flex flex-col gap-1 items-center">
                                                                <span className="inline-block px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                                                                    {item.soldCount || 0} Items Sold
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                                                    </>
                                                )}
                                                {activeTab === 'customers' && (
                                                    <>
                                                        <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                                                        <td className="px-6 py-4">{item.email}</td>
                                                        <td className="px-6 py-4">{item.phone}</td>
                                                        <td className="px-6 py-4 text-center">
                                                            <button
                                                                onClick={() => {
                                                                    // Toggle expanded state logic could be added here if needed, 
                                                                    // but for simplicity we rely on a separate expanded state or just show updated table structure.
                                                                    // Since I need state for expansion, I will implement a sub-component or manage state here.
                                                                    // For this edit, I'll inline the complexity or wrap in a small component if possible.
                                                                    // Let's use a simpler approach: adding an 'isExpanded' property to local state is complex without redesign.
                                                                    // Instead I will render orders IN THE TABLE if orders exist, or just valid counts.
                                                                    // The requirement says "SHOW ORDER'S AND IN SELLER'S TAB IT SHOULD SHOW SELLED ITEMS"
                                                                    // Let's render a summary and maybe a details row.
                                                                }}
                                                                className="inline-block px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs hover:bg-blue-500/20"
                                                            >
                                                                {item._count?.orders || 0} Orders
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                                                    </>
                                                )}
                                                {activeTab === 'products' && (
                                                    <>
                                                        <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                                            <img src={item.imageUrl} alt="" className="w-8 h-8 rounded bg-white/10 object-cover" />
                                                            {item.name}
                                                        </td>
                                                        <td className="px-6 py-4">{item.seller?.name || 'EaseCart'}</td>
                                                        <td className="px-6 py-4 text-green-400">₹{item.price}</td>
                                                        <td className="px-6 py-4">
                                                            <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs">
                                                                {item.Category}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">{item.rating} ★</td>
                                                    </>
                                                )}
                                            </tr>
                                            {/* Nested Row for Customers to show orders */}
                                            {activeTab === 'customers' && item.orders && item.orders.length > 0 && (
                                                <tr>
                                                    <td colSpan="5" className="px-0 py-0">
                                                        <div className="bg-white/5 p-4 pl-12 border-b border-white/5">
                                                            <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Recent Order History</h4>
                                                            <div className="space-y-3">
                                                                {item.orders.map((order) => (
                                                                    <div key={order.id} className="flex items-center justify-between bg-black/40 p-3 rounded-lg border border-white/5">
                                                                        <div className="flex items-center gap-4">
                                                                            <span className="text-xs font-mono text-gray-400">#{order.id.slice(0, 8)}</span>
                                                                            <div className="flex -space-x-2">
                                                                                {order.items?.map((orderItem, i) => (
                                                                                    <div key={i} className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10" title={orderItem.product.name}>
                                                                                        {orderItem.product.imageUrl ? (
                                                                                            <img src={orderItem.product.imageUrl} className="w-full h-full object-cover" alt="" />
                                                                                        ) : (
                                                                                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-xs">{orderItem.product.name[0]}</div>
                                                                                        )}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>

                                                                        <div className="flex items-center gap-6">
                                                                            <div className="text-right">
                                                                                <div className="text-xs text-gray-500">Total</div>
                                                                                <div className="text-sm font-bold text-white">₹{order.totalAmount}</div>
                                                                            </div>
                                                                            <StatusBadge status={order.status} />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )
                    }
                </div >
            </main >
        </div >
    );
}

function SidebarItem({ icon: Icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
        >
            <Icon size={20} />
            <span className="font-medium">{label}</span>
            {active && <ChevronRight size={16} className="ml-auto" />}
        </button>
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
