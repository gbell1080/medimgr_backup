import React from "react";
import UserLink from "../(components)/UserLink/UserLink";
import styles from "./userpage.module.css";
import Link from "next/link";

const getUsers = async () => {
  const res = await fetch("http://medimgr.vercel.app/api/Users", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user data");
  }
  return res.json();
};

const Users = async () => {
  const { users } = await getUsers();

  return (
    <div className="pageContainer">
      <div className={styles.pageHeader}>
        <div>
          <h1>Users</h1>
          <p>
            Click on the email addresses below to change permissions for each
            account
          </p>
        </div>
        <Link href="/Users/new" className="btn-orange">
          Create new user
        </Link>
      </div>

      <br />
      <div className="userLinkContainer">
        {users &&
          users.map((user, index) => <UserLink key={index} user={user} />)}
      </div>
    </div>
  );
};

export default Users;
