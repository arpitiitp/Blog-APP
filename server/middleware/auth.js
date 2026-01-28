import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    // Check for Bearer token prefix and remove if present
    const tokenString = token && token.startsWith('Bearer ') ? token.slice(7) : token;

    if (!tokenString) {
      return res.json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(tokenString, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.role = decoded.role;
    next();
  } catch (error) {
    console.log("Auth Error:", error.message);
    res.json({ success: false, message: "Auth Error: " + error.message });
  }
};

export default auth;
