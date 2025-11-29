const { prisma } = require('../db/dbConfig');

const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { addressId } = req.body;

        if (!addressId) {
            return res.status(400).json({ message: "Address ID is required" });
        }

        // Get user's cart
        const cart = await prisma.cart.findUnique({
            where: { userId: userId },
            include: {
                items: {
                    include: { product: true }
                }
            }
        });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Calculate total amount
        const totalAmount = cart.items.reduce((acc, item) => {
            return acc + (Number(item.unitPrice) * item.quantity);
        }, 0);

        // Get address details for snapshot
        const address = await prisma.address.findUnique({
            where: { id: addressId }
        });

        if (!address) {
            return res.status(404).json({ message: "Address not found" });
        }

        const shippingAddress = `${address.fullName}, ${address.streetLine1}, ${address.streetLine2 ? address.streetLine2 + ', ' : ''}${address.city}, ${address.state}, ${address.postalCode}, ${address.country}, Phone: ${address.phone}`;

        console.log("Creating order for user:", userId);
        console.log("Address ID:", addressId);
        console.log("Total Amount:", totalAmount);

        // Create Order
        const order = await prisma.order.create({
            data: {
                userId: userId,
                status: 'PROCESSING', // Simulating payment success immediately
                totalAmount: totalAmount,
                addressId: addressId,
                shippingAddress: shippingAddress,
                items: {
                    create: cart.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice
                    }))
                }
            }
        });
        console.log("Order created:", order.id);

        // Clear Cart
        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id }
        });

        res.status(201).json({ message: "Order placed successfully", orderId: order.id });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createOrder };
