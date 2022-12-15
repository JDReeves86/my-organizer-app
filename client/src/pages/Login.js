import React from "react";
import LoginForm from "../components/Forms/LoginForm";
import Column from "../components/Columns/Column";

function Login() {
  return (
    <>
      <Column columns={true} attr={"is-centered"}>
        <Column attr={"is-one-quarter"}>
          <LoginForm />
        </Column>
      </Column>
    </>
  );
}

export default Login;
