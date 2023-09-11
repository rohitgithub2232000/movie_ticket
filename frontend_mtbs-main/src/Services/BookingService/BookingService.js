import axios from "axios";
const userName = sessionStorage.getItem("sessionUserName");

export const deleteBookingByBookingId = (bookingId) => {
  return axios({
    method: "DELETE",
    url: `http://localhost:8080/api/mtbs/bookings/${bookingId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getAllBookings = () => {
  return axios({
    method: "GET",
    url: "http://localhost:8080/api/mtbs/bookings/",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getBookingByBookingId = (bookingId) => {
  return axios({
    method: "GET",
    url: `http://localhost:8080/api/mtbs/bookings/${bookingId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getAllBookingsByUserName = () => {
  return axios({
    method: "GET",
    url: `http://localhost:8080/api/mtbs/search/bookings/${userName}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const addBooking = (booking) => {
  return axios.post("http://localhost:8080/api/mtbs/bookings/", booking, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const updateBookingByBookingId = (bookingId, booking) => {
  return axios.put(
    `http://localhost:8080/api/mtbs/bookings/${bookingId}`,
    booking,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
      },
    }
  );
};

export const sessionCheck = () => {
  if (sessionStorage.getItem("sessionToken") == null) {
    alert("invalid session, please login again");
    window.location.href = "http://localhost:3000/";
  }
};
