import React, { useState } from "react";
import Control from "./Components/Control";
import Button from "../Button/Button";

function LoginForm() {
  let [hidden, setHidden] = useState("is-hidden");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const handleSubmit = async () => {
    const submission = {
      email,
      password,
    };

    try {
      console.log(`handle submit function called: ${submission}`)
    } catch (err) {
      setHidden("is-visible"); // Need to move this once password validation error is returned & exchange for more generaic login failure option
      throw new Error("Something went wrong!");
    }

    setEmail("");
    setPassword("");
  };

  const handleChange = (event) => {
    const { target } = event;
    const inputType = target.name;
    const inputValue = target.value;

    switch (inputType) {
      case "email":
        setEmail(inputValue);
        break;
      case "password":
        setPassword(inputValue);
        break;
      default:
        return;
    }
  };
  return (
    <form>
      <div className="field">
        <label className="label" htmlFor="email">
          Email
        </label>
        <div className="control">
          <input
            className="input"
            name="email"
            type="email"
            placeholder="email"
            required
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="password">
          Password
        </label>
        <div className="control">
          <input
            className="input"
            name="password"
            type="password"
            placeholder="password"
            required
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="has-text-centered">
        <p className={`has-text-danger is-size-7 ${hidden}`}>
          Incorrect password
        </p>
      </div>

      <div className="field">
        <Control>
            <Button attr={"is-info"} action={handleSubmit}>Submit</Button>
        </Control>
      </div>
    </form>
  );
}

export default LoginForm;
