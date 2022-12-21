import "./App.css";
import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { LandingProvider } from "./utils/context/LandingContext";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar/Navbar";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import HComponent from "./components/Typography/HComponent";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const httpLink = createHttpLink({
  uri: "graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Hero attr={"has-background-danger-dark has-text-white"}>
          <HComponent attr={"is-size-3 has-text-centered"}>
            Not your Fathers Planner
          </HComponent>
        </Hero>
        <Navbar attr={"has-background-grey-lighter"} />
        <LandingProvider>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Dashboard />} />
          </Routes>
        </LandingProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
