import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditBooking() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [booking, setBooking] = useState({
    bookingDate: "",
    bookingTime: "",
    ticketCount: "",
    bookingStatus: "",
    showDetails: {
      showId: "",
    },
    user: {
      userId: "",
    },
  });

  const {
    bookingDate,
    bookingTime,
    ticketCount,
    bookingStatus,
    showDetails,
    user,
    showId,
    userId,
  } = booking;

  const onInputChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadBooking();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `http://localhost:8080/api/mtbs/bookings/${id}`,
      booking
    );
    navigate("/bookings");
  };

  const loadBooking = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/mtbs/bookings/${id}`
    );
    setBooking(result.data);
    console.log(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Booking</h2>

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
                disabled="disabled"
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Show Id" className="form-label">
                Show Id
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter show Id here"
                name="showId"
                value={showDetails.showId}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            {sessionStorage.getItem("sessionRole") === "ROLE_ADMIN" && (
              <Link className="btn btn-outline-danger mx-2" to="/bookings">
                Cancel
              </Link>
            )}
            {sessionStorage.getItem("sessionRole") === "ROLE_USER" && (
              <Link className="btn btn-outline-danger mx-2" to="/bookinglist">
                Cancel
              </Link>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
