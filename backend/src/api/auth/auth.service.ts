
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDB } from '@/config/database';
import { env } from '@/config/env';

export const authenticateUser = async (Correo: string, Contrasena: string) => {
    const pool = getDB();
    const result = await pool.request()
        .input('Correo', Correo)
        .query('SELECT * FROM dbo.Usuarios WHERE Correo = @Correo');

    const user = result.recordset[0];

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(Contrasena, user.Contrasena);

    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.Id, nombre: user.Nombre }, env.JWT_SECRET, {
        expiresIn: '1d',
    });

    return {
        token,
        user: {
            Id: user.Id,
            Nombre: user.Nombre,
            Correo: user.Correo,
        },
    };
};
