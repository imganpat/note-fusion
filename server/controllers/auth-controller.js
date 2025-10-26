import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';
import db from "../config/db-config.js";

const registerPost = async (req, res) => {
    const userId = uuidv4();
    const { email, password, username } = req.body;
    const sql = "INSERT INTO users (user_id, username, email, password ) VALUES (?, ?, ?, ?)";

    try {
        await db.query(sql, [userId, username, email, password]);
        res.status(201).json({ message: "Registration successfull" });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY')
            res.status(409).json({ message: "User already exists" });
        else
            res.status(500).json({ message: "Error registering user" });
    }
};


const loginPost = async (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";

    try {
        const [rows] = await db.query(sql, [username, password]);
        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const user = rows[0];
        const token = jwt.sign(
            { username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


const logout = (req, res) => {
    res.status(200).json({ message: "Log out successfully" });
}

export default { registerPost, loginPost, logout };