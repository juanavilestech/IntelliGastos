const express = require("express");
const pool = require("../config/db");

const router = express.Router();

const categories = [
  { id: 1, name: "Comida", type: "gasto" },
  { id: 2, name: "Transporte", type: "gasto" },
  { id: 3, name: "Entretenimiento", type: "gasto" },
  { id: 4, name: "Salud", type: "gasto" },
  { id: 5, name: "Educación", type: "gasto" },
  { id: 6, name: "Hogar", type: "gasto" },
  { id: 7, name: "Ropa", type: "gasto" },
  { id: 8, name: "Otros gastos", type: "gasto" },
  { id: 9, name: "Sueldo", type: "ingreso" },
  { id: 10, name: "Venta", type: "ingreso" },
  { id: 11, name: "Inversión", type: "ingreso" },
  { id: 12, name: "Regalo", type: "ingreso" },
  { id: 13, name: "Otros ingresos", type: "ingreso" },
];

// Listar todas las categorías
router.get("/", (req, res) => {
  res.json(categories);
});

module.exports = router;
