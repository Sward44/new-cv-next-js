import Image from "next/image";
import styles from "./Main.module.scss";

export default function Main({ main }) {
  return (
    <main className={styles.main}>
      <div className={styles.block}>
        <h2 className={styles.titleSmall}>{main.profil.title_profil} </h2>
        <hr />
        <p>{main.profil.description}</p>
      </div>
      <h2 className={styles.titleSmall}>{main.profil.title_experience}</h2>
      <hr />
      {main.experience.map((item) => (
        <div key={crypto.randomUUID()} className={styles.experience}>
          <p className={styles.timeline}>
            {item.date_entrer} -<br /> {item.date_sortie}
          </p>
          <h3 className={styles.titre}>{item.title}</h3>
          <a
            className={styles.textHint}
            href={item.url}
            target="_blank "
            rel="noopener noreferrer"
          >
            {item.url && (
              <Image
                src={require(`../../${item.icon}`).default}
                width={30}
                height={30}
                alt={item.icon_alt}
                className={styles.imag}
              />
            )}
            <p>
              {item.entreprise} - {item.location}{" "}
            </p>
          </a>
          <div className={styles.texte}>
            <p>{item.description}</p>
            <p className={styles.resultat}>
              <span>{item.title_result}</span>
            </p>
          </div>
          <ul>
            {item.result.map((item) => (
              <li key={crypto.randomUUID()}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
