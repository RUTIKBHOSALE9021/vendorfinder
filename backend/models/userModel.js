const pool = require("../config/db");

const createUser = async (full_name, email, password_hash) => {
  // For Google users, we'll use a special password hash that can't be used for regular login
  const googlePasswordHash = password_hash || 'GOOGLE_AUTH_USER';
  
  const result = await pool.query(
    "INSERT INTO users (full_name, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
    [full_name, email, googlePasswordHash]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
