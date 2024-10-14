import db from "../config/db-config.js";

const registerPost = (req, res) => {
    const { userId, email, password, username } = req.body;
    const sql = "INSERT INTO users (user_id, username, email, password ) VALUES (?, ?, ?, ?)";

    db.query(sql, [userId, username, email, password], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error registering user");
        } else {
            console.log(result);
        }
    });
    res.json({ userId, email, password, username });
};


const loginPost = async (req, res) => {
    const { username, password } = req.body;

    try {
        db.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, rows) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ message: "Internal server error" });
            }

            if (rows && rows.length > 0) {
                const user = rows[0];
                res.cookie("username", user.username, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'None',
                    maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
                });
                res.cookie("email", user.email, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'None',
                    maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
                });

                res.json(`Welcome ${username}`);
            } else {
                res.status(401).json({ message: "Invalid username or password" });
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const logout = (req, res) => {
    res.cookie('username', '', { expires: new Date(0) });
    res.cookie('email', '', { expires: new Date(0) });
    res.cookie('profile-bg-color', '', { expires: new Date(0) });
    res.send("Log out successfully");
}

export default { registerPost, loginPost, logout };