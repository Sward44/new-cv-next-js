import Image from "next/image";
import styles from "./Languages.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Languages = ({ langues }) => {
  const generateStarIcons = (starCount) => {
    const yellowStars = Array.from({ length: starCount }, (_, index) => (
      <FontAwesomeIcon
        key={`yellow_${index}`}
        icon={faStar}
        height={24}
        style={{ margin: "0 5px" }}
        className={`${styles.icon} ${styles.textPrimary}`}
      />
    ));

    const blackStars = Array.from({ length: 5 - starCount }, (_, index) => (
      <FontAwesomeIcon
        key={`black_${index}`}
        icon={faStar}
        height={24}
        style={{ margin: "0 5px" }}
        className={styles.icon}
      />
    ));

    return [...yellowStars, ...blackStars];
  };
  return (
    <>
      {langues.map((item) => (
        <div key={crypto.randomUUID()} className={styles.localisation}>
          <Image
            src={require(`../../../${item.flag}`).default}
            alt={item.flag_alt}
            width={40}
            height={40}
            style={{ marginRight: "10px" }}
          />
          {generateStarIcons(item.starCount)}
        </div>
      ))}
    </>
  );
};

export default Languages;
