import { useState } from "react";
import styles from "./Header.module.css";

export default function Header({
  currentPage,
  setCurrentPage,
  currentUser,
  onLogout,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e, pageName) => {
    e.preventDefault();
    setCurrentPage(pageName);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  const openMobileMenu = () => {
    setIsMobileMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <nav className={styles.headerNavigation}>
          <a
            className={`link ${styles.headerLogo}`}
            href="/"
            onClick={(e) => handleNavClick(e, "studio")}
          >
            Web<span className={styles.headerLogoColor}>Studio</span>
          </a>
          <ul className={`list ${styles.menu}`}>
            <li className="menu-item">
              <a
                className={`link ${styles.menuLink} ${currentPage === "studio" ? styles.menuLinkActive : ""}`}
                href="#studio"
                onClick={(e) => handleNavClick(e, "studio")}
              >
                Studio
              </a>
            </li>
            <li className="menu-item">
              <a
                className={`link ${styles.menuLink} ${currentPage === "portfolio" ? styles.menuLinkActive : ""}`}
                href="#portfolio"
                onClick={(e) => handleNavClick(e, "portfolio")}
              >
                Portfolio
              </a>
            </li>
            <li className="menu-item">
              <a
                className={`link ${styles.menuLink} ${currentPage === "contacts" ? styles.menuLinkActive : ""}`}
                href="#contacts"
                onClick={(e) => handleNavClick(e, "contacts")}
              >
                Contacts
              </a>
            </li>

            {/* Навігація авторизації для Tablet/Desktop */}
            {currentUser ? (
              <li className="menu-item">
                <div className={styles.authBlock}>
                  <span className={styles.userName}>
                    Hi, {currentUser.name}
                  </span>
                  <button
                    type="button"
                    onClick={onLogout}
                    className={styles.logoutBtn}
                  >
                    Log Out
                  </button>
                </div>
              </li>
            ) : (
              <li className="menu-item">
                <a
                  className={`link ${styles.menuLink} ${currentPage === "auth" ? styles.menuLinkActive : ""}`}
                  href="#auth"
                  onClick={(e) => handleNavClick(e, "auth")}
                >
                  Log In
                </a>
              </li>
            )}
          </ul>
        </nav>

        <address className={styles.headerAddress}>
          <ul className={`list ${styles.addressMenu}`}>
            <li>
              <a
                className={styles.addressMenuLink}
                href="mailto:info@devstudio.com"
              >
                info@devstudio.com
              </a>
            </li>
            <li>
              <a className={styles.addressMenuLink} href="tel:+110001111111">
                +11 (000) 111-11-11
              </a>
            </li>
          </ul>
        </address>

        <button
          className={styles.mobileMenuOpenBtn}
          type="button"
          onClick={openMobileMenu}
        >
          <svg width="24" height="24" aria-label="mobile open menu">
            <use href="./images/icons.svg#icon-borger"></use>
          </svg>
        </button>
      </div>

      {/* Мобільне бургер-меню */}
      <div
        className={`${styles.mobileMenuWrapper} ${isMobileMenuOpen ? styles.isOpen : ""}`}
      >
        <div className={`container ${styles.mobileMenuContainer}`}>
          <button
            className={styles.mobileMenuCloseBtn}
            type="button"
            onClick={closeMobileMenu}
          >
            <svg width="8" height="8" style={{ fill: "#2e2f42" }}>
              <use href="/images/icons.svg#icon-close"></use>
            </svg>
          </button>

          <nav>
            <ul className="list">
              <li className={styles.mobileMenuItem}>
                <a
                  className={`link ${styles.mobileMenuLink} ${currentPage === "studio" ? styles.mobileMenuLinkActive : ""}`}
                  href="#studio"
                  onClick={(e) => handleNavClick(e, "studio")}
                >
                  Studio
                </a>
              </li>
              <li className={styles.mobileMenuItem}>
                <a
                  className={`link ${styles.mobileMenuLink} ${currentPage === "portfolio" ? styles.mobileMenuLinkActive : ""}`}
                  href="#portfolio"
                  onClick={(e) => handleNavClick(e, "portfolio")}
                >
                  Portfolio
                </a>
              </li>
              <li className={styles.mobileMenuItem}>
                <a
                  className={`link ${styles.mobileMenuLink} ${currentPage === "contacts" ? styles.mobileMenuLinkActive : ""}`}
                  href="#contacts"
                  onClick={(e) => handleNavClick(e, "contacts")}
                >
                  Contacts
                </a>
              </li>

              {/* Авторизація всередині мобільного меню */}
              {currentUser ? (
                <li className={styles.mobileMenuItem}>
                  <div className={styles.mobileAuthWrapper}>
                    <span className={styles.mobileUserName}>
                      Hi, {currentUser.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        onLogout();
                        closeMobileMenu();
                      }}
                      className={styles.mobileLogoutBtn}
                    >
                      Log Out
                    </button>
                  </div>
                </li>
              ) : (
                <li className={styles.mobileMenuItem}>
                  <a
                    className={`link ${styles.mobileMenuLink} ${currentPage === "auth" ? styles.mobileMenuLinkActive : ""}`}
                    href="#auth"
                    onClick={(e) => handleNavClick(e, "auth")}
                  >
                    Log In
                  </a>
                </li>
              )}
            </ul>
          </nav>

          <div className={styles.mobileMenuBottom}>
            <address>
              <ul className="list">
                <li className={styles.mobileAddressMenuItem}>
                  <a
                    className={`link ${styles.mobileAddressMenuLink} ${styles.mobileAddressLinkAccent}`}
                    href="tel:+110001111111"
                  >
                    +11 (000) 111-11-11
                  </a>
                </li>
                <li className={styles.mobileAddressMenuItem}>
                  <a
                    className={`link ${styles.mobileAddressMenuLink}`}
                    href="mailto:info@devstudio.com"
                  >
                    info@devstudio.com
                  </a>
                </li>
              </ul>
            </address>

            <ul className={`list ${styles.mobileSocialList}`}>
              <li>
                <a className={styles.mobileSocialLink} href="#">
                  <svg
                    className={styles.mobileSocialIcon}
                    width="24"
                    height="24"
                  >
                    <use href="/images/icons.svg#icon-instagram"></use>
                  </svg>
                </a>
              </li>
              <li>
                <a className={styles.mobileSocialLink} href="#">
                  <svg
                    className={styles.mobileSocialIcon}
                    width="24"
                    height="24"
                  >
                    <use href="/images/icons.svg#icon-twitter"></use>
                  </svg>
                </a>
              </li>
              <li>
                <a className={styles.mobileSocialLink} href="#">
                  <svg
                    className={styles.mobileSocialIcon}
                    width="24"
                    height="24"
                  >
                    <use href="/images/icons.svg#icon-facebook"></use>
                  </svg>
                </a>
              </li>
              <li>
                <a className={styles.mobileSocialLink} href="#">
                  <svg
                    className={styles.mobileSocialIcon}
                    width="24"
                    height="24"
                  >
                    <use href="/images/icons.svg#icon-linkedin"></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
