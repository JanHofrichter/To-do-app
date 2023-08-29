import React, { useRef, useState } from "react";

import Button from "../components/Button";
import DueDate from "../components/DueDate";
import Input from "../components/Input";
import { updateTask } from "../api";
import { updateTaskField } from "../api";
import useOutsideClick from "../Hooks/useOutsideClick";

// export { buttonComp };
export default function FormGroup({ task, updateField, reset, setElements }) {
  const [status, setStatus] = useState(false);
  const [obj, setObj] = useState({});
  const ref = useRef(null);

  const options = [
    { value: "", text: "---" },
    { value: "Low", text: "Low" },
    { value: "Mid", text: "Mid" },
    { value: "High", text: "High" },
  ];

  function updateElem(task) {
    setElements((currentElements) => {
      currentElements.map((elem) => {
        if (elem._id === task.ID) {
          elem.name = task.name;
          elem.description = task.description;
          elem.date = task.date;
          elem.priority = task.priority;
        }
        return null;
      });
      return currentElements;
    });
  }

  function updateElemField(id, fieldName, newValue) {
    setElements((currentElements) => {
      const updatedElements = currentElements.map((elem) => {
        if (elem._id === id) {
          return {
            ...elem,
            [fieldName]: newValue,
          };
        }
        return elem;
      });
      return updatedElements;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  var result = useOutsideClick(ref);

  if (status === true && result === false) {
    updateTaskField(
      task.ID,
      Object.keys(obj)[0],
      Object.values(obj)[0],
      updateElemField,
      reset
    );
    setStatus(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 formElem fourt-content">
          <label className="form-label">Name</label>
          <br />
          <div ref={ref}>
            <Input
              value={task.name}
              func={(e) => {
                updateField("name", e.target.value);
                setObj({ name: e.target.value });
                setStatus(true);
              }}
            />
          </div>
        </div>
        <div className="mb-3 formElem fourt-content">
          <label className="form-label">Priority</label>
          <br />
          <select
            value={task.priority}
            onChange={(e) => {
              updateField("priority", e.target.value);
              setObj({ priority: e.target.value });
              setStatus(true);
            }}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3 formElem fourt-content">
          <label className="form-label">Description</label>
          <br />
          <textarea
            placeholder="Add note"
            rows="2"
            className="form-control"
            type="text"
            name="description"
            value={task.description}
            onChange={(e) => {
              updateField("description", e.target.value);
              setObj({ description: e.target.value });
              setStatus(true);
            }}
          />
        </div>
        <div className="mb-3 formElem fourt-content">
          <label>Due date</label>
          <br />
          <DueDate
            value={task.date}
            func={(e) => updateField("date", e.target.value)}
          />
        </div>
        <Button
          label={"Save"}
          func={() => updateTask(task, updateElem, reset)}
          buttonClass={"btn btn-primary"}
        />
      </form>
    </>
  );
}
