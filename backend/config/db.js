const dotenv = require('dotenv');
const { Pool } = require('pg');

// Load the correct environment file
const envFile = process.env.NODE_ENV === 'development' ? '.env.development' : '.env';
dotenv.config({ path: envFile });

// PostgreSQL connection pool
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // Always enable SSL for DATABASE_URL
      }
    : {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
      }
);

pool.connect()
  .then(() => console.log(`✅ Connected to ${process.env.NODE_ENV || 'local'} database`))
  .catch(err => console.error('❌ Database connection error:', err));

module.exports = pool;
