const Expense = require("../models/expense.model");

exports.getAll = async () => {
  return await Expense.findAll();
};

exports.getById = async (id) => {
  const expense = await Expense.findById(id);
  if (!expense) {
    throw new Error("Expense not found");
  }
  return expense;
};

exports.create = async (data) => {
  if (!data.amount || !data.category || !data.date) {
    throw new Error("Missing required fields");
  }

  if (isNaN(data.amount)) {
    throw new Error("Amount must be a number");
  }

  return await Expense.create(data);
};

exports.update = async (id, data) => {
  const updated = await Expense.update(id, data);
  if (!updated) {
    throw new Error("Expense not found");
  }
  return updated;
};

exports.remove = async (id) => {
  const deleted = await Expense.remove(id);
  if (!deleted) {
    throw new Error("Expense not found");
  }
  return deleted;
};
