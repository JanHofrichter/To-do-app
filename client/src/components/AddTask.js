import React, { useState } from "react";
//import { Counter } from "./Counter";

export default function AddTask({ addElements }) {
  // element properties
  const [newTask, setNewTask] = useState({
    name: null,
    description: null,
    priority: null,
    date: null,
  });

  const updateField = (fieldName, newValue) => {
    setNewTask((prevFields) => ({
      ...prevFields,
      [fieldName]: newValue,
    }));
  };

  const addUser = () => {
    const date_created = Date();
    const id = crypto.randomUUID();
    fetch("/api/AddTask", {
      method: "POST",
      body: JSON.stringify({
        _id: id,
        name: newTask.name,
        description: "",
        date: newTask.date,
        priority: newTask.priority,
        created_date: date_created,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        addElements(id, date_created, newTask);
        console.log("INFO - element added");
      } else {
        console.log("ERROR - element failed to add");
      }
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    updateField("name", "");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ul className="list-group">
          <li className="list-group-item">
            <div className="input-group">
              <input
                id="extend"
                placeholder="Add task"
                className="form-control"
                value={newTask.name}
                onChange={(e) => updateField("name", e.target.value)}
                type="text"
              />
              <div className="input-group-append">
                <button onClick={addUser} className="btn btn-primary">
                  Add
                </button>
              </div>
            </div>
            <div className="inline-elements">
              <div title="priority">
                <select
                  onChange={(e) => updateField("priority", e.target.value)}
                >
                  <option defaultValue=""></option>
                  <option value="Low">Low</option>
                  <option value="Mid">Mid</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <input
                  type="date"
                  name="date_until"
                  value={newTask.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  min="2022-01-01"
                />
              </div>
            </div>
          </li>
        </ul>
      </form>
      <br />
    </>
  );
}
