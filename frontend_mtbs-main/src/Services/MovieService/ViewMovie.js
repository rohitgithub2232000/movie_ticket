import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovieWithImageByMovieId, sessionCheck } from "./MovieService";

export default function ViewMovie() {
  const [movie, setMovie] = useState({
    movieName: "",
    releaseDate: "",
    duration: "",
    description: "",
    genre: "",
    imageName: "",
  });

  // let movieImage = movie.imagePath.toString();
  const [imageUrl, setImageUrl] = useState("");
  // const imageUrlWithoutEscape = imageUrl.replace("\\", "");

  const imagePath = "E:DemosFrontendMTBSmtbs-apppublicimages";

  const { id } = useParams();

  useEffect(() => {
    movieRequest();
    loadMovie(id);
  }, []);

  const movieRequest = async () => {
    sessionCheck();
  };

  const loadMovie = async (id) => {
    movieRequest(id);
    await axios;
    getMovieWithImageByMovieId(id)
      .then((result) => {
        console.log(result);
        setMovie(result.data.movieDTO);
        setImageUrl(result.data.imageUrl);
      })
      .catch((e) => {
        // alert(e.response.data.message);
      });
  };
  console.log(movie);
  console.log(imageUrl);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 offset-md-1 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Movie Details</h2>
          <div className="row">
            <div className="col-sm-3 my-sm-2">
              <div className="card card-body">
                <img
                  //Inside public folder of frontend
                  src={`${process.env.PUBLIC_URL}/assets/images/${movie.imageName}`}
                  // Inside src folder of frontend but working only static
                  // src={require(`../../img/Ved.png`)}

                  alt={movie.movieName}
                  height="300"
                  width="200"
                ></img>
              </div>
            </div>
            <div className="col-sm-9 my-sm-2">
              <div className="card no-border">
                <div className="card-header">
                  <ul className="list-group list-group-flush">
                    {sessionStorage.getItem("sessionRole") === "ROLE_ADMIN" && (
                      <li className="list-group-item">
                        <b>Movie Id : </b>
                        {movie.movieId}
                      </li>
                    )}
                    <li className="list-group-item">
                      <b>Movie Name : </b>
                      {movie.movieName}
                    </li>
                    <li className="list-group-item">
                      <b>Release Date : </b>
                      {movie.releaseDate[0]}/{movie.releaseDate[1]}/
                      {movie.releaseDate[2]}
                    </li>
                    <li className="list-group-item">
                      <b>Duration : </b>
                      {movie.duration}
                    </li>
                    <li className="list-group-item">
                      <b>Description : </b>
                      {movie.description}
                    </li>
                    <li className="list-group-item">
                      <b>Genre : </b>
                      {movie.genre}
                    </li>
                  </ul>
                </div>
              </div>
              {sessionStorage.getItem("sessionRole") === "ROLE_ADMIN" && (
                <Link className="btn btn-primary my-4" to={"/movies"}>
                  Back to Movies
                </Link>
              )}

              <Link
                className="btn btn-primary mx-2 my-4"
                to={`/showdetaillist/${movie.movieId}`}
              >
                Book
              </Link>

              {sessionStorage.getItem("sessionRole") === "ROLE_USER" && (
                <Link
                  className="btn btn-secondary mx-2 my-4"
                  to={`/addrating/${movie.movieId}`}
                >
                  Rate Movie
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
