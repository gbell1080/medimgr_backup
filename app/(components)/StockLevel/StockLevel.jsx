import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const StockLevel = ({ level }) => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faBoxOpen}
        className={`${level > 0 ? "icon" : "icon-dim"}`}
      />
      <FontAwesomeIcon
        icon={faBoxOpen}
        className={`${level > 1 ? "icon" : "icon-dim"}`}
      />
      <FontAwesomeIcon
        icon={faBoxOpen}
        className={`${level > 2 ? "icon" : "icon-dim"}`}
      />
      <FontAwesomeIcon
        icon={faBoxOpen}
        className={`${level > 3 ? "icon" : "icon-dim"}`}
      />
      <FontAwesomeIcon
        icon={faBoxOpen}
        className={`${level > 4 ? "icon" : "icon-dim"}`}
      />
    </div>
  );
};

export default StockLevel;
