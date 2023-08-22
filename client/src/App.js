import React, { useState, useEffect } from "react";
import FormGroup from "./components/FormGroup";
import ToDoList from "./components/ToDoList";
import AddTask from "./components/AddTask";

export default function App() {
  const [elements, setElements] = useState([]);

  const [newID, setNewID] = useState(null);
  const [newName, setNewName] = useState(null);
  const [newDescr, setNewDescr] = useState("");
  const [newDate, setNewDate] = useState("");

  // const handleTaskClick = (data) => {
  //   setNewName(data);
  // };

  useEffect(() => {
    fetch("/api/ListTasks")
      .then((response) => {
        console.log(response.status);
        return response.json();
      })
      .then((data) => {
        setElements(data);
      });
  }, []);

  function addElements(name, description, date, id) {
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

  // function toggleElem(id, completed) {
  //   setElements((currentElements) => {
  //     return currentElements.map((elem) => {
  //       if (elem._id === id) {
  //         return { ...elem, completed };
  //       }
  //       return elem;
  //     });
  //   });
  // }

  function deleteElem(id) {
    setElements((currentElements) => {
      return currentElements.filter((elem) => elem._id !== id);
    });
  }

  function updateElem(id, name, description, date) {
    setElements((currentElements) => {
      currentElements.map(elem => {
        if (elem._id === id){
          elem.name = name;
          elem.description = description;
          elem.finish_date = date
        }
        return null
      })
      return currentElements
    });
  }

  return (
    <>
      <div className="container">
        <div className="fourth"></div>
        <div className="half">
          {/* <FormGroup addElements={addElements} /> */}
          {/* <button onClick={deleteUser(1)}></button> */}
          <h1>To-Do-App</h1>
          <AddTask addElements={addElements} />
          <ToDoList
            elements={elements}
            //toggleElem={toggleElem}
            deleteElem={deleteElem}
            setNewName={setNewName}
            setNewDescr={setNewDescr}
            setNewDate={setNewDate}
            setNewID={setNewID}
          />
        </div>
        <div className="fourth">
          {newName != null && (
            <FormGroup
            updateElem={updateElem}
            setNewName={setNewName}
            newName={newName}
            setNewDescr={setNewDescr}
            newDescr={newDescr}
            setNewDate={setNewDate}
            newDate={newDate}
            newID={newID}

            />
          )}
        </div>
      </div>
    </>
  );
}
