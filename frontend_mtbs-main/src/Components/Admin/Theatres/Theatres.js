import React, { useEffect, useState } from "react";
import axios from "axios";
import withAuthorization from "../../withAuthorization";
import { Link } from "react-router-dom";
import {
  deleteTheatreByTheatreId,
  getAllTheatres,
  sessionCheck,
} from "../../../Services/TheatreService/TheatreService";

function Theatres() {
  const [theatres, setTheatres] = useState([]);
  const [sortField, setSortField] = useState("index");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    theatreRequest();
    loadTheatres(sortField, sortDirection);
  }, [sortField, sortDirection]);

  const theatreRequest = async () => {
    sessionCheck();
  };

  const loadTheatres = async () => {
    theatreRequest();
    try {
      const result = await getAllTheatres();
      const sortedTheatres = result.data.sort((a, b) => {
        if (sortField === "theatreName") {
          return sortDirection === "asc"
            ? a.theatreName.localeCompare(b.theatreName)
            : b.theatreName.localeCompare(a.theatreName);
        } else if (sortField === "theatreLocation") {
          return sortDirection === "asc"
            ? a.theatreLocation.localeCompare(b.theatreLocation)
            : b.theatreLocation.localeCompare(a.theatreLocation);
        } else if (sortField === "seatsCapacity") {
          if (a.seatsCapacity === null || a.seatsCapacity === undefined) {
            return sortDirection === "asc" ? 1 : -1;
          }
          if (b.seatsCapacity === null || b.seatsCapacity === undefined) {
            return sortDirection === "asc" ? -1 : 1;
          }
          return sortDirection === "asc"
            ? a.seatsCapacity - b.seatsCapacity
            : b.seatsCapacity - a.seatsCapacity;
        } else {
          return sortDirection === "asc"
            ? a.index - b.index
            : b.index - a.index;
        }
      });
      setTheatres(sortedTheatres);
    } catch (e) {
      console.log(e);
      // alert(e.response.data.message);
    }
  };

  const deleteTheatre = async (theatreId) => {
    theatreRequest(theatreId);
    if (window.confirm("Do you want to delete?")) {
      deleteTheatreByTheatreId(theatreId)
        .then(() => {
          // alert("Theatre Deleted Successfully");
          loadTheatres();
        })
        .catch((e) => {
          console.log(e.response);
          // alert(e.response.data.message);
        });
    } else {
      loadTheatres();
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
          <Link className="btn btn-primary" to="/addtheatre">
            Add Theatre
          </Link>
        </div>
        {!theatres.length ? (
          <p>There are no theatres to display.</p>
        ) : (
          <table className="table border shadow table-primary table-striped  ">
            <thead>
              <tr>
                {/* <th scope="col">ID</th> */}
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

                {/* <th scope="col">Theatre Name</th> */}
                <th scope="col">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-1">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        onClick={() => toggleSort("theatreName")}
                      >
                        Theatre Name{" "}
                        {sortField === "theatreName" &&
                          (sortDirection === "asc" ? "▲" : "▼")}
                      </Link>
                    </li>
                  </ul>
                </th>

                {/* <th scope="col">Theatre Location</th> */}
                <th scope="col">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-1">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        onClick={() => toggleSort("theatreLocation")}
                      >
                        Theatre Location{" "}
                        {sortField === "theatreLocation" &&
                          (sortDirection === "asc" ? "▲" : "▼")}
                      </Link>
                    </li>
                  </ul>
                </th>

                {/* <th scope="col">Seats Capacity</th> */}
                <th scope="col">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-1">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        onClick={() => toggleSort("seatsCapacity")}
                      >
                        Seats Capacity{" "}
                        {sortField === "seatsCapacity" &&
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
              {theatres.map((theatre, index) => {
                const {
                  theatreId,
                  theatreName,
                  theatreLocation,
                  seatsCapacity,
                } = theatre;
                return (
                  <tr key={theatreId}>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>

                    <td>{theatreName}</td>
                    <td>{theatreLocation}</td>
                    <td>{seatsCapacity}</td>
                    <td>
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/viewtheatre/${theatreId}`}
                      >
                        View
                      </Link>
                      <Link
                        className="btn btn-outline-primary mx-2"
                        to={`/edittheatre/${theatreId}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteTheatre(theatre.theatreId)}
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
export default withAuthorization(["ROLE_ADMIN"])(Theatres);
