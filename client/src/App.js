import React, { useState, useEffect } from "react";
import FormGroup from "./components/FormGroup"
import ToDoList from "./components/ToDoList";

export default function App() {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    fetch("/api/ListTasks")
      .then((response) => {
        console.log(response.status)
        return response.json();
      })
      .then((data) => {
        setElements(data);
      });
  }, []);

  function addElements (name, description, date, id) {
    setElements((currentElements) => {
      return [
        ...currentElements,
        {
          _id: id,
          name: name,
          description: description,
          finish_date: date,
          created_date: Date(),
        },
      ];
    });
  }

  function deleteTask(id) {
    fetch("/api/DeleteTask", {
      method: "DELETE",
      body: JSON.stringify({ _id: id }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        deleteElem(id)
        console.log("INFO - element deleted");
      } else {
        console.log("ERROR - element failed to delete");
      }
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
      <FormGroup addElements={addElements}/>
      {/* <button onClick={deleteUser(1)}></button> */}
      <h1>To do</h1>
      <ToDoList elements={elements} toggleElem={toggleElem} deleteElem={deleteElem} deleteTask={deleteTask}/>
    </>
  );
}
