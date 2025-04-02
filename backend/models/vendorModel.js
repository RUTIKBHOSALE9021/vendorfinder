const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");

const createVendor = async (
  name,
  description,
  category,
  location,
  image,
  contactEmail,
  contactPhone,
  pricing,
  rating
) => {
  try {
    const id = uuidv4();
    const result = await pool.query(
      "INSERT INTO vendors (id, name, description, category, location, image, contact_email, contact_phone, pricing, rating) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        id,
        name,
        description,
        category,
        location,
        image,
        contactEmail,
        contactPhone,
        pricing,
        rating,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Detailed error in createVendor:", error);
    throw error;
  }
};

const getAllVendors = async (user_id) => {
  try {
    const query = `
      SELECT 
        v.*, 
        CASE 
            WHEN uf.user_id IS NOT NULL THEN TRUE 
            ELSE FALSE 
        END AS favorite
      FROM vendors v
      LEFT JOIN user_favorites uf 
        ON v.id = uf.vendor_id AND uf.user_id = $1;
    `;

    const result = await pool.query(query, [user_id]);
    return result.rows;
  } catch (error) {
    console.error("Detailed error in getVendors:", error);
    throw error;
  }
};

const getVendorById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM vendors WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error("Detailed error in getVendorById:", error);
    throw error;
  }
};

const addFavoriteVendor = async (user_id, vendor_id) => {
  try {
    const query = `INSERT INTO user_favorites (user_id, vendor_id) 
                   VALUES ($1, $2) 
                   ON CONFLICT DO NOTHING 
                   RETURNING *`;

    const result = await pool.query(query, [user_id, vendor_id]);
    return result;
  } catch (error) {
    console.error("Error while adding vendor to favorites:", error);
    throw error;
  }
};

const getFavoriteVendors = async (user_id) => {
  try {
    const query = `
    SELECT 
    v.*, 
    TRUE AS favorite
    FROM vendors v
    INNER JOIN user_favorites uf 
    ON v.id = uf.vendor_id 
    WHERE uf.user_id = $1;`;

    const result = await pool.query(query, [user_id]);

    return result.rows;
  } catch (error) {
    console.error("Error while getting favorite vendors:", error);
    throw error;
  }
};

const removeFromFavorite = async (user_id, vendor_id) => {
  const query = `
    DELETE FROM user_favorites
    WHERE user_id = $1 AND vendor_id = $2
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, [user_id, vendor_id]);
    return result;
  } catch (error) {
    console.error("Error while deleting favorite vendor:", error);
    throw error;
  }
};
module.exports = {
  createVendor,
  getAllVendors,
  getVendorById,
  getFavoriteVendors,
  addFavoriteVendor,
  removeFromFavorite,
};
