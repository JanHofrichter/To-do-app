import React, { useState } from "react";
import { addUser } from "../api";
import Input from "../components/Input";
import Button from "../components/Button";
import DueDate from "../components/DueDate";

export default function AddTask({ setElements }) {
  const [newTask, setNewTask] = useState({
    name: "",
    priority: "",
    date: "",
  });

  const updateField = (fieldName, newValue) => {
    setNewTask((prevFields) => ({
      ...prevFields,
      [fieldName]: newValue,
    }));
  };

  function addElements(id, date_created, newTask) {
    setElements((currentElements) => {
      return [
        ...currentElements,
        {
          _id: id,
          name: newTask.name,
          description: " ",
          date: newTask.date,
          priority: newTask.priority,
          created_date: date_created,
          completed: false,
        },
      ];
    });
  }

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
                autoFocus
                placeholder="Add task"
                className="form-control"
                type="text"
                name="name"
                value={newTask.name}
                onChange={(e) => updateField("name", e.target.value)}
              />
              <Button
                label={"Add"}
                func={() => addUser(newTask, addElements)}
                buttonClass={"btn btn-primary"}
              />
            </div>
            <div className="inline-elements">
              <div title="priority">
                <select
                  onChange={(e) => updateField("priority", e.target.value)}
                >
                  <option defaultValue="">---</option>
                  <option value="Low">Low</option>
                  <option value="Mid">Mid</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <DueDate
                  value={newTask.date}
                  func={(e) => updateField("date", e.target.value)}
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
