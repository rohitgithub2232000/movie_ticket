import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar() {
  let navigate = useNavigate();

  const logout = (props) => {
    console.log(props.number);
    if (window.confirm("Do you want to Log out?")) {
      sessionStorage.clear();
      toast.success("User Logged out Successfully", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
      navigate("/");
    } else {
      navigate("/home");
    }
    return false;
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      {/* <div className="container-fluid"> */}
      <div className="container">
        {sessionStorage.getItem("sessionToken") == null ? (
          <Link className="navbar-brand p-3" to="/">
            <b>Movie Ticket Booking System</b>
          </Link>
        ) : (
          <Link className="navbar-brand" to="/home">
            <b>Movie Ticket Booking System</b>
          </Link>
        )}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ADMIN NAVBAR */}
        {sessionStorage.getItem("sessionRole") === "ROLE_ADMIN" && (
          <div
            className="collapse navbar-collapse p-2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-1">
              <li className="nav-item">
                <Link className="nav-link active" to="/home">
                  <b>Home</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/movies">
                  <b>Movies</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/theatres">
                  <b>Theatres</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/showdetails">
                  <b>Show Details</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/bookings">
                  <b>Bookings</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/ratings">
                  <b>Ratings</b>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/users">
                  <b>Users</b>
                </Link>
              </li>
            </ul>
            <button
              className="btn btn-outline-light text-dark bg-light btn-space"
              onClick={logout}
              type="submit"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* USER NAVBAR */}
        {sessionStorage.getItem("sessionRole") === "ROLE_USER" && (
          <div
            className="collapse navbar-collapse p-2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-1">
              <li className="nav-item">
                <Link className="nav-link active " to="/home">
                  <b>Home</b>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" to="/bookinglist">
                  <b>Bookings</b>
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link active" to="/ratinglist">
                  <b>Ratings</b>
                </Link>
              </li>
              {/* <li className="nav-item">
                    <Link className="nav-link active" to="/edituser">
                      Profile
                    </Link>
                  </li> */}
            </ul>
            <button
              className="btn btn-outline-light text-dark bg-light btn-space"
              onClick={logout}
              type="submit"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
