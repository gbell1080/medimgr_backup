"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styles from "./clientform.module.css";

const ClientForm = ({ client }) => {
  const EDITMODE = client._id === "new" ? false : true;
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (EDITMODE) {
      const res = await fetch(`/api/Clients/${client._id}`, {
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
      const res = await fetch("/api/Clients", {
        method: "POST",
        body: JSON.stringify({ formData }),
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create client card");
      }
      router.refresh();
      router.push("/");
    }
  };

  const startingClientData = {
    title: "",
    description: "",
    category: "",
    priority: 0,
    progress: 0,
    status: "not started",
    active: false,
  };

  if (EDITMODE) {
    startingClientData["title"] = client.title;
    startingClientData["description"] = client.description;
    startingClientData["category"] = client.category;
    startingClientData["priority"] = client.priority;
    startingClientData["progress"] = client.progress;
    startingClientData["status"] = client.status;
  }

  const [formData, setFormData] = useState(startingClientData);

  return (
    <div className={styles.formContainer}>
      <form method="post" onSubmit={handleSubmit}>
        <h3>
          {EDITMODE ? "Update your client card" : "Create a new Client Card"}
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
        <label>Category</label>
        <select
          id="category"
          name="category"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.category}
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="other">Other</option>
        </select>
        <label>Priority</label>
        <div>
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <label>Progress</label>
        <input
          id="progress"
          name="progress"
          type="range"
          onChange={handleChange}
          min={0}
          max={100}
          value={formData.progress}
        />
        <label>Status</label>
        <select
          id="status"
          name="status"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.status}
        >
          <option value="Not started">Not Started</option>
          <option value="In progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="submit"
          value={
            EDITMODE ? "Update your client card" : "Create a new Client Card"
          }
        />
      </form>
    </div>
  );
};

export default ClientForm;
