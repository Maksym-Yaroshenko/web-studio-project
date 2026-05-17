import styles from "./Advantages.module.css";

export default function Advantages() {
  const advantagesData = [
    {
      id: "strategy",
      title: "Strategy",
      text: "Our goal is to identify the business problem to walk away with the perfect and creative solution.",
      icon: "icon-antenna",
    },
    {
      id: "punctuality",
      title: "Punctuality",
      text: "Bring the key message to the brand's audience for the best price within the shortest possible time.",
      icon: "icon-clock",
    },
    {
      id: "diligence",
      title: "Diligence",
      text: "Research and confirm brands that present the strongest digital growth opportunities and minimize risk.",
      icon: "icon-diagram",
    },
    {
      id: "technologies",
      title: "Technologies",
      text: "Design practice focused on digital experiences. We bring forth a deep passion for problem-solving.",
      icon: "icon-astronaut",
    },
  ];

  return (
    <section className={styles.advantagesSection}>
      <div className="container">
        <h2 className="visually-hidden">Our Advantages</h2>
        <ul className={`list ${styles.advantagesList}`}>
          {advantagesData.map(({ id, title, text, icon }) => (
            <li key={id} className={styles.advantagesItem}>
              <div className={styles.iconWrapper}>
                <svg width="64" height="64">
                  <use href={`/images/icons.svg#${icon}`}></use>
                </svg>
              </div>
              <h3 className={styles.advantagesSubtitle}>{title}</h3>
              <p className={styles.advantagesText}>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
