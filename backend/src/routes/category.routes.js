const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// Listar todas las categorías
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categories ORDER BY name ASC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo categorías" });
  }
});

module.exports = router;
