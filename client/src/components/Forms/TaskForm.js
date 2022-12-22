import React, { useState } from "react";
import FormInput from "./Components/FormInput";
import FormSelect from "./Components/FormSelect";
import Column from "../Columns/Column";

function TaskForm() {
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState({});

  const handleChange = (ev) => {
    const { target } = ev;
    const inputType = target.name;
    const inputValue = target.value;

    switch (inputType) {
      case "title":
        setTaskTitle(inputValue);
        break;
      case "month":
        setDueDate((params) => ({...params, month: inputValue }));
        break;
      case "day":
        setDueDate((params) => ({...params, day: inputValue }));
        break;
      case "year":
        setDueDate((params) => ({...params, year: inputValue }));
        break;
      default:
        return;
    }
  };
  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const yearOptions = [2023, 2024, 2025];
  return (
    <>
      <Column columns={true}>
        <Column attr={"is-half is-offset-one-quarter"}>
          <div className="section">
            <h1 className="title is-size-2">Tasks</h1>
            <h1 className="subtitle iss-size-5">
              Enter a task below and a due date.
            </h1>
          </div>
          <form>
            <div className="field">
              <FormInput
                label={"Task"}
                name={"title"}
                type={"text"}
                placeholder={"Enter task here"}
                required={true}
                action={handleChange}
              />
              <FormSelect
                label={"Month"}
                name={"month"}
                required={true}
                options={monthOptions}
                action={handleChange}
              />
              <FormSelect
                label={"Day"}
                name={"day"}
                required={true}
                options={dayOptions}
                action={handleChange}
              />
              <FormSelect
                label={"Year"}
                name={"year"}
                required={true}
                options={yearOptions}
                action={handleChange}
              />
            </div>
          </form>
        </Column>
      </Column>
    </>
  );
}

export default TaskForm;
