document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // РОЗУМНА НАВІГАЦІЯ: Автоматичне підсвічування активного посилання
  // ==========================================
  const currentUrl = window.location.href; // Отримуємо поточну адресу сторінки

  // Для десктопного меню
  const desktopLinks = document.querySelectorAll(".menu-link");
  desktopLinks.forEach((link) => {
    link.classList.remove("menu-link-underline"); // Очищаємо всі підкреслення
    if (link.href === currentUrl) {
      link.classList.add("menu-link-underline"); // Додаємо активному
    }
  });

  // Для мобільного меню (у тебе там клас змінює колір тексту)
  const mobileLinks = document.querySelectorAll(".mobile-menu-link");
  mobileLinks.forEach((link) => {
    link.classList.remove("mobile-menu-link-studio"); // Очищаємо активний колір
    if (link.href === currentUrl) {
      link.classList.add("mobile-menu-link-studio"); // Додаємо активному
    }
  });

  // ==========================================
  // 1. Мобільне меню (Маніпуляція DOM)
  // ==========================================
  const mobileMenu = document.querySelector(".mobile-menu-wrapper");
  const openMenuBtn = document.querySelector(".mobile-menu-open-btn");
  const closeMenuBtn = document.querySelector(".mobile-menu-close-btn");

  if (openMenuBtn && mobileMenu) {
    openMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      document.body.style.overflow = "";
    });
  }

  // ==========================================
  // 2. Модальне вікно (Події кліку)
  // ==========================================
  const modalBackdrop = document.querySelector(".backdrop");
  const openModalBtn = document.querySelector(".button");
  const closeModalBtn = document.querySelector(".modal-close-btn");

  if (openModalBtn && modalBackdrop) {
    openModalBtn.addEventListener("click", () => {
      modalBackdrop.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
  }

  if (closeModalBtn && modalBackdrop) {
    closeModalBtn.addEventListener("click", () => {
      modalBackdrop.classList.remove("is-open");
      document.body.style.overflow = "";
    });
  }

  // Закриття модалки по кліку на сірий фон (Backdrop)
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (event) => {
      // Перевіряємо, чи клік був саме по фону, а не по самій білій формі
      if (event.target === modalBackdrop) {
        modalBackdrop.classList.remove("is-open");
        document.body.style.overflow = "";
      }
    });
  }

  // Закриття модалки по клавіші Escape
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      modalBackdrop &&
      modalBackdrop.classList.contains("is-open")
    ) {
      modalBackdrop.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  });

  // ==========================================
  // 3. Валідація форми (Втрата фокусу - blur, модифікація DOM без перезавантаження)
  // ==========================================
  const emailInput = document.getElementById("user-email");
  const emailWrapper = emailInput.closest(".review-form-input-wrapper");

  const errorMsg = document.createElement("span");
  errorMsg.style.color = "#E74A3B";
  errorMsg.style.fontSize = "10px";
  errorMsg.style.position = "absolute";
  errorMsg.style.bottom = "-15px";
  errorMsg.style.left = "0";
  emailWrapper.appendChild(errorMsg);

  emailInput.addEventListener("blur", (event) => {
    const value = event.target.value;
    if (value.length > 0 && !value.includes("@")) {
      errorMsg.textContent =
        'Please enter a valid email address containing "@"';
      emailInput.style.borderColor = "#E74A3B";
    } else {
      errorMsg.textContent = "";
      emailInput.style.borderColor = "";
    }
  });

  // ==========================================
  // 4. ДОДАТКОВІ БАЛИ: Динамічне виконання скриптів виключно через систему подій
  // ==========================================
  const serviceSelect = document.getElementById("service-type");
  const formElement = document.querySelector(".review-form");
  const dynamicResponseContent = document.getElementById("dynamic-response");

  // Реєструємо слухачів на кастомні події (замість використання if/else)
  formElement.addEventListener("design-selected", () => {
    dynamicResponseContent.textContent =
      "Great choice! Our creative team will prepare a design brief for you.";
  });

  formElement.addEventListener("dev-selected", () => {
    dynamicResponseContent.textContent =
      "Awesome! Please prepare your technical requirements.";
  });

  formElement.addEventListener("default-selected", () => {
    dynamicResponseContent.textContent = "";
  });

  // При зміні селекту генеруємо назву події динамічно і "вистрілюємо" нею
  serviceSelect.addEventListener("change", (event) => {
    const selectedValue = event.target.value;
    // Генеруємо подію типу 'design-selected' або 'dev-selected'
    const customEvent = new CustomEvent(`${selectedValue}-selected`);
    formElement.dispatchEvent(customEvent);
  });
});
