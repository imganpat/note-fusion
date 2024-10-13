const isAuthenticated = (req, res, next) => {
    if (req.cookies.username && req.cookies.email) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized access. Please log in." });
    }
}

export default isAuthenticated;