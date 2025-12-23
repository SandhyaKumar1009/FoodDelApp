/**
 * Centralized error handling middleware
 */
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Database errors
  if (err.code && err.code.startsWith('23')) {
    return res.status(400).json({
      error: 'Database constraint violation',
      details: err.message
    });
  }

  // Custom application errors
  if (err.message) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
      error: err.message
    });
  }

  // Default error response
  res.status(500).json({
    error: 'Internal server error'
  });
};
