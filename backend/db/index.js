import pg from 'pg';

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'finances',
    password: 'admin',
    port: 5432, 
});

export default pool;