import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addMovie, sessionCheck } from "./MovieService";
import Dropzone from "react-dropzone";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function AddMovie() {
  let navigate = useNavigate();

  const [movie, setMovie] = useState({
    movieName: "",
    releaseDate: "",
    duration: "",
    description: "",
    genre: "",
  });

  const { movieName, releaseDate, duration, description, genre } = movie;

  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [cropper, setCropper] = useState(null);

  const onInputChange = (e) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const movieRequest = async () => {
    sessionCheck();
  };

  const handleOnDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
  };

  const handleCropImage = () => {
    if (typeof cropper !== "undefined") {
      setCroppedImage(
        cropper
          .getCroppedCanvas({ width: 3 * 100, height: 4 * 100 })
          .toDataURL()
      );
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    movieRequest();
    await axios;
    addMovie(movie)
      .then((result) => {
        console.log(result.data);
        // alert("Movie updated successfully");
      })
      .catch((e) => {
        // alert(e.response.data.message);
      });
    navigate("/movies");
    // return false;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Movie</h2>

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
              <input
                type={"date"}
                className="form-control"
                placeholder="Enter Release Date here "
                name="releaseDate"
                value={releaseDate}
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
