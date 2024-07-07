import React from "react";
import styles from "./ProgressDisplay.module.css";

export const ProgressDisplay = ({ progress }) => {
  return (
    <div>
      <div className={styles.progressbar}>
        <div
          className={styles.progressbarfull}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};
export default ProgressDisplay;
