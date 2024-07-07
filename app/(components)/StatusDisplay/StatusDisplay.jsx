import React from "react";
import styles from "./StatusDisplay.module.css";

const getColour = (status) => {
  let colour = "";
  switch (status) {
    case "Not started":
      colour = `${styles.status} ${styles.red}`;
      return colour;
    case "In progress":
      colour = `${styles.status} ${styles.amber}`;
      console.log(colour);
      return colour;
    case "Completed":
      colour = `${styles.status} ${styles.green}`;
      return colour;
    default:
      colour = "black";
      return colour;
  }
};

const StatusDisplay = ({ status }) => {
  let color = getColour(status);
  let style = { backgroundColor: `${color}` };
  return <span className={color}>{status}</span>;
};

export default StatusDisplay;
