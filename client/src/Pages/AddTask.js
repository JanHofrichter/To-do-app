import React, { useState } from "react";
import ButtonComp from "../components/Button/Button";
import DateComp from "../components/Date/dateComp";
import InputComp from "../components/Input/inputComp";

import { addUser } from "../api";

export default function AddTask({ addElements }) {
  // element properties
  const [newTask, setNewTask] = useState({
    name: "",
    description: null,
    priority: "",
    date: "",
  });

  const updateField = (fieldName, newValue) => {
    setNewTask((prevFields) => ({
      ...prevFields,
      [fieldName]: newValue,
    }));
    console.log(fieldName, newValue);
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
              <InputComp
                value={newTask.name}
                func={(e) => updateField("name", e.target.value)}
              />
              <ButtonComp
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
                  <option defaultValue=""></option>
                  <option value="Low">Low</option>
                  <option value="Mid">Mid</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <DateComp
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
