import { verifyToken } from '../config/jwt.js';

/**
 * Middleware to verify JWT token
 * Checks if the request has a valid bearer token in the Authorization header
 * If valid, adds the decoded user info to req.user
 */
export const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  req.user = decoded;
  next();
};

/**
 * Middleware to check user role
 * Ensures the logged-in user has the required role
 */
export const checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const User = (await import('../models/User.js')).default;
      const user = await User.findById(req.user.id);

      if (!user || user.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
};
