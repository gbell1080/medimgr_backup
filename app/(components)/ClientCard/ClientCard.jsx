import React from "react";
import DeleteBlock from "../DeleteBlock/DeleteBlock";
import PriorityDisplay from "../PriorityDisplay/PriorityDisplay";
import ProgressDisplay from "../ProgressDisplay/ProgressDisplay";
import StatusDisplay from "../StatusDisplay/StatusDisplay";
import styles from "./ClientCard.module.css";
import Link from "next/link";

const ClientCard = ({ client }) => {
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
        <PriorityDisplay priority={client.priority} />
        <div className={styles.deleteContainer}>
          <DeleteBlock id={client._id} model={"Clients"} />
        </div>
      </div>
      <Link
        href={`/ClientPage/${client._id}`}
        style={{ display: "contents" }}
        className="link"
      >
        <h1 className={styles.clientName}>{client.title}</h1>
        <hr className={styles.break} />
        <p>{client.description}</p>
        <div className={styles.grow}></div>
        <div className={styles.medsTaken}>
          <h3>Meds Taken:</h3>
          <p>AM: ✔️</p>
          <p>Noon: ✔️</p>
          <p>PM: ✔️</p>
        </div>
        <div className={styles.progressContainer}>
          <p>{formatTimeStamps(client.createdAt)}</p>
          <ProgressDisplay progress={client.progress} />
        </div>
        <StatusDisplay status={client.status} />
      </Link>
    </div>
  );
};

export default ClientCard;
