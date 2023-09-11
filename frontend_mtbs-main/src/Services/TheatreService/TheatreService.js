import axios from "axios";

export const deleteTheatreByTheatreId = (theatreId) => {
  return axios({
    method: "DELETE",
    url: `http://localhost:8080/api/mtbs/theatres/${theatreId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getAllTheatres = () => {
  return axios({
    method: "GET",
    url: "http://localhost:8080/api/mtbs/theatres/",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getTheatreByTheatreId = (theatreId) => {
  return axios({
    method: "GET",
    url: `http://localhost:8080/api/mtbs/theatres/${theatreId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const addTheatre = (theatre) => {
  return axios.post("http://localhost:8080/api/mtbs/theatres/", theatre, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const updateTheatreByTheatreId = (theatreId, theatre) => {
  return axios.put(
    `http://localhost:8080/api/mtbs/theatres/${theatreId}`,
    theatre,
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
