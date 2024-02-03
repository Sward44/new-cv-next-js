"use client";
import { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import ImageNext from "./ImageNext";
import styles from "./LinkReact.module.scss";

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
    <div
      key={index}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={item.url}
        target="_blank "
        rel="noopener noreferrer"
        className={styles.localisation}
      >
        {children}
        <div key={index} className={styles.entourage}>
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
            <div ref={ref} className={styles.cadre}>
              <div className={styles.image}>
                <ImageNext item={item} index={index} />
              </div>
            </div>
          </CSSTransition>
        </div>
      </a>
    </div>
  );
}
