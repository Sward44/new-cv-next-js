import styles from "./Main.module.scss";
import {
  haIcon,
  geIcon,
  juignetIcon,
  rabasIcon,
  airbusIcon,
} from "@/components/img/main/logoEntreprise/logoEntreprise";

const iconEntreprise = {
  ha: haIcon,
  ge: geIcon,
  juignet: juignetIcon,
  rabas: rabasIcon,
  airbus: airbusIcon,
};

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
      {main.experience.map((item) => {
        let svgName = item.icon;
        const SvgComponent = iconEntreprise[svgName];
        return (
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
                <span style={{ width: "30px", marginRight: "10px" }}>
                  <SvgComponent alt={item.icon_alt} className={styles.imag} />
                </span>
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
              {item.result.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </main>
  );
}
