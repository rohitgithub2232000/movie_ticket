import axios from "axios";

export const deleteShowDetailsByShowId = (showId) => {
  return axios({
    method: "DELETE",
    url: `http://localhost:8080/api/mtbs/showDetails/${showId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getAllShowDetails = () => {
  return axios({
    method: "GET",
    url: "http://localhost:8080/api/mtbs/showDetails/",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getShowDetailsByShowId = (showId) => {
  return axios({
    method: "GET",
    url: `http://localhost:8080/api/mtbs/showDetails/${showId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const addShowDetails = (user) => {
  return axios.post("http://localhost:8080/api/mtbs/showDetails/", user, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const updateShowDetailsByShowId = (showId, user) => {
  return axios.put(
    `http://localhost:8080/api/mtbs/showDetails/${showId}`,
    user,
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
