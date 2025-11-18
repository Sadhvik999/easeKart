import { useEffect, useState } from 'react'
import { CircleUser, ShoppingCart, Package, Truck, Shield, Star, ArrowRight } from 'lucide-react';
export default function LandingPage() {
  // const [data,setData] = useState([]);
  // useEffect(()=>{
  //   fetch('https://real-time-amazon-data.p.rapidapi.com/product-details?asin=B07ZPKBL9V&country=US',{
  //     headers: {
  //       'X-RapidAPI-Key' : '9a4a00eb96msh4abc67f0e62ad78p16b6afjsnfbf1de091569'
  //     }
  //   })
  //   .then((res)=>res.json())
  //   .then((data)=>{console.log(data)})
  //   .then((data)=>setData(data))
  //   .catch((err)=>console.log(err))
  // },[])
  const products = [
    { id: 1, name: "Premium Wireless Headphones", price: "₹299", image: "/public/product-1.png", rating: 4.8 },
    { id: 2, name: "Smart Watch Pro", price: "₹399", image: "/public/product-2.png", rating: 4.9 },
    { id: 3, name: "True Wireless Earbuds", price: "₹179", image: "/public/product-3.png", rating: 4.7 },
    { id: 4, name: "Ultra Laptop", price: "₹1,299", image: "/public/product-4.png", rating: 5.0 },
  ];
  const benefits = [
    { icon: Truck, title: "Free Shipping", description: "On orders over $100" },
    { icon: Shield, title: "Secure Payment", description: "100% secure transactions" },
    { icon: Package, title: "Easy Returns", description: "30-day return policy" },
    { icon: Star, title: "Top Quality", description: "Premium products only" },
  ];
  return (
    <>
      <div>
        <div className='flex items-center justify-between mb-12 border-b'>
          <div><h1 className='text-2xl font-bold'><ShoppingCart size={20} />easyCart</h1></div>
          <div className='flex gap-4'>
            <a href="#">Home</a>
            <a href="#">shop</a>
            <a href="#">orders</a></div>
          <div><CircleUser size={20} /></div>
        </div>

        <div style={{ backgroundImage: "url('/image.png')", backgroundSize: 'cover', opacity: "0.06", width: "100vw", height: "50vh" }} className='absolute inset-0 bg-cover bg-center flex flex-col justify-center mt-16  gap-y-6 z-10'></div>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((item) => (
              <div key={item.id} className="border rounded-lg shadow-sm p-3 text-center">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-3" />
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-gray-600">{item.price}</p>
                <p className="text-yellow-500">⭐ {item.rating}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='flex flex-col justify-evenly items-center mt-20 mb-20 px-4 gap-12 bg-white/70 md:flex-row'>
          {benefits.map((item, index) => (
            <div key={index} className='flex flex-col items-center gap-2'>
              <div><item.icon className="rounded-3xl p-2 h-12 w-12 bg-violet-100 text-violet-500 hover:bg-violet-500 hover:text-white" /></div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className='flex flex-col py-20 justify-center items-center'>
          <div className='text-center mb-10'>
            <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
            <p className="text-gray-600">Find exactly what you're looking for</p>

            <div className='flex  md:flex-cols-3 justify-between gap-8 mt-8'>
              {["Audio", "Wearables", "Computing"].map((category,index)=>(
                <div className='bg-violet-200 px-32 py-16 rounded-2xl ' key={index}>
                  <h1 className='font-bold text-2xl mb-4'>{category}</h1>
                  <button className='bg-white px-6 py-1 rounded-xl'>Explore<ArrowRight className='ml-2 h-4 w-4'/></button>
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
      {/* <div>
      <img src="/assets/hero_product_img2.png" alt="" />
      <img src="/assets/hero_product_img1.png" alt="" />
      <img src="/assets/product_img1.png" alt="" />
      <img src="/assets/product_img2.png" alt="" />
      <img src="/assets/product_img3.png" alt="" />
      <img src="/assets/product_img4.png" alt="" />
      <img src="/assets/product_img5.png" alt="" />
      <img src="/assets/product_img6.png" alt="" />
      <img src="/assets/product_img7.png" alt="" />
      <img src="/assets/product_img8.png" alt="" />
      <img src="/assets/product_img9.png" alt="" />
      <img src="/assets/product_img10.png" alt="" />
      <img src="/assets/product_img11.png" alt="" />
      <img src="/assets/product_img12.png" alt="" />
      <img src="/assets/product_img13.png" alt="" />
      <img src="/assets/product_img14.png" alt="" />
      <img src="/assets/product_img15.png" alt="" />
      <img src="/assets/product_img16.png" alt="" />
      <img src="/assets/profile_pic1.jpg" alt="" />
      <img src="/assets/profile_pic2.jpg" alt="" />
      <img src="/assets/profile_pic3.jpg" alt="" />
      <img src="/assets/upload_area.svg" alt="" />
    </div> */}
    </>
  )
}
