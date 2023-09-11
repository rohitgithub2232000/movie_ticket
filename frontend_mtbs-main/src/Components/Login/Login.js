import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

export default function Login() {
  const [user, setUser] = useState({ userName: "", password: "" });

  let navigate = useNavigate();

  const {
    trigger,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const clrData = (e) => {
    e.target.reset();
  };
  const onSubmit = async (e) => {
    // e.preventDefault();
    console.log(e);
    await axios
      .post("http://localhost:8080/api/auth/signin", e)
      .then((response) => {
        console.log(response);

        const token = response.data.token;
        toast.success("User Login Successful", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        const decode = jwt_decode(token);
        const tokenSub = decode.sub;
        const tokenRole = decode.roles[0];

        console.log(decode);

        sessionStorage.setItem("sessionToken", token);
        sessionStorage.setItem("sessionUserName", tokenSub);
        sessionStorage.setItem("sessionRole", tokenRole);

        navigate("/home");
        return false;
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
        navigate("/");
      });
  };
  return (
    <div className="con">
      <div className="row">
        <div className="col-md-4 offset-md-4 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Login User</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                User Name
              </label>
              <input
                type={"text"}
                className={`form-control ${errors.userName && "invalid"}`}
                placeholder="User Name"
                onChange={(e) => {
                  setUser({ ...user, userName: e.target.value });
                }}
                {...register("userName", {
                  required: true,
                  maxLength: 20,
                  pattern: /^[a-zA-Z0-9_ ]*$/,
                })}
                onKeyUp={() => trigger("userName")}
              />
            </div>
            {errors.userName && errors.userName.type === "required" && (
              <p className="text-danger">{"User Name is required"}</p>
            )}
            {errors.userName && errors.userName.type === "maxLength" && (
              <p className="text-danger">
                {"User Name should not exceed 20 characters"}
              </p>
            )}
            {errors.userName && errors.userName.type === "pattern" && (
              <p className="text-danger">{"User Name is not valid"}</p>
            )}

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={"password"}
                className={`form-control ${errors.password && "invalid"}`}
                placeholder="Password"
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                {...register("password", {
                  required: true,
                })}
                onKeyUp={() => trigger("password")}
              />
            </div>

            {errors.password && (
              <p className="text-danger">Please check the Password</p>
            )}
            <div className="my-4">
              Don't have an account, Please <Link to="/register">Sign Up</Link>
            </div>
            <button type="submit" className="btn btn-outline-success my-2">
              Submit
            </button>
            <Link
              //to="/"
              className="btn btn-outline-danger mx-2"
              onClick={clrData}
            >
              Reset
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
