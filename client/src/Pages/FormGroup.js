import Button from "../components/Button";
import DueDate from "../components/DueDate";
import Input from "../components/Input";
import { updateTask } from "../api";

// export { buttonComp };
export default function FormGroup({ task, updateField, reset, setElements }) {
  const options = [
    { value: "", text: "---" },
    { value: "Low", text: "Low" },
    { value: "Mid", text: "Mid" },
    { value: "High", text: "High" },
  ];

  function updateElem(task) {
    setElements((currentElements) => {
      currentElements.map((elem) => {
        if (elem._id === task.ID) {
          elem.name = task.name;
          elem.description = task.description;
          elem.date = task.date;
          elem.priority = task.priority;
        }
        return null;
      });
      return currentElements;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <br />
          <Input
            value={task.name}
            func={(e) => updateField("name", e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Priority</label>
          <br />
          <select
            value={task.priority}
            onChange={(e) => updateField("priority", e.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="form-label">Description</label>
          <br />
          <textarea
            placeholder="Add note"
            rows="2"
            className="form-control"
            type="text"
            name="description"
            value={task.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>
        <div>
          <label>Due date</label>
          <br />
          <DueDate
            value={task.date}
            func={(e) => updateField("date", e.target.value)}
          />
        </div>
        <Button
          label={"Save"}
          func={() => updateTask(task, updateElem, reset)}
          buttonClass={"btn btn-primary"}
        />
      </form>
    </>
  );
}
