import React, { useState } from "react";
import { useLandingContext } from "../../utils/context/LandingContext";
import { CHANGE_LOGIN_CARD } from "../../utils/actions";
import Control from "./Components/Control";
import Button from "../Button/Button";
import CardContainer from "../Card/CardContainer";
import CardHeader from "../Card/CardHeader";
import CardContent from "../Card/CardContent";
import PComponent from "../Typography/PComponent";

function SignupForm() {
  let [landingState, dispatch] = useLandingContext();
  let [hidden, setHidden] = useState("is-hidden");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submission = {
      email,
      password,
      username,
    };

    try {
      console.log(`handle submit function called`, submission);
    } catch (err) {
      setHidden("is-visible"); // Need to move this once password validation error is returned & exchange for more generaic login failure option
      throw new Error("Something went wrong!");
    }

    setEmail("");
    setPassword("");
    setUsername("");
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
      case "username":
        setUsername(inputValue);
        break;
      default:
        return;
    }
  };
  return (
    <CardContainer attr={"has-background-grey-light"}>
      <CardHeader attr={"p-1"}>
        <PComponent attr={"card-header-title"}>Create an account</PComponent>
      </CardHeader>
      <CardContent>
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
            <label className="label" htmlFor="username">
              Username
            </label>
            <div className="control">
              <input
                className="input"
                name="username"
                type="username"
                placeholder="username"
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
          <div className="field">
            <label className="label" htmlFor="password2">
              Re-type your password
            </label>
            <div className="control">
              <input
                className="input"
                name="password2"
                type="password2"
                placeholder="password"
                required
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="has-text-centered">
            <p className={`has-text-danger is-size-7 ${hidden}`}>
              Passwords do not match!
            </p>
          </div>

          <div className="field">
            <Control>
              <Button attr={"is-info mr-2 is-normal is-responsive"} action={handleSubmit}>
                Submit
              </Button>
              <Button
                attr={"ml-2 is-normal is-responsive"}
                action={() => {
                  dispatch({
                    type: CHANGE_LOGIN_CARD,
                    payload: "login",
                  });
                }}
              >
                Sign in
              </Button>
            </Control>
          </div>
        </form>
      </CardContent>
    </CardContainer>
  );
}

export default SignupForm;
