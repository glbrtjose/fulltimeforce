import { combineReducers } from "redux";

// Reducers
const initialState = {
  counter: +localStorage.getItem("counter") || 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      const sum = state.counter + 1;
      localStorage.setItem("counter", sum);
      return { ...state, counter: sum };
    case "DECREMENT":
      const diff = state.counter - 1;
      localStorage.setItem("counter", diff);
      return { ...state, counter: diff };
    default:
      return state;
  }
};

// Combine Reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  // Add other reducers here if you have more
});

export default rootReducer;
