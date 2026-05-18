import bcrypt from "bcryptjs";
import path from "path";
import jwt from "jsonwebtoken";
import { readData, writeData } from "../utils/fileHandler.js";

// Абсолютний шлях до файлу з користувачами
const usersPath = path.resolve("data/users.json");

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Валідація вхідних даних на стороні сервера
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Усі поля є обов'язковими" });
    }

    const users = await readData(usersPath);

    // Перевірка, чи не існує вже користувач з таким email
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      return res
        .status(400)
        .json({ message: "Користувач з таким Email вже існує" });
    }

    // Хешування пароля (генерація солі та хэшу)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Створення нового об'єкта користувача
    const newUser = {
      id: Date.now().toString(), // Проста генерація унікального ID
      name,
      email,
      password: hashedPassword, // Зберігаємо тільки захешовану версію
    };

    users.push(newUser);
    await writeData(usersPath, users);

    res.status(201).json({ message: "Користувача успішно зареєстровано" });
  } catch (error) {
    console.error("Помилка реєстрації:", error);
    res
      .status(500)
      .json({ message: "Внутрішня помилка сервера під час реєстрації" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Перевірка наявності даних
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email та пароль є обов'язковими" });
    }

    const users = await readData(usersPath);

    // 2. Пошук користувача за email
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(400).json({ message: "Невірний email або пароль" });
    }

    // 3. Порівняння введеного пароля із захешованим у файлі
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Невірний email або пароль" });
    }

    // 4. Генерація JWT токена
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1h" }, // Токен дійсний 1 годину
    );

    // 5. Відправка успішної відповіді (без хешу пароля!)
    res.status(200).json({
      message: "Успішна авторизація",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Помилка авторизації:", error);
    res
      .status(500)
      .json({ message: "Внутрішня помилка сервера під час авторизації" });
  }
};
