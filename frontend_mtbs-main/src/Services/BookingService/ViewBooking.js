import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBookingByBookingId, sessionCheck } from "./BookingService";

export default function ViewBooking() {
  const [booking, setBooking] = useState({
    bookingDate: "",
    bookingTime: "",
    ticketCount: "",
    totalAmount: "",
    showDetails: {
      showDate: "",
      showStartTime: "",
      movie: {
        movieName: "",
      },
      theatre: {
        theatreName: "",
        theatreLocation: "",
      },
    },
    user: { userName: "" },
  });

  const { id } = useParams();

  useEffect(() => {
    bookingRequest();
    loadBooking(id);
  }, []); //eslint-disable-next-line react-hooks/exhaustive-deps

  const bookingRequest = async () => {
    sessionCheck();
  };

  const loadBooking = async (id) => {
    bookingRequest(id);
    await axios;
    getBookingByBookingId(id)
      .then((result) => {
        setBooking(result.data);
      })
      .catch((e) => {
        // alert(e.response.data.message);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Bookings</h2>

          <div className="card">
            <div className="card-header">
              <ul className="list-group list-group-flush">
                {sessionStorage.getItem("sessionRole") === "ROLE_ADMIN" && (
                  <li className="list-group-item">
                    <b>Details of Booking Id : </b>
                    {booking.bookingId}
                  </li>
                )}
                <li className="list-group-item">
                  <b>Booking Date : </b>
                  {booking.bookingDate[0]}/{booking.bookingDate[1]}/
                  {booking.bookingDate[2]}
                </li>
                <li className="list-group-item">
                  <b>Booking Time : </b>
                  {booking.bookingTime[0]}:{booking.bookingTime[1]}
                </li>
                <li className="list-group-item">
                  <b>Show Details : </b> <br />
                  {sessionStorage.getItem("sessionRole") === "ROLE_ADMIN" && (
                    <div>
                      Show Id : {booking.showDetails.showId}
                      <br />
                    </div>
                  )}
                  Show Date : {booking.showDetails.showDate[0]}/
                  {booking.showDetails.showDate[1]}/
                  {booking.showDetails.showDate[2]}
                  <br />
                  Show Time :{booking.showDetails.showStartTime[0]}:
                  {booking.showDetails.showStartTime[1]}
                </li>
                <li className="list-group-item">
                  <b>Theatre Details : </b>
                  {booking.showDetails.theatre.theatreName} -{" "}
                  {booking.showDetails.theatre.theatreLocation}
                </li>
                <li className="list-group-item">
                  <b>Movie Details : </b>
                  {booking.showDetails.movie.movieName}
                </li>
                <li className="list-group-item">
                  <b>Movie Format : </b>
                  {booking.showDetails.movieFormat}
                </li>
                <li className="list-group-item">
                  <b>Movie Language : </b>
                  {booking.showDetails.movieLanguage}
                </li>
                <li className="list-group-item">
                  <b>Ticket Count : </b>
                  {booking.ticketCount}
                </li>
                <li className="list-group-item">
                  <b>Total Amount : </b>
                  {booking.totalAmount}
                </li>
                <li className="list-group-item">
                  {sessionStorage.getItem("sessionRole") === "ROLE_ADMIN" && (
                    <div>
                      <b>User Name : </b> {booking.user.userName}
                      <br />
                    </div>
                  )}
                </li>
              </ul>
            </div>
          </div>
          {sessionStorage.getItem("sessionRole") === "ROLE_ADMIN" && (
            <Link className="btn btn-primary my-2" to={"/bookings"}>
              Back to Bookings
            </Link>
          )}
          {sessionStorage.getItem("sessionRole") === "ROLE_USER" && (
            <Link className="btn btn-primary my-2" to={"/bookinglist"}>
              Back to Bookings
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
