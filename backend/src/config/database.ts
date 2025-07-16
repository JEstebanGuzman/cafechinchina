
import sql from 'mssql';
import { env } from './env';

const dbConfig: sql.config = {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    server: env.DB_SERVER,
    database: env.DB_DATABASE,
    options: {
        encrypt: env.DB_ENCRYPT,
        trustServerCertificate: true // Recommended to set to false in strict production, but true is often needed for local dev or certain cloud setups.
    }
};

let pool: sql.ConnectionPool;

export const connectDB = async () => {
    try {
        console.log('Connecting to database...');
        pool = await new sql.ConnectionPool(dbConfig).connect();
        console.log('Database connection successful.');
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
};

export const getDB = () => {
    if (!pool) {
        throw new Error('Database not connected. Call connectDB first.');
    }
    return pool;
};
