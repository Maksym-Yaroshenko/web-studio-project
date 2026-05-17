import styles from "./Hero.module.css";

export default function Hero({ onOpenModal }) {
  return (
    <section className={styles.heroSection}>
      <div className="container">
        <h1 className={styles.heroTitle}>
          Effective Solutions For Your Business
        </h1>
        <button className={styles.button} type="button" onClick={onOpenModal}>
          Order Service
        </button>
      </div>
    </section>
  );
}
