export default (err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    error: { code: err.code || 'SERVER_ERROR', message: err.message || 'Internal server error' }
  });
};
