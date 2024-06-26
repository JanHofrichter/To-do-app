export const addUser = (newTask, addElements) => {
  const date_created = new Date();
  const id = crypto.randomUUID();
  fetch("/api/AddTask", {
    method: "POST",
    body: JSON.stringify({
      _id: id,
      name: newTask.name,
      description: " ",
      date: newTask.date,
      priority: newTask.priority,
      created_date: date_created,
      completed: false,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    console.log(response.status);
    if (response.status === 200) {
      addElements(id, date_created, newTask);
      console.log("INFO - element added");
    } else {
      console.log("ERROR - element failed to add");
    }
  });
};

export const updateTaskField = (ID, field, value, func) => {
  fetch("/api/Updatedata", {
    method: "PUT",
    body: JSON.stringify({
      _id: ID,
      [field]: value,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).then((response) => {
    console.log(response.status);
    if (response.status === 200) {
      func(ID, field, value);
      console.log("INFO - task updated");
    } else {
      console.log("ERROR - task failed to update");
    }
  });
};

export function deleteTask(id, deleteElem) {
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
