

const {Pool} = require('pg');

const poolConfig = {
    user: 'postgres',
    password: 'root@123',
    host: 'localhost',
    database: 'Research-Journal',
    port: 5432, // Default PostgreSQL port
    max: 4,    // Maximum number of connections in the pool
    min: 1
}

const pool = new Pool(poolConfig);

module.exports.pgPool = pool;
