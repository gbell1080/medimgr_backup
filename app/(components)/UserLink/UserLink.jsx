import React from "react";
import stlyes from "./userlink.module.css";
import Link from "next/link";
import DeleteBlock from "../DeleteBlock/DeleteBlock";

const UserLink = ({ user }) => {
  return (
    <div className={stlyes.container}>
      <Link href={`Users/${user._id}`} className={stlyes.link}>
        <p className={stlyes.text}>{user.email}</p>
      </Link>
      <DeleteBlock id={user._id} model={"Users"} />
    </div>
  );
};

export default UserLink;
