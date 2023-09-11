import React, { useEffect, useState } from "react";
import withAuthorization from "../../withAuthorization";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  deleteMovieByMovieId,
  getAllMovies,
  sessionCheck,
} from "../../../Services/MovieService/MovieService";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [sortField, setSortField] = useState("index");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    sessionCheck();
    loadMovies(sortField, sortDirection);
  }, [sortField, sortDirection]);

  const movieRequest = async () => {
    sessionCheck();
  };

  const loadMovies = async () => {
    movieRequest();
    try {
      const result = await getAllMovies();
      const sortedMovies = result.data.sort((a, b) => {
        if (sortField === "movieName") {
          return sortDirection === "asc"
            ? a.movieName.localeCompare(b.movieName)
            : b.movieName.localeCompare(a.movieName);
        } else if (sortField === "releaseDate") {
          return sortDirection === "asc"
            ? new Date(a.releaseDate.join("-")) -
                new Date(b.releaseDate.join("-"))
            : new Date(b.releaseDate.join("-")) -
                new Date(a.releaseDate.join("-"));
        } else if (sortField === "duration") {
          if (a.duration === null || a.duration === undefined) {
            return sortDirection === "asc" ? 1 : -1;
          }
          if (b.duration === null || b.duration === undefined) {
            return sortDirection === "asc" ? -1 : 1;
          }
          return sortDirection === "asc"
            ? a.duration - b.duration
            : b.duration - a.duration;
        } else if (sortField === "genre") {
          return sortDirection === "asc"
            ? a.genre.localeCompare(b.genre)
            : b.genre.localeCompare(a.genre);
        } else {
          return sortDirection === "asc"
            ? a.index - b.index
            : b.index - a.index;
        }
      });
      setMovies(sortedMovies);
      console.log(sortedMovies);
    } catch (e) {
      console.log(e);
      // alert(e.response.data.message);
    }
  };

  const deleteMovie = (movieId) => {
    movieRequest(movieId);
    if (window.confirm("Do you want to delete?")) {
      deleteMovieByMovieId(movieId)
        .then(() => {
          // alert("Movie Deleted Successfully");
          loadMovies();
        })
        .catch((e) => {
          console.log(e.response);
          // alert(e.response.data.message);
        });
    } else {
      loadMovies();
    }
  };

  const toggleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="container-fluid mb-2 ">
          <Link className="btn btn-primary" to="/addmovie">
            Add Movie
          </Link>
          {/* <div className="btn-group ml-2">
            <button
              className={`btn btn-sm ${
                sortField === "movieName" ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => toggleSort("movieName")}
            >
              Movie Name{" "}
              {sortField === "movieName" &&
                (sortDirection === "asc" ? "▲" : "▼")}
            </button>
          </div> */}
        </div>
        {!movies.length ? (
          <p>There are no movies to display.</p>
        ) : (
          <table className="table border shadow table-primary table-striped  ">
            <thead>
              <tr>
                {/* <th scope="col sm-2">S.N.</th> */}
                <th scope="col">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-1">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        onClick={() => toggleSort("index")}
                      >
                        S.N.{" "}
                        {sortField === "index" &&
                          (sortDirection === "asc" ? "▲" : "▼")}
                      </Link>
                    </li>
                  </ul>
                </th>

                <th scope="col">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-1">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        onClick={() => toggleSort("movieName")}
                      >
                        Movie Name{" "}
                        {sortField === "movieName" &&
                          (sortDirection === "asc" ? "▲" : "▼")}
                      </Link>
                    </li>
                  </ul>
                </th>

                {/* <th scope="col">Release Date</th> */}
                <th scope="col">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-1">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        onClick={() => toggleSort("releaseDate")}
                      >
                        Release Date{" "}
                        {sortField === "releaseDate" &&
                          (sortDirection === "asc" ? "▲" : "▼")}
                      </Link>
                    </li>
                  </ul>
                </th>

                {/* <th scope="col">Duration</th> */}
                <th scope="col">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-1">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        onClick={() => toggleSort("duration")}
                      >
                        Duration{" "}
                        {sortField === "duration" &&
                          (sortDirection === "asc" ? "▲" : "▼")}
                      </Link>
                    </li>
                  </ul>
                </th>

                {/* <th scope="col">Description</th> */}

                {/* <th scope="col">Genre</th> */}
                <th scope="col">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-1">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        onClick={() => toggleSort("genre")}
                      >
                        Genre{" "}
                        {sortField === "genre" &&
                          (sortDirection === "asc" ? "▲" : "▼")}
                      </Link>
                    </li>
                  </ul>
                </th>

                {/* <th scope="col">Action</th> */}
                <th scope="col">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-1">
                    <li className="nav-item">
                      <Link className="nav-link active">Action </Link>
                    </li>
                  </ul>
                </th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie, index) => {
                const {
                  movieId,
                  movieName,
                  releaseDate,
                  duration,
                  // description,
                  genre,
                } = movie;
                return (
                  <tr key={movieId}>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{movieName}</td>
                    <td>
                      {releaseDate[0]}/{releaseDate[1]}/{releaseDate[2]}
                    </td>
                    <td>{duration}</td>
                    {/* <td>{description}</td> */}
                    <td>{genre}</td>

                    <td>
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/viewmovie/${movieId}`}
                      >
                        View
                      </Link>
                      <Link
                        className="btn btn-outline-primary mx-2"
                        to={`/editmovie/${movieId}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteMovie(movie.movieId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
export default withAuthorization(["ROLE_ADMIN"])(Movies);
