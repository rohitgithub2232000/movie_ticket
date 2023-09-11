import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Register() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    userName: "",
    emailId: "",
    userMobileNumber: "",
    password: "",
  });

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
      .post("http://localhost:8080/api/auth/signup", e)
      .then(() => {
        toast.success("User Added Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        alert("User Added Successfully");
        navigate("/");

        return false;
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
        navigate("/add-user");
      });
  };
  return (
    <div className="con">
      <div className="row">
        <div className="col-md-4 offset-md-4 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register User</h2>
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

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.emailId && "invalid"}`}
                placeholder="Email"
                // name="emailId"
                // value={emailId}
                onChange={(e) => setUser({ ...user, emailId: e.target.value })}
                {...register("emailId", {
                  required: true,
                  pattern:
                    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                onKeyUp={() => trigger("emailId")}
              />
            </div>
            {errors.emailId && (
              <p className="text-danger">{"Email is not valid"}</p>
            )}

            <div className="mb-3">
              <label htmlFor="userMobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="text"
                className={`form-control ${
                  errors.userMobileNumber && "invalid"
                }`}
                placeholder="Mobile Number"
                onChange={(e) => {
                  setUser({ ...user, userMobileNumber: e.target.value });
                }}
                {...register("userMobileNumber", {
                  required: true,
                  maxLength: 10,
                  pattern: /^[0-9]*$/,
                })}
                onKeyUp={() => trigger("userMobileNumber")}
              />
            </div>
            {errors.userMobileNumber &&
              errors.userMobileNumber.type === "required" && (
                <p className="text-danger">Mobile Number is required</p>
              )}
            {errors.userMobileNumber &&
              errors.userMobileNumber.type === "maxLength" && (
                <p className="text-danger">
                  Mobile Number should not exceed 10 digits
                </p>
              )}
            {errors.userMobileNumber &&
              errors.userMobileNumber.type === "pattern" && (
                <p className="text-danger">Mobile Number is not valid</p>
              )}

            {/* <div className="mb-1">
              <label className="form-label">Role</label>
              <div>
                <input
                  {...register("roleName", { required: true })}
                  className="mx-2"
                  type="radio"
                  value="TEACHER"
                />
                <label className="form-label">Teacher</label>
              </div>
              <div>
                <input
                  {...register("roleName", { required: true })}
                  className="mx-2"
                  type="radio"
                  value="STUDENT"
                />
                <label className="form-label">Student</label>
              </div>
            </div>
            {errors.roleName && (
              <p className="text-danger">{"Select a Role"}</p>
            )} */}
            <div className="my-4">
              Already have an account, Please <Link to="/">Login</Link>
            </div>
            <button type="submit" className="btn btn-outline-success">
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
