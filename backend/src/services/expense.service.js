const Expense = require("../models/expense.model");
const AppError = require("../utils/AppError");
const { expenseSchema } = require("../schemas/expense.schema");

exports.findAll = async () => {
  const expenses = await Expense.findAll();

  return expenses;
};

exports.findById = async (id) => {
  const expense = await Expense.findById(id);

  if (!expense) {
    throw new AppError("Expense not found", 404);
  }

  return expense;
};

exports.create = async (data) => {
  // Validar con Zod
  const validatedData = expenseSchema.parse(data);

  const newExpense = await Expense.create(validatedData);

  return newExpense;
};

exports.update = async (id, data) => {
  // Validar con Zod
  const validatedData = expenseSchema.parse(data);

  const existingExpense = await Expense.findById(id);

  if (!existingExpense) {
    throw new AppError("Expense not found", 404);
  }

  const updatedExpense = await Expense.update(id, validatedData);

  return updatedExpense;
};

exports.remove = async (id) => {
  const existingExpense = await Expense.findById(id);

  if (!existingExpense) {
    throw new AppError("Expense not found", 404);
  }

  await Expense.remove(id);

  return true;
};
