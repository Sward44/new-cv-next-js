import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Contact.module.scss";
import Link from "next/link";

const Contact = ({ contact }) => {
  return (
    <>
      {contact.map((item) => (
        <>
          <h3 key={crypto.randomUUID()}>{item.title}</h3>
          <span className={styles.locaAddress} title={item.title_hover}>
            <Link
              href={item.url}
              rel="noopener noreferrer"
              target="_blank"
              className={styles.titleHover}
            >
              <FontAwesomeIcon
                icon={
                  item.icon.prefix === "fas"
                    ? require("@fortawesome/free-solid-svg-icons")[
                        item.icon.iconName
                      ]
                    : require("@fortawesome/free-brands-svg-icons")[
                        item.icon.iconName
                      ]
                }
                height={16}
                style={{ marginRight: "10px" }}
              />
              {item.description}
            </Link>
          </span>
        </>
      ))}
    </>
  );
};

export default Contact;
