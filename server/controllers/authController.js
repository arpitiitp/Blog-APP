import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        // Verify the Google ID Token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email, picture, sub } = ticket.getPayload();

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user if not found
            // Determine role: If matches ADMIN_EMAIL from env, set as admin
            const role = email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
            user = await User.create({ name, email, image: picture, googleId: sub, role });
        }

        // Generate JWT (consistent with existing auth)
        const jwtToken = jwt.sign({ userId: user._id, email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ success: true, token: jwtToken, user });
    } catch (error) {
        console.error("Google Login Error:", error);
        res.json({ success: false, message: error.message });
    }
}

import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Determine role: If matches ADMIN_EMAIL from env, set as admin
        const role = email === process.env.ADMIN_EMAIL ? 'admin' : 'user';

        const user = await User.create({ name, email, password: hashedPassword, role });

        const token = jwt.sign({ userId: user._id, email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: "Missing Details" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // Allow login if google-authenticated user sets a password later, or standard user
        if (!user.password) {
            return res.json({ success: false, message: "Please login with Google" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
