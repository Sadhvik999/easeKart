const { prisma } = require('../db/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()


async function signup(req, res, next) {
    try {
        const { name, email, phone, password, accountType } = req.body;
        if (!name) return res.status(400).json({ message: "Name required" });
        if (!email) return res.status(400).json({ message: "Email required" });
        if (!password) return res.status(400).json({ message: "Password required" });
        const existing = await prisma.users.findUnique({ where: { email } });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const hash = await bcrypt.hash(password, 10);
        const user = await prisma.Users.create({
            data: {
                name,
                email,
                phone,
                password: hash,
                accountType: accountType || 'CUSTOMER'
            }
        });

        return res.status(201).json({
            message: "Signup success"
        });
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { loginmail, loginPassword } = req.body;
        if (!loginmail) return res.status(400).json({ message: "Email required" });
        if (!loginPassword) return res.status(400).json({ message: "Password required" });

        const user = await prisma.users.findUnique({ where: { email: loginmail } });
        if (!user) return res.status(400).json({ message: "User not found" });

        const ok = await bcrypt.compare(loginPassword, user.password);
        if (!ok) return res.status(400).json({ message: "Invalid Password" });

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name, accountType: user.accountType },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
            })
            .json({ message: "Login success" });
    } catch (err) {
        console.log(err)
        next(err);
    }
}

async function logout(req, res, next) {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });

        if (req.session) {
            req.session.destroy((err) => {
                if (err) console.error("Session destruction error:", err);
            });
        }

        res.json({ message: "Logout success" });
    } catch (err) {
        next(err);
    }
}

async function getProfile(req, res, next) {
    try {
        const userId = req.user.id;
        const cookie = req.cookies.token;
        if (!cookie) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                accountType: true,
                createdAt: true,
                orders: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
                cart: {
                    include: {
                        items: {
                            include: {
                                product: true
                            }
                        }
                    }
                },
                products: true
            }
        });
        console.log("Fetched user profile:", user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.log(err)
        next(err);
    }
}

async function updateProfile(req, res, next) {
    try {
        const userId = req.user.id;
        const { name, email, phone } = req.body;

        const dataToUpdate = {};
        if (name) dataToUpdate.name = name;
        if (email) dataToUpdate.email = email;
        if (phone) dataToUpdate.phone = phone;

        const updatedUser = await prisma.users.update({
            where: { id: userId },
            data: dataToUpdate,
            select: { id: true, name: true, email: true, phone: true, accountType: true }
        });

        res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (err) {
        next(err);
    }
}

async function changePassword(req, res, next) {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Both old and new passwords are required" });
        }

        const user = await prisma.Users.findUnique({ where: { id: userId } });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect old password" });

        const hash = await bcrypt.hash(newPassword, 10);
        await prisma.Users.update({
            where: { id: userId },
            data: { password: hash }
        });

        res.json({ message: "Password updated successfully" });
    } catch (err) {
        next(err);
    }
}

module.exports = { signup, login, logout, getProfile, updateProfile, changePassword }