const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

const createVendor = async (name, description, category, location, image, contactEmail, contactPhone, pricing, rating) => {
  try {
    const id = uuidv4();
    const result = await pool.query(
      "INSERT INTO vendors (id, name, description, category, location, image, contact_email, contact_phone, pricing, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [id, name, description, category, location, image, contactEmail, contactPhone, pricing, rating]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Detailed error in createVendor:', error);
    throw error;
  }
};

module.exports = { createVendor };