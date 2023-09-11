import axios from "axios";
const userName = sessionStorage.getItem("sessionUserName");

export const deleteRatingByRatingId = (ratingId) => {
  return axios({
    method: "DELETE",
    url: `http://localhost:8080/api/mtbs/ratings/${ratingId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getAllRatings = () => {
  return axios({
    method: "GET",
    url: "http://localhost:8080/api/mtbs/ratings/",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getAllRatingsByUserName = () => {
  return axios({
    method: "GET",
    url: `http://localhost:8080/api/mtbs/search/ratings/${userName}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getRatingByRatingId = (ratingId) => {
  return axios({
    method: "GET",
    url: `http://localhost:8080/api/mtbs/ratings/${ratingId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const addRating = (rating) => {
  return axios.post("http://localhost:8080/api/mtbs/ratings/", rating, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const updateRatingByRatingId = (ratingId, rating) => {
  return axios.put(
    `http://localhost:8080/api/mtbs/ratings/${ratingId}`,
    rating,
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
