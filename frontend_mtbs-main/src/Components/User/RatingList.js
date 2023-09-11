import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  deleteRatingByRatingId,
  getAllRatingsByUserName,
  sessionCheck,
} from "../../Services/RatingService/RatingService";

export default function RatingList() {
  const [ratings, setRatings] = useState([]);
  const [searchMovieName, setSearchMovieName] = useState("");
  const [searchRating, setSearchRating] = useState("");

  useEffect(() => {
    ratingRequest();
    loadRatings();
  }, []);

  const ratingRequest = async () => {
    await sessionCheck();
  };

  const loadRatings = async () => {
    ratingRequest();
    await axios;
    getAllRatingsByUserName()
      .then((result) => {
        setRatings(result.data);
        console.log(result.data);
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.message);
      });
  };

  const deleteRating = async (ratingId) => {
    await ratingRequest();
    if (window.confirm("Do you want to delete?")) {
      try {
        await deleteRatingByRatingId(ratingId);
        // alert("Rating Deleted Successfully");
        loadRatings();
      } catch (e) {
        console.log(e.response);
        // alert(e.response.data.message);
      }
    } else {
      loadRatings();
    }
  };

  const filterRatings = () => {
    const filteredRatings = ratings.filter((rating) => {
      const movieNameMatch =
        rating.movie.movieName
          .toLowerCase()
          .indexOf(searchMovieName.toLowerCase()) !== -1;
      const ratingMatch =
        rating.ratingValue
          .toString()
          .toLowerCase()
          .indexOf(searchRating.toLowerCase()) !== -1;
      return movieNameMatch && ratingMatch;
    });
    return filteredRatings;
  };

  const filteredRatings = filterRatings();

  return (
    <div className="container">
      <div className="py-4">
        <div className="row mb-3">
          <div className="col-sm-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search by movie name"
              value={searchMovieName}
              onChange={(e) => setSearchMovieName(e.target.value)}
            />
          </div>
          {/* <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Search by rating"
              value={searchRating}
              onChange={(e) => setSearchRating(e.target.value)}
            />
          </div> */}
        </div>
        {!filteredRatings.length ? (
          <p>There are no ratings to display.</p>
        ) : (
          <table className="table border shadow table-primary table-striped  ">
            <thead>
              <tr>
                <th scope="col">S.N.</th>
                <th scope="col">Movie Name</th>
                <th scope="col">Your Rating</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRatings.map((rating, index) => {
                const { ratingId, ratingValue, movie } = rating;
                return (
                  <tr key={ratingId}>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{movie.movieName}</td>
                    <td>{ratingValue}</td>

                    <td>
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/viewrating/${ratingId}`}
                      >
                        View
                      </Link>
                      {/* <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/editrating/${ratingId}`}
                    >
                      Edit
                    </Link> */}
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteRating(rating.ratingId)}
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
