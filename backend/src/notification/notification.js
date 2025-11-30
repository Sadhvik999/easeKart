const { prisma } = require('../db/dbConfig');

const getNotifications = async (req, res) => {
    try {
        const userId = req.user.id;
        const notifications = await prisma.notification.findMany({
            where: { userId: userId },
            orderBy: { createdAt: 'desc' }
        });
        res.status(200).json(notifications);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Verify ownership
        const notification = await prisma.notification.findUnique({
            where: { id: id }
        });

        if (!notification) {
            return res.status(404).json({ message: "Notification not found" });
        }

        if (notification.userId !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await prisma.notification.update({
            where: { id: id },
            data: { read: true }
        });

        res.status(200).json({ message: "Notification marked as read" });
    } catch (error) {
        console.error("Error marking notification as read:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { getNotifications, markAsRead };
