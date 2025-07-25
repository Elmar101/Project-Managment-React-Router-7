import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, name, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email adress already in use" });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        });
        // Here you can send a verification toke if needed
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
         const verificationToken = jwt.sign(
            { userId: newUser._id, property: "email-verification" },  // Payload (string | object | Buffer)
            process.env.JWT_SECRET as string,                         // Secret or PrivateKey (string | Secret)
            { expiresIn: process.env.JWT_EXPIRATION || "1h" }         // Options (SignOptions)
        );
        
        res.status(200).json({
            message: "Verification email sent  to yout",
        })
    } catch (error) {
        console.log({ error })
        res.status(500).json("Internal Server Error");
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        console.log({ error })
        res.status(500).json("Internal Server Error");
    }
};