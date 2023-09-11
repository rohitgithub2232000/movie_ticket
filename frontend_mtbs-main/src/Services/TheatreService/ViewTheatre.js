import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTheatreByTheatreId, sessionCheck } from "./TheatreService";

export default function ViewTheatre() {
  const [theatre, setTheatre] = useState({
    theatreName: "",
    theatreLocation: "",
    seatsCapacity: "",
  });

  const { id } = useParams();

  useEffect(() => {
    theatreRequest();
    loadTheatre(id);
  }, []);

  const theatreRequest = async () => {
    sessionCheck();
  };

  const loadTheatre = async (id) => {
    theatreRequest();
    await axios;
    getTheatreByTheatreId(id)
      .then((result) => {
        setTheatre(result.data);
      })
      .catch((e) => {
        console.log(e);
        // alert(e.response.data.message);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Theatre Details</h2>

          <div className="card">
            <div className="card-header">
              <ul className="list-group list-group-flush">
                {sessionStorage.getItem("sessionRole") === "ROLE_ADMIN" && (
                  <li className="list-group-item">
                    <b>Details of theatre id : : </b>
                    {theatre.theatreId}
                  </li>
                )}
                <li className="list-group-item">
                  <b>Theatre Name : </b>
                  {theatre.theatreName}
                </li>
                <li className="list-group-item">
                  <b>Theatre Location : </b>
                  {theatre.theatreLocation}
                </li>
                <li className="list-group-item">
                  <b>Seats Capacity : </b>
                  {theatre.seatsCapacity}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/theatres"}>
            Back to Theatres
          </Link>
        </div>
      </div>
    </div>
  );
}
