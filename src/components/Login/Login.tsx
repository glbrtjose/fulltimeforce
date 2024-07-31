import React from "react";
import { useForm } from "react-hook-form";
import "./Login.scss";
import { AuthService } from "../../services/auth.service";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const _AuthService = AuthService.getInstance();
  Axios.defaults.withCredentials = true;
  const _useNavigate = useNavigate();
  const onSubmit = async ({ username, password }: any) => {
    const { status } = await _AuthService.authenticate(username, password);
    if (status) _useNavigate("/posts");
  };
  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Login</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="input-container">
              <input
                placeholder="Username"
                {...register("username", {
                  required: true,
                })}
                type="text"
              />
            </div>
            <div className="input-container">
              <input
                placeholder="Password"
                {...register("password", {
                  required: true,
                })}
                type="password"
              />
            </div>
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
