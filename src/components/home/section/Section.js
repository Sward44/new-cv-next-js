import Image from "next/image";
import styles from "./Section.module.scss";
import david from "../../img/section/david-launay-mini.png";

export default async function Section() {
  return (
    <>
      <section className={styles.picture}>
        <Image
          src={david}
          alt="David Launay"
          fill
          style={{ objectFit: "contain" }}
          className={styles.img}
        />
      </section>
    </>
  );
}
