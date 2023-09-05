import { updateTaskField } from "../api";

export function ToDoItem({
  elem,
  handleChange,
  updateElemField,
  chosenIndex,
  setChosenIndex,
}) {
  return (
    <>
      <div className="inline-elements">
        <div
          className={
            elem.priority === "High"
              ? "color-div-red"
              : elem.priority === "Mid"
              ? "color-div-orange"
              : elem.priority === "Low"
              ? "color-div-yellow"
              : "color-div-grey"
          }
        ></div>
        <div
          className={
            chosenIndex === elem._id
              ? "list-group-item clickable-button full-width clicked"
              : "list-group-item clickable-button full-width"
          }
          onClick={() => {
            handleChange({
              ID: elem._id,
              name: elem.name,
              description: elem.description,
              date: elem.date,
              priority: elem.priority,
              completed: elem.completed,
            });
            setChosenIndex(elem._id);
          }}
        >
          <input
            className="form-check-input me-1 left"
            defaultChecked={elem.completed}
            onChange={(e) =>
              updateTaskField(
                elem._id,
                "completed",
                e.target.checked,
                updateElemField
              )
            }
            type="checkbox"
          />
          <label className={elem.completed === true ? "crossed left" : "left"}>
            {elem.name}
          </label>
        </div>
      </div>
    </>
  );
}
