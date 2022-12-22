import React, { useState } from "react";
import { useLandingContext } from "../../utils/context/LandingContext";
import { CHANGE_LOGIN_CARD } from "../../utils/actions";
import { LOGIN } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth"
import Control from "./Components/Control";
import Button from "../Button/Button";
import CardContainer from "../Card/Components/CardContainer";
import CardHeader from "../Card/Components/CardHeader";
import CardContent from "../Card/Components/CardContent";
import FormInput from "./Components/FormInput";
import ErrorModal from "../Modals/ErrorModal";
import Loader from "../Loader/Loader";

function LoginForm({ props }) {
  const [landingState, dispatch] = useLandingContext();
  const [loginUser, { error, loading }] = useMutation(LOGIN);
  let [hidden, setHidden] = useState("is-hidden");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  if (error) {
    return <ErrorModal message={error.message} activate={true} />;
  }

  if (loading) {
    return <Loader />
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const submission = {
      email,
      password,
    };

    try {
      const { data } = await loginUser({
        variables: { ...submission },
      });
      Auth.login(data.login.token);
      const savedUser = {
        username: data.login.user.username,
        id: data.login.user._id
      }
      localStorage.setItem("user", JSON.stringify(savedUser))
      window.location.assign('/home')
    } catch (err) {
      setHidden("is-visible");
      throw new Error(err);
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
        <p className="card-header-title">Login my dude!</p>
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
