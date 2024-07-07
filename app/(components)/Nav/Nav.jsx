import {
  faBars,
  faCircleUser,
  faHome,
  faPills,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import styles from "./Nav.module.css";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Nav = async () => {
  const session = await getServerSession(options);

  return (
    <nav className={styles.navContainer}>
      <div className={styles.linkContainer}>
        <Link href="/" className={styles.link}>
          <FontAwesomeIcon icon={faHome} className="icon" />
          Home
        </Link>
        <Link href="/ClientPage" className={styles.link}>
          <FontAwesomeIcon icon={faUser} className="icon" />
          Clients
        </Link>
        <Link href="/Meds" className={styles.link}>
          <FontAwesomeIcon icon={faPills} className="icon" />
          Medications
        </Link>
        <Link href="/Users" className={styles.link}>
          <FontAwesomeIcon icon={faUser} className="icon" />
          Users
        </Link>
        <div className={styles.link}>
          {session ? (
            <Link
              href="/api/auth/signout?callbackUrl=/"
              className={styles.link}
            >
              <FontAwesomeIcon icon={faCircleUser} className="icon" />
              Sign out
            </Link>
          ) : (
            <Link href="/api/auth/signin" className={styles.link}>
              <FontAwesomeIcon icon={faCircleUser} className="icon" />
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
