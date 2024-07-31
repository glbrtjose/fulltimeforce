import React from "react";
import { List } from "./components/List/List";
import { Provider } from "react-redux";
// @ts-ignore
import store from "./store/store";
import { AuthService } from "./services/auth.service";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Edit from "./components/Edit/Edit";

const App = () => {
  const clientId = `${process.env.REACT_APP_CLIENT_ID!}`;
  const _AuthService = AuthService.getInstance();
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/posts" element={<List />} />
            <Route path="posts/:id" element={<Edit />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
