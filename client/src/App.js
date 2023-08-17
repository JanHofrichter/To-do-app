import React, { useState, useEffect } from "react";
import { Counter } from "./components/Counter";

export default function App (props) {
  // element properties
  const [newName, setNewName] = useState("");
  const [newDescr, setNewDescr] = useState("");
  const [newDate, setNewDate] = useState("");

  const addUser = () => {
    fetch("/api/AddData", {
      method: "POST",
      body: JSON.stringify({
        _id: crypto.randomUUID(),
        name: newName,
        description: newDescr,
        finish_date: newDate,
        created_date: Date(),
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
  };

  const changeDates = () => {
    fetch("/api/Updatedata", {
      method: "PUT",
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    props.onsubmit(newName, newDescr, newDate);
    setNewName("");
  }
  return (
    <>
      <div>
        <button onClick={changeDates}>Change Dates</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task name:</label>
          <br />
          <input
            type="text"
            name="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <br />
          <input
            type="text"
            name="description"
            value={newDescr}
            onChange={(e) => setNewDescr(e.target.value)}
          />
        </div>
        <div>
          <label>Finish until:</label>
          <br />
          <input
            type="date"
            name="date_until"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            min="2023-07-01"
          />
        </div>
        <br />
        <button onClick={addUser}>Create Task</button>
      </form>
    </>
  );
};
