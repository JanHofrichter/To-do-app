import React, { useState } from "react";
//import { Counter } from "./Counter";

export default function FormGroup({ selectedTask }) {
  // element properties
  const [newName, setNewName] = useState("");
  const [newDescr, setNewDescr] = useState("");
  const [newDate, setNewDate] = useState("");

  return (
    <>
      <div>
        <form>
          <div className="mb-3">
            <label className="form-label">{selectedTask.name}</label>
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
            <textarea
              placeholder="Add note."
              rows="2"
              className="form-control"
              type="text"
              name="description"
              value={newDescr}
              onChange={(e) => setNewDescr(e.target.value)}
            />
          </div>
        </form>
      </div>
      {/* <form onSubmit={handleSubmit}>
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
    </form> */}
    </>
  );
}
