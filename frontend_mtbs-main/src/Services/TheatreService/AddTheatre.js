import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { sessionCheck } from "./TheatreService";
import { toast } from "react-toastify";
import withAuthorization from "../../Components/withAuthorization";

function AddTheatre() {
  let navigate = useNavigate();

  const [theatre, setTheatre] = useState({
    theatreName: "",
    theatreLocation: "",
    seatsCapacity: "",
  });

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    theatreRequest();
  });

  const theatreRequest = async () => {
    sessionCheck();
  };
  const onSubmit = async (data) => {
    theatreRequest();
    await axios
      .post("http://localhost:8080/api/mtbs/theatres/", data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
        },
      })
      .then((result) => {
        toast.success("Theatre Added Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        // alert("Theatre added successfully");
        navigate("/theatres");
        return false;
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.message);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Theatre</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="Theatre Name" className="form-label">
                Theatre Name
              </label>
              <input
                type={"text"}
                className={`form-control ${errors.theatreName && "invalid"}`}
                placeholder="Enter theatre name here"
                onChange={(e) =>
                  setTheatre({ ...theatre, theatreName: e.target.value })
                }
                {...register("theatreName", {
                  required: true,
                  maxLength: 30,
                  pattern: /^[a-zA-Z0-9_ ]*$/,
                })}
                onKeyUp={() => trigger("theatreName")}
              />
              {errors.theatreName && errors.theatreName.type === "required" && (
                <p className="text-danger">{"Theatre Name is required"}</p>
              )}
              {errors.theatreName &&
                errors.theatreName.type === "maxLength" && (
                  <p className="text-danger">
                    {"Theatre Name should not exceed 30 characters"}
                  </p>
                )}
              {errors.theatreName && errors.theatreName.type === "pattern" && (
                <p className="text-danger">{"Theatre Name is not valid"}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Theatre Location" className="form-label">
                Theatre Location
              </label>
              <input
                type={"text"}
                className={`form-control ${
                  errors.theatreLocation && "invalid"
                }`}
                placeholder="Enter theatre name here"
                onChange={(e) =>
                  setTheatre({ ...theatre, theatreLocation: e.target.value })
                }
                {...register("theatreLocation", {
                  required: true,
                  maxLength: 30,
                  pattern: /^[a-zA-Z0-9_ ]*$/,
                })}
                onKeyUp={() => trigger("theatreLocation")}
              />
              {errors.theatreLocation &&
                errors.theatreLocation.type === "required" && (
                  <p className="text-danger">
                    {"Theatre Location is required"}
                  </p>
                )}
              {errors.theatreLocation &&
                errors.theatreLocation.type === "maxLength" && (
                  <p className="text-danger">
                    {"Theatre Location should not exceed 30 characters"}
                  </p>
                )}
              {errors.theatreLocation &&
                errors.theatreLocation.type === "pattern" && (
                  <p className="text-danger">
                    {"Theatre Location is not valid"}
                  </p>
                )}
            </div>

            <div className="mb-3">
              <label htmlFor="Seats Capacity" className="form-label">
                Seats Capacity
              </label>
              <input
                type={"number"}
                className={`form-control ${errors.seatsCapacity && "invalid"}`}
                placeholder="Enter seats capacity here"
                onChange={(e) =>
                  setTheatre({ ...theatre, seatsCapacity: e.target.value })
                }
                {...register("seatsCapacity", {
                  required: true,
                  min: 1,
                  max: 200,
                  valueAsNumber: true,
                })}
                onKeyUp={() => trigger("seatsCapacity")}
              />
              {errors.seatsCapacity &&
                errors.seatsCapacity.type === "required" && (
                  <p className="text-danger">{"Seats Capacity is required"}</p>
                )}
              {errors.seatsCapacity && errors.seatsCapacity.type === "min" && (
                <p className="text-danger">
                  {"Seats Capacity should be greater than or equal to 1"}
                </p>
              )}
              {errors.seatsCapacity && errors.seatsCapacity.type === "max" && (
                <p className="text-danger">
                  {"Seats Capacity should be less than or equal to 200"}
                </p>
              )}
              {errors.seatsCapacity &&
                errors.seatsCapacity.type === "valueAsNumber" && (
                  <p className="text-danger">{"Seats Capacity is not valid"}</p>
                )}
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/theatres">
              Cancel
            </Link>
          </form>
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default withAuthorization(["ROLE_ADMIN"])(AddTheatre);
