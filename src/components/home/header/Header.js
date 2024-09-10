import styles from "./Header.module.scss";
import TelechargerPDF from "@/components/pdf/TelechargerPDF";

export default async function Header({ title, locale }) {
  return (
    <header className={styles.header}>
      <h1>David Launay</h1>
      <span>
        <p>{title}</p>
        <TelechargerPDF locale={locale} />
      </span>
    </header>
  );
}
