import React, { createContext, useContext } from "react";
import { useLandingReducer } from "../reducers/landingReducer";

const LandingContext = createContext();

const LandingProvider = ({ value = [], children, ...props }) => {
  const [landingState, dispatch] = useLandingReducer("login");

  return (
    <LandingContext.Provider value={[landingState, dispatch]} {...props}>
      {children}
    </LandingContext.Provider>
  );
};

const useLandingContext = () => useContext(LandingContext);

export { LandingProvider, useLandingContext };
