
import { getDB } from '@/config/database';

export const fetchAllProducts = async () => {
    const pool = getDB();
    const result = await pool.request().query('SELECT Id, Nombre, Precio, ImagenURL FROM dbo.Productos');
    return result.recordset;
};
