import Button from "../components/Button";
import { deleteTask } from "../api";

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
}) {
  // function toggleElem(id, name, description, date) {
  //   setElements((currentElements) => {
  //     return currentElements.map((elem) => {
  //       if (elem._id === id) {
  //         deleteElem(id);
  //         setTickedElements((currentElements) => {
  //           return [
  //             ...currentElements,
  //             {
  //               _id: id,
  //               name: name,
  //               description: description,
  //               finish_date: date,
  //             },
  //           ];
  //         });
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
        }}
      >
        <input
          className="form-check-input me-1 left"
          checked={completed}
          // onChange={(e) => toggleElem(_id, name, description, date)}
          type="checkbox"
        />
        <label className="left">{name}</label>
        <Button
          label={"Delete"}
          func={() => deleteTask(_id, deleteElem)}
          buttonClass={"delete-button"}
        />
      </div>
    </>
  );
}
