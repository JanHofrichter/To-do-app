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
  const updateTask = () => {
    fetch("/api/Updatedata", {
      method: "PUT",
      body: JSON.stringify({
        _id: task.ID,
        name: task.name,
        description: task.description,
        priority: selected,
        date: task.date,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        updateElem(task, selected);
        reset();
        console.log("INFO - task updated");
      } else {
        console.log("ERROR - task failed to update");
      }
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="name"
            value={task.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>
        <div>
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
          <input
            type="date"
            name="date_until"
            value={task.date}
            onChange={(e) => updateField("date", e.target.value)}
            min="2023-07-01"
          />
        </div>
        <div className="input-group-append">
          <button onClick={updateTask} className="btn btn-primary">
            Save changes
          </button>
        </div>
      </form>
    </>
  );
}
