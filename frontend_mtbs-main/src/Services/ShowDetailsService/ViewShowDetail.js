import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getShowDetailsByShowId, sessionCheck } from "./ShowDetailsService";

export default function ViewShowDetail() {
  const [showDetail, setShowDetail] = useState({
    showDate: "",
    showStartTime: "",
    ticketRate: "",
    movieFormat: "",
    movieLanguage: "",
    movie: "",
    theatre: "",
  });

  const { id } = useParams();

  useEffect(() => {
    showDetailsRequest();
    loadShowDetail(id);
  }, []); //eslint-disable-next-line react-hooks/exhaustive-deps

  const showDetailsRequest = async () => {
    sessionCheck();
  };

  const loadShowDetail = async () => {
    showDetailsRequest();
    getShowDetailsByShowId(id)
      .then((result) => {
        setShowDetail(result.data);
      })
      .catch((e) => {
        // alert(e.response.data.message);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Show Details</h2>

          <div className="card">
            <div className="card-header">
              Details of ShowDetail Id : {showDetail.showId}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Show Date : </b>
                  {showDetail.showDate[0]}/{showDetail.showDate[1]}/
                  {showDetail.showDate[2]}
                </li>
                <li className="list-group-item">
                  <b>Show Time : </b>
                  {showDetail.showStartTime[0]}:{showDetail.showStartTime[1]}
                </li>
                <li className="list-group-item">
                  <b>Theatre Details : </b>
                  {showDetail.theatre.theatreName} -{" "}
                  {showDetail.theatre.theatreLocation}
                </li>
                <li className="list-group-item">
                  <b>Movie Details : </b>
                  {showDetail.movie.movieName}
                </li>
                <li className="list-group-item">
                  <b>Movie Format :</b>
                  {showDetail.movieFormat}
                </li>
                <li className="list-group-item">
                  <b>Movie Language :</b>
                  {showDetail.movieLanguage}
                </li>
                <li className="list-group-item">
                  <b>Movie Language :</b>
                  {showDetail.ticketRate}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/showDetails"}>
            Back to ShowDetails
          </Link>
        </div>
      </div>
    </div>
  );
}
