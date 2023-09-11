import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  getAllMovies,
  sessionCheck,
} from "../../Services/MovieService/MovieService";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieRequest();
    loadMovies();
  }, []);

  const movieRequest = async () => {
    sessionCheck();
  };

  const loadMovies = async () => {
    movieRequest();
    await axios;
    getAllMovies()
      .then((result) => {
        setMovies(result.data);
      })
      .catch((e) => {
        console.log(e);
        // alert(e.response.data.message);
      });
  };

  return (
    <div className="container">
      {!movies.length ? (
        <p>There are no movies to display.</p>
      ) : (
        <div className="card-group row p-2">
          {movies.map((movie, index) => {
            const { movieId, movieName, genre, imageName } = movie;
            // let movieImage = imagePath.toString();

            return (
              // <div className="container">

              <div className="col-sm-4 my-sm-2" key={index}>
                <div className="card card-body">
                  <img
                    className="card-img-top p-2 card-size"
                    src={`${process.env.PUBLIC_URL}/assets/images/${imageName}`}
                    alt="Card cap"
                  ></img>

                  <Link
                    className="btn btn-primary mx-2 p-2"
                    to={`/viewmovie/${movieId}`}
                  >
                    {movieName}
                  </Link>
                  <p className="card-text text-center p-2">
                    <b>{genre}</b>
                  </p>
                  {/* <div className="dropdown-divider"></div> */}
                </div>
              </div>
              // </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
