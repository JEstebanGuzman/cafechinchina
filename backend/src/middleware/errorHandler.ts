import express from 'express';

// Handle 404 errors
export const notFoundHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(404).json({ message: `Not Found - ${req.originalUrl}` });
};

// Generic error handler
export const errorHandler = (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
};
