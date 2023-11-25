// adminModel.js

const db = require('../../config/db.config');

// Function to get admin by email from the database
async function getAdminByEmail(email) {
  try {
    const result = await db.pgPool.query('SELECT * FROM admin WHERE email = $1', [email]);
    console.log(result.rows);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAdminByEmail,
  // Add other model functions if needed
};
