// models/adminModel.js

const db = require('../../config/db.config');
// Function to get admin by email from the database
async function getAdminByEmail(email) {
  try {
    const result = await db.query('SELECT * FROM admin WHERE email = $1', [email]);
    return result.rows;
  } catch (error) {
    throw error;
  }
}

// Function to insert a new admin into the database
async function insertAdmin(username, email, password) {
  try {
    const result = await db.query('INSERT INTO admin (username, email, password) VALUES ($1, $2, $3) RETURNING *', [username, email, password]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAdminByEmail,
  insertAdmin,
  // Add other model functions if needed
};
