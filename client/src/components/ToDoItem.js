export function ToDoItem({
  _id,
  index,
  completed,
  name,
  description,
  finish_date,
  toggleElem,
  deleteTask,
  setSelectedIndex,
  selecteIndex,
}) {

  return (
    <>
      <li
        className={
          selecteIndex === index ? "list-group-item list-group-item-primary" : "list-group-item"
        }
        onClick={() => {
          setSelectedIndex(index);
        }}
      >
        <input
          className="form-check-input me-1"
          checked={completed}
          onChange={(e) => toggleElem(_id, e.target.checked)}
          type="checkbox"
        />
        <label>{name}</label>
        <button
          onClick={() => {
            deleteTask(_id);
          }}
        >
          Delete user
        </button>
      </li>
      {selecteIndex === index && (
        <ul>
          <li>ID: {_id}</li>
          <li>description: {description}</li>
          <li>do until: {finish_date}</li>
        </ul>
      )}
    </>
  );
}
