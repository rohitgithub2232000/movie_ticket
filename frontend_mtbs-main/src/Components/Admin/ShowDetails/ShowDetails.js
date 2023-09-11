import React, { useEffect, useState } from "react";
import axios from "axios";
import withAuthorization from "../../withAuthorization";
import { Link } from "react-router-dom";
import {
  deleteShowDetailsByShowId,
  getAllShowDetails,
  sessionCheck,
} from "../../../Services/ShowDetailsService/ShowDetailsService";

function ShowDetails() {
  const [showDetails, setShowDetails] = useState([]);
  const [sortField, setSortField] = useState("index");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    sessionCheck();
    loadShowDetails(sortField, sortDirection);
  }, [sortField, sortDirection]);

  const showDetailsRequest = async () => {
    sessionCheck();
  };

  const loadShowDetails = async () => {
    showDetailsRequest();
    await axios;
    getAllShowDetails()
      .then((result) => {
        setShowDetails(result.data);
      })
      .catch((e) => {
        console.log(e);
        // alert(e.response.data.message);
      });
  };

  const deleteShowDetail = (showId) => {
    showDetailsRequest(showId);
    if (window.confirm("Do you want to delete?")) {
      deleteShowDetailsByShowId(showId)
        .then(() => {
          // alert("ShowDetails Deleted Successfully");
          loadShowDetails();
        })
        .catch((e) => {
          console.log(e.response);
          // alert(e.response.data.message);
        });
    } else {
      loadShowDetails();
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="container-fluid mb-2 ">
          <Link className="btn btn-primary" to="/addshowDetail">
            Add ShowDetail
          </Link>
        </div>
        {!showDetails.length ? (
          <p>There are no Shows to display.</p>
        ) : (
          <table className="table border shadow table-primary table-striped  ">
            <thead>
              <tr>
                <th scope="col">S.N.</th>
                <th scope="col">Show Date</th>
                <th scope="col">Show Time</th>
                <th scope="col">Theatre Details </th>
                {/* <th scope="col">Movie Details </th> */}
                <th scope="col">Movie Name</th>
                <th scope="col">Movie Format</th>
                <th scope="col">Movie Language</th>
                <th scope="col">Ticket Rate</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {showDetails.map((showDetail, index) => {
                const {
                  showId,
                  showDate,
                  showStartTime,
                  ticketRate,
                  movieFormat,
                  movieLanguage,
                  movie,
                  theatre,
                } = showDetail;
                return (
                  <tr key={showId}>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>
                      {showDate[0]}/{showDate[1]}/{showDate[2]}
                    </td>
                    <td>
                      {showStartTime[0]}:{showStartTime[1]}
                    </td>
                    <td>
                      {theatre.theatreName} - {theatre.theatreLocation}
                    </td>
                    {/* <td>
                    {movie.movieName} / {movieFormat} / {movieLanguage}
                  </td> */}
                    <td>
                      <Link className="" to={`/viewmovie/${movie.movieId}`}>
                        {movie.movieName}
                      </Link>
                    </td>
                    <td>{movieFormat}</td>
                    <td>{movieLanguage}</td>
                    <td>{ticketRate}</td>

                    <td>
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/addbooking/${showId}`}
                      >
                        Book
                      </Link>
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/viewshowDetail/${showId}`}
                      >
                        View
                      </Link>
                      <Link
                        className="btn btn-outline-primary mx-2"
                        to={`/editshowDetail/${showId}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteShowDetail(showDetail.showId)}
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
export default withAuthorization(["ROLE_ADMIN"])(ShowDetails);
