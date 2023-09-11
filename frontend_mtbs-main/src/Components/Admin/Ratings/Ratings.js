import React, { useEffect, useState } from "react";
import axios from "axios";
import withAuthorization from "../../withAuthorization";
import { Link } from "react-router-dom";
import {
  deleteRatingByRatingId,
  getAllRatings,
  sessionCheck,
} from "../../../Services/RatingService/RatingService";

function Ratings() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    sessionCheck();
    loadRatings();
  }, []);

  const ratingsRequest = async () => {
    sessionCheck();
  };

  const loadRatings = async () => {
    ratingsRequest();
    await axios;
    getAllRatings()
      .then((result) => {
        setRatings(result.data);
      })
      .catch((e) => {
        console.log(e);
        // alert(e.response.data.message);
      });
  };

  const deleteShowDetail = (ratingId) => {
    ratingsRequest(ratingId);
    if (window.confirm("Do you want to delete?")) {
      deleteRatingByRatingId(ratingId)
        .then(() => {
          // alert("Ratings Deleted Successfully");
          loadRatings();
        })
        .catch((e) => {
          console.log(e.response);
          // alert(e.response.data.message);
        });
    } else {
      loadRatings();
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="container-fluid mb-2 ">
          {/* <Link className="btn btn-primary" to="/addrating">
            Add Rating
          </Link> */}
        </div>

        {!ratings.length ? (
          <p>There are no ratings to display.</p>
        ) : (
          <table className="table border shadow table-primary table-striped  ">
            <thead>
              <tr>
                <th scope="col">S.N.</th>
                <th scope="col">Movie Name</th>
                <th scope="col">User Name</th>
                <th scope="col">Rating Value</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((rating, index) => {
                const { ratingId, ratingValue, movie, user } = rating;
                return (
                  <tr key={ratingId}>
                    <th scope="row">{index + 1}</th>
                    <td>{movie.movieName}</td>
                    <td>{user.userName}</td>
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
                        onClick={() => deleteShowDetail(rating.ratingId)}
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
export default withAuthorization(["ROLE_ADMIN"])(Ratings);
