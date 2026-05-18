const rawBaseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const baseURL = rawBaseURL.replace(/\/$/, "");

const API_BASE_URL = `${baseURL}/api/auth`;

export const registerUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Помилка реєстрації");
  return data;
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Помилка авторизації");
  return data;
};
