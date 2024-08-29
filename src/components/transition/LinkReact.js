"use client";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ImageNext from "./ImageNext";
import styles from "./LinkReact.module.scss";
import Link from "next/link";

export default function LinkReact({ children, item, index }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  let timeoutId;

  function handleMouseOver() {
    timeoutId = setTimeout(() => {
      setShow(true);
    }, 400);
  }

  function handleMouseLeave() {
    clearTimeout(timeoutId);
    if (show) {
      setShow(false);
    }
  }

  return (
    <span
      key={index}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.url}
        target="_blank "
        rel="noopener noreferrer"
        className={styles.localisation}
      >
        {children}
        <span key={index} className={styles.entourage}>
          <h3>{item.title}</h3>

          <CSSTransition
            nodeRef={ref}
            in={show}
            timeout={{ enter: 400, exit: 400 }}
            unmountOnExit
            classNames={{
              enter: styles["enter"],
              enterActive: styles["enterActive"],
              enterDone: styles["enterDone"],
              exit: styles["exit"],
              exitActive: styles["exitActive"],
              exitDone: styles["exitDone"],
            }}
          >
            <span ref={ref} className={styles.cadre}>
              <span className={styles.image}>
                <ImageNext item={item} index={index} />
              </span>
            </span>
          </CSSTransition>
        </span>
      </Link>
    </span>
  );
}
