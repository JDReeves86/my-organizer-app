import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useLandingContext } from "../../utils/context/LandingContext";
import { CHANGE_LOGIN_CARD } from "../../utils/actions";
import { CREATE_USER, LOGIN } from "../../utils/mutations";
import Control from "./Components/Control";
import Button from "../Button/Button";
import CardContainer from "../Card/Components/CardContainer";
import CardHeader from "../Card/Components/CardHeader";
import CardContent from "../Card/Components/CardContent";
import FormInput from "./Components/FormInput";
import ErrorModal from "../Modals/ErrorModal";
import { parseError } from "../../utils/helpers";
import Auth from "../../utils/auth";

function SignupForm() {
  let [landingState, dispatch] = useLandingContext();
  let [hidden, setHidden] = useState("is-hidden");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [password2, setPassword2] = useState("");
  let [username, setUsername] = useState("");
  const [createUser] = useMutation(CREATE_USER);
  const [loginMyUser, { error }] = useMutation(LOGIN);
  if (error) {
    const errorMessage = parseError(error.message)
    return (<ErrorModal message={errorMessage} activate={true}/>)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== password2) {
      setHidden("is-visible");
      return;
    }

    try {
      const newUser = await createUser({
        variables: { email, password, username },
      });
      const { data } = await loginMyUser({
        variables: { email, password }
      })
      Auth.login(data.login.token)
      const savedUser = {
        username: data.login.user.username,
        id: data.login.user._id
      }
      localStorage.setItem("user", JSON.stringify(savedUser))
      window.location.replace("/home")
    } catch (error) {
      const errorMessage = parseError(error.message)
      return <ErrorModal message={errorMessage} activate={true}/>
    }

    setEmail("");
    setPassword("");
    setPassword2("");
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
      case "password2":
        setPassword2(inputValue);
        break;
      default:
        return;
    }
  };
  return (
    <CardContainer attr={"has-background-grey-light"}>
      <CardHeader attr={"p-1"}>
        <p className="card-header-title">Create an account</p>
      </CardHeader>
      <CardContent>
        <form>
          <FormInput
            label={"Email"}
            name={"email"}
            type={"email"}
            placeholder={"E-mail"}
            required={true}
            action={handleChange}
          />
          <FormInput
            label={"Username"}
            name={"username"}
            type={"username"}
            placeholder={"Username"}
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
          <FormInput
            label={"Re-type your password"}
            name={"password2"}
            type={"password"}
            placeholder={"Re-type your password"}
            required={true}
            action={handleChange}
          />
          <div className="has-text-centered">
            <p
              className={`has-text-danger is-size-6 has-text-weight-semibold ${hidden}`}
            >
              Passwords do not match!
            </p>
          </div>

          <div className="field pt-3 is-grouped is-grouped-centered">
            <Control>
              <Button
                attr={"is-info mr-2 is-normal is-responsive"}
                action={handleSubmit}
              >
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
