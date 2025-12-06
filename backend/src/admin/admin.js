const { prisma } = require('../db/dbConfig');

async function getAllSellers(req, res) {
    try {
        const sellers = await prisma.Users.findMany({
            where: { accountType: 'SELLER' },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                createdAt: true,
                products: {
                    where: {
                        isDeleted: false
                    },
                    select: {
                        name: true,
                        orderItems: { // Sold items
                            select: {
                                quantity: true,
                                unitPrice: true
                            }
                        }
                    }
                },
                _count: {
                    select: { products: true }
                }
            }
        });

        // Transform data to include sold count
        const formattedSellers = sellers.map(seller => {
            const soldCount = seller.products.reduce((acc, product) => {
                return acc + product.orderItems.reduce((sum, item) => sum + item.quantity, 0);
            }, 0);

            return {
                ...seller,
                soldCount
            };
        });

        res.json(formattedSellers);
    } catch (err) {
        console.error("Error fetching sellers:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getAllCustomers(req, res) {
    try {
        const customers = await prisma.Users.findMany({
            where: { accountType: 'CUSTOMER' },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                createdAt: true,
                orders: {
                    include: {
                        items: {
                            include: {
                                product: {
                                    select: { name: true, imageUrl: true }
                                }
                            }
                        }
                    },
                    orderBy: { createdAt: 'desc' }
                },
                _count: {
                    select: { orders: true }
                }
            }
        });
        res.json(customers);
    } catch (err) {
        console.error("Error fetching customers:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getAdminProducts(req, res) {
    try {
        const products = await prisma.products.findMany({
            include: {
                seller: {
                    select: { name: true, email: true }
                }
            }
        });
        res.json(products);
    } catch (err) {
        console.error("Error fetching admin products:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function getUserDetails(req, res) {
    const { id } = req.params;
    try {
        const userId = parseInt(id);
        const user = await prisma.Users.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                accountType: true,
                createdAt: true,
                // For Customers: Fetch their orders
                orders: {
                    include: {
                        items: {
                            include: {
                                product: { select: { name: true, imageUrl: true } }
                            }
                        },
                        address: true
                    },
                    orderBy: { createdAt: 'desc' }
                },
                // For Sellers: Fetch their products and related sales
                products: {
                    where: { isDeleted: false },
                    select: {
                        id: true,
                        name: true,
                        imageUrl: true,
                        price: true,
                        Category: true,
                        orderItems: {
                            include: {
                                order: {
                                    select: {
                                        id: true,
                                        createdAt: true,
                                        status: true,
                                        user: { select: { name: true, email: true } } // Buyer info
                                    }
                                }
                            },
                            orderBy: { order: { createdAt: 'desc' } }
                        }
                    }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.error("Error fetching user details:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getAllSellers,
    getAllCustomers,
    getAdminProducts,
    getUserDetails
};
