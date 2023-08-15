import React, { useEffect, useState } from "react"

const App = () => {
  const [users, setUsers] = useState([])

  useEffect (() => {
    fetch("/api")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data)
      })
  })

  const addUser = () => {
    fetch("/api/AddData", {
      method: 'POST'
    });
  }

  const deleteUser = () => {
    fetch("/api/DeleteData", {
      method: 'DELETE'
    });
  }
  const changeDates = () => {
    fetch("/api/Updatedata", {
      method: 'PUT'
    });
  }

  return (
    <div>
      <button onClick={addUser}>Add user</button>
      <button onClick={deleteUser}>Delete user</button>
      <button onClick={changeDates}>Change Dates</button>

      {users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}, {user.until_date}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;