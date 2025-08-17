import Image from "next/image";
import styles from "./Section.module.scss";
// import david from "../../img/section/david-launay-mini.png";

export default function Section({ dataUrl }) {
  return (
    <>
      <section className={styles.picture}>
        <Image
          src={dataUrl}
          alt="David Launay"
          fill
          style={{ objectFit: "contain" }}
          className={styles.img}
        />
      </section>
    </>
  );
}
