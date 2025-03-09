const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key"; // เปลี่ยนเป็นค่าที่ปลอดภัย

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "❌ No token, authorization denied" });

  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "❌ Invalid token" });
  }
};

module.exports = authMiddleware;
