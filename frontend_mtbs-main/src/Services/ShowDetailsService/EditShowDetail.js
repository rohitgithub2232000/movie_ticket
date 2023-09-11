import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getShowDetailsByShowId,
  updateShowDetailsByShowId,
  sessionCheck,
} from "./ShowDetailsService";
import withAuthorization from "../../Components/withAuthorization";

function EditShowDetail() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [showDetail, setShowDetail] = useState({
    showDate: "",
    showStartTime: "",
    ticketRate: "",
    movieFormat: "",
    movieLanguage: "",
    // theatreId: "",
    movie: {
      movieId: "",
    },
    theatre: {
      theatreId: "",
    },
  });

  const {
    showDate,
    showStartTime,
    ticketRate,
    movieFormat,
    movieLanguage,
    movie,
    theatre,
  } = showDetail;

  const onInputChange = (e) => {
    // setShowDetail({ ...showDetail, [e.target.name]: e.target.value },);
    // const onInputChange = (e) => {
    const { name, value } = e.target;
    setShowDetail((prevState) => ({
      ...prevState,
      [name]: value,
      theatre: {
        ...prevState.theatre,
        [name]: value,
      },
      movie: {
        ...prevState.movie,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    showDetailsRequest();
    loadShowDetail(id);
  }, []);

  const showDetailsRequest = async () => {
    sessionCheck();
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await axios;
    updateShowDetailsByShowId(id, showDetail)
      .then((result) => {
        // alert("Show Detail updated successfully");
      })
      .catch((e) => {
        // alert(e.response.data.message);
      });
    navigate("/showDetails");
    // return false;
  };

  const loadShowDetail = async (id) => {
    showDetailsRequest(id);
    getShowDetailsByShowId(id)
      .then((result) => {
        setShowDetail(result.data);
        console.log(result.data);
      })
      .catch((e) => {
        // alert(e.response.data.message);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Show Detail</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Show Date" className="form-label">
                Show Date
              </label>
              <input
                type={"date"}
                className="form-control"
                placeholder="Enter show date here"
                name="showDate"
                value={showDate}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Show Time" className="form-label">
                Show Time
              </label>
              <input
                type={"time"}
                className="form-control"
                placeholder="Enter Show Time here "
                name="showStartTime"
                value={showStartTime}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Ticket Rate" className="form-label">
                Ticket Rate
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Ticket Rate here"
                name="ticketRate"
                value={ticketRate}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Theatre Id" className="form-label">
                Theatre Id
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Theatre Id here"
                name="theatreId"
                value={theatre.theatreId}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Movie Id" className="form-label">
                Movie Id
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Movie Id here"
                name="movieId"
                value={movie.movieId}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Movie Format" className="form-label">
                Movie Format
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Movie Format here"
                name="movieFormat"
                value={movieFormat}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Movie Language" className="form-label">
                Movie Language
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Movie Language here"
                name="movieLanguage"
                value={movieLanguage}
                onChange={(e) => onInputChange(e)}
              />
            </div>

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
export default withAuthorization(["ROLE_ADMIN"])(EditShowDetail);
