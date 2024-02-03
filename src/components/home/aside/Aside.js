import styles from "./Aside.module.scss";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Computing from "./components/Computing";
import Languages from "./components/Languages";
import Hobbies from "./components/Hobbies";

export default function Aside({ aside }) {
  return (
    <aside className={styles.aside}>
      <div className={styles.sticky}>
        <div className={`${styles.block} ${styles.contact}`}>
          <h2 className="title-small">{aside.section[0]}</h2>
          <hr />
          <Contact contact={aside.contact} />
        </div>
        <div className={`${styles.block} ${styles.education}`}>
          <h2 className="title-small">{aside.section[1]}</h2>
          <hr />
          <Education education={aside.education} />
        </div>
        <div className={`${styles.block} ${styles.informatique}`}>
          <h2 className="title-small">{aside.section[2]}</h2>
          <hr />
          <Computing computing={aside.computing} />
        </div>
        <div className={`${styles.block} ${styles.langues}`}>
          <h2 className="title-small">{aside.section[3]}</h2>
          <hr />
          <Languages langues={aside.langue} />
        </div>
        <div className={`${styles.block} ${styles.lang}`}>
          <h2 className="title-small">{aside.section[4]}</h2>
          <hr />
          <Hobbies hobbies={aside.hobbies} />
        </div>
      </div>
    </aside>
  );
}
