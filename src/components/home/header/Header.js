import styles from "./Header.module.scss";

export default async function Header({ title }) {
  return (
    <header className={styles.header}>
      <h1>David Launay</h1>
      <p>{title} </p>
    </header>
  );
}
