import { useState } from "react";
import { registerUser, loginUser } from "../../api/auth";
import styles from "./AuthForm.module.css";

export default function AuthForm({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: "", text: "" });

    try {
      if (isLogin) {
        const response = await loginUser({
          email: formData.email,
          password: formData.password,
        });
        setStatusMessage({ type: "success", text: "Login successful!" });

        // Запис даних у локальне сховище для стійкості сесії
        localStorage.setItem("authToken", response.token);
        localStorage.setItem("currentUser", JSON.stringify(response.user));

        if (onAuthSuccess) onAuthSuccess(response.user);
      } else {
        await registerUser(formData);
        setStatusMessage({
          type: "success",
          text: "Registration successful! Please log in.",
        });
        setIsLogin(true);
        setFormData({ name: "", email: "", password: "" });
      }
    } catch (error) {
      setStatusMessage({ type: "error", text: error.message });
    }
  };

  return (
    <section className={styles.authSection}>
      <div className={`${styles.authContainer}`}>
        <h3 className={styles.title}>{isLogin ? "Log In" : "Sign Up"}</h3>

        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
            <div className={styles.inputWrapper}>
              <label className={styles.label} htmlFor="auth-name">
                Name
              </label>
              <input
                id="auth-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
          )}

          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="auth-email">
              Email
            </label>
            <input
              id="auth-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputWrapper}>
            <label className={styles.label} htmlFor="auth-password">
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.submitBtn}>
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>

        {statusMessage.text && (
          <p className={`${styles.message} ${styles[statusMessage.type]}`}>
            {statusMessage.text}
          </p>
        )}

        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className={styles.toggleBtn}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Log in"}
        </button>
      </div>
    </section>
  );
}
