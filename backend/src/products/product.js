const { prisma } = require('../db/dbConfig');

async function getAllProducts(req, res) {
  try {
    const products = await prisma.products.findMany({
      select: {
        id: true,
        name: true,
        Category: true,
        description: true,
        price: true,
        imageUrl: true,
        rating: true
      }
    });
    return res.status(200).json(products);

  } catch (err) {
    console.error('Error fetching products:', err);

    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await prisma.products.findUnique({
      where: { id }
    })
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    console.log('Fetched product by ID:', product);
    return res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product by ID:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}


async function getProductByCategory(req, res) {
  try {
    const { category } = req.params;
    if (!category) {
      return res.status(404).json({ message: "category not found" })
    }
    const products = await prisma.products.findMany({
      where: { Category: category }
    });
    return res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching product by category:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}


async function searchProducts(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const products = await prisma.products.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { Category: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { tags: { has: query.toLowerCase() } }
        ]
      },
      select: {
        id: true,
        name: true,
        Category: true,
        description: true,
        price: true,
        imageUrl: true,
        rating: true,
        tags: true
      }
    });

    return res.status(200).json(products);
  } catch (err) {
    console.error('Error searching products:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

module.exports = { getAllProducts, getProductById, getProductByCategory, searchProducts };
