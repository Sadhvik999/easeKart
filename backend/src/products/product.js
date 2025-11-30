const { prisma } = require('../db/dbConfig');

async function getAllProducts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [products, totalProducts] = await Promise.all([
      prisma.products.findMany({
        where: { isDeleted: false },
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          Category: true,
          description: true,
          price: true,
          imageUrl: true,
          rating: true
        }
      }),
      prisma.products.count({ where: { isDeleted: false } })
    ]);

    return res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page
    });

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
    if (!product || product.isDeleted) {
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!category) {
      return res.status(404).json({ message: "category not found" })
    }

    const [products, totalProducts] = await Promise.all([
      prisma.products.findMany({
        where: { Category: category, isDeleted: false },
        skip,
        take: limit
      }),
      prisma.products.count({ where: { Category: category, isDeleted: false } })
    ]);

    return res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page
    });
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const whereClause = {
      isDeleted: false,
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { Category: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { tags: { has: query.toLowerCase() } }
      ]
    };

    const [products, totalProducts] = await Promise.all([
      prisma.products.findMany({
        where: whereClause,
        skip,
        take: limit,
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
      }),
      prisma.products.count({ where: whereClause })
    ]);

    return res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error searching products:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

async function getCategories(req, res) {
  try {
    const categories = await prisma.products.groupBy({
      by: ['Category'],
      where: { isDeleted: false },
      _count: {
        Category: true
      }
    });

    const formattedCategories = categories
      .filter(c => c.Category)
      .map(c => ({
        name: c.Category,
        count: c._count.Category
      }));

    return res.status(200).json(formattedCategories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

async function createProduct(req, res) {
  try {
    const { name, price, category, imageUrl, description, tags } = req.body;
    const sellerId = req.user.id;

    // Verify user is a seller (optional double check, though middleware should handle auth)
    // We assume req.user is populated by verifyToken middleware

    if (!name || !price || !imageUrl) {
      return res.status(400).json({ message: "Name, price, and image URL are required" });
    }

    const product = await prisma.products.create({
      data: {
        name,
        price,
        Category: category,
        imageUrl,
        description,
        tags: tags || [],
        rating: 0, // Default rating
        sellerId
      }
    });

    return res.status(201).json(product);
  } catch (err) {
    console.error('Error creating product:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const { name, price, category, imageUrl, description, tags } = req.body;
    const sellerId = req.user.id;

    const product = await prisma.products.findUnique({ where: { id } });

    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerId !== sellerId) {
      return res.status(403).json({ message: "Unauthorized: You can only update your own products" });
    }

    const updatedProduct = await prisma.products.update({
      where: { id },
      data: {
        name,
        price,
        Category: category,
        imageUrl,
        description,
        tags: tags || []
      }
    });

    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.error('Error updating product:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const sellerId = req.user.id;

    const product = await prisma.products.findUnique({ where: { id } });

    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.sellerId !== sellerId) {
      return res.status(403).json({ message: "Unauthorized: You can only delete your own products" });
    }

    // Soft delete
    await prisma.products.update({
      where: { id },
      data: { isDeleted: true }
    });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error('Error deleting product:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}

module.exports = { getAllProducts, getProductById, getProductByCategory, searchProducts, getCategories, createProduct, updateProduct, deleteProduct };
