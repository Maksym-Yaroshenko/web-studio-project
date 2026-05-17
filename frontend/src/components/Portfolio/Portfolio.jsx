import styles from "./Portfolio.module.css";

export default function Portfolio() {
  const projects = [
    { id: 1, name: "Banking App", category: "App", img: "1" },
    { id: 2, name: "Cashless Payment", category: "Marketing", img: "2" },
    { id: 3, name: "Meditation App", category: "App", img: "3" },
    { id: 4, name: "Taxi Service", category: "Marketing", img: "4" },
    { id: 5, name: "Screen Illustrations", category: "Design", img: "5" },
    { id: 6, name: "Online Courses", category: "Marketing", img: "6" },
  ];

  return (
    <section className={styles.portfolioSection}>
      <div className="container">
        <h2 className={styles.portfolioTitle}>Our Portfolio</h2>
        <ul className={`list ${styles.portfolioList}`}>
          {projects.map((project) => (
            <li key={project.id} className={styles.portfolioItem}>
              <div className={styles.imgWrapper}>
                <picture>
                  <source
                    srcSet={`/images/desktop-img-${project.img}.jpg 1x, /images/desktop-img-${project.img}@2x.jpg 2x`}
                    media="(min-width: 1158px)"
                  />
                  <source
                    srcSet={`/images/table-img-${project.img}.jpg 1x, /images/table-img-${project.img}@2x.jpg 2x`}
                    media="(min-width: 768px)"
                  />
                  <source
                    srcSet={`/images/mobile-img-${project.img}.jpg 1x, /images/mobile-img-${project.img}@2x.jpg 2x`}
                    media="(max-width: 767px)"
                  />
                  <img
                    src={`/images/mobile-img-${project.img}.jpg`}
                    alt={project.name}
                    width="360"
                    height="300"
                  />
                </picture>
                <p className={styles.overlayText}>
                  14 Stylish and User-Friendly App Design Concepts · Task
                  Manager App · Calorie Tracker App · Exotic Fruit Ecommerce App
                  · Cloud Storage App
                </p>
              </div>
              <div className={styles.metaWrapper}>
                <h3 className={styles.projectName}>{project.name}</h3>
                <p className={styles.projectCategory}>{project.category}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
