import React, { useState } from "react";
import { ToDoItem } from "./ToDoItem";
export default function ToDoList({
  elements,
  //toggleElem,
  deleteElem,
  setname,
  setID,
  setdescr,
  setdate,
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
            key={elem._id}
            selecteIndex={selecteIndex}
            setSelectedIndex={setSelectedIndex}
            //toggleElem={toggleElem}
            deleteElem={deleteElem}
            setname={setname}
            setID={setID}
            setdescr={setdescr}
            setdate={setdate}
          />
        );
      })}
    </ul>
  );
}
