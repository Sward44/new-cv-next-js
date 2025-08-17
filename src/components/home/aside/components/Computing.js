import Image from "next/image";
import styles from "./Computing.module.scss";

const Computing = ({ computing }) => {
  return (
    <>
      {computing.map((item) => (
        <div key={crypto.randomUUID()}>
          <div className={styles.localisation}>
            <h3>{item.title}</h3>
          </div>
          <div className={styles.barSkill}>
            <div
              className={`${styles.skillProgress} ${styles[item.score[0]]}`}
            ></div>
            <div
              className={`${styles.skillDot} ${styles[item.score[1]]}`}
            ></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Computing;
