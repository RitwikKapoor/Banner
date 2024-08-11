import jwt from "jsonwebtoken";

export const jwtCheck = (req, res, next) => {
  console.log("Inside jwtCheck")
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("token val = ", token)
  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};
