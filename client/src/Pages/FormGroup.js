import ButtonComp from "../components/Button/Button";
import DateComp from "../components/Date/dateComp";
import InputComp from "../components/Input/inputComp";
import { updateTask } from "../api";

// export { buttonComp };
export default function FormGroup({
  updateElem,
  task,
  updateField,
  reset,
  setSelected,
  selected,
}) {
  const options = [
    { value: "", text: "---" },
    { value: "Low", text: "Low" },
    { value: "Mid", text: "Mid" },
    { value: "High", text: "High" },
  ];

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <br />
          <InputComp
            value={task.name}
            func={(e) => updateField("name", e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Priority</label>
          <br />
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
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
          <DateComp
            value={task.date}
            func={(e) => updateField("date", e.target.value)}
          />
        </div>
        <ButtonComp
          label={"Save"}
          func={() => updateTask(task, updateElem, selected, reset)}
          buttonClass={"btn btn-primary"}
        />
      </form>
    </>
  );
}
