import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function AddBookingAdmin() {
  let navigate = useNavigate();

  const [booking, setBooking] = useState({});

  const userName = sessionStorage.getItem("sessionUserName");

  console.log(userName);
  const { bookingDate, bookingTime, ticketCount, bookingStatus, showId } =
    booking;

  const onInputChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      `http://localhost:8080/api/mtbs/bookings/showDetails/${showId}/users/${userName}`,
      booking
    );
    navigate("/bookinglist");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Booking</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Booking Date" className="form-label">
                Booking Date
              </label>
              <input
                type={"date"}
                className="form-control"
                placeholder="Enter booking date here"
                name="bookingDate"
                value={bookingDate}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Booking Time" className="form-label">
                Booking Time
              </label>
              <input
                type={"time"}
                className="form-control"
                placeholder="Enter Booking Time here "
                name="bookingTime"
                value={bookingTime}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Ticket Count" className="form-label">
                Ticket Count
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter ticketCount here"
                name="ticketCount"
                value={ticketCount}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Booking Status" className="form-label">
                Booking Status
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter bookingStatus here"
                name="bookingStatus"
                value={bookingStatus}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/movielist">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
