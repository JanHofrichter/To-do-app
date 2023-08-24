import React, { useState, useEffect } from "react";
import FormGroup from "./Pages/FormGroup";
import ToDoList from "./Pages/ToDoList";
import AddTask from "./Pages/AddTask";

export default function App() {
  const [elements, setElements] = useState([]);
  // const [tickedElements, setTickedElements] = useState([]);
  const [task, setTask] = useState({
    ID: "",
    name: "",
    description: "",
    date: "",
    priority: "",
  });
  const [seed, setSeed] = useState(1);

  //Update one field
  const updateField = (fieldName, newValue) => {
    setTask((prevFields) => ({
      ...prevFields,
      [fieldName]: newValue,
    }));
  };
  //Update whole object
  const handleChange = (updatedData) => {
    setTask(updatedData);
  };

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

  return (
    <>
      <div className="container">
        <div className="fourth"></div>
        <div className="half">
          <h1>To-Do-App</h1>
          <AddTask setElements={setElements} />
          <ToDoList
            key={seed}
            elements={elements}
            handleChange={handleChange}
            setElements={setElements}
          />
          {/* {tickedElements !== [] && <h1>Tickled Tasks</h1>}
          {tickedElements.map((elem, index) => {
            return <li>elem.name</li>;
          })} */}
        </div>
        <div className="fourth">
          {task.name !== "" && (
            <FormGroup
              updateField={updateField}
              task={task}
              reset={reset}
              setElements={setElements}
            />
          )}
        </div>
      </div>
    </>
  );
}
