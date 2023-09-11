import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  getMovieByMovieId,
  updateMovieByMovieId,
  sessionCheck,
} from "./MovieService";

export default function EditMovie() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [movie, setMovie] = useState({
    movieName: "",
    releaseDate: "",
    duration: "",
    description: "",
    genre: "",
  });

  const { movieName, releaseDate, duration, description, genre, imagePath } =
    movie;

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    movieRequest();
    loadMovie(id);
    console.log(loadMovie(id));
  }, []);

  const movieRequest = async () => {
    sessionCheck();
  };

  const onSubmit = async (movie) => {
    await axios;
    updateMovieByMovieId(id, movie)
      .then((result) => {
        toast.success("Movie Added Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        // alert("Movie added successfully");
        navigate("/movies");
        return false;
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.message);
      });
  };

  const loadMovie = async (id) => {
    movieRequest(id);
    await axios;
    getMovieByMovieId(id)
      .then((result) => {
        setMovie(result.data);
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
          <h2 className="text-center m-4">Edit Movie</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="Movie Name" className="form-label">
                Movie Name
              </label>
              <input
                type={"text"}
                className={`form-control ${errors.movieName && "invalid"}`}
                placeholder="Enter movie name here"
                name="movieName"
                value={movieName}
                // disabled="disabled"
                onChange={(e) =>
                  setMovie({ ...movie, movieName: e.target.value })
                }
                {...register("movieName", { required: true })}
                onKeyUp={() => trigger("movieName")}
              />
              {errors.movieName && (
                <p className="text-danger">{"Movie Name is not valid"}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Release Date" className="form-label">
                Release Date
              </label>
              <input
                type={"date"}
                className={`form-control ${errors.releaseDate && "invalid"}`}
                placeholder="Enter Release Date here "
                name="releaseDate"
                value={releaseDate}
                onChange={(e) =>
                  setMovie({ ...movie, releaseDate: e.target.value })
                }
                {...register("releaseDate", { required: true })}
                onKeyUp={() => trigger("releaseDate")}
              />
              {errors.releaseDate && (
                <p className="text-danger">{"Release Date is not valid"}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Duration" className="form-label">
                Duration
              </label>
              <input
                type={"text"}
                className={`form-control ${errors.duration && "invalid"}`}
                placeholder="Enter duration here"
                name="duration"
                value={duration}
                onChange={(e) =>
                  setMovie({ ...movie, duration: e.target.value })
                }
                {...register("duration", { required: true })}
                onKeyUp={() => trigger("duration")}
              />
              {errors.duration && (
                <p className="text-danger">{"Duration is not valid"}</p>
              )}
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
                onChange={(e) =>
                  setMovie({ ...movie, description: e.target.value })
                }
                {...register("description", { required: true })}
                onKeyUp={() => trigger("description")}
              />
              {errors.description && (
                <p className="text-danger">{"Description is not valid"}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Genre" className="form-label">
                Genre
              </label>
              <input
                type={"text"}
                className={`form-control ${errors.genre && "invalid"}`}
                placeholder="Enter genre here"
                name="genre"
                value={genre}
                onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
                {...register("genre", { required: true })}
                onKeyUp={() => trigger("genre")}
              />
              {errors.genre && (
                <p className="text-danger">{"Genre is not valid"}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Image Path" className="form-label">
                Image Path
              </label>
              <input
                type={"text"}
                className={`form-control ${errors.imagePath && "invalid"}`}
                placeholder="Enter imagePath here"
                name="imagePath"
                value={imagePath}
                onChange={(e) =>
                  setMovie({ ...movie, imagePath: e.target.value })
                }
                {...register("imagePath", { required: true })}
                onKeyUp={() => trigger("imagePath")}
              />
              {errors.imagePath && (
                <p className="text-danger">{"Image Path is not valid"}</p>
              )}
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
