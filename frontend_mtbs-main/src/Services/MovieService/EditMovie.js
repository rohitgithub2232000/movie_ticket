import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  getMovieByMovieId,
  updateMovieByMovieId,
  sessionCheck,
} from "./MovieService";
import withAuthorization from "../../Components/withAuthorization";

function EditMovie() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [movie, setMovie] = useState({
    movieName: "",
    releaseDate: "",
    duration: "",
    description: "",
    genre: "",
    imagePath: "",
  });

  const { movieName, releaseDate, duration, description, genre, imagePath } =
    movie;

  const onInputChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    movieRequest();
    loadMovie(id);
  }, []);

  const movieRequest = async () => {
    sessionCheck();
  };

  const onSubmit = async (e) => {
    await axios;
    e.preventDefault();
    updateMovieByMovieId(id, movie)
      .then((result) => {
        // alert("Movie updated successfully");
      })
      .catch((e) => {
        // alert(e.response.data.message);
      });
    navigate("/movies");
    // return false;
  };

  const loadMovie = async (id) => {
    movieRequest(id);
    await axios;
    getMovieByMovieId(id)
      .then((result) => {
        setMovie(result.data);
      })
      .catch((e) => {
        // alert(e.response.data.message);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Movie</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Movie Name" className="form-label">
                Movie Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter movie name here"
                name="movieName"
                value={movieName}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Release Date" className="form-label">
                Release Date
              </label>
              <input //datePicker
                type={"date"}
                className="form-control"
                placeholder="Enter Release Date here "
                name="releaseDate"
                value={releaseDate} //selectedDate
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Duration" className="form-label">
                Duration
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter duration here"
                name="duration"
                value={duration}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter description here"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Genre" className="form-label">
                Genre
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter genre here"
                name="genre"
                value={genre}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Image Path" className="form-label">
                Image Path
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Image Path here"
                name="imagePath"
                value={imagePath}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/movies">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default withAuthorization(["ROLE_ADMIN"])(EditMovie);
