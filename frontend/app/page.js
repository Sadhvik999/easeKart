"use client";
import React from 'react'
import { useEffect, useState } from 'react'
import { CircleUser, ShoppingCart, Package, Truck, Shield, Star, ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";
import Image from 'next/image'
import { BackgroundGradient } from "../components/ui/background-gradient";

export default function LandingPage() {


  const router = useRouter();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const backend = process.env.NEXT_PUBLIC_BACKEND;

        const res = await fetch(`${backend}/api/getAllProducts`);
        const fetchedData = await res.json();
        if (Array.isArray(fetchedData)) {
          setProducts(fetchedData);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
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

  return (
    <>
      <div className='p-4 w-screen min-h-screen'>
        <div className='flex items-center justify-between px-10 py-3 mb-12 border-b'>
          <div><h1 className='flex items-center gap-1 text-2xl font-bold'><ShoppingCart size={20} />easyCart</h1></div>
          <div className='flex gap-4'>
            <a href="#">Home</a>
            <a href="#">shop</a>
            <a href="#">orders</a></div>
          <div><CircleUser size={20} /></div>
        </div>

        <div style={{ backgroundImage: "url('/image.png')", backgroundSize: 'cover', opacity: "0.06", width: "100vw", height: "40vh" }} className='absolute inset-0 bg-cover bg-center flex flex-col justify-center mt-16  gap-y-6 z-10'></div>
        <div className='relative container mx-auto px-4 py-24 md:py-32 z-20 '>
          <div className='flex-col gap-y-4'>
            <h1 className='text-4xl font-bold text-left'>Discover Premium Tech Products</h1>
            <p className='text-gray-400'>Experience the future of technology with our carefully curated collection of premium electronics and accessories.</p>
          </div>
          <div className='items-start flex gap-4'>
            <button className='border bg-black text-white px-2 md:px-4 py-1 rounded-2xl ' >Explore Collection</button>
            <button className='border bg-black text-white px-2 md:px-4 py-1 rounded-2xl ' >Learn More</button>
          </div>
        </div>

        <div className='flex flex-col mt-20 gap-2 bg-[hsl(220deg 13% 95% / 30%)]'>
          <div className='flex flex-col justify-center items-center text-center gap-4'>
            <h1 className='text-4xl font-bold'>Featured Products</h1>
            <p className='text-gray-400'>Discover our handpicked selection of the finest tech products</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((item) => (
              <div key={item.id} onClick={() => (router.push(`/products/${item.id}`))} className="rounded-lg shadow-sm p-4  flex flex-col text-left">
                <BackgroundGradient key={item.id} className="rounded-[22px] max-w-sm p-4 sm:p-4 bg-white dark:bg-zinc-900">
                  <div className="relative  h-72 w-full rounded-md mb-3 overflow-hidden ">
                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className='gap-1 flex flex-col'>
                    <h2 className="font-semibold  text-2xl">{item.name}</h2>
                    <p className="text-lg font-medium text-green-600" > ₹ {item.price}</p>
                    <div className="text-sm text-white/80"><span className=''>Rating:</span > ⭐ {item.rating}</div>
                  </div>
                </BackgroundGradient>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col justify-evenly items-center mt-40 mb-20 px-4 gap-12 md:flex-row '>
          {benefits.map((item, index) => (
            <div key={index} className=''>
              <BackgroundGradient className="rounded-[22px] w-64 bg-white dark:bg-zinc-900 p-6 flex justify-center flex-col items-center gap-2">
                <div><item.icon className="flex rounded-3xl p-2 h-12 w-12 bg-violet-100 text-violet-500 hover:bg-violet-500 hover:text-white" /></div>
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-gray-600">{item.description}</p>
              </BackgroundGradient>
            </div>
          ))}
        </div>

        <div className='flex flex-col py-20 justify-center items-center'>
          <div className='text-center mb-10'>
            <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
            <p className="text-gray-600">Find exactly what you're looking for</p>

            <div className='flex  md:flex-cols-3 justify-between gap-8 mt-8'>
              {["Audio", "Wearables", "Computing"].map((category, index) => (
                <div className='bg-violet-200 px-32 py-16 rounded-2xl ' key={index}>
                  <h1 className='font-bold text-2xl mb-4'>{category}</h1>
                  <button className='flex items-center bg-white px-6 py-1 rounded-xl'>Explore<ArrowRight className='ml-2 h-4 w-4' /></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div>

          </div>
        </div>


      </div>

    </>
  )
}

