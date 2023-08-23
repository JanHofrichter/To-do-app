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
        deleteElem(id);
        console.log("INFO - element deleted");
      } else {
        console.log("ERROR - element failed to delete");
      }
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
        <div>
          <button
            className="delete-button"
            onClick={() => {
              deleteTask(_id);
            }}
          >
            Delete user
          </button>
        </div>
      </div>
    </>
  );
}
