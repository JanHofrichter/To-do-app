import ListGroup from "./components/ListGroup";
import { TaskForm } from "./components/TaskForm";
import { Counter } from "./components/Counter";

const App = () => {
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

  return (
    <div>
      <button onClick={addUser}>Add user</button>
      <button onClick={deleteUser}>Delete user</button>
      <button onClick={changeDates}>Change Dates</button>
      <ListGroup />
      <TaskForm />
      <Counter />

    </div>
  );
};

export default App;
