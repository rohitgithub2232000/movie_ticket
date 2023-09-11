import React, { useEffect, useState } from "react";
import axios from "axios";
import withAuthorization from "../../withAuthorization";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/api/mtbs/users/");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    // Need to check later
    await axios.delete(`http://localhost:8080/api/mtbs/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="container-fluid mb-2 ">
          {/* <Link className="btn btn-primary" to="/adduser">
            Add User
          </Link> */}
        </div>
        {!users.length ? (
          <p>There are no users to display.</p>
        ) : (
          <table className="table border shadow table-primary table-striped  ">
            <thead>
              <tr>
                <th scope="col">S.N.</th>
                <th scope="col">User Name</th>
                <th scope="col">Email Id</th>
                <th scope="col">Mobile Number </th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                const { userId, userName, userMobileNumber, emailId } = user;
                return (
                  <tr key={userId}>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{userName}</td>
                    <td>{emailId}</td>
                    <td>{userMobileNumber}</td>

                    <td>
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/viewuser/${userId}`}
                      >
                        View
                      </Link>
                      <Link
                        className="btn btn-outline-primary mx-2"
                        to={`/edituser/${userId}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-danger mx-2"
                        onClick={() => deleteUser(user.userId)}
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
export default withAuthorization(["ROLE_ADMIN"])(Users);
