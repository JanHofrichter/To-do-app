import React, { useState } from "react";
//import { Counter } from "./Counter";

export default function AddTask({ addElements }) {
  // element properties
  const [newName, setNewName] = useState("");

  const addUser = () => {
    const id = crypto.randomUUID();
    fetch("/api/AddTask", {
      method: "POST",
      body: JSON.stringify({
        _id: id,
        name: newName,
        description: "",
        finish_date: "",
        created_date: Date(),
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        addElements(newName, "", "", id);
        console.log("INFO - element added");
      } else {
        console.log("ERROR - element failed to add");
      }
    });
  };

  // const changeDates = () => {
  //   fetch("/api/Updatedata", {
  //     method: "PUT",
  //   });
  // };

  function handleSubmit(e) {
    e.preventDefault();
    setNewName("");
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
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                type="text"
              />
              <div className="input-group-append">
                <button onClick={addUser} className="btn btn-primary">
                  Add
                </button>
              </div>
            </div>
          </li>
        </ul>
      </form>
      <br/>
    </>
  );
}
