"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./userform.module.css";

const UserForm = ({ user }) => {
  const EDITMODE = user._id === "new" ? false : true;
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Users/${user._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to update user card");
      }
      router.refresh();
      router.push("/");
    } else {
      const res = await fetch("/api/Users", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create user card");
      }
      router.refresh();
      router.push("/Users");
    }
  };

  const startingUserData = {
    name: "",
    email: "",
    role: "",
  };

  if (EDITMODE) {
    startingUserData["name"] = user.name;
    startingUserData["email"] = user.email;
    startingUserData["role"] = user.role;
  }

  const [formData, setFormData] = useState(startingUserData);

  return (
    <div className={styles.formContainer}>
      <form method="post" onSubmit={handleSubmit}>
        <h3>
          {EDITMODE
            ? "Update your Medication card"
            : "Create a new Medication Card"}
        </h3>
        <label>Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.name}
        />
        <label>Work email address</label>
        <input
          id="email"
          name="email"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.email}
        />

        <label>Role</label>
        <select
          id="role"
          name="role"
          onChange={handleChange}
          required={true}
          value={formData.role}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <input
          type="submit"
          value={
            EDITMODE ? "Update your meds card" : "Create a new medication Card"
          }
        />
      </form>
    </div>
  );
};

export default UserForm;
