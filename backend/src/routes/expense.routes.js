const express = require("express");
const pool = require("../config/db");

const router = express.Router();

// Crear gasto
router.post("/", async (req, res) => {
  const { amount, category, description, date } = req.body;

  try {
    const result = await pool.query(
      
      "INSERT INTO expenses (amount, category, description, date) VALUES ($1, $2, $3, $4) RETURNING *",
      [amount, category, description, date]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando gasto" });
  }
});

// Listar gastos
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM expenses ORDER BY date DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo gastos" });
  }
});

module.exports = router;
