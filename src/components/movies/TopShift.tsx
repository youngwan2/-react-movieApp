import React from "react";
import styles from "./TopShift.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const TopShift = () => {
  return (
    <div
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className={styles.top_move}
    >
      {<FontAwesomeIcon icon={faArrowUp}></FontAwesomeIcon>}
    </div>
  );
};

export default TopShift;
