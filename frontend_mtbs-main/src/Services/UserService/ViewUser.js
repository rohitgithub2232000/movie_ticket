import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    userId: "",
    userName: "",
    userMobileNumber: "",
    emailId: "",
    // roles:"",
  });

  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []); //eslint-disable-next-line react-hooks/exhaustive-deps

  const loadUser = async () => {
    const result =
      await axios.get(`http://localhost:8080/api/mtbs/users/${id}
`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Users</h2>

          <div className="card">
            <div className="card-header">
              Details of User Id : {user.userId}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>User Name : </b>
                  {user.userName}
                </li>
                <li className="list-group-item">
                  <b>Mobile Number : </b>
                  {user.userMobileNumber}
                </li>
                <li className="list-group-item">
                  <b>Email Id : </b>
                  {user.emailId}
                  <br />
                </li>
                {/* <li className="list-group-item">
                  <b>Theatre Details : </b>
                  {user.showDetails.theatre.theatreName} -{" "}
                  {user.showDetails.theatre.theatreLocation}
                </li> */}
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/users"}>
            Back to Users
          </Link>
        </div>
      </div>
    </div>
  );
}
