import axios from "axios";

export const deleteMovieByMovieId = (movieId) => {
  return axios({
    method: "DELETE",
    url: `http://localhost:8080/api/mtbs/movies/${movieId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getAllMovies = () => {
  return axios({
    method: "GET",
    url: "http://localhost:8080/api/mtbs/movies/",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getMovieByMovieId = (movieId) => {
  return axios({
    method: "GET",
    url: `http://localhost:8080/api/mtbs/movies/${movieId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getMovieWithImageByMovieId = (movieId) => {
  return axios({
    method: "GET",
    url: `http://localhost:8080/api/mtbs/movies/images/${movieId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const addMovie = (movie) => {
  return axios.post("http://localhost:8080/api/mtbs/movies/", movie, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const updateMovieByMovieId = (movieId, movie) => {
  return axios.put(
    `http://localhost:8080/api/mtbs/movies/${movieId}`,
    movie,
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
