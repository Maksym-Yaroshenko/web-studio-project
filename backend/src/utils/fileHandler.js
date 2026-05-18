import fs from "fs/promises";

/**
 * Асинхронно зчитує дані з JSON-файлу
 * @param {string} filePath - шлях до файлу
 * @returns {Promise<Array>} - масив даних або порожній масив у разі помилки
 */
export const readData = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Якщо файлу не існує або він порожній, повертаємо порожній масив
    return [];
  }
};

/**
 * Асинхронно записує дані в JSON-файл у форматизованому вигляді
 * @param {string} filePath - шлях до файлу
 * @param {Array|Object} data - дані для запису
 */
export const writeData = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
};
