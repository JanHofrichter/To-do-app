import React, { useEffect, useState } from "react";

export function TaskForm() {
  return (
    <>
      <form>
        <div>
          <label htmlFor="item">Task name:</label>
          <br />
          <input type="text" name="name" />
        </div>
        <div>
          <label htmlFor="item">Description:</label>
          <br />
          <input type="text" name="description" />
        </div>
        <div>
          <label for="datemin">Finish until:</label>
          <br />
          <input type="date" id="datemin" name="datemin" min="2023-07-01" />
        </div>
      </form>
    </>
  );
}
