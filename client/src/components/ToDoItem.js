export function ToDoItem({
  _id,
  index,
  completed,
  name,
  description,
  finish_date,
  //toggleElem,
  setSelectedIndex,
  selecteIndex,
  setNewName,
  setNewID,
  deleteElem,
  setNewDescr,
  setNewDate,
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
      <button
        className={
          selecteIndex === index
            ? "list-group-item list-group-item-primary"
            : "list-group-item"
        }
        onClick={() => {
          setSelectedIndex(index);
          setNewID(_id);
          setNewName(name);
          setNewDescr(description);
          setNewDate(finish_date);
        }}
      >
        <input
          className="form-check-input me-1 left"
          checked={completed}
          //onChange={(e) => toggleElem(_id, e.target.checked)}
          type="checkbox"
        />
        <label className="left">{name}</label>
        <button
          onClick={() => {
            deleteTask(_id);
          }}
        >
          Delete user
        </button>
      </button>
    </>
  );
}
