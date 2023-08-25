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
    completed: false,
  });
  const [resetUnchecked, setResetUnchecked] = useState(1);
  const [resetChecked, setResetChecked] = useState(2);

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
    setResetUnchecked(Math.random());
    setResetChecked(Math.random());
    while (resetChecked === resetUnchecked) {
      setResetUnchecked(Math.random());
    }
  };

  return (
    <>
      <div className="container">
        <div className="fourth"></div>
        <div className="half">
          <h1>To-Do-App</h1>
          <AddTask setElements={setElements} />
          <ToDoList
            key={resetUnchecked}
            elements={elements.filter((elem) => elem.completed === false)}
            handleChange={handleChange}
            setElements={setElements}
            reset={reset}
          />
          <h1>Completed tasks</h1>
          <ToDoList
            key={resetChecked}
            elements={elements.filter((elem) => elem.completed === true)}
            handleChange={handleChange}
            setElements={setElements}
            reset={reset}
          />
        </div>
        <div className="fourth">
          {task.description !== "" && (
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
