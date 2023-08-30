import React, { useState } from "react";
import DueDate from "./DueDate";

export default function DateButton({ func, date }) {
  const [showReminderOptions, setShowReminderOptions] = useState(false);
  const [showDateOptions, setShowDateOptions] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const addReminder = (offset) => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + offset);
    // Your reminder logic here
    console.log(`Adding a reminder for ${newDate}`);
  };
  console.log(date);
  return (
    <>
      <div>
        {showReminderOptions ? (
          showDateOptions ? (
            <DueDate value={date} func={(e) => func("date", e.target.value)} />
          ) : (
            <div>
              <button onClick={() => addReminder(0)}>Today</button>
              <button onClick={() => addReminder(1)}>Tomorrow</button>
              <button onClick={() => addReminder(7)}>Next week</button>
              <button onClick={() => setShowDateOptions(!showDateOptions)}>
                Pick date and time
              </button>
            </div>
          )
        ) : (
          <button onClick={() => setShowReminderOptions(!showReminderOptions)}>
            Reminder
          </button>
        )}
      </div>
    </>
  );
}
