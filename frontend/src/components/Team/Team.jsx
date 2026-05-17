import styles from "./Team.module.css";

export default function Team() {
  const teamMembers = [
    {
      id: "mark",
      name: "Mark Guerrero",
      role: "Product Designer",
      img: "/images/team-1.jpg",
      img2x: "/images/team-1@2x.jpg",
    },
    {
      id: "tom",
      name: "Tom Ford",
      role: "Frontend Developer",
      img: "/images/team-2.jpg",
      img2x: "/images/team-2@2x.jpg",
    },
    {
      id: "camila",
      name: "Camila Garcia",
      role: "Marketing",
      img: "/images/team-3.jpg",
      img2x: "/images/team-3@2x.jpg",
    },
    {
      id: "daniel",
      name: "Daniel Wilson",
      role: "UI Designer",
      img: "/images/team-4.jpg",
      img2x: "/images/team-4@2x.jpg",
    },
  ];

  return (
    <section className={styles.teamSection}>
      <div className="container">
        <h2 className={styles.teamTitle}>Our Team</h2>
        <ul className={`list ${styles.teamList}`}>
          {teamMembers.map(({ id, name, role, img, img2x }) => (
            <li key={id} className={styles.teamItem}>
              <picture>
                <source srcSet={`${img} 1x, ${img2x} 2x`} />
                <img src={img} alt={name} width="264" height="260" />
              </picture>
              <div className={styles.metaWrapper}>
                <h3 className={styles.teamName}>{name}</h3>
                <p className={styles.teamRole}>{role}</p>
                <ul className={`list ${styles.socialList}`}>
                  {["instagram", "twitter", "facebook", "linkedin"].map(
                    (network) => (
                      <li key={network}>
                        <a className={styles.socialLink} href="#">
                          <svg
                            className={styles.socialIcon}
                            width="16"
                            height="16"
                          >
                            <use
                              href={`/images/icons.svg#icon-${network}`}
                            ></use>
                          </svg>
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
