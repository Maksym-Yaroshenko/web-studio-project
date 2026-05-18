import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"; // Імпорт маршрутів авторизації

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Глобальні middlewares
app.use(cors());
app.use(express.json());

// Підключення ендпоінтів авторизації
app.use("/api/auth", authRoutes);

// Ендпоінт перевірки статусу (наша додаткова фіча)
app.get("/api/status", (req, res) => {
  const currentHour = new Date().getHours();
  const isNight = currentHour >= 22 || currentHour < 6;

  res.status(200).json({
    status: "healthy",
    serverTime: new Date().toLocaleTimeString(),
    isNight: isNight,
  });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is successfully running on port ${PORT}`);
});
