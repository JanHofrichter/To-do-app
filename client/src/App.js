import React, { useState, useEffect } from "react";
import FormGroup from "./components/FormGroup";
import ToDoList from "./components/ToDoList";
import AddTask from "./components/AddTask";

export default function App() {
  const [elements, setElements] = useState([]);
  const [tickedElements, setTickedElements] = useState([]);
  const [selected, setSelected] = useState("");
  const [task, setTask] = useState({
    ID: null,
    name: null,
    description: null,
    date: null,
    priority: null,
  });

  const updateField = (fieldName, newValue) => {
    setTask((prevFields) => ({
      ...prevFields,
      [fieldName]: newValue,
    }));
  };

  const handleChange = (updatedData) => {
    setTask(updatedData);
  };

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

  function addElements(id, date_created, newTask) {
    setElements((currentElements) => {
      return [
        ...currentElements,
        {
          _id: id,
          name: newTask.name,
          description: newTask.description,
          date: newTask.date,
          priority: newTask.priority,
          created_date: date_created,
        },
      ];
    });
  }

  function toggleElem(id, name, description, date) {
    setElements((currentElements) => {
      return currentElements.map((elem) => {
        if (elem._id === id) {
          deleteElem(id);
          setTickedElements((currentElements) => {
            return [
              ...currentElements,
              {
                _id: id,
                name: name,
                description: description,
                finish_date: date,
              },
            ];
          });
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

  function updateElem(task, selected) {
    setElements((currentElements) => {
      currentElements.map((elem) => {
        if (elem._id === task.ID) {
          elem.name = task.name;
          elem.description = task.description;
          elem.date = task.date;
          elem.priority = selected;
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
            toggleElem={toggleElem}
            deleteElem={deleteElem}
            handleChange={handleChange}
            setSelected={setSelected}
          />
          {tickedElements !== [] && <h1>Tickled Tasks</h1>}
          {tickedElements.map((elem, index) => {
            return <li>elem.name</li>;
          })}
        </div>
        <div className="fourth">
          {task.name != null && (
            <FormGroup
              updateElem={updateElem}
              updateField={updateField}
              task={task}
              reset={reset}
              setSelected={setSelected}
              selected={selected}
            />
          )}
        </div>
      </div>
    </>
  );
}
