import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BACKEND_URLS = {
  python: process.env.PYTHON_BACKEND_URL || 'http://localhost:5000',
  node: process.env.NODE_BACKEND_URL || 'http://localhost:4000'
};

/**
 * Creates a proxy handler for forwarding requests to backend services
 * @param {string} backend - 'python' or 'node'
 * @param {string} basePath - Base path for the backend route
 * @returns {Function} Express middleware function
 */
export const createProxyHandler = (backend, basePath) => {
  return async (req, res, next) => {
    try {
      const backendUrl = BACKEND_URLS[backend];
      
      if (!backendUrl) {
        return res.status(500).json({ error: 'Backend service not configured' });
      }

      // Construct full URL
      const targetUrl = `${backendUrl}${basePath}${req.path}`;

      // Forward headers (especially auth token)
      const headers = {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { 'Authorization': req.headers.authorization })
      };

      // Make request to backend
      const response = await axios({
        method: req.method,
        url: targetUrl,
        data: req.body,
        params: req.query,
        headers: headers,
        validateStatus: () => true // Don't throw on any status
      });

      // Forward response
      res.status(response.status).json(response.data);

    } catch (error) {
      console.error(`Proxy error [${backend}]:`, error.message);
      
      if (error.code === 'ECONNREFUSED') {
        return res.status(503).json({ 
          error: 'Backend service unavailable',
          service: backend
        });
      }

      next(error);
    }
  };
};
