import axios from "axios";

export const deleteUserByUserId = (userId) => {
  return axios({
    method: "DELETE",
    url: `http://localhost:8080/api/mtbs/users/${userId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getAllUsers = () => {
  return axios({
    method: "GET",
    url: "http://localhost:8080/api/mtbs/users/",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const getUserByUserId = (userId) => {
  return axios({
    method: "GET",
    url: `http://localhost:8080/api/mtbs/users/${userId}`,
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const addUser = (user) => {
  return axios.post("http://localhost:8080/api/mtbs/users/", user, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const updateUserByUserId = (userId, user) => {
  return axios.put(`http://localhost:8080/api/mtbs/users/${userId}`, user, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
    },
  });
};

export const sessionCheck = () => {
  if (sessionStorage.getItem("sessionToken") == null) {
    alert("invalid session, please login again");
    window.location.href = "http://localhost:3000/";
  }
};
