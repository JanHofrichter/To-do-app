import React, { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  function adjustCount(amount) {
    setCount((currentCount) => {
      return currentCount + amount;
    });
  }
  return (
    <div>
      <label htmlFor="item">Priority 1-10:</label>
      <br />
      <button onClick={() => adjustCount(+1)}>+</button>
      <label>{count}</label>
      <button onClick={() => adjustCount(-1)}>-</button>
    </div>
  );
}
