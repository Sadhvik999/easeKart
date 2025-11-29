const { prisma } = require('../db/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()


async function signup(req, res, next) {
    try {
        const { name, email, phone, password } = req.body;
        if (!name) return res.status(400).json({ message: "Name required" });
        if (!email) return res.status(400).json({ message: "Email required" });
        if (!password) return res.status(400).json({ message: "Password required" });
        const existing = await prisma.Users.findUnique({ where: { email } });
        if (existing) return res.status(400).json({ message: "User already exists" });

        const hash = await bcrypt.hash(password, 10);
        const user = await prisma.Users.create({
            data: {
                name,
                email,
                phone,
                password: hash
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

        const user = await prisma.Users.findUnique({ where: { email: loginmail } });
        if (!user) return res.status(400).json({ message: "User not found" });

        const ok = await bcrypt.compare(loginPassword, user.password);
        if (!ok) return res.status(400).json({ message: "Invalid Password" });

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res
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
        // if(!cookie){
        //     return res.status(401).json({ message: "Unauthorized" });
        // }
        const user = await prisma.Users.findUnique({
            where: { id: userId },
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
                }
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (err) {
        next(err);
    }
}

module.exports = { signup, login, logout, getProfile }