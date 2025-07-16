
// backend/src/routes/auth.ts
import express, { Router } from 'express';

const router: Router = express.Router();

// Placeholder route to ensure the file is valid
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Auth route is active' });
});

export default router;