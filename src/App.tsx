import React from "react";
import { List } from "./components/List/List";
import { Provider } from "react-redux";
// @ts-ignore
import store from "./store/store";
import { AuthService } from "./services/auth.service";

const App = () => {
  const _AuthService = AuthService.getInstance();
  return (
    <Provider store={store}>
      <button
        onClick={async () => {
          const { url }: any = await _AuthService.authenticate();
          console.log("url: ", url);
          window.location.href = url;
        }}
      >
        auth
      </button>
      <div className="App">
        <List />
      </div>
    </Provider>
  );
};

export default App;
