import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { sessionCheck } from "./BookingService";
import { toast } from "react-toastify";

export default function AddBooking() {
  let navigate = useNavigate();

  const [booking, setBooking] = useState({
    bookingDate: "",
    bookingTime: "",
    ticketCount: "",
    totalAmount: "",
  });

  const { id } = useParams();
  const userName = sessionStorage.getItem("sessionUserName");

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    bookingRequest();
  });

  const bookingRequest = async () => {
    sessionCheck();
  };

  const onSubmit = async (booking) => {
    bookingRequest();
    await axios
      .post(
        `http://localhost:8080/api/mtbs/bookings/showDetails/${id}/users/${userName}`,
        booking,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
          },
        }
      )
      .then((result) => {
        toast.success("Booking Added Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        alert("Booking added successfully");
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.message);
      });
    {
      sessionStorage.getItem("sessionRole") === "ROLE_ADMIN" &&
        navigate("/bookings");
    }
    {
      sessionStorage.getItem("sessionRole") === "ROLE_USER" &&
        navigate("/bookinglist");
    }
    // navigate("/bookings");

    // return false;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Booking</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="Booking Date" className="form-label">
                Booking Date
              </label>
              <input
                type={"date"}
                className={`form-control ${errors.bookingDate && "invalid"}`}
                placeholder="Enter Booking Date here"
                onChange={(e) =>
                  setBooking({ ...booking, bookingDate: e.target.value })
                }
                {...register("bookingDate", { required: true })}
                onKeyUp={() => trigger("bookingDate")}
              />
              {errors.bookingDate && (
                <p className="text-danger">{"Booking Date is not valid"}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Booking Time" className="form-label">
                Booking Time
              </label>
              <input
                type={"time"}
                className={`form-control ${errors.bookingTime && "invalid"}`}
                placeholder="Enter Booking Time here"
                onChange={(e) =>
                  setBooking({ ...booking, bookingTime: e.target.value })
                }
                {...register("bookingTime", { required: true })}
                onKeyUp={() => trigger("bookingTime")}
              />
              {errors.bookingTime && (
                <p className="text-danger">{"Booking Time is not valid"}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Tickets Count" className="form-label">
                Tickets Count
              </label>
              <input
                type={"number"}
                className={`form-control ${errors.ticketCount && "invalid"}`}
                placeholder="Enter ticket count here"
                onChange={(e) =>
                  setBooking({ ...booking, ticketCount: e.target.value })
                }
                {...register("ticketCount", {
                  required: true,
                  min: 1,
                  max: 200,
                  // max:{showDetails.availableSeats}
                  valueAsNumber: true,
                })}
                onKeyUp={() => trigger("ticketCount")}
              />
              {errors.ticketCount && errors.ticketCount.type === "required" && (
                <p className="text-danger">{"Ticket Count is required"}</p>
              )}
              {errors.ticketCount && errors.ticketCount.type === "min" && (
                <p className="text-danger">
                  {"Ticket Count should be greater than or equal to 1"}
                </p>
              )}
              {errors.ticketCount && errors.ticketCount.type === "max" && (
                <p className="text-danger">
                  {"Ticket Count should be less than or equal to 200"}
                </p>
              )}
              {errors.ticketCount &&
                errors.ticketCount.type === "valueAsNumber" && (
                  <p className="text-danger">{"Ticket Count is not valid"}</p>
                )}
            </div>

            {/* <div className="mb-3">
              <label htmlFor="Booking Status" className="form-label">
                Booking Status
              </label>
              <input
                type={"number"}
                className={`form-control ${errors.bookingStatus && "invalid"}`}
                placeholder="Enter ticket count here"
                onChange={(e) =>
                  setBooking({ ...booking, bookingStatus: e.target.value })
                }
                {...register("bookingStatus", { required: true })}
                onKeyUp={() => trigger("bookingStatus")}
              />
              {errors.bookingStatus && (
                <p className="text-danger">{"Booking Status is not valid"}</p>
              )}
            </div> */}

            <div className="mb-3">
              <label htmlFor="Booking Status" className="form-label">
                {/* Booking Status */}
              </label>
              <input
                type="hidden"
                className={`form-control ${errors.bookingStatus && "invalid"}`}
                onChange={(e) =>
                  setBooking({ ...booking, bookingStatus: e.target.value })
                }
                {...register("bookingStatus", { required: true })}
                value="0"
              />
              {errors.bookingStatus && (
                <p className="text-danger">{"Booking Status is not valid"}</p>
              )}
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/home">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
