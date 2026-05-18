import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={`container ${styles.footerContainer}`}>
        <li className={styles.logoWrapper}>
          <a className={`link ${styles.footerLogo}`} href="/">
            Web<span className={styles.footerLogoColor}>Studio</span>
          </a>
          <p className={styles.footerText}>
            Increase the flow of customers and sales for your business with
            digital marketing & growth solutions.
          </p>
        </li>

        <li className={styles.socialsWrapper}>
          <p className={styles.socialsTitle}>Social media</p>
          <ul className={`list ${styles.socialsList}`}>
            {["instagram", "twitter", "facebook", "linkedin"].map((icon) => (
              <li key={icon}>
                <a className={styles.socialLink} href="#">
                  <svg className={styles.socialIcon} width="24" height="24">
                    <use href={`/images/icons.svg#icon-${icon}`}></use>
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </li>

        <li className={styles.subscribeWrapper}>
          <p className={styles.socialsTitle}>Subscribe</p>
          <form className={styles.subscribeForm}>
            <label className="visually-hidden" htmlFor="subscribe-email">
              Email
            </label>
            <input
              className={styles.subscribeInput}
              id="subscribe-email"
              type="email"
              name="subscribe-email"
              placeholder="E-mail"
              required
            />
            <button className={styles.subscribeBtn} type="submit">
              Subscribe
              <svg className={styles.subscribeIcon} width="24" height="24">
                <use href="/images/icons.svg#icon-subscribe"></use>
              </svg>
            </button>
          </form>
        </li>
      </ul>
    </footer>
  );
}
