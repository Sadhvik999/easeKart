const { prisma } = require('../db/dbConfig');

async function getAllProducts(req, res) {
  try {
    const products = await prisma.products.findMany({
        select: {
            id: true,
            name: true,
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
    try{
    const { id } = req.params;
    const product = await prisma.products.findUnique({
      where: { id }
    })
        if (!product){
            return res.status(404).json({message: "Product not found"});
        }
        console.log('Fetched product by ID:', product);
        return res.status(200).json(product);
    }catch(err){    
        console.error('Error fetching product by ID:', err);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}
module.exports = { getAllProducts , getProductById };
