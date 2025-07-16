// backend/src/database.ts

import sql from 'mssql';

// This configuration reads all sensitive data from environment variables.
// IMPORTANT: You MUST set these variables in the Render dashboard environment tab.
const dbConfig: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER as string,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true', // Use true for Azure SQL, for example
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true' // Use true for local dev or self-signed certs
    }
};

export const connectDB = async () => {
    try {
        console.log('Attempting to connect to the database...');
        if (!dbConfig.server) {
            throw new Error('DB_SERVER environment variable not set.');
        }
        await sql.connect(dbConfig);
        console.log('Database connection established successfully.');
    } catch (err) {
        console.error('Database connection failed:', err);
        // Re-throw the error to ensure the server startup process fails loudly.
        throw err;
    }
};
