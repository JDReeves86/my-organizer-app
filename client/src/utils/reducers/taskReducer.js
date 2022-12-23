import { useReducer } from "react";
import { CHANGE_TASK } from "../actions";

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case CHANGE_TASK:
      state = payload;
      return state;
    default:
      return state;
  }
};

export function useTaskReducer(initialState) {
  return useReducer(reducer, initialState);
}