import React, { useState } from "react";
//import { Counter } from "./Counter";

export default function AddTask({ addElements }) {
  // element properties
  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");

  const addUser = () => {
    const id = crypto.randomUUID();
    fetch("/api/AddTask", {
      method: "POST",
      body: JSON.stringify({
        _id: id,
        name: name,
        description: "",
        finish_date: "",
        priority: priority,
        created_date: Date(),
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        addElements(name, "", "", id);
        console.log("INFO - element added");
      } else {
        console.log("ERROR - element failed to add");
      }
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setName("");
  }

  console.log(priority);
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
              <div className="input-group-append">
                <button onClick={addUser} className="btn btn-primary">
                  Add
                </button>
              </div>
            </div>
            <div title="priority">
              <select onChange={(e) => setPriority(e.target.value)}>
                <option defaultValue=""></option>
                <option value="Low">Low</option>
                <option value="Mid">Mid</option>
                <option value="High">High</option>
              </select>
            </div>
          </li>
        </ul>
      </form>
      <br />
    </>
  );
}
