import React, { useState } from "react";
import { useLandingContext } from "../../utils/context/LandingContext";
import { CHANGE_LOGIN_CARD } from "../../utils/actions";
import Control from "./Components/Control";
import Button from "../Button/Button";
import CardContainer from "../Card/CardContainer";
import CardHeader from "../Card/CardHeader";
import CardContent from "../Card/CardContent";
import PComponent from "../Typography/PComponent";
import FormInput from "./Components/FormInput";

function LoginForm({ props }) {
  const [landingState, dispatch] = useLandingContext();
  let [hidden, setHidden] = useState("is-hidden");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submission = {
      email,
      password,
    };

    try {
      console.log(`handle submit function called`, submission);
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
    <CardContainer attr={"has-background-grey-light"}>
      <CardHeader attr={"p-1"}>
        <PComponent attr={"card-header-title"}>Login my dude!</PComponent>
      </CardHeader>
      <CardContent>
        <form>
          <FormInput
            label={"E-mail"}
            name={"email"}
            type={"email"}
            placeholder={"E-mail"}
            required={true}
            action={handleChange}
          />
          <FormInput
            label={"Password"}
            name={"password"}
            type={"password"}
            placeholder={"Password"}
            required={true}
            action={handleChange}
          />
          <div className="has-text-centered">
            <p className={`has-text-danger is-size-7 ${hidden}`}>
              Incorrect password
            </p>
          </div>

          <div className="field pt-3 is-grouped is-grouped-centered">
            <Control>
              <Button attr={"is-info mr-2 is-normal is-responsive"} action={handleSubmit}>
                Submit
              </Button>
              <Button
                attr={"ml-2 is-normal is-responsive"}
                action={() => {
                  dispatch({
                    type: CHANGE_LOGIN_CARD,
                    payload: "sign up",
                  });
                }}
              >
                Sign up
              </Button>
            </Control>
          </div>
        </form>
      </CardContent>
    </CardContainer>
  );
}

export default LoginForm;
