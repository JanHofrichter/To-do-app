import React, { useState, useEffect } from "react";
import FormGroup from "./components/FormGroup";
import ToDoList from "./components/ToDoList";
import AddTask from "./components/AddTask";

export default function App() {
  const [elements, setElements] = useState([]);

  const [ID, setID] = useState(null);
  const [name, setname] = useState(null);
  const [descr, setdescr] = useState("");
  const [date, setdate] = useState("");

  const [seed, setSeed] = useState(1);
  const reset = () => {
    setSeed(Math.random());
  };

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

  function addElements(name, description, date, priority, id) {
    setElements((currentElements) => {
      return [
        ...currentElements,
        {
          _id: id,
          name: name,
          description: description,
          finish_date: date,
          priority: priority,
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
      currentElements.map((elem) => {
        if (elem._id === id) {
          elem.name = name;
          elem.description = description;
          elem.finish_date = date;
        }
        return null;
      });
      return currentElements;
    });
  }
  return (
    <>
      <div className="container">
        <div className="fourth"></div>
        <div className="half">
          <h1>To-Do-App</h1>
          <AddTask addElements={addElements} />
          <ToDoList
            key={seed}
            elements={elements}
            //toggleElem={toggleElem}
            deleteElem={deleteElem}
            setname={setname}
            setdescr={setdescr}
            setdate={setdate}
            setID={setID}
          />
        </div>
        <div className="fourth">
          {name != null && (
            <FormGroup
              updateElem={updateElem}
              setname={setname}
              name={name}
              setdescr={setdescr}
              descr={descr}
              setdate={setdate}
              date={date}
              ID={ID}
              reset={reset}
            />
          )}
        </div>
      </div>
    </>
  );
}
