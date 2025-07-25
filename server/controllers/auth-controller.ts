import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";
import Verification from "../models/verification";
import { sendEmail } from "../libs/sendEmail";

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
            process.env.JWT_SECRET!,                                  // Secret or PrivateKey (string | Secret)
            { expiresIn: process.env.JWT_EXPIRATION || "1h" } as jwt.SignOptions // Options (SignOptions)
        );

        // Here you would typically send the verification token to the user's email
        await Verification.create({
            userId: newUser._id,
            token: verificationToken,
            expiresAt: new Date(Date.now() + (60 * 60 * 1000)) // 1 hour from now
        });

        // send email
        console.log("process.env.FRONTEND_URL:", process.env.FRONT_END_URL);
        const verificationLink = `${process.env.FRONT_END_URL}/auth/verify-email?token=${verificationToken}`;
        const emailBody = `<p>Click <a href="${verificationLink}">here</a> to verify your email</p>`;
        const emailSubject = "Verify your email";

        const isEmailSent = (await sendEmail(email, emailSubject, emailBody)).success;
        if (!isEmailSent) {
            res.status(500).json({ message: "Failed to send verification email" });
            return;
        }

        res.status(201).json({
            message:
                "Verification email sent to your email. Please check and verify your account.",
        });
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