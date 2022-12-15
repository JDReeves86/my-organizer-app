import { useReducer } from "react";
import { CHANGE_LOGIN_CARD } from "../actions";

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case CHANGE_LOGIN_CARD:
      state = payload;
      return state;
    default:
      return state;
  }
};

export function useLandingReducer(initialState) {
  return useReducer(reducer, initialState);
}
