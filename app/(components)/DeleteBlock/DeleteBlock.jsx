"use client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./deleteblock.module.css";
import { useRouter } from "next/navigation";

const DeleteBlock = ({ id, model }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await fetch(`http://medimgr.vercel.app/api/${model}/${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      router.refresh();
    }
  };

  return (
    <FontAwesomeIcon
      icon={faTrash}
      className={styles.delete}
      onClick={handleDelete}
    />
  );
};

export default DeleteBlock;
