import styles from "./Pricing.module.css";

export default function Pricing() {
  return (
    <section className={styles.pricingSection}>
      <div className="container">
        <h2 className={styles.title}>Our Process & Pricing</h2>

        <div className={styles.processWrapper}>
          <picture>
            <source srcSet="/images/team-1.jpg 1x, /images/team-1@2x.jpg 2x" />
            <img
              className={styles.processImg}
              src="/images/team-1.jpg"
              alt="Working process"
              width="150"
              height="150"
            />
          </picture>
          <div className={styles.processTextBlock}>
            <p className={styles.processText}>
              We believe in transparency and efficiency. Our team closely works
              with clients to deliver the best results. We start with a deep
              analysis of your business needs, proceed to the design phase, and
              finally build a robust solution that scales perfectly.
            </p>
          </div>
        </div>

        <ol className={styles.processList}>
          <li className={styles.processListItem}>Strategy Development</li>
          <li className={styles.processListItem}>UI/UX Design</li>
          <li className={styles.processListItem}>Web Development</li>
        </ol>

        <table className={styles.pricingTable}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Service</th>
              <th className={styles.tableHeader}>Basic</th>
              <th className={styles.tableHeader}>Pro</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.tableCell}>Web Design</td>
              <td className={styles.tableCell}>$500</td>
              <td className={styles.tableCell}>$1200</td>
            </tr>
            <tr>
              <td className={styles.tableCell}>Development</td>
              <td className={styles.tableCell}>$1000</td>
              <td className={styles.tableCell}>$2500</td>
            </tr>
            <tr>
              <td className={styles.tableCell}>SEO & Marketing</td>
              <td className={styles.tableCell}>$300</td>
              <td className={styles.tableCell}>$800</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.mapContainer}>
          <h3 className={styles.mapSubtitle}>Find our Head Office</h3>
          <picture>
            <source srcSet="/images/desktop-bg-image.jpg 1x, /images/desktop-bg-image@2x.jpg 2x" />
            <img
              src="/images/desktop-bg-image.jpg"
              alt="Our Office Map"
              useMap="#officemap"
              width="400"
              height="250"
              className={styles.officeMapImg}
            />
          </picture>
          <map name="officemap">
            <area
              shape="rect"
              coords="0,0,400,250"
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              alt="Google Maps"
            />
          </map>
        </div>
      </div>
    </section>
  );
}
