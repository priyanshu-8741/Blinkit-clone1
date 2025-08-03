import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    // Get token from cookie OR Authorization header
    const token =
      req.cookies?.accesstoken ||
      req.headers?.authorization?.split(" ")[1];

    console.log("Token received:", token);

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Token missing",
        error: true,
        success: false,
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);


    // Attach user ID to request for future use
    req.userid = decoded.id;

    next(); // ✅ continue to next middleware or controller
  } catch (error) {
    return res.status(403).json({
      message: error.message || "Invalid token",
      error: true,
      success: false,
    });
  }
};

export default auth;