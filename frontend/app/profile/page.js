'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { User, Mail, Phone, LogOut, ShoppingCart, CircleUser, ArrowLeft, Package, CreditCard, Calendar, MapPin, ChevronRight, Trash2, Plus, Minus, LayoutDashboard, PackagePlus, Store, BarChart3, Bell } from 'lucide-react';
import { FullScreenLoading } from '../../components/ui/loading';


function ProfileContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab');

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState(tabParam || 'profile');
    const [notifications, setNotifications] = useState([]);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [addressForm, setAddressForm] = useState({
        fullName: '',
        phone: '',
        streetLine1: '',
        streetLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        isDefault: true
    });
    const [productForm, setProductForm] = useState({
        name: '',
        price: '',
        category: '',
        imageUrl: '',
        description: '',
        tags: ''
    });

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileEditForm, setProfileEditForm] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [passwordMessage, setPasswordMessage] = useState('');
    const [showPasswordForm, setShowPasswordForm] = useState(false);

    const [editingProduct, setEditingProduct] = useState(null);
    const [sellerProducts, setSellerProducts] = useState([]);
    const [sellerPage, setSellerPage] = useState(1);
    const [sellerLimit, setSellerLimit] = useState(6);
    const [sellerTotalPages, setSellerTotalPages] = useState(1);
    const [sellerLoading, setSellerLoading] = useState(false);
    const [sellerTotal, setSellerTotal] = useState(0);
    const [addresses, setAddresses] = useState([]);

    const fetchAddresses = async () => {
        try {
            const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';
            const res = await fetch(`${backend}/api/address`, {
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                setAddresses(data);
            }
        } catch (err) {
            console.error("Error fetching addresses:", err);
        }
    };

    const handleCreateOrUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';
            const url = editingProduct
                ? `${backend}/api/products/${editingProduct.id}`
                : `${backend}/api/products`;

            const method = editingProduct ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    ...productForm,
                    price: parseFloat(productForm.price),
                    tags: Array.isArray(productForm.tags) ? productForm.tags : productForm.tags.split(',').map(t => t.trim())
                })
            });

            if (res.ok) {
                alert(`Product ${editingProduct ? 'updated' : 'created'} successfully!`);
                setProductForm({ name: '', price: '', category: '', imageUrl: '', description: '', tags: '' });
                setEditingProduct(null);
                setActiveTab('my-products');
                window.location.reload();
            } else {
                const data = await res.json();
                alert(data.message || `Failed to ${editingProduct ? 'update' : 'create'} product`);
            }
        } catch (err) {
            console.error(`Error ${editingProduct ? 'updating' : 'creating'} product:`, err);
            alert(`Error ${editingProduct ? 'updating' : 'creating'} product`);
        }
    };

    const handleDeleteProduct = async (productId) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        try {
            const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';
            const res = await fetch(`${backend}/api/products/${productId}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (res.ok) {
                alert("Product deleted successfully");
                window.location.reload();
            } else {
                const data = await res.json();
                alert(data.message || "Failed to delete product");
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            alert("Error deleting product");
        }
    };

    const startEditing = (product) => {
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            price: product.price,
            category: product.Category,
            imageUrl: product.imageUrl,
            description: product.description,
            tags: product.tags ? product.tags.join(', ') : ''
        });
        setActiveTab('add-product');
    };
    useEffect(() => {
        if (tabParam) {
            setActiveTab(tabParam);
        }
    }, [tabParam]);

    // Fetch seller products when my-products tab is active
    useEffect(() => {
        async function fetchSellerProducts() {
            if (activeTab !== 'my-products') return;
            setSellerLoading(true);
            try {
                const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';
                const res = await fetch(`${backend}/api/my-products?page=${sellerPage}&limit=${sellerLimit}`, { credentials: 'include' });
                if (!res.ok) {
                    console.error('Failed to fetch seller products');
                    setSellerProducts([]);
                    setSellerTotalPages(1);
                    return;
                }
                const data = await res.json();
                setSellerProducts(data.products || []);
                setSellerTotalPages(data.totalPages || 1);
                setSellerTotal(data.total || 0);
            } catch (err) {
                console.error('Error fetching seller products:', err);
            } finally {
                setSellerLoading(false);
            }
        }
        fetchSellerProducts();
    }, [activeTab, sellerPage, sellerLimit]);

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

                if (data.accountType === 'SELLER') {
                    fetchNotifications();
                }
                fetchAddresses();
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    const fetchNotifications = async () => {
        try {
            const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';
            const res = await fetch(`${backend}/api/notifications`, {
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                console.log("Fetched notifications:", data);
                setNotifications(data);
            }
        } catch (err) {
            console.error("Error fetching notifications:", err);
        }
    };

    const markNotificationAsRead = async (id) => {
        try {
            const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';
            await fetch(`${backend}/api/notifications/${id}/read`, {
                method: 'PUT',
                credentials: 'include'
            });
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        } catch (err) {
            console.error("Error marking notification as read:", err);
        }
    };

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

    const handleEditProfileClick = () => {
        setProfileEditForm({
            name: user.name,
            email: user.email,
            phone: user.phone
        });
        setIsEditingProfile(true);
    };

    const handleSaveProfile = async () => {
        try {
            const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';
            const res = await fetch(`${backend}/api/profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(profileEditForm)
            });
            if (res.ok) {
                const data = await res.json();
                setUser(prev => ({ ...prev, ...profileEditForm }));
                setIsEditingProfile(false);
                alert("Profile updated successfully!");
            } else {
                alert("Failed to update profile");
            }
        } catch (err) {
            console.error("Error updating profile:", err);
            alert("Error updating profile");
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordMessage('');
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordMessage("New passwords do not match");
            return;
        }
        try {
            const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';
            const res = await fetch(`${backend}/api/profile/password`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    oldPassword: passwordForm.oldPassword,
                    newPassword: passwordForm.newPassword
                })
            });
            const data = await res.json();
            if (res.ok) {
                setPasswordMessage("Password updated successfully!");
                setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
                alert("Password updated successfully!");
            } else {
                setPasswordMessage(data.message || "Failed to update password");
                alert(data.message || "Failed to update password");
            }
        } catch (err) {
            console.error("Error changing password:", err);
            setPasswordMessage("Error changing password");
        }
    };

    const handleUpdateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';
            const res = await fetch(`${backend}/api/cart/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ itemId, quantity: newQuantity })
            });

            if (res.ok) {
                setUser(prev => ({
                    ...prev,
                    cart: {
                        ...prev.cart,
                        items: prev.cart.items.map(item =>
                            item.id === itemId ? { ...item, quantity: newQuantity } : item
                        )
                    }
                }));
            }
        } catch (err) {
            console.error('Error updating quantity:', err);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';
            const res = await fetch(`${backend}/api/cart/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ itemId })
            });

            if (res.ok) {
                setUser(prev => ({
                    ...prev,
                    cart: {
                        ...prev.cart,
                        items: prev.cart.items.filter(item => item.id !== itemId)
                    }
                }));
            }
        } catch (err) {
            console.error('Error removing item:', err);
        }
    };

    const handleCheckout = async () => {
        try {
            const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';

            // 1. Check for addresses
            const addressRes = await fetch(`${backend}/api/address`, {
                credentials: 'include'
            });

            if (!addressRes.ok) {
                console.error("Failed to fetch addresses:", addressRes.status);
                if (addressRes.status === 401) {
                    router.push('/auth');
                    return;
                }
                setShowAddressModal(true);
                return;
            }

            const addresses = await addressRes.json();
            console.log("Fetched addresses:", addresses);

            if (Array.isArray(addresses) && addresses.length > 0) {
                // User has address, proceed to "payment" and create order
                // For simplicity, we'll pick the default address or the first one
                const defaultAddress = addresses.find(a => a.isDefault) || addresses[0];

                // Simulate payment processing
                setLoading(true); // Show loading state

                const orderRes = await fetch(`${backend}/api/order/checkout`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ addressId: defaultAddress.id })
                });

                const orderData = await orderRes.json();

                if (orderRes.ok) {
                    alert('Order placed successfully!');
                    // Refresh profile to update cart and orders
                    window.location.reload();
                } else {
                    console.error("Order creation failed:", orderData);
                    alert(orderData.message || 'Failed to place order.');
                    setLoading(false);
                }

            } else {
                // No address, show address form
                setShowAddressModal(true);
            }

        } catch (err) {
            console.error("Checkout error:", err);
            alert("An error occurred during checkout.");
            setLoading(false);
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        try {
            const backend = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:4000';
            const res = await fetch(`${backend}/api/address`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(addressForm)
            });

            if (res.ok) {
                setShowAddressModal(false);
                fetchAddresses();
                // Retry checkout automatically only if in cart tab
                if (activeTab === 'cart') {
                    handleCheckout();
                }
            } else {
                alert("Failed to save address.");
            }
        } catch (err) {
            console.error("Address save error:", err);
        }
    };

    if (loading) {
        return <FullScreenLoading />;
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
                            {user.accountType === 'SELLER' ? (
                                <>
                                    <button
                                        onClick={() => setActiveTab('dashboard')}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                    >
                                        <LayoutDashboard size={20} />
                                        <span className="font-medium">Dashboard</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('my-products')}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'my-products' ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                    >
                                        <Store size={20} />
                                        <span className="font-medium">My Products</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('add-product')}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'add-product' ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                    >
                                        <PackagePlus size={20} />
                                        <span className="font-medium">Add Product</span>
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('profile')}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                    >
                                        <User size={20} />
                                        <span className="font-medium">Profile</span>
                                    </button>
                                </>
                            ) : (
                                <>
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
                                </>
                            )}
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
                                    <div className="text-center md:text-left flex-1">
                                        {isEditingProfile ? (
                                            <div className="mb-4">
                                                <input
                                                    type="text"
                                                    value={profileEditForm.name}
                                                    onChange={e => setProfileEditForm({ ...profileEditForm, name: e.target.value })}
                                                    className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white text-2xl font-bold focus:border-violet-500 focus:outline-none w-full max-w-sm"
                                                    placeholder="Your Name"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-4 mb-2">
                                                <h2 className="text-3xl font-bold text-white">{user.name}</h2>
                                                <button
                                                    onClick={handleEditProfileClick}
                                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                                    title="Edit Profile"
                                                >
                                                    <LayoutDashboard size={18} className="rotate-90" />
                                                </button>
                                            </div>
                                        )}

                                        <p className="text-gray-400 mb-4">Member since {new Date(user.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                            <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm border border-violet-500/20">
                                                {user.accountType === 'SELLER' ? 'Seller Account' : 'Premium Member'}
                                            </span>
                                            <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm border border-green-500/20">Verified</span>
                                        </div>

                                        {isEditingProfile && (
                                            <div className="flex gap-3 mt-4">
                                                <button
                                                    onClick={handleSaveProfile}
                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                                                >
                                                    Save Changes
                                                </button>
                                                <button
                                                    onClick={() => setIsEditingProfile(false)}
                                                    className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium text-sm"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {user.accountType === 'SELLER' && (
                                        <div className="ml-auto relative group">
                                            <button className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors relative">
                                                <Bell size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                                                {notifications.filter(n => !n.read).length > 0 && (
                                                    <span className="absolute top-2 right-2 h-3 w-3 bg-red-500 rounded-full border-2 border-[#0a0a0a]"></span>
                                                )}
                                            </button>

                                            <div className="absolute right-0 mt-2 w-80 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl overflow-hidden hidden group-hover:block z-50">
                                                <div className="p-4 border-b border-white/10">
                                                    <h3 className="text-white font-bold">Notifications</h3>
                                                </div>
                                                <div className="max-h-64 overflow-y-auto">
                                                    {notifications.length > 0 ? (
                                                        notifications.map(notification => (
                                                            <div
                                                                key={notification.id}
                                                                className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${!notification.read ? 'bg-white/[0.02]' : ''}`}
                                                                onClick={() => markNotificationAsRead(notification.id)}
                                                            >
                                                                <p className={`text-sm mb-1 ${!notification.read ? 'text-white font-medium' : 'text-gray-400'}`}>
                                                                    {notification.message}
                                                                </p>
                                                                <p className="text-xs text-gray-500">
                                                                    {new Date(notification.createdAt).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="p-4 text-center text-gray-500 text-sm">
                                                            No notifications
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-violet-500/30 transition-colors group">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="p-2 rounded-lg bg-violet-500/10 text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                                                <Mail size={20} />
                                            </div>
                                            <span className="text-sm text-gray-400 uppercase tracking-wider font-medium">Email Address</span>
                                        </div>
                                        {isEditingProfile ? (
                                            <input
                                                type="email"
                                                value={profileEditForm.email}
                                                onChange={e => setProfileEditForm({ ...profileEditForm, email: e.target.value })}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-violet-500 focus:outline-none"
                                            />
                                        ) : (
                                            <p className="text-lg text-white pl-12">{user.email}</p>
                                        )}
                                    </div>

                                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-violet-500/30 transition-colors group">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="p-2 rounded-lg bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                                <Phone size={20} />
                                            </div>
                                            <span className="text-sm text-gray-400 uppercase tracking-wider font-medium">Phone Number</span>
                                        </div>
                                        {isEditingProfile ? (
                                            <input
                                                type="tel"
                                                value={profileEditForm.phone}
                                                onChange={e => setProfileEditForm({ ...profileEditForm, phone: e.target.value })}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white focus:border-violet-500 focus:outline-none"
                                            />
                                        ) : (
                                            <p className="text-lg text-white pl-12">{user.phone}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Password Change Section */}
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <h3 className="text-xl font-bold text-white mb-6">Security</h3>

                                    {!showPasswordForm ? (
                                        <div className="flex items-center justify-between p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-violet-500/30 transition-colors">
                                            <div>
                                                <h4 className="text-lg font-bold text-white">Password</h4>
                                                <p className="text-gray-400 text-sm">Last changed 3 months ago</p>
                                            </div>
                                            <button
                                                onClick={() => setShowPasswordForm(true)}
                                                className="px-4 py-2 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors border border-white/10"
                                            >
                                                Change Password
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-violet-500/30 transition-colors">
                                            <form onSubmit={handlePasswordChange} className="space-y-4">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div>
                                                        <label className="block text-sm text-gray-400 mb-2">Current Password</label>
                                                        <input
                                                            type="password"
                                                            value={passwordForm.oldPassword}
                                                            onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                                            placeholder="••••••••"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm text-gray-400 mb-2">New Password</label>
                                                        <input
                                                            type="password"
                                                            value={passwordForm.newPassword}
                                                            onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                                            placeholder="••••••••"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm text-gray-400 mb-2">Confirm New Password</label>
                                                        <input
                                                            type="password"
                                                            value={passwordForm.confirmPassword}
                                                            onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                                            placeholder="••••••••"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <p className={`text-sm ${passwordMessage.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                                                        {passwordMessage}
                                                    </p>
                                                    <div className="flex gap-3">
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setShowPasswordForm(false);
                                                                setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
                                                                setPasswordMessage('');
                                                            }}
                                                            className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium text-sm"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="px-6 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors font-bold"
                                                        >
                                                            Update Password
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>

                                {/* Addresses Section */}
                                <div className="mt-8 pt-8 border-t border-white/10">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-white">My Addresses</h3>
                                        <button
                                            onClick={() => {
                                                setAddressForm({
                                                    fullName: user.name || '',
                                                    phone: user.phone || '',
                                                    streetLine1: '',
                                                    streetLine2: '',
                                                    city: '',
                                                    state: '',
                                                    postalCode: '',
                                                    country: '',
                                                    isDefault: addresses.length === 0
                                                });
                                                setShowAddressModal(true);
                                            }}
                                            className="px-4 py-2 bg-violet-500/10 text-violet-400 rounded-xl hover:bg-violet-500 hover:text-white transition-colors flex items-center gap-2 font-medium"
                                        >
                                            <Plus size={18} /> Add Address
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {addresses.length > 0 ? (
                                            addresses.map((addr) => (
                                                <div key={addr.id} className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-violet-500/30 transition-all group relative">
                                                    {addr.isDefault && (
                                                        <div className="absolute top-4 right-4">
                                                            <span className="px-2 py-1 rounded bg-violet-500/20 text-violet-400 text-xs font-medium border border-violet-500/20">Default</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-start gap-4 mb-4">
                                                        <div className="p-2 rounded-lg bg-white/5 text-gray-400 group-hover:bg-violet-500 group-hover:text-white transition-colors">
                                                            <MapPin size={20} />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-white font-medium">{addr.fullName}</h4>
                                                            <p className="text-sm text-gray-500">{addr.phone}</p>
                                                        </div>
                                                    </div>
                                                    <div className="pl-12 space-y-1 text-gray-400 text-sm">
                                                        <p>{addr.streetLine1}</p>
                                                        {addr.streetLine2 && <p>{addr.streetLine2}</p>}
                                                        <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                                                        <p>{addr.country}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="col-span-full text-center py-8 text-gray-500 bg-black/20 rounded-2xl border border-white/5 border-dashed">
                                                No addresses saved yet.
                                            </div>
                                        )}
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
                                                            <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1 border border-white/10">
                                                                <button
                                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                                    className="p-1 hover:text-white text-gray-400 transition-colors"
                                                                    disabled={item.quantity <= 1}
                                                                >
                                                                    <Minus size={14} />
                                                                </button>
                                                                <span className="text-white font-medium text-sm w-4 text-center">{item.quantity}</span>
                                                                <button
                                                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                                    className="p-1 hover:text-white text-gray-400 transition-colors"
                                                                >
                                                                    <Plus size={14} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="p-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-6 bg-white/[0.02] border-t border-white/10">
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <p className="text-gray-400 text-sm">Total Items</p>
                                                    <p className="text-white font-bold text-xl">{user.cart.items.reduce((acc, item) => acc + item.quantity, 0)}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-gray-400 text-sm">Total Price</p>
                                                    <p className="text-violet-400 font-bold text-2xl">
                                                        ₹{user.cart.items.reduce((acc, item) => acc + (Number(item.unitPrice) * item.quantity), 0).toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleCheckout()}
                                                className="w-full py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                            >
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

                        {activeTab === 'dashboard' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold text-white mb-6">Seller Dashboard</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 rounded-xl bg-violet-500/10 text-violet-500">
                                                <Store size={24} />
                                            </div>
                                            <h3 className="text-lg font-medium text-white">Total Products</h3>
                                        </div>
                                        <p className="text-3xl font-bold text-white">{sellerTotal || user.products?.length || 0}</p>
                                    </div>
                                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                                                <BarChart3 size={24} />
                                            </div>
                                            <h3 className="text-lg font-medium text-white">Total Sales</h3>
                                        </div>
                                        <p className="text-3xl font-bold text-white">$0.00</p>
                                        <p className="text-sm text-gray-400 mt-2">Coming soon</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'my-products' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-white">My Products</h2>
                                    <button onClick={() => {
                                        setEditingProduct(null);
                                        setProductForm({ name: '', price: '', category: '', imageUrl: '', description: '', tags: '' });
                                        setActiveTab('add-product');
                                    }} className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors flex items-center gap-2">
                                        <Plus size={18} /> Add Product
                                    </button>
                                </div>

                                {sellerLoading ? (
                                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">Loading...</div>
                                ) : sellerProducts && sellerProducts.length > 0 ? (
                                    <>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {sellerProducts.map((product) => (
                                                <div key={product.id} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-violet-500/30 transition-all group relative">
                                                    <div className="h-48 w-full bg-black/20 relative">
                                                        <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="p-6">
                                                        <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                                                        <p className="text-violet-400 font-bold text-lg mb-4">${product.price}</p>
                                                        <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                                                            <span>{product.Category}</span>
                                                            <span>Rating: {product.rating}</span>
                                                        </div>
                                                        <div className="flex gap-3 mt-4">
                                                            <button onClick={() => startEditing(product)} className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold z-10">
                                                                Edit
                                                            </button>
                                                            <button onClick={() => handleDeleteProduct(product.id)} className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-bold z-10">
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Pagination for seller products */}
                                        {sellerTotalPages > 1 && (
                                            <div className="flex justify-center mt-8 gap-2">
                                                <button disabled={sellerPage === 1} onClick={() => setSellerPage(1)} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Start</button>
                                                <button disabled={sellerPage === 1} onClick={() => setSellerPage(p => p - 1)} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Previous</button>
                                                {(() => {
                                                    const pages = [];
                                                    if (sellerPage > 1) pages.push(sellerPage - 1);
                                                    pages.push(sellerPage);
                                                    if (sellerPage < sellerTotalPages) pages.push(sellerPage + 1);
                                                    return pages.map(p => (
                                                        <button key={p} onClick={() => setSellerPage(p)} className={`w-10 h-10 rounded-lg transition-colors ${sellerPage === p ? 'bg-violet-600 text-white' : 'bg-white/5 hover:bg-white/10 text-gray-400'}`}>{p}</button>
                                                    ));
                                                })()}
                                                <button disabled={sellerPage === sellerTotalPages} onClick={() => setSellerPage(p => p + 1)} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">Next</button>
                                                <button disabled={sellerPage === sellerTotalPages} onClick={() => setSellerPage(sellerTotalPages)} className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">End</button>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                                        <Package size={48} className="mx-auto text-gray-600 mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">No products yet</h3>
                                        <p className="text-gray-400 mb-6">Start selling by adding your first product.</p>
                                        <button onClick={() => setActiveTab('add-product')} className="px-6 py-2 bg-violet-500 text-white rounded-full font-medium hover:bg-violet-600 transition-colors">
                                            Add Product
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'add-product' && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-2xl font-bold text-white mb-6">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                                <form onSubmit={handleCreateOrUpdateProduct} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Product Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                                value={productForm.name}
                                                onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Price</label>
                                            <input
                                                type="number"
                                                required
                                                step="0.01"
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                                value={productForm.price}
                                                onChange={e => setProductForm({ ...productForm, price: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Category</label>
                                            <input
                                                type="text"
                                                required
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                                value={productForm.category}
                                                onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                                            <input
                                                type="url"
                                                required
                                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                                value={productForm.imageUrl}
                                                onChange={e => setProductForm({ ...productForm, imageUrl: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Description</label>
                                        <textarea
                                            required
                                            rows={4}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                            value={productForm.description}
                                            onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Tags (comma separated)</label>
                                        <input
                                            type="text"
                                            placeholder="electronics, gadget, new"
                                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                            value={productForm.tags}
                                            onChange={e => setProductForm({ ...productForm, tags: e.target.value })}
                                        />
                                    </div>

                                    <div className="pt-4 flex gap-4">
                                        <button
                                            type="submit"
                                            className="flex-1 py-4 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-500/25"
                                        >
                                            {editingProduct ? 'Update Product' : 'Create Product'}
                                        </button>
                                        {editingProduct && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditingProduct(null);
                                                    setProductForm({ name: '', price: '', category: '', imageUrl: '', description: '', tags: '' });
                                                    setActiveTab('my-products');
                                                }}
                                                className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div >

            {/* Address Modal */}
            {
                showAddressModal && (
                    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
                            <h2 className="text-2xl font-bold text-white mb-6">Add Delivery Address</h2>
                            <form onSubmit={handleAddressSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                        value={addressForm.fullName}
                                        onChange={e => setAddressForm({ ...addressForm, fullName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                        value={addressForm.phone}
                                        onChange={e => setAddressForm({ ...addressForm, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Address Line 1</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                        value={addressForm.streetLine1}
                                        onChange={e => setAddressForm({ ...addressForm, streetLine1: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1">Address Line 2 (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                        value={addressForm.streetLine2}
                                        onChange={e => setAddressForm({ ...addressForm, streetLine2: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">City</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                            value={addressForm.city}
                                            onChange={e => setAddressForm({ ...addressForm, city: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">State</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                            value={addressForm.state}
                                            onChange={e => setAddressForm({ ...addressForm, state: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Postal Code</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                            value={addressForm.postalCode}
                                            onChange={e => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1">Country</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-violet-500 focus:outline-none"
                                            value={addressForm.country}
                                            onChange={e => setAddressForm({ ...addressForm, country: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddressModal(false)}
                                        className="flex-1 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-bold hover:bg-violet-700 transition-colors"
                                    >
                                        Save Address
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div >
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<FullScreenLoading />}>
            <ProfileContent />
        </Suspense>
    );
}