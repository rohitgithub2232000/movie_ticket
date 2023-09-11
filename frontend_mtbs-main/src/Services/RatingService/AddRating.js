import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { sessionCheck } from "./RatingService";
import { toast } from "react-toastify";

export default function AddRating() {
  let navigate = useNavigate();

  const [rating, setRating] = useState({
    ratingValue: "",
  });

  const { id } = useParams();
  const userName = sessionStorage.getItem("sessionUserName");

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    ratingRequest();
  });

  const ratingRequest = async () => {
    sessionCheck();
  };

  const onSubmit = async (data) => {
    ratingRequest();
    await axios
      .post(
        `http://localhost:8080/api/mtbs/ratings/user/${userName}/movie/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
          },
        }
      )
      .then((result) => {
        toast.success("Rating Added Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        console.log(result.data);
        alert("Rating added successfully");
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.message);
      });
    navigate("/ratinglist");

    // return false;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Rating</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="ratingValue" className="form-label">
                Rating Value
              </label>
              <input
                type={"number"}
                className={`form-control ${errors.ratingValue && "invalid"}`}
                placeholder="Enter Rating Value here"
                onChange={(e) =>
                  setRating({ ...rating, ratingValue: e.target.value })
                }
                {...register("ratingValue", {
                  required: true,
                  min: 1,
                  max: 5,
                  // valueAsNumber: true,
                })}
                onKeyUp={() => trigger("ratingValue")}
              />
              {errors.ratingValue && (
                <p className="text-danger">{"Rating Value is not valid"}</p>
              )}
              {errors.ratingValue && errors.ratingValue.type === "min" && (
                <p className="text-danger">
                  {"Rating Value should be greater than or equal to 1"}
                </p>
              )}
              {errors.ratingValue && errors.ratingValue.type === "max" && (
                <p className="text-danger">
                  {"Rating Value should be less than or equal to 5"}
                </p>
              )}
              {/* {errors.ratingValue &&
                errors.ratingValue.type === "valueAsNumber" && (
                  <p className="text-danger">{"Rating Value is not valid"}</p>
                )} */}
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/home">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
