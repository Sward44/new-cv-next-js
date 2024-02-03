import Image from "next/image";
import styles from "./Hobbies.module.scss";

export default function Hobbies({ hobbies }) {
  return (
    <>
      <div className={styles.localisation}>
        {hobbies.map((item) => {
          return (
            <Image
              key={crypto.randomUUID()}
              src={require(`../../../${item.icon}`).default}
              width={40}
              height={40}
              alt={item.icon_alt}
              className={styles.icon}
            />
          );
        })}
      </div>
    </>
  );
}
