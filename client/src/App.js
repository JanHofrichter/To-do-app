import React, { useState, useEffect } from "react";
import ListGroup from "./components/ListGroup";
import { Counter } from "./components/Counter";

const App = () => {
  // all elemetns
  const [elements, setElements] = useState([]);

  // element properties
  const [newName, setNewName] = useState("");
  const [newDescr, setNewDescr] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    fetch("/api")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setElements(data);
      });
  }, []);

  const addUser = () => {
    fetch("/api/AddData", {
      method: "POST",
    });
  };

  const deleteUser = () => {
    fetch("/api/DeleteData", {
      method: "DELETE",
    });
  };
  const changeDates = () => {
    fetch("/api/Updatedata", {
      method: "PUT",
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setElements((currentElements) => {
      return [
        ...currentElements,
        {
          _id: crypto.randomUUID(),
          name: newName,
          description: newDescr,
          finish_date: newDate,
          created_date: Date(),
        },
      ]
    });
  }
  console.log(elements);
  return (
    <>
      <div>
        <button onClick={deleteUser}>Delete user</button>
        <button onClick={changeDates}>Change Dates</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Task name:</label>
          <br />
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <br />
          <input
            type="text"
            value={newDescr}
            onChange={(e) => setNewDescr(e.target.value)}
          />
        </div>
        <div>
          <label>Finish until:</label>
          <br />
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            min="2023-07-01"
          />
        </div>
        <br />
        <button onClick={addUser}>Create Task</button>
      </form>
      <ListGroup value={elements} />
      {/* <Counter /> */}
    </>
  );
};

export default App;
