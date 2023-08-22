export default function FormGroup({
  updateElem,
  newName,
  setNewName,
  setNewDescr,
  newDescr,
  setNewDate,
  newDate,
  newID,
  reset,
}) {
  const updateTask = () => {
    fetch("/api/Updatedata", {
      method: "PUT",
      body: JSON.stringify({
        _id: newID,
        name: newName,
        description: newDescr,
        finish_date: newDate,
      }),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        updateElem(newID, newName, newDescr, newDate);
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
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
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
            value={newDescr}
            onChange={(e) => setNewDescr(e.target.value)}
          />
        </div>
        <div>
          <label>Due date</label>
          <br />
          <input
            type="date"
            name="date_until"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
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
