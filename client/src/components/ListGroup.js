import React, { useState, useEffect } from "react";
import App from "../App"

export default function ListGroup() {
  const [selecteIndex, setSelectedIndex] = useState(-1);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setElements(data);
      });
  }, []);

  // function deleteUser (id) {
  //   fetch("/api/DeleteData", {
  //     method: "DELETE",
  //     body: JSON.stringify({
  //       _id: id }),
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //   });
  // };

  function addElements (name, description, date) {
    setElements((currentElements) => {
      return [
        ...currentElements,
        {
          _id: crypto.randomUUID(),
          name: name,
          description: description,
          finish_date: date,
          created_date: Date(),
        },
      ];
    });
  }

  function toggleElem(id, completed) {
    setElements((currentElements) => {
      return currentElements.map((elem) => {
        if (elem._id === id) {
          return { ...elem, completed };
        }
        return elem;
      });
    });
  }

  function deleteElem(id) {
    setElements((currentElements) => {
      return currentElements.filter((elem) => elem._id !== id);
    });
  }

  return (
    <>
      <App onsubmit={addElements}/>
      <h1>To do</h1>
      {elements.length === 0 && <p>No item found</p>}
      {elements.length > 0 && (
        <ul className="list-group">
          {elements.map((elem, index) => (
            <>
              <li
                key={elem._id}
                className={
                  selecteIndex === index
                    ? "list-group-item active"
                    : "list-group-item"
                }
                onClick={() => {
                  setSelectedIndex(index);
                }}
              >
                <input
                  className="form-check-input me-1"
                  checked={elem.completed}
                  onChange={(e) => toggleElem(elem._id, e.target.checked)}
                  type="checkbox"
                />
                <label>{elem.name}</label>
                <button onClick={() => deleteElem(elem._id)}>Delete user</button>
              </li>
              {selecteIndex === index && (
                <ul>
                  <li>description: {elem.description}</li>
                  <li>do until: {elem.finish_date}</li>
                </ul>
              )}
            </>
          ))}
        </ul>
      )}
    </>
  );
}
