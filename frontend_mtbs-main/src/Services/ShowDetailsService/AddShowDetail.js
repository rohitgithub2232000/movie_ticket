import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import withAuthorization from "../../Components/withAuthorization";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { sessionCheck } from "./ShowDetailsService";
import { toast } from "react-toastify";
import { getAllMovies } from "./../MovieService/MovieService";
import { getAllTheatres } from "./../TheatreService/TheatreService";

function AddShowDetail() {
  let navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);

  const [showDetail, setShowDetail] = useState({
    showDate: "",
    showStartTime: "",
    ticketRate: "",
    movie: "",
    theatre: "",
  });

  // const { movieId, theatreId } = useParams();

  useEffect(() => {
    showDetailsRequest();
    loadDropdowns();
    // loadTheatres();
  }, []);

  const loadDropdowns = async () => {
    await axios;
    getAllMovies()
      .then((result) => {
        setMovies(result.data);
      })
      .catch((e) => {
        console.log(e);
        // alert(e.response.data.message);
      });
    await axios;
    getAllTheatres()
      .then((result) => {
        setTheatres(result.data);
      })
      .catch((e) => {
        console.log(e);
        // alert(e.response.data.message);
      });
  };

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const showDetailsRequest = async () => {
    sessionCheck();
  };

  const onSubmit = async (showDetail) => {
    showDetailsRequest();
    await axios
      .post(
        `http://localhost:8080/api/mtbs/showDetails/movies/${showDetail.movieId}/theatres/${showDetail.theatreId}`,
        showDetail,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
          },
        }
      )
      .then((result) => {
        toast.success("Show Detail Added Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        // alert("Show Detail added successfully");
        navigate("/showdetails");
        return false;
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.message);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Show Detail</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="Show Date" className="form-label">
                Show Date
              </label>
              <input
                type={"date"}
                className={`form-control ${errors.showDate && "invalid"}`}
                placeholder="Enter Show Date here "
                onChange={(e) =>
                  setShowDetail({ ...showDetail, showDate: e.target.value })
                }
                {...register("showDate", {
                  required: true,
                  pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
                  maxLength: 10,
                })}
                onKeyUp={() => trigger("showDate")}
              />
              {errors.showDate && errors.showDate.type === "required" && (
                <p className="text-danger">{"Show Date is required"}</p>
              )}
              {errors.showDate && errors.showDate.type === "maxLength" && (
                <p className="text-danger">
                  {"Show Date should not exceed 10 characters"}
                </p>
              )}
              {errors.showDate && errors.showDate.type === "pattern" && (
                <p className="text-danger">{"Show Date is not valid"}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Show Time" className="form-label">
                Show Time
              </label>
              <input
                type={"time"}
                className={`form-control ${errors.showStartTime && "invalid"}`}
                placeholder="Enter show Time here"
                onChange={(e) =>
                  setShowDetail({
                    ...showDetail,
                    showStartTime: e.target.value,
                  })
                }
                {...register("showStartTime", {
                  required: true,
                  pattern: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/,
                })}
                onKeyUp={() => trigger("showStartTime")}
              />
              {errors.showStartTime &&
                errors.showStartTime.type === "required" && (
                  <p className="text-danger">{"Show Time is required"}</p>
                )}
              {errors.showStartTime &&
                errors.showStartTime.type === "pattern" && (
                  <p className="text-danger">{"Show Time is not valid"}</p>
                )}
            </div>

            <div className="mb-3">
              <label htmlFor="Ticket Rate" className="form-label">
                Ticket Rate
              </label>
              <input
                type={"number"}
                className={`form-control ${errors.ticketRate && "invalid"}`}
                placeholder="Enter seats capacity here"
                onChange={(e) =>
                  setShowDetail({ ...showDetail, ticketRate: e.target.value })
                }
                {...register("ticketRate", {
                  required: true,
                  min: 1,
                  max: 200,
                  pattern: /^[1-9]\d*$/,
                  valueAsNumber: true,
                  validate: {
                    noDot: (value) => !value.toString().includes("."),
                  },
                })}
                onKeyUp={() => trigger("ticketRate")}
                step={1}
              />
              {errors.ticketRate && errors.ticketRate.type === "required" && (
                <p className="text-danger">{"Ticket Rate is required"}</p>
              )}
              {errors.ticketRate && errors.ticketRate.type === "min" && (
                <p className="text-danger">
                  {"Ticket Rate should be greater than or equal to 1"}
                </p>
              )}
              {errors.ticketRate && errors.ticketRate.type === "max" && (
                <p className="text-danger">
                  {"Ticket Rate should be less than or equal to 200"}
                </p>
              )}
              {errors.ticketRate && errors.ticketRate.type === "pattern" && (
                <p className="text-danger">{"Ticket Rate is not valid"}</p>
              )}
              {errors.ticketRate && errors.ticketRate.type === "noDot" && (
                <p className="text-danger">
                  {"Ticket Rate cannot contain a dot symbol"}
                </p>
              )}
              {errors.ticketRate &&
                errors.ticketRate.type === "valueAsNumber" && (
                  <p className="text-danger">{"Ticket Rate is not valid"}</p>
                )}
            </div>

            <div className="mb-3">
              <label htmlFor="theatreId" className="form-label">
                Theatre{" "}
              </label>
              <select
                className={`form-control custom-select ${
                  errors.theatreId && "invalid"
                }`}
                placeholder="Theatre"
                onChange={(e) => {
                  setShowDetail({ ...showDetail, theatreId: e.target.value });
                }}
                {...register("theatreId", { required: true })}
              >
                <option selected>Select Theatre </option>
                {theatres.map((theatre, index) => (
                  <option key={index} value={theatre.theatreId}>
                    {theatre.theatreName} - {theatre.theatreLocation}
                  </option>
                ))}
              </select>
            </div>
            {errors.theatreId && errors.theatreId.type === "required" && (
              <p className="text-danger">{"Theatre Name is not valid"}</p>
            )}

            <div className="mb-3">
              <label htmlFor="movieId" className="form-label">
                Movie{" "}
              </label>
              <select
                className={`form-control custom-select ${
                  errors.movieId && "invalid"
                }`}
                placeholder="Movie"
                onChange={(e) => {
                  setShowDetail({ ...showDetail, movieId: e.target.value });
                }}
                {...register("movieId", { required: true })}
              >
                <option selected>Select Movie </option>
                {movies.map((movie, index) => (
                  <option key={index} value={movie.movieId}>
                    {movie.movieName}
                  </option>
                ))}
              </select>
            </div>
            {errors.movieId && (
              <p className="text-danger">{"Movie Name is not valid"}</p>
            )}

            <div className="mb-3">
              <label htmlFor="movieFormat" className="form-label">
                Movie Format{" "}
              </label>
              <select
                className={`form-control custom-select ${
                  errors.movieFormat && "invalid"
                }`}
                placeholder="Movie Format"
                onChange={(e) => {
                  setShowDetail({ ...showDetail, movieFormat: e.target.value });
                }}
                {...register("movieFormat", { required: true })}
              >
                <option>Select Movie Format</option>
                <option value="0">2D</option>
                <option value="1">3D</option>
                <option value="2">IMAX 3D </option>
              </select>
            </div>
            {errors.movieFormat && (
              <p className="text-danger">{"Movie Format is not valid"}</p>
            )}

            {/* <div className="mb-3">
              <label htmlFor="Movie Format" className="form-label">
                Movie Format
              </label>
              <input
                type={"number"}
                className={`form-control ${errors.movieFormat && "invalid"}`}
                placeholder="Enter Movie Format here"
                onChange={(e) =>
                  setShowDetail({ ...showDetail, movieFormat: e.target.value })
                }
                {...register("movieFormat", { required: true })}
                onKeyUp={() => trigger("movieFormat")}
              />
              {errors.movieFormat && (
                <p className="text-danger">{"Movie Format is not valid"}</p>
              )}
            </div> */}

            <div className="mb-3">
              <label htmlFor="movieLanguage" className="form-label">
                Movie Language{" "}
              </label>
              <select
                className={`form-control custom-select ${
                  errors.movieLanguage && "invalid"
                }`}
                placeholder="Movie Language"
                onChange={(e) => {
                  setShowDetail({
                    ...showDetail,
                    movieLanguage: e.target.value,
                  });
                }}
                {...register("movieLanguage", { required: true })}
              >
                <option>Select Movie Language </option>
                <option value="0">MARATHI</option>
                <option value="1">HINDI</option>
                <option value="2">ENGLISH </option>
                <option value="3">TAMIL</option>
                <option value="4">TELUGU</option>
              </select>
            </div>
            {errors.movieLanguage && (
              <p className="text-danger">{"Movie Language is not valid"}</p>
            )}

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/showDetails">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default withAuthorization(["ROLE_ADMIN"])(AddShowDetail);
