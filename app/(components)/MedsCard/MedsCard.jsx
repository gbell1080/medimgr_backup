import React from "react";
import styles from "./medscard.module.css";
import DeleteBlock from "../DeleteBlock/DeleteBlock";
import StockLevel from "../StockLevel/StockLevel";
import Link from "next/link";

const MedsCard = ({ medication }) => {
  const formatTimeStamps = (timeStamp) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    const date = new Date(timeStamp);
    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <StockLevel level={medication.stockLevel} />
        <DeleteBlock id={medication._id} model={"Meds"} />
      </div>
      <h1 className={styles.medsName}>{medication.title}</h1>
      <hr className={styles.break} />
      <p>{medication.description}</p>
      <p className={styles.mediumText}>
        Current Total: {medication.currentTotal}
      </p>
      <p className={styles.mediumText}>
        Expected Total: {medication.expectedTotal}
      </p>
      <p className={styles.mediumText}>
        Total Destroyed: {medication.destroyed}
      </p>
      <p className={styles.mediumText}>Total Returned: {medication.returned}</p>
      <div className={styles.grow}></div>
      <div className={styles.btnContainer}>
        <div>
          <p className={styles.smallText}>
            Current total signed off by: {medication.signedOffBy}
          </p>
          <p className={styles.smallText}>Current total sign off date:</p>
          <p className={styles.smallText}>
            {formatTimeStamps(medication.updatedAt)}
          </p>
        </div>
        <Link href={`/Meds/${medication._id}`}>
          <button className="btn-orange">Update Meds</button>
        </Link>
      </div>
    </div>
  );
};

export default MedsCard;
