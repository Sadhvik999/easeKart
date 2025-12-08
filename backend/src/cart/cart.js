const { prisma } = require('../db/dbConfig');

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        if (req.user.accountType === 'SELLER') {
            return res.status(403).json({ message: "Sellers cannot add items to cart" });
        }

        const product = await prisma.products.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        let cart = await prisma.cart.findUnique({
            where: { userId: userId }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId: userId }
            });
        }

        const existingCartItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: productId
            }
        });

        if (existingCartItem) {
            await prisma.cartItem.update({
                where: { id: existingCartItem.id },
                data: { quantity: existingCartItem.quantity + quantity }
            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: productId,
                    quantity: quantity,
                    unitPrice: product.price
                }
            });
        }

        res.status(200).json({ message: "Item added to cart successfully" });

    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await prisma.cart.findUnique({
            where: { userId: userId },
            include: {
                items: {
                    include: {
                        product: true
                    },
                    orderBy: {
                        productId: 'asc'
                    }
                }
            }
        });

        if (!cart) {
            return res.status(200).json({ items: [] });
        }

        res.status(200).json(cart);

    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemId, quantity } = req.body;

        if (!itemId || quantity === undefined) {
            return res.status(400).json({ message: "Item ID and quantity are required" });
        }

        const cart = await prisma.cart.findUnique({
            where: { userId: userId }
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: itemId,
                cartId: cart.id
            }
        });

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            await prisma.cartItem.delete({
                where: { id: itemId }
            });
            return res.status(200).json({ message: "Item removed from cart" });
        }

        // Update quantity
        await prisma.cartItem.update({
            where: { id: itemId },
            data: { quantity: quantity }
        });

        res.status(200).json({ message: "Cart item updated successfully" });

    } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const removeCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { itemId } = req.body;

        if (!itemId) {
            return res.status(400).json({ message: "Item ID is required" });
        }

        const cart = await prisma.cart.findUnique({
            where: { userId: userId }
        });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: itemId,
                cartId: cart.id
            }
        });

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        await prisma.cartItem.delete({
            where: { id: itemId }
        });

        res.status(200).json({ message: "Item removed from cart" });

    } catch (error) {
        console.error("Error removing cart item:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addToCart, getCart, updateCartItem, removeCartItem };
