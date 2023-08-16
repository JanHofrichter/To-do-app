import React, { useEffect, useState } from "react";

function ListGroup() {
  const [elements, setElements] = useState([]);
  const [selecteIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    fetch("/api")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setElements(data);
      });
  });

  return (
    <>
      <h1>To do</h1>
      {elements.length === 0 && <p>No item found</p>}

      {elements.length > 0 && (
        <ul className="list-group">
          {elements.map((elem, index) => (
            <>
              <li
                className={selecteIndex === index ? "list-group-item active" : "list-group-item"}
                key={elem._id}
                onClick={() => {setSelectedIndex(index)}}
              >
                <input className="form-check-input me-1" type="checkbox" />
                <label>{elem.name}</label>
              </li>
              {selecteIndex === index && <ul><li>Date: {elem.until_date}</li></ul>}
            </>
          ))}
        </ul>
      )}
    </>
  );
}
export default ListGroup;
