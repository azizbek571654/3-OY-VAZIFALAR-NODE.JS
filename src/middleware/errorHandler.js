// Global error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
};

export default errorHandler;
