import React, { useEffect, useState } from "react";
import withAuthorization from "../../withAuthorization";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  deleteBookingByBookingId,
  getAllBookings,
  sessionCheck,
} from "../../../Services/BookingService/BookingService";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [sortField, setSortField] = useState("index");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    bookingRequest();
    loadBookings(sortField, sortDirection);
  }, [sortField, sortDirection]);

  const bookingRequest = async () => {
    sessionCheck();
  };

  const loadBookings = async () => {
    bookingRequest();
    await axios;
    getAllBookings()
      .then((result) => {
        setBookings(result.data);
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.message);
      });
  };

  const deleteBooking = (bookingId) => {
    bookingRequest(bookingId);
    if (window.confirm("Do you want to delete?")) {
      deleteBookingByBookingId(bookingId)
        .then(() => {
          // alert("Booking Deleted Successfully");
          loadBookings();
        })
        .catch((e) => {
          console.log(e.response);
          // alert(e.response.data.message);
        });
    } else {
      loadBookings();
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="container-fluid mb-2 ">
          {/* <Link className="btn btn-primary" to="/addbooking">
            Add Booking
          </Link> */}
        </div>
        {!bookings.length ? (
          <p>There are no bookings to display.</p>
        ) : (
          <table className="table border shadow table-primary table-striped  ">
            <thead>
              <tr>
                <th scope="col">S.N.</th>
                <th scope="col">Booking Date</th>
                <th scope="col">Booking Time</th>
                <th scope="col">Show Details </th>
                {/* <th scope="col">User Details</th> */}
                <th scope="col">Ticket Count</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => {
                const {
                  bookingId,
                  bookingDate,
                  bookingTime,
                  ticketCount,
                  totalAmount,
                  // user,
                  showDetails,
                } = booking;
                return (
                  <tr key={bookingId}>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>
                      {bookingDate[0]}/{bookingDate[1]}/{bookingDate[2]}
                    </td>
                    <td>
                      {bookingTime[0]}:{bookingTime[1]}
                    </td>
                    <td>
                      <Link
                        className=""
                        to={`/viewshowDetail/${showDetails.showId}`}
                      >
                        {showDetails.showId}
                      </Link>
                    </td>
                    {/* <td>
                    <Link className="" to={`/viewshowDetail/${user.userId}`}>
                      {user.userIdId}
                    </Link>
                  </td> */}
                    <td>{ticketCount}</td>
                    <td>{totalAmount}</td>
                    <td>
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/viewbooking/${bookingId}`}
                      >
                        View
                      </Link>
                      <Link
                        className="btn btn-outline-primary mx-2"
                        to={`/editbooking/${bookingId}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteBooking(booking.bookingId)}
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
export default withAuthorization(["ROLE_ADMIN"])(Bookings);
