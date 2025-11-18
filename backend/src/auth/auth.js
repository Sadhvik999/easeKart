const express = require('express');
const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()


async function signup(req, res, next){
    try{
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
            message: "Signup success",
            user: { id: user.id, name: user.name, email: user.email }
        });
    }catch(err){
        next(err);
    }
}

async function login(req, res, next){
    try{
        const { email, password } = req.body;
        if (!email) return res.status(400).json({ message: "Email required" });
        if (!password) return res.status(400).json({ message: "Password required" });

        const user = await prisma.Users.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: "User not found" });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(400).json({ message: "Invalid Password" });

        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            process.env.JWT_SECRET || 'dev_jwt_secret',
            { expiresIn: '7d' }
        );

        return res
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
            })
            .json({ message: "Login success" });
    }catch(err){
        next(err);
    }
}

async function logout(req, res, next){
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
        });

        // optional session destroy
        if (req.session) {
            req.session.destroy((err) => {
                if (err) console.error("Session destruction error:", err);
            });
        }

        res.json({ message: "Logout success" });
    }catch(err){
        next(err);
    }
}

module.exports = { signup, login, logout }