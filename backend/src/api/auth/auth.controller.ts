import express from 'express';
import { authenticateUser } from './auth.service';

export const loginUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
