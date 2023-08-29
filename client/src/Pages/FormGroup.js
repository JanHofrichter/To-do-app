import React, { useRef, useState } from "react";
import DueDate from "../components/DueDate";
import Input from "../components/Input";
import { updateTaskField } from "../api";
import useOutsideClick from "../Hooks/useOutsideClick";

// export { buttonComp };
export default function FormGroup({
  task,
  updateField,
  reset,
  updateElemField,
}) {
  const [status1, setStatus1] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [status3, setStatus3] = useState(false);
  const [status4, setStatus4] = useState(false);

  const [obj, setObj] = useState({});

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const options = [
    { value: "", text: "---" },
    { value: "Low", text: "Low" },
    { value: "Mid", text: "Mid" },
    { value: "High", text: "High" },
  ];

  function handleSubmit(e) {
    e.preventDefault();
  }

  var result1 = useOutsideClick(ref1);
  var result2 = useOutsideClick(ref2);
  var result3 = useOutsideClick(ref3);
  var result4 = useOutsideClick(ref4);

  if (
    (status1 === true && result1 === false) ||
    (status2 === true && result2 === false) ||
    (status3 === true && result3 === false) ||
    (status4 === true && result4 === false)
  ) {
    updateTaskField(
      task.ID,
      Object.keys(obj)[0],
      Object.values(obj)[0],
      updateElemField,
      reset
    );
    setStatus1(false);
    setStatus2(false);
    setStatus3(false);
    setStatus4(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 formElem fourt-content">
          <label className="form-label">Name</label>
          <br />
          <div ref={ref1}>
            <Input
              value={task.name}
              func={(e) => {
                updateField("name", e.target.value);
                setObj({ name: e.target.value });
                setStatus1(true);
              }}
            />
          </div>
        </div>
        <div className="mb-3 formElem fourt-content">
          <label className="form-label">Priority</label>
          <br />
          <div ref={ref2}>
            <select
              value={task.priority}
              onChange={(e) => {
                updateField("priority", e.target.value);
                setObj({ priority: e.target.value });
                setStatus2(true);
              }}
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-3 formElem fourt-content">
          <label className="form-label">Description</label>
          <br />
          <div ref={ref3}>
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
                setStatus3(true);
              }}
            />
          </div>
        </div>
        <div className="mb-3 formElem fourt-content">
          <label>Due date</label>
          <br />
          <div ref={ref4}>
            <DueDate
              value={task.date}
              func={(e) => {
                updateField("date", e.target.value);
                setObj({ date: e.target.value });
                setStatus4(true);
              }}
            />
          </div>
        </div>
      </form>
    </>
  );
}
