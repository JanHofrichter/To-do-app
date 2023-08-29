import React, { useState } from "react";
import { ToDoItem } from "./ToDoItem";
export default function ToDoList({
  elements,
  handleChange,
  setElements,
  reset,
  updateElemField,
}) {
  const [selecteIndex, setSelectedIndex] = useState(-1);

  return (
    <ul className="list-group">
      {elements.length === 0 && <p>No item found</p>}
      {elements.map((elem, index) => {
        return (
          <ToDoItem
            {...elem}
            index={index}
            key={index}
            selecteIndex={selecteIndex}
            setSelectedIndex={setSelectedIndex}
            handleChange={handleChange}
            setElements={setElements}
            reset={reset}
            updateElemField={updateElemField}
          />
        );
      })}
    </ul>
  );
}
