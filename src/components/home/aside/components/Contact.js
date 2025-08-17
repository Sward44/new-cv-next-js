import styles from "./Contact.module.scss";
import Link from "next/link";
import {
  emailIcon,
  phoneIcon,
  linkedinIcon,
  githubIcon,
  googleIcon,
} from "@/components/img/aside/contact/logoContact";

const iconContact = {
  email: emailIcon,
  phone: phoneIcon,
  google: googleIcon,
  linkedin: linkedinIcon,
  github: githubIcon,
};

const Contact = ({ contact }) => {
  return (
    <>
      {contact.map((item) => {
        let svgName = item.icon;
        const SvgComponent = iconContact[svgName];
        return (
          <div key={crypto.randomUUID()}>
            <span>
              <h3>{item.title}</h3>
            </span>
            <span className={`${styles.locaAddress}`}>
              <Link
                href={item.url}
                rel="noopener noreferrer"
                target="_blank"
                className={styles.titleHover}
                style={{ width: "20px", marginRight: "10px" }}
              >
                <SvgComponent />
              </Link>
              <Link
                href={item.url}
                rel="noopener noreferrer"
                target="_blank"
                className={styles.titleHover}
              >
                {item.description}
              </Link>
            </span>
          </div>
        );
      })}
    </>
  );
};

export default Contact;
