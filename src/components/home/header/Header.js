import styles from "./Header.module.scss";
import TelechargerPDF from "@/components/pdf/TelechargerPDF";

export default async function Header({ title }) {
  return (
    <header className={styles.header}>
      <h1>David Launay</h1>
      <p>
        {title}
        <TelechargerPDF />
      </p>
    </header>
  );
}
