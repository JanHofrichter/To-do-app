import Button from "../components/Button";
import { deleteTask } from "../api";
import { updateTaskField } from "../api";

export function ToDoItem({
  _id,
  index,
  completed,
  name,
  description,
  date,
  priority,
  setSelectedIndex,
  selecteIndex,
  handleChange,
  setElements,
  reset,
}) {
  function deleteElem(id) {
    setElements((currentElements) => {
      return currentElements.filter((elem) => elem._id !== id);
    });
  }

  function updateChecked(ID, completed) {
    setElements((currentElements) => {
      currentElements.map((elem) => {
        if (elem._id === ID) {
          elem.completed = completed;
        }
        return null;
      });
      return currentElements;
    });
    reset();
  }

  return (
    <>
      <div className="inline-elements">
        <div
          className={
            priority === "High"
              ? "color-div-red"
              : priority === "Mid"
              ? "color-div-orange"
              : priority === "Low"
              ? "color-div-yellow"
              : "color-div-grey"
          }
        ></div>
        <div
          className={
            selecteIndex === index
              ? "list-group-item list-group-item-primary clickable-button full-width"
              : "list-group-item clickable-button full-width"
          }
          onClick={() => {
            setSelectedIndex(index);
            handleChange({
              ID: _id,
              name: name,
              description: description,
              date: date,
              priority: priority,
              completed: completed,
            });
          }}
        >
          <input
            className="form-check-input me-1 left"
            defaultChecked={completed}
            onChange={(e) =>
              updateTaskField(_id, e.target.checked, updateChecked)
            }
            type="checkbox"
          />
          <label className={completed === true ? "crossed left" : "left"}>
            {name}
          </label>
          <Button
            label={"Delete"}
            func={() => deleteTask(_id, deleteElem)}
            buttonClass={"delete-button"}
          />
        </div>
      </div>
    </>
  );
}
