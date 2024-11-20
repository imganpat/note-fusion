import jwt from "jsonwebtoken"

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "Unauthorized. Please login" })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Please login" })
    }
}

export default isAuthenticated;