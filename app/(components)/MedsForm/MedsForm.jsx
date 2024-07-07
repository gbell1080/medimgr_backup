"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./medsform.module.css";

const MedsForm = ({ meds, clients, session }) => {
  const EDITMODE = meds._id === "new" ? false : true;
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Meds/${meds._id}`, {
        method: "PUT",
        body: JSON.stringify({ formData }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to update client card");
      }
      router.refresh();
      router.push("/");
    } else {
      const res = await fetch("/api/Meds", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create client card");
      }
      router.refresh();
      router.push("/Meds");
    }
  };

  const startingClientData = {
    title: "",
    description: "",
    currentTotal: 0,
    expectedTotal: 0,
    destroyed: 0,
    returned: 0,
    stockLevel: 0,
    person: "",
    signedOffBy: `${session.user.email}`,
    active: true,
  };

  if (EDITMODE) {
    startingClientData["title"] = meds.title;
    startingClientData["description"] = meds.description;
    startingClientData["currentTotal"] = meds.currentTotal;
    startingClientData["expectedTotal"] = meds.expectedTotal;
    startingClientData["destroyed"] = meds.destroyed;
    startingClientData["returned"] = meds.returned;
    startingClientData["stockLevel"] = meds.stockLevel;
    startingClientData["person"] = meds.person;
  }

  const [formData, setFormData] = useState(startingClientData);
  const admin = session.user.role === "admin" ? true : false;

  return (
    <div className={styles.formContainer}>
      <form method="post" onSubmit={handleSubmit}>
        <h3>
          {EDITMODE
            ? "Update your Medication card"
            : "Create a new Medication Card"}
        </h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />
        <label>Current Total</label>
        <input
          id="currentTotal"
          name="currentTotal"
          type="number"
          onChange={handleChange}
          min="0"
          value={formData.currentTotal}
        />
        {admin && (
          <>
            <label>Expected Total</label>
            <input
              id="expectedTotal"
              name="expectedTotal"
              type="number"
              onChange={handleChange}
              min="0"
              value={formData.expectedTotal}
            />
          </>
        )}
        <label>Destroyed</label>
        <input
          id="destroyed"
          name="destroyed"
          type="number"
          onChange={handleChange}
          min="0"
          value={formData.destroyed}
        />
        <label>Returned</label>
        <input
          id="returned"
          name="returned"
          type="number"
          onChange={handleChange}
          min="0"
          value={formData.returned}
        />
        <label>Stock Level</label>
        <input
          id="stockLevel"
          name="stockLevel"
          type="range"
          onChange={handleChange}
          min={0}
          max={5}
          value={formData.stockLevel}
        />
        <select
          id="person"
          name="person"
          type="text"
          onChange={handleChange}
          value={formData.person}
        >
          {clients.map((client, _index) => (
            <option key={_index} value={client.title}>
              {client.title}
            </option>
          ))}
        </select>
        <label>Person link</label>
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

export default MedsForm;
