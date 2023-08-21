import React, { useState } from "react";
//import { Counter } from "./Counter";

export default function FormGroup({ addElements }) {
  // element properties
  const [newName, setNewName] = useState("");
  const [newDescr, setNewDescr] = useState("");
  const [newDate, setNewDate] = useState("");

  const addUser = () => {
    const id = crypto.randomUUID();
    fetch("/api/AddTask", {
      method: "POST",
      body: JSON.stringify({
        _id: id,
        name: newName,
        description: newDescr,
        finish_date: newDate,
        created_date: Date(),
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        addElements(newName, newDescr, newDate, id);
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
        <div className="mb-3">
          <label className="form-label">Task name:</label>
          <br />
          <input
            placeholder="Cook spaghetti"
            className="form-control"
            type="text"
            name="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Description:</label>
          <br />
          <textarea
            placeholder="To cook spaghetti, you need to boil a large pot of salted water and add the pasta, stirring occasionally, until it is al dente (about 8 to 10 minutes). Then, you can drain the pasta and toss it with your favorite sauce, such as tomato, pesto, or cheese."
            rows="2"
            className="form-control"
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
}
