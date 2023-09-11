import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRatingByRatingId, sessionCheck } from "./RatingService";

export default function ViewRating() {
  const [rating, setRating] = useState({
    ratingId: "",
    ratingValue: "",
    movie: {
      movieName: "",
      releaseDate: "",
      duration: "",
      description: "",
      genre: "",
    },
    user: { userName: "" },
  });

  const { id } = useParams();

  useEffect(() => {
    ratingRequest();
    loadRating(id);
  }, []); //eslint-disable-next-line react-hooks/exhaustive-deps

  const ratingRequest = async () => {
    sessionCheck();
  };

  const loadRating = async (id) => {
    ratingRequest(id);
    await axios;
    getRatingByRatingId(id)
      .then((result) => {
        setRating(result.data);
      })
      .catch((e) => {
        // alert(e.response.data.message);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Ratings</h2>

          <div className="card">
            <div className="card-header">
              <ul className="list-group list-group-flush">
                {sessionStorage.getItem("sessionRole") === "ROLE_ADMIN" && (
                  <li className="list-group-item">
                    <b>Details of Rating Id : </b>
                    {rating.ratingId}
                  </li>
                )}

                <li className="list-group-item">
                  <b>Rating Value : </b>
                  {rating.ratingValue}
                </li>

                <li className="list-group-item">
                  <b>Movie Details : </b> <br />
                  {sessionStorage.getItem("sessionRole") === "ROLE_ADMIN" && (
                    <li className="list-group-item">
                      Show Id : {rating.movie.movieId}
                      <br />
                    </li>
                  )}
                  Movie Name :{rating.movie.movieName} <br />
                  Release Date : {rating.movie.releaseDate[0]}/
                  {rating.movie.releaseDate[1]}/{rating.movie.releaseDate[2]}
                  <br />
                  Duration :{rating.movie.duration}
                  <br />
                  Description :{rating.movie.description}
                  <br />
                  Genre :{rating.movie.genre}
                  <br />
                </li>
                <li className="list-group-item">
                  {sessionStorage.getItem("sessionRole") === "ROLE_ADMIN" && (
                    <div>
                      <b>User Name : </b> {rating.user.userName}
                      <br />
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
          {sessionStorage.getItem("sessionRole") === "ROLE_ADMIN" && (
            <Link className="btn btn-primary my-2" to={"/ratings"}>
              Back to Ratings
            </Link>
          )}
          {sessionStorage.getItem("sessionRole") === "ROLE_USER" && (
            <Link className="btn btn-primary my-2" to={"/ratinglist"}>
              Back to Ratings
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
