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
  setname,
  setID,
  deleteElem,
  setdescr,
  setdate,
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
          setID(_id);
          setname(name);
          setdescr(description);
          setdate(finish_date);
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
