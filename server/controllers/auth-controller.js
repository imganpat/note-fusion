import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';
import db from "../config/db-config.js";

const registerPost = async (req, res) => {
    const userId = uuidv4();
    const { email, password, username } = req.body;
    const sql = "INSERT INTO users (user_id, username, email, password ) VALUES (?, ?, ?, ?)";

    await db.query(sql, [userId, username, email, password], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY')
                res.status(409).json({ message: "User already exists" });
            else
                res.status(500).json({ message: "Error registering user" });
        }
        else
            res.status(201).json({ message: "Registration successfull" });
    });
};


const loginPost = async (req, res) => {
    const { username, password } = req.body;

    try {
        await db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, rows) => {
            if (err) {
                return res.status(500).json({ message: "Internal server error" });
            }

            if (rows && rows.length > 0) {
                const user = rows[0];
                const token = jwt.sign({ username: user.username, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" })
                res.status(200).json({ message: "Login successful", token, username: user.username, email: user.email });
            } else {
                res.status(401).json({ message: "Invalid username or password" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


const logout = (req, res) => {
    res.status(200).json({ message: "Log out successfully" });
}

export default { registerPost, loginPost, logout };