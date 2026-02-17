const jwt = require("jsonwebtoken");

/**
 * Protect routes - requires valid JWT in Authorization header or cookie
 * Attaches req.userId for use in controllers
 */
function protectRoute(req, res, next) {
  let token = null;

  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authenticated. Please log in.",
      status: "failed",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token. Please log in again.",
      status: "failed",
    });
  }
}

module.exports = { protectRoute };
