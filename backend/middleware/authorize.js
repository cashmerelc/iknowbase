const authorize = (requiredRole) => {
    return (req, res, next) => {
      if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  
      if (req.user.role !== requiredRole) {
        return res.status(403).json({ error: 'Access denied: insufficient permissions' });
      }
      next();
    };
  };
  
  module.exports = authorize;
  