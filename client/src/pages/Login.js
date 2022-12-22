import React, { useState } from "react";
import { useLandingContext } from "../utils/context/LandingContext"
import LoginForm from "../components/Forms/LoginForm";
import SignupForm from "../components/Forms/SignupForm";
import Column from "../components/Columns/Column";
import Container from "../components/Container/Container";


function Login() {
  const [loginState] = useLandingContext();
  if (loginState === "login") {
    return (
      <Container>
        <section className="section has-text-centered py-6">
          <p className="is-size-2">Welcome to your planner!</p>
          <p className="is-5">
            <strong>Not</strong> your fathers planner.
          </p>
        </section>
        <Column columns={true} attr={"is-centered"}>
          <Column attr={"is-4-tablet"}>
            <LoginForm />
          </Column>
        </Column>
      </Container>
    );
  } else {
    return (
      <Container>
        <section className="section has-text-centered py-6">
          <p className="is-size-2">Welcome to your planner!</p>
          <p className="is-5">
            <strong>Not</strong> your fathers planner.
          </p>
        </section>
        <Column columns={true} attr={"is-centered"}>
          <Column attr={"is-4-tablet"}>
            <SignupForm />
          </Column>
        </Column>
      </Container>
    );
  }
}

export default Login;
