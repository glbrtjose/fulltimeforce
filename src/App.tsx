import React from "react";
import { List } from "./components/List/List";
import { Provider } from "react-redux";
// @ts-ignore
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <List />
      </div>
    </Provider>
  );
};

export default App;
