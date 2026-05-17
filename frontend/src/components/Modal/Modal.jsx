import { useEffect, useState } from "react";
import styles from "./Modal.module.css";

export default function Modal({ onClose }) {
  const [emailError, setEmailError] = useState("");
  const [dynamicResponse, setDynamicResponse] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true); // Вмикаємо CSS-класи закриття
    setTimeout(() => {
      onClose(); // Тільки через 300мс реально знищуємо компонент
    }, 300);
  };

  // Закриття по клавіші Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  // Лаба 3: Модифікація без перезавантаження та перевірка на втрату фокусу (blur)
  const handleEmailBlur = (e) => {
    const value = e.target.value;
    if (value.length > 0 && !value.includes("@")) {
      setEmailError('Please enter a valid email address containing "@"');
    } else {
      setEmailError("");
    }
  };

  // Лаба 3: Динамічне повідомлення без if/else (обробка подій через об'єкт-словник)
  const handleServiceChange = (e) => {
    const value = e.target.value;
    const messages = {
      design:
        "Great choice! Our creative team will prepare a design brief for you.",
      dev: "Awesome! Please prepare your technical requirements.",
      default: "",
    };
    // Працює виключно через маршрутизацію ключа, без умовних операторів
    setDynamicResponse(messages[value] || "");
  };

  return (
    <div
      className={`${styles.backdrop} ${isClosing ? styles.backdropClosing : ""}`}
      onClick={handleBackdropClick}
    >
      <div
        className={`${styles.modal} ${isClosing ? styles.modalClosing : ""}`}
      >
        <button className={styles.closeBtn} type="button" onClick={handleClose}>
          <svg width="8" height="8">
            <use href="/images/icons.svg#icon-close"></use>
          </svg>
        </button>
        <p className={styles.title}>
          Leave your contacts and we will call you back
        </p>

        <form>
          {/* Поле: Ім'я */}
          <div className={styles.reviewFormWrapper}>
            <label className={styles.reviewFormLabel} htmlFor="user-name">
              Name
            </label>
            <div className={styles.reviewFormInputWrapper}>
              <input
                className={styles.reviewFormInput}
                id="user-name"
                name="user-name"
                type="text"
                required
              />
              <svg className={styles.reviewFormIcon} width="18" height="24">
                <use href="/images/icons.svg#icon-user"></use>
              </svg>
            </div>
          </div>

          {/* Поле: Телефон */}
          <div className={styles.reviewFormWrapper}>
            <label className={styles.reviewFormLabel} htmlFor="user-phone">
              Phone
            </label>
            <div className={styles.reviewFormInputWrapper}>
              <input
                className={styles.reviewFormInput}
                id="user-phone"
                name="user-phone"
                type="tel"
                required
              />
              <svg className={styles.reviewFormIcon} width="18" height="24">
                <use href="/images/icons.svg#icon-tel"></use>
              </svg>
            </div>
          </div>

          {/* Поле: Email (з валідацією) */}
          <div className={styles.reviewFormWrapper}>
            <label className={styles.reviewFormLabel} htmlFor="user-email">
              Email
            </label>
            <div className={styles.reviewFormInputWrapper}>
              <input
                className={styles.reviewFormInput}
                id="user-email"
                name="user-email"
                type="email"
                required
                onBlur={handleEmailBlur}
                style={{ borderColor: emailError ? "#E74A3B" : "" }}
              />
              <svg className={styles.reviewFormIcon} width="18" height="24">
                <use href="/images/icons.svg#icon-message"></use>
              </svg>
            </div>
            {/* Повідомлення про помилку з'являється динамічно */}
            {emailError && (
              <span
                style={{
                  color: "#E74A3B",
                  fontSize: "10px",
                  marginTop: "4px",
                  display: "block",
                }}
              >
                {emailError}
              </span>
            )}
          </div>

          {/* Поле: Селект (Бонус Лаби 3) */}
          <div className={styles.reviewFormWrapper}>
            <label className={styles.reviewFormLabel} htmlFor="service-type">
              Interested In
            </label>
            <div className={styles.reviewFormInputWrapper}>
              <select
                className={styles.reviewFormInput}
                id="service-type"
                name="service-type"
                onChange={handleServiceChange}
                style={{ paddingLeft: "16px" }}
              >
                <option value="default">Select a service...</option>
                <option value="design">UI/UX Design</option>
                <option value="dev">Web Development</option>
              </select>
            </div>
            {/* Динамічний текст */}
            {dynamicResponse && (
              <span
                style={{
                  color: "#4D5AE5",
                  fontSize: "12px",
                  marginTop: "4px",
                  display: "block",
                  fontWeight: "500",
                }}
              >
                {dynamicResponse}
              </span>
            )}
          </div>

          {/* Поле: Коментар */}
          <div className={styles.reviewFormCommentWrapper}>
            <label className={styles.reviewFormLabel} htmlFor="user-comment">
              Comment
            </label>
            <textarea
              className={styles.reviewFormComment}
              id="user-comment"
              name="user-comment"
              placeholder="Text input"
            ></textarea>
          </div>

          {/* Чекбокс Privacy Policy */}
          <div className={styles.reviewFormCheckboxWrapper}>
            <input
              className="visually-hidden"
              id="user-privacy"
              type="checkbox"
              name="user-privacy"
              value="true"
              required
            />
            <label
              className={styles.reviewFormCheckboxLabel}
              htmlFor="user-privacy"
            >
              <span className={styles.reviewFormOwnCheckbox}>
                <svg width="10" height="8">
                  <use href="/images/icons.svg#icon-check"></use>
                </svg>
              </span>
              <span>
                I accept the terms and conditions of the{" "}
                <a className={styles.reviewFormPrivacyLink} href="#">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          <button className={styles.reviewFormBtn} type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
