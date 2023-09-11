import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import withAuthorization from "../../Components/withAuthorization";

function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({});

  const {
    userId,
    userName,
    userMobileNumber,
    emailId,
    // roles:"",
  } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // await axios.post(
    //   `http://localhost:8080/api/mtbs/users/showDetails/users/${userId}`,
    //   user
    // );

    axios.post(`http://localhost:8080/api/mtbs/users/showDetails/users/${userId}`, user , { 
          headers: {
                 'Content-Type': 'application/json', 
                 'Authorization': 'JWT fefege...'   
          }
             
       })

    navigate("/users");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add User</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="User Name" className="form-label">
                User Name
              </label>
              <input
                type={"date"}
                className="form-control"
                placeholder="Enter user name here"
                name="userName"
                value={userName}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Mobile Number" className="form-label">
                Mobile Number
              </label>
              <input
                type={"time"}
                className="form-control"
                placeholder="Enter Mobile Number here "
                name="userMobileNumber"
                value={userMobileNumber}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Email Id" className="form-label">
                Email Id
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter emailId here"
                name="emailId"
                value={emailId}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            {/* <div className="mb-3">
              <label htmlFor="User Status" className="form-label">
                User Status
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter userStatus here"
                name="userStatus"
                value={userStatus}
                onChange={(e) => onInputChange(e)}
              />
            </div> */}

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/users">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default withAuthorization(["ROLE_ADMIN"])(AddUser);
