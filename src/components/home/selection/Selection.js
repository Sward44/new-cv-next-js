"use client";
import styles from "./Selection.module.scss";
import { useCurrentLanguages } from "@/hooks/useCurrentLanguages";
import ImageJS from "./ImageJS";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Selection = ({ selection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayBlock, setDisplayBlock] = useState(false);
  const currentLanguage = useCurrentLanguages();

  useEffect(() => {
    setIsOpen(false);
  }, [currentLanguage]);

  return (
    <div className={styles.selection}>
      <h2 className={styles.titleSmall}>{selection.title}</h2>
      <div
        onClick={() => setIsOpen((currOpen) => !currOpen)}
        className={` ${isOpen ? styles.enabled : ""}`}
      >
        {selection.options
          .filter((option) => option.value === currentLanguage)
          .map((option, index) => (
            <div key={index} className={styles.selector}>
              <div className={styles.text}>
                <ImageJS image={option} index={index} />
                <p>{option.label}</p>
              </div>
              <div className={styles.icon}>
                <FontAwesomeIcon
                  key={index}
                  icon={
                    require("@fortawesome/free-solid-svg-icons")[
                      option.iconName
                    ]
                  }
                  height={16}
                  width={16}
                />
              </div>
            </div>
          ))}

        {selection.options
          .filter((option) => option.value !== currentLanguage)
          .map((option, index) => (
            <div key={index} className={`${styles.selectButton} `}>
              <Link
                href={`/${option.value}`}
                className={styles.text}
                scroll={false}
              >
                <ImageJS image={option} index={index} />
                <p key={index}> {option.label}</p>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Selection;
// ${styles.displayBlock}
