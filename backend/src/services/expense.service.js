const Expense = require("../models/expense.model");
const AppError = require("../utils/AppError");
const { expenseSchema } = require("../schemas/expense.schema");
const aiService = require("./ai.service");

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

  // LÍMITE DE DEMO: Evitar que se creen más de 103 gastos en total (100 del seed + 3 generados por usuarios de prueba)
  const currentExpenses = await Expense.findAll();
  if (currentExpenses.length >= 103) {
    throw new AppError(
      "Límite de demo: Base de datos llena. No se permiten más de 103 gastos en esta versión (100 iniciales + 3 de prueba).",
      403,
    );
  }

  let category = validatedData.category;

  // Si no viene categoría pero sí descripción → usar IA
  if (!category && validatedData.description) {
    try {
      category = await aiService.predictCategory(validatedData.description);
    } catch (error) {
      console.error("AI prediction failed:", error.message);
    }
  }

  const newExpense = await Expense.create({
    ...validatedData,
    category: category || "Otros",
  });

  // Reentrenar modelo después de guardar
  try {
    await aiService.retrainModel();
  } catch (error) {
    console.error("AI retrain failed:", error.message);
  }

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
