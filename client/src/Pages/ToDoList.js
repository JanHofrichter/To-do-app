import { ToDoItem } from "./ToDoItem";
export default function ToDoList({
  elements,
  handleChange,
  updateElemField,
  chosenIndex,
  setChosenIndex,
}) {
  return (
    <ul className="list-group">
      {elements.length === 0 && <p>No item found</p>}
      {elements.map((elem, index) => {
        return (
          <ToDoItem
            elem={elem}
            key={index}
            handleChange={handleChange}
            updateElemField={updateElemField}
            chosenIndex={chosenIndex}
            setChosenIndex={setChosenIndex}
          />
        );
      })}
    </ul>
  );
}
