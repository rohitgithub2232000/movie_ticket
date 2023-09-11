import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import withAuthorization from "../../Components/withAuthorization";

import {
  updateTheatreByTheatreId,
  getTheatreByTheatreId,
  sessionCheck,
} from "./TheatreService";

function EditTheatre() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [theatre, setTheatre] = useState({
    theatreName: "",
    theatreLocation: "",
    seatsCapacity: "",
  });

  const { theatreName, theatreLocation, seatsCapacity } = theatre;

  const onInputChange = (e) => {
    setTheatre({ ...theatre, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    theatreRequest();
    loadTheatre(id);
  }, []);

  const theatreRequest = async () => {
    sessionCheck();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios;
    updateTheatreByTheatreId(id, theatre)
      .then((result) => {
        // alert("Movie updated successfully");
      })
      .catch((e) => {
        // alert(e.response.data.message);
      });
    navigate("/theatres");
    // return false;
  };

  const loadTheatre = async (id) => {
    theatreRequest(id);
    await axios;
    getTheatreByTheatreId(id)
      .then((result) => {
        setTheatre(result.data);
      })
      .catch((e) => {
        // alert(e.response.data.message);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Theatre</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Theatre Name" className="form-label">
                Theatre Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter theatre name here"
                name="theatreName"
                value={theatreName}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Theatre Location" className="form-label">
                Theatre Location
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Theatre Location here "
                name="theatreLocation"
                value={theatreLocation}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="Seats Capacity" className="form-label">
                Seats Capacity
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Seats Capacity here"
                name="seatsCapacity"
                value={seatsCapacity}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/theatres">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default withAuthorization(["ROLE_ADMIN"])(EditTheatre);
