import React, { useState } from "react";

function ListGroup(props) {
  const [selecteIndex, setSelectedIndex] = useState(-1);
  let elements = props.value;
  return (
    <>
      <h1>To do</h1>
      {elements.length === 0 && <p>No item found</p>}

      {elements.length > 0 && (
        <ul className="list-group">
          {elements.map((elem, index) => (
            <>
              <li
                className={
                  selecteIndex === index
                    ? "list-group-item active"
                    : "list-group-item"
                }
                key={elem._id}
                onClick={() => {
                  setSelectedIndex(index);
                }}
              >
                <input className="form-check-input me-1" type="checkbox" />
                <label>{elem.name}</label>
              </li>
              {selecteIndex === index && (
                <ul>
                  <li>description: {elem.description}</li>
                  <li>do until: {elem.finish_date}</li>
                </ul>
              )}
            </>
          ))}
        </ul>
      )}
    </>
  );
}
export default ListGroup;
