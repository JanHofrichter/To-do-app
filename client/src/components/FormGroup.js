import React, { useState, useEffect } from "react";
export default function FormGroup({
  updateElem,
  name,
  setname,
  setdescr,
  descr,
  setdate,
  date,
  ID,
  reset,
}) {
  const updateTask = () => {
    fetch("/api/Updatedata", {
      method: "PUT",
      body: JSON.stringify({
        _id: ID,
        name: name,
        description: descr,
        finish_date: date,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        updateElem(ID, name, descr, date);
        reset();
        console.log("INFO - task updated");
      } else {
        console.log("ERROR - task failed to update");
      }
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        {/* <div title="priority">
          <label className="form-label">Priority: {priority}</label>
          <br />
          <select
            onChange={(e) => setChosenPriority(e.target.value)}
            value={chosenPriority}
          >
            <option value="Low">Low</option>
            <option value="Mid">Mid</option>
            <option value="High">High</option>
          </select>
        </div> */}
        <div>
          <label className="form-label">Description</label>
          <br />
          <textarea
            placeholder="Add note"
            rows="2"
            className="form-control"
            type="text"
            name="description"
            value={descr}
            onChange={(e) => setdescr(e.target.value)}
          />
        </div>
        <div>
          <label>Due date</label>
          <br />
          <input
            type="date"
            name="date_until"
            value={date}
            onChange={(e) => setdate(e.target.value)}
            min="2023-07-01"
          />
        </div>
        <div className="input-group-append">
          <button onClick={updateTask} className="btn btn-primary">
            Save changes
          </button>
        </div>
      </form>
    </>
  );
}
