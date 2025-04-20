import dotenv from 'dotenv';

dotenv.config();

// Simple auth middleware for API routes
const authMiddleware = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  
  // If API key is not required, skip verification
  if (process.env.API_KEY_REQUIRED !== 'true') {
    return next();
  }
  
  // Check if API key matches
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid API key'
    });
  }
  
  next();
};

export default authMiddleware;
