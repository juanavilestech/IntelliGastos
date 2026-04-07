const axios = require("axios");

const AI_BASE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

exports.predictCategory = async (description) => {
  const response = await axios.post(`${AI_BASE_URL}/predict-category`, {
    description,
  });

  return response.data.predicted_category;
};

exports.retrainModel = async () => {
  await axios.post(`${AI_BASE_URL}/retrain`);
};

exports.analyzeExpenses = async (expenses) => {
  const response = await axios.post(`${AI_BASE_URL}/analyze`, { expenses });
  return response.data;
};

exports.askQuestion = async (question, expenses) => {
  const response = await axios.post(`${AI_BASE_URL}/ask`, {
    question,
    expenses,
  });
  return response.data;
};
