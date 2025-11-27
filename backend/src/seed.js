const prisma_n = require('./db/dbConfig');
const prisma = prisma_n.prisma;

const products = [
  {
    name: "Premium Wireless Headphones",
    price: 299.0,
    description: "High quality wireless headphones with noise cancellation",
    imageUrl: "/product-1.png",
    rating: 4.8,
  },
  {
    name: "Smart Watch Pro",
    price: 399.0,
    description: "Advanced smartwatch with health tracking",
    imageUrl: "/product-2.png",
    rating: 4.9,
  },
  {
    name: "True Wireless Earbuds",
    price: 179.0,
    description: "Compact and powerful earbuds",
    imageUrl: "/product-3.png",
    rating: 4.7,
  },
  {
    name: "Ultra Laptop",
    price: 1299.0,
    description: "High performance laptop for professionals",
    imageUrl: "/product-4.png",
    rating: 5.0,
  },

  {
    name: "UltraSound Bluetooth Speaker",
    price: 149.99,
    description: "Portable Bluetooth speaker with deep bass and clear sound",
    Category: "Audio",
    imageUrl: "https://www.istockphoto.com/photos/audio-electronics",
    rating: 4.6,
  },
  {
    name: "Noise Cancelling Headphones",
    price: 259.0,
    description: "Over-ear headphones with active noise cancellation",
    Category: "Audio",
    imageUrl: "https://www.freepik.com/free-photos-vectors/audio-samples-music",
    rating: 4.8,
  },
  {
    name: "Compact Soundbar",
    price: 199.0,
    description: "Slim soundbar for immersive home audio experience",
    Category: "Audio",
    imageUrl: "https://www.istockphoto.com/photos/audio-electronics",
    rating: 4.5,
  },
  {
    name: "Portable Music Player",
    price: 89.99,
    description: "Compact digital music player with long battery life",
    Category: "Audio",
    imageUrl: "https://www.freepik.com/free-photos-vectors/audio-samples-music",
    rating: 4.2,
  },
  {
    name: "Studio Monitor Speakers",
    price: 349.0,
    description: "Professional studio monitor speakers",
    Category: "Audio",
    imageUrl: "https://www.istockphoto.com/photos/audio-electronics",
    rating: 4.7,
  },

  {
    name: "Smart Fitness Tracker",
    price: 99.0,
    description: "Track fitness, sleep, and daily activities",
    Category: "Wearables",
    imageUrl: "https://www.istockphoto.com/photos/wearable-technology",
    rating: 4.3,
  },
  {
    name: "Smart Watch Series 7",
    price: 449.0,
    description: "Advanced smartwatch with health features",
    Category: "Wearables",
    imageUrl: "https://www.istockphoto.com/photos/wearable-technology",
    rating: 4.9,
  },

  {
    name: "2-in-1 Convertible Laptop",
    price: 999.0,
    description: "Laptop + Tablet hybrid for productivity",
    Category: "Computing",
    imageUrl: "https://www.istockphoto.com/photos/computing",
    rating: 4.7,
  },
  {
    name: "Ultra Slim Laptop",
    price: 1199.0,
    description: "Slim and lightweight high performance laptop",
    Category: "Computing",
    imageUrl: "https://www.istockphoto.com/photos/computing",
    rating: 4.8,
  },
  {
    name: "Tablet Pro 11",
    price: 699.0,
    description: "High performance tablet for work and entertainment",
    Category: "Computing",
    imageUrl: "https://www.istockphoto.com/photos/computing",
    rating: 4.6,
  }
];

async function seed() {
  try {
    console.log("Seeding products...");

    await prisma.products.createMany({
      data: products
    });

    console.log("✅ Products seeded successfully");
  } catch (err) {
    console.error("❌ Error while seeding:", err);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
