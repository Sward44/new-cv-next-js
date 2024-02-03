import Image from "next/image";
import styles from "./Computing.module.scss";

const Computing = ({ computing }) => {
  return (
    <>
      {computing.map((item) => (
        <>
          <div key={crypto.randomUUID()} className={styles.localisation}>
            {item.icons.map((icon) => (
              <a
                key={crypto.randomUUID()}
                href={icon.url}
                target="_blank "
                rel="noopener noreferrer"
              >
                <Image
                  src={require(`../../../${icon.icon}`).default}
                  height={26}
                  width={26}
                  alt={icon.icon_alt}
                  style={{ marginRight: "10px" }}
                />
              </a>
            ))}
            <h3>{item.title}</h3>
          </div>
          <div key={crypto.randomUUID()} className={styles.barSkill}>
            <div
              className={`${styles.skillProgress} ${styles[item.score[0]]}`}
            ></div>
            <div
              className={`${styles.skillDot} ${styles[item.score[1]]}`}
            ></div>
          </div>
        </>
      ))}
    </>
  );
};

export default Computing;
