"use client";
import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
export default function Products(){
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProductById(){
            try{
                const backend = import.meta?.env?.VITE_BACKEND || 'http://localhost:4000'
                const res = await fetch(`${backend}/api/getProductById/${id}`)
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`HTTP ${res.status}: ${text}`)
                }
                const data = await res.json();
                setProduct(data);
            }catch(err){
                console.error("Error fetching product by ID:", err);
                setError(err.message || String(err));
            } finally {
                setLoading(false)
            }
        }
        if (id) fetchProductById();
    }, [id]);

    if (loading) return <div>Loading product...</div>
    if (error) return <div className="text-red-500">Error: {error}</div>
    if (!product) return <div>No product found.</div>

    return (
        <div className="max-w-3xl mx-auto p-4 w-full h-screen">
            <img src={product.imageUrl || '/product-1.png'} alt={product.name} className="w-full h-64 object-cover rounded-md mb-4" />
            <h1>{product.name}</h1>
            <h1>Price: {product.price}</h1>
            <h1>Rating: {product.rating}</h1>
        </div>
    )
}