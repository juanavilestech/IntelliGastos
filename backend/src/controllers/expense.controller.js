const expenseService = require("../services/expense.service");

exports.getAll = async (req, res) => {
  try {
    const data = await expenseService.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const data = await expenseService.getById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = await expenseService.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await expenseService.update(
      req.params.id,
      req.body
    );
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await expenseService.remove(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
