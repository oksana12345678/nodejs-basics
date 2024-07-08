const errorHandler = (error, req, res) => {
  res.status(500).json({
    message: 'Something went wrong',
    error: error.message,
  });
};

export default errorHandler;
