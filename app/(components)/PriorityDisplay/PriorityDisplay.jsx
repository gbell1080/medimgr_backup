import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
// import styles from "./PriorityDisplay.module.css";
const PriorityDisplay = ({ priority }) => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faFire}
        className={`${priority > 0 ? "icon" : "icon-dim"}`}
      />
      <FontAwesomeIcon
        icon={faFire}
        className={`${priority > 1 ? "icon" : "icon-dim"}`}
      />
      <FontAwesomeIcon
        icon={faFire}
        className={`${priority > 2 ? "icon" : "icon-dim"}`}
      />
      <FontAwesomeIcon
        icon={faFire}
        className={`${priority > 3 ? "icon" : "icon-dim"}`}
      />
      <FontAwesomeIcon
        icon={faFire}
        className={`${priority > 4 ? "icon" : "icon-dim"}`}
      />
    </div>
  );
};

export default PriorityDisplay;
