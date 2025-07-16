import type { Request, Response, NextFunction } from 'express';
import { authenticateUser } from './auth.service';

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { Correo, Contrasena } = req.body;
    if (!Correo || !Contrasena) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    const result = await authenticateUser(Correo, Contrasena);
    res.json(result);
  } catch (error) {
    next(error);
  }
};