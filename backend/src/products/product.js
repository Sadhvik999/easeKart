const { get } = require('http');
const { prisma } = require('../db/dbConfig');
function getSortOption(sort) {
  switch (sort) {
    case "price-low":
      return { price: 'asc' }
    case "price-high":
      return { price: 'desc' }
    default:
      return undefined
  }
}
async function getAllProducts(req, res) {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    // Support new sortField/sortOrder or legacy sort param
    let orderBy = undefined;
    const { sortField, sortOrder } = req.query;
    const legacySort = req.query.sort;

    if (sortField && sortOrder) {
      // Whitelist allowed sort fields
      const allowedFields = ['price', 'rating', 'createdAt', 'name'];
      if (allowedFields.includes(sortField)) {
        orderBy = { [sortField]: sortOrder === 'asc' ? 'asc' : 'desc' };
      }
    } else if (legacySort) {
      // Fallback to old sort format
      orderBy = getSortOption(legacySort);
    }

    const [products, totalProducts] = await Promise.all([
      prisma.products.findMany({
        where: { isDeleted: false },
        skip,
        take: limit,
        orderBy,
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
      currentPage: page,
      limit
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
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    if (!category) {
      return res.status(404).json({ message: "category not found" })
    }

    // Support new sortField/sortOrder or legacy sort param
    let orderBy = undefined;
    const { sortField, sortOrder } = req.query;
    const legacySort = req.query.sort;

    if (sortField && sortOrder) {
      const allowedFields = ['price', 'rating', 'createdAt', 'name'];
      if (allowedFields.includes(sortField)) {
        orderBy = { [sortField]: sortOrder === 'asc' ? 'asc' : 'desc' };
      }
    } else if (legacySort) {
      orderBy = getSortOption(legacySort);
    }

    const [products, totalProducts] = await Promise.all([
      prisma.products.findMany({
        where: { Category: category, isDeleted: false },
        skip,
        take: limit,
        orderBy
      }),
      prisma.products.count({ where: { Category: category, isDeleted: false } })
    ]);

    return res.status(200).json({
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      limit
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
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Support new sortField/sortOrder or legacy sort param
    let orderBy = undefined;
    const { sortField, sortOrder } = req.query;
    const legacySort = req.query.sort;

    if (sortField && sortOrder) {
      const allowedFields = ['price', 'rating', 'createdAt', 'name'];
      if (allowedFields.includes(sortField)) {
        orderBy = { [sortField]: sortOrder === 'asc' ? 'asc' : 'desc' };
      }
    } else if (legacySort) {
      orderBy = getSortOption(legacySort);
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
        orderBy,
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
      currentPage: page,
      limit
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
        rating: 0,
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
    // Check for related records
    const cartRefs = await prisma.cartItem.count({ where: { productId: id } });
    const orderRefs = await prisma.orderItems.count({ where: { productId: id } });

    // If product has been part of any orders, do NOT hard-delete (orders should stay consistent).
    if (orderRefs > 0) {
      // Perform soft-delete instead and inform the client
      await prisma.products.update({ where: { id }, data: { isDeleted: true } });
      return res.status(200).json({ message: "Product marked deleted (soft-delete) because it has associated orders" });
    }

    // If there are cart references, remove them first, then hard-delete the product
    if (cartRefs > 0) {
      await prisma.$transaction([
        prisma.cartItem.deleteMany({ where: { productId: id } }),
        prisma.products.delete({ where: { id } })
      ]);
      return res.status(200).json({ message: "Product and related cart items deleted successfully" });
    }

    await prisma.products.delete({ where: { id } });
    return res.status(200).json({ message: "Product permanently deleted" });
  } catch (err) {
    console.error('Error deleting product:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
}


async function getMyProducts(req, res) {
  try {
    const sellerId = req.user.id;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const skip = (page - 1) * limit;

    let orderBy = undefined;
    const { sortField, sortOrder } = req.query;
    if (sortField && sortOrder) {
      const allowedFields = ['price', 'rating', 'createdAt', 'name'];
      if (allowedFields.includes(sortField)) {
        orderBy = { [sortField]: sortOrder === 'asc' ? 'asc' : 'desc' };
      }
    }

    const where = { sellerId: sellerId, isDeleted: false };

    const [products, total] = await Promise.all([
      prisma.products.findMany({ where, skip, take: limit, orderBy }),
      prisma.products.count({ where })
    ]);

    return res.status(200).json({ products, total, totalPages: Math.ceil(total / limit), page, limit });
  } catch (err) {
    console.error('Error fetching my products:', err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}


module.exports = { getAllProducts, getProductById, getProductByCategory, searchProducts, getCategories, createProduct,updateProduct, deleteProduct, getMyProducts };
