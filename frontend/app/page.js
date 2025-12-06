"use client";
import React, { useEffect, useState, useRef } from 'react';
import { CircleUser, ShoppingCart, Package, Truck, Shield, Star, ArrowRight, Sparkles, TrendingUp, Users, Heart, Search } from 'lucide-react';
import { useRouter } from "next/navigation";
import { BackgroundGradient } from "../components/ui/background-gradient";
import { Loading } from "../components/ui/loading";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const backend = process.env.NEXT_PUBLIC_BACKEND;
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroller = scrollRef.current;
    if (!scroller || categories.length === 0) return;

    let animationId;
    let isPaused = false;

    const scroll = () => {
      if (!isPaused && scroller) {
        if (scroller.scrollLeft >= scroller.scrollWidth / 2) {
          scroller.scrollLeft = 0;
        } else {
          scroller.scrollLeft += 1;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    const startAnimation = () => {
      animationId = requestAnimationFrame(scroll);
    };

    const pause = () => isPaused = true;
    const play = () => isPaused = false;

    // Start
    startAnimation();

    scroller.addEventListener('mouseenter', pause);
    scroller.addEventListener('mouseleave', play);
    scroller.addEventListener('touchstart', pause);
    scroller.addEventListener('touchend', play);

    return () => {
      cancelAnimationFrame(animationId);
      if (scroller) {
        scroller.removeEventListener('mouseenter', pause);
        scroller.removeEventListener('mouseleave', play);
        scroller.removeEventListener('touchstart', pause);
        scroller.removeEventListener('touchend', play);
      }
    };
  }, [categories]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch(`${backend}/api/getAllProducts?limit=3`);
        const fetchedData = await res.json();
        if (fetchedData.products && Array.isArray(fetchedData.products)) {
          setProducts(fetchedData.products);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
      finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const benefits = [
    { icon: Truck, title: "Free Shipping", description: "On orders over $100" },
    { icon: Shield, title: "Secure Payment", description: "100% secure transactions" },
    { icon: Package, title: "Easy Returns", description: "30-day return policy" },
    { icon: Star, title: "Top Quality", description: "Premium products only" },
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Package, value: "10K+", label: "Products" },
    { icon: TrendingUp, value: "99%", label: "Satisfaction" },
    { icon: Heart, value: "24/7", label: "Support" },
  ];

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${backend}/api/categories`);
        const fetchedData = await res.json();
        if (Array.isArray(fetchedData)) {
          setCategories(fetchedData);
        }

      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, [])
  console.log(categories)


  return (
    <div className='min-h-screen bg-black text-white font-sans'>
      <React.Suspense fallback={<div className="h-20 bg-black/80" />}>
        <Navbar />
      </React.Suspense>

      {/* Hero Section */}
      <section className='relative min-h-screen flex items-center justify-center overflow-hidden pt-20'>
        {/* Animated Background */}
        <div className='absolute inset-0 z-0 pointer-events-none'>
          <div className='absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-violet-500/20 blur-[150px] animate-pulse'></div>
          <div className='absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-fuchsia-500/20 blur-[150px] animate-pulse' style={{ animationDelay: '1s' }}></div>
          <div style={{ backgroundImage: "url('/image.png')", backgroundSize: 'cover', opacity: "0.03" }} className='absolute inset-0 bg-cover bg-center'></div>
        </div>

        <div className='relative z-10 container mx-auto px-6 text-center'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700'>
            <Sparkles size={16} className="text-violet-400" />
            <span className='text-sm text-violet-300'>New Arrivals Every Week</span>
          </div>

          <h1 className='text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-b from-white via-white to-gray-500 animate-in fade-in slide-in-from-bottom-4 duration-700' style={{ animationDelay: '100ms' }}>
            Discover Premium Tech<br />Products
          </h1>

          <p className='text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700' style={{ animationDelay: '200ms' }}>
            Experience the future of technology with our carefully curated collection of premium electronics and accessories.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700' style={{ animationDelay: '300ms' }}>
            <button onClick={() => router.push('/products')} className='px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all hover:scale-105 shadow-lg shadow-white/20'>
              Explore Collection
            </button>
            <button onClick={() => router.push('/seller/signup')} className='px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/20'>
              Become a Seller
            </button>
          </div>

          {/* Stats */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto'>
            {stats.map((stat, idx) => (
              <div key={idx} className='text-center animate-in fade-in slide-in-from-bottom-4 duration-700' style={{ animationDelay: `${400 + idx * 100}ms` }}>
                <div className='flex justify-center mb-3'>
                  <stat.icon size={32} className="text-violet-500" />
                </div>
                <div className='text-3xl font-bold text-white mb-1'>{stat.value}</div>
                <div className='text-sm text-gray-400'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className='py-24 relative'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4'>Why Choose Us</h2>
            <p className='text-gray-400 text-lg'>Experience shopping like never before</p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            {benefits.map((item, index) => (
              <div key={index} className='group'>
                <BackgroundGradient className="rounded-3xl bg-black p-8 flex flex-col items-center text-center gap-4 h-full hover:scale-105 transition-transform duration-300">
                  <div className='h-16 w-16 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-500 group-hover:bg-violet-500 group-hover:text-white transition-all'>
                    <item.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </BackgroundGradient>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className='py-24 bg-linear-to-b from-transparent to-violet-500/5'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4'>Featured Products</h2>
            <p className='text-gray-400 text-lg'>Discover our handpicked selection of the finest tech products</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full">
                <Loading />
              </div>
            ) : (
              products.map((item) => (
                <div key={item.id} onClick={() => router.push(`/products/${item.id}`)} className="cursor-pointer group">
                  <BackgroundGradient className="rounded-3xl bg-zinc-900 p-6 h-full hover:scale-105 transition-transform duration-300">
                    <div className="relative h-64 w-full rounded-2xl mb-4 overflow-hidden bg-white/5">
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
              ))
            )}
          </div>

          <div className='text-center mt-12'>
            <button onClick={() => router.push('/products')} className='px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-full transition-all hover:scale-105 flex items-center gap-2 mx-auto'>
              Browse All Products <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className='py-24 bg-linear-to-b from-transparent to-violet-500/5'>
        <div className='container mx-auto px-6'>
          <div className='text-center mb-16'>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Shop by Category</h2>
            <p className="text-gray-400 text-lg">Explore our diverse range of premium tech products</p>
          </div>

          <div className="relative w-full">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto pb-4 gap-6 no-scrollbar [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {/* Render 3 sets to ensure smooth infinite scroll even on wide screens */}
              {[...categories, ...categories, ...categories].map((category, index) => (
                <div
                  key={index}
                  onClick={() => router.push(`/products?category=${category.name}`)}
                  className='group cursor-pointer w-72 shrink-0'
                >
                  <div className='relative overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 p-6 hover:border-violet-500/50 transition-all duration-300 h-full'>
                    {/* Gradient overlay on hover */}
                    <div className='absolute inset-0 from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/10 group-hover:to-fuchsia-500/10 transition-all duration-300'></div>

                    <div className='relative z-10 flex flex-col h-full'>
                      {/* Icon placeholder */}
                      <div className='h-12 w-12 rounded-xl from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                        <Package size={24} className="text-violet-400" />
                      </div>

                      {/* Category name */}
                      <h3 className='text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors'>
                        {category.name}
                      </h3>

                      {/* Product count */}
                      <p className='text-sm text-gray-400 mb-4'>
                        {category.count} {category.count === 1 ? 'Product' : 'Products'}
                      </p>

                      {/* Arrow indicator */}
                      <div className='mt-auto flex items-center text-sm text-violet-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity'>
                        Browse <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Fade Effect on Edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 md:w-32 bg-linear-to-r from-black to-transparent z-10"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 md:w-32 bg-linear-to-l from-black to-transparent z-10"></div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 relative overflow-hidden'>
        <div className='absolute inset-0 bg-linear-to-r from-violet-500/10 to-fuchsia-500/10'></div>
        <div className='container mx-auto px-6 relative z-10'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='text-4xl md:text-5xl font-bold mb-6'>Ready to Start Shopping?</h2>
            <p className='text-xl text-gray-400 mb-8'>Join thousands of satisfied customers and experience the future of online shopping today.</p>
            <button className='px-10 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all hover:scale-105 text-lg shadow-2xl shadow-white/20'>
              Get Started Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )

}

