const pool = require("../config/db");

exports.findAll = async () => {
  const result = await pool.query(
    "SELECT * FROM expenses ORDER BY date DESC"
  );
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM expenses WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

exports.create = async (data) => {
  const { amount, category, description, date } = data;

  const result = await pool.query(
    `INSERT INTO expenses (amount, category, description, date)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [amount, category, description || null, date]
  );

  return result.rows[0];
};

exports.update = async (id, data) => {
  const { amount, category, description, date } = data;

  const result = await pool.query(
    `UPDATE expenses
     SET amount = $1, category = $2, description = $3, date = $4
     WHERE id = $5
     RETURNING *`,
    [amount, category, description || null, date, id]
  );

  return result.rows[0];
};

exports.remove = async (id) => {
  const result = await pool.query(
    "DELETE FROM expenses WHERE id = $1 RETURNING *",
    [id]
  );

  return result.rows[0];
};
