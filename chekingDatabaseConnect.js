const { Pool } = require('pg');

const poolConfig = {
  user: 'postgres',
  password: 'root@123',
  host: 'localhost',
  database: 'Research-Journal',
  port: 5432,
  max: 4,
  min: 1,
};

const pool = new Pool(poolConfig);

async function checkAdminData() {
  try {
    const result = await pool.query('SELECT * FROM admin');
    console.log(result.rows);
  } catch (error) {
    console.error('Error querying admin table:', error);
  } finally {
    // Close the database connection
    await pool.end();
  }
}

// Call the function to check admin data
checkAdminData();
