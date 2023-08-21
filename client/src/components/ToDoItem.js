import React, { useState } from "react";
import FormGroup from "./FormGroup";

export function ToDoItem({
  _id,
  index,
  completed,
  name,
  description,
  finish_date,
  toggleElem,
  deleteTask,
  setSelectedIndex,
  selecteIndex,
  onClick

}) {
  const [newDescr, setNewDescr] = useState("");
  const [newDate, setNewDate] = useState("");

  return (
    <>
      <button
        className={
          selecteIndex === index
            ? "list-group-item list-group-item-primary"
            : "list-group-item"
        }
        onClick={() => {
          setSelectedIndex(index);
          onClick();
        }}
      >
        <input
          className="form-check-input me-1 left"
          checked={completed}
          onChange={(e) => toggleElem(_id, e.target.checked)}
          type="checkbox"
        />
        <label className="left">{name}</label>
        <button
          onClick={() => {
            deleteTask(_id);
          }}
        >
          Delete user
        </button>
      </button>
    </>
  );
}
