const { prisma } = require('../db/dbConfig');

const getAddresses = async (req, res) => {
    try {
        const userId = req.user.id;
        const addresses = await prisma.address.findMany({
            where: { userId: userId },
            orderBy: { isDefault: 'desc' }
        });
        console.log("Fetched addresses for user", userId, ":", addresses.length);
        res.status(200).json(addresses);
    } catch (error) {
        console.error("Error fetching addresses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const addAddress = async (req, res) => {
    try {
        const userId = req.user.id;
        const { fullName, phone, streetLine1, streetLine2, city, state, postalCode, country, isDefault } = req.body;

        if (!fullName || !phone || !streetLine1 || !city || !state || !postalCode || !country) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        // If this is the first address or set as default, update other addresses
        if (isDefault) {
            await prisma.address.updateMany({
                where: { userId: userId },
                data: { isDefault: false }
            });
        }

        // Check if it's the first address, make it default automatically
        const count = await prisma.address.count({ where: { userId: userId } });
        const shouldBeDefault = count === 0 ? true : isDefault;

        const address = await prisma.address.create({
            data: {
                userId,
                fullName,
                phone,
                streetLine1,
                streetLine2,
                city,
                state,
                postalCode,
                country,
                isDefault: shouldBeDefault || false
            }
        });

        res.status(201).json(address);
    } catch (error) {
        console.error("Error adding address:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getAddresses, addAddress };
