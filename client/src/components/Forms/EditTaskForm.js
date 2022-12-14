import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { calculateStartYear } from "../../utils/helpers";
import FormInput from "./Components/FormInput";
import FormSelect from "./Components/FormSelect";
import Column from "../Columns/Column";
import Button from "../Button/Button";
import ErrorModal from "../Modals/ErrorModal";
import Loader from "../Loader/Loader";
import { EDIT_TASK } from "../../utils/mutations";
import { GET_MY_TASKS } from "../../utils/queries";

function EditTaskForm({ input }) {
  console.log(input)
  const taskId = input.taskData.data.getTask._id
  const [taskText, setTaskTitle] = useState(input.taskData.data.getTask.taskText);
  const [dateDue, setDueDate] = useState({
    month: "January",
    day: 1,
    year: new Date().getFullYear(),
  });
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [startYear] = useState(calculateStartYear());
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
  const dayOptions = [];
  const yearOptions = [];

  for (let i = 1; i <= daysInMonth; i++) {
    dayOptions.push(i);
  }
  for (let i = startYear; i <= startYear + 100; i++) {
    yearOptions.push(i);
  }

  const handleChange = (ev) => {
    const { target } = ev;
    const inputType = target.name;
    const inputValue = target.value;

    switch (inputType) {
      case "title":
        setTaskTitle(inputValue);
        break;
      case "month":
        setDueDate((params) => ({ ...params, month: inputValue }));
        switch (inputValue) {
          case "February":
            setDaysInMonth(28);
            break;
          case "April":
            setDaysInMonth(30);
            break;
          case "June":
            setDaysInMonth(30);
            break;
          case "September":
            setDaysInMonth(30);
            break;
          case "November":
            setDaysInMonth(30);
            break;
          default:
            setDaysInMonth(31);
            break;
        }
        break;
      case "day":
        setDueDate((params) => ({ ...params, day: Number(inputValue) }));
        break;
      case "year":
        setDueDate((params) => ({ ...params, year: Number(inputValue) }));
        break;
      default:
        return;
    }
  };

  // change mutation to edit instead of create new
  const [updateThisTask, { error, loading }] = useMutation(EDIT_TASK, {
    refetchQueries: [{ query: GET_MY_TASKS }]
  });
  if (error) {
    return <ErrorModal message={error.message} activate={true} />;
  }

  if (loading) {
    return <Loader />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const dueDate = new Date(
        `${dateDue.month} ${dateDue.day} ${dateDue.year}`
      );
      const { data } = await updateThisTask({
        variables: { input: { taskText, dueDate, active: true, _id: taskId } },
      });

      setTaskTitle("");
      setDueDate({
        month: "January",
        day: 1,
        year: new Date().getFullYear(),
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleClear = (ev) => {
    ev.preventDefault();
    setTaskTitle("");
    setDueDate({
      month: "January",
      day: 1,
      year: new Date().getFullYear(),
    });
  };

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
            <div className="field py-3">
              <FormInput
                label={"Task"}
                name={"title"}
                type={"text"}
                value={taskText}
                required={true}
                action={handleChange}
              />
            </div>
            <div className="field is-grouped py-3">
              <div className="control">
                <FormSelect
                  label={"Month"}
                  name={"month"}
                  required={true}
                  options={monthOptions}
                  action={handleChange}
                />
              </div>
              <div className="control">
                <FormSelect
                  label={"Day"}
                  name={"day"}
                  required={true}
                  options={dayOptions}
                  action={handleChange}
                />
              </div>
              <div className="control">
                <FormSelect
                  label={"Year"}
                  name={"year"}
                  required={true}
                  options={yearOptions}
                  action={handleChange}
                />
              </div>
            </div>
            <div className="field is-grouped py-3">
              <div className="control">
                <Button attr={"is-success"} action={handleSubmit}>
                  Submit
                </Button>
              </div>
              <div className="control">
                <Button attr={"is-danger"} action={handleClear}>
                  Clear
                </Button>
              </div>
            </div>
          </form>
        </Column>
      </Column>
    </>
  );
}

export default EditTaskForm;
