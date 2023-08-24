import ButtonComp from "../components/Button/Button";
import { deleteTask } from "../api";

export function ToDoItem({
  _id,
  index,
  completed,
  name,
  description,
  date,
  priority,
  toggleElem,
  setSelectedIndex,
  selecteIndex,
  deleteElem,
  handleChange,
  setSelected,
}) {
  return (
    <>
      <div
        className={
          selecteIndex === index
            ? "list-group-item list-group-item-primary clickable-button"
            : "list-group-item clickable-button"
        }
        onClick={() => {
          setSelectedIndex(index);
          handleChange({
            ID: _id,
            name: name,
            description: description,
            date: date,
            priority: priority,
          });
          setSelected(priority);
        }}
      >
        <input
          className="form-check-input me-1 left"
          checked={completed}
          onChange={(e) => toggleElem(_id, name, description, date)}
          type="checkbox"
        />
        <label className="left">{name}</label>
        <ButtonComp
          label={"Delete"}
          func={() => deleteTask(_id, deleteElem)}
          buttonClass={"delete-button"}
        />
      </div>
    </>
  );
}
