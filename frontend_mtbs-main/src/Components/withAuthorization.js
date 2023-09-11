import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sessionCheck } from "../Services/MovieService/MovieService";

const withAuthorization = (allowedRoles) => (WrappedComponent) => {
  const WithAuthorization = (props) => {
    const [authorized, setAuthorized] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
      autorizationRequest();

      // TODO: check if the user is authorized based on their role
      const userRole = sessionStorage.getItem("sessionRole");
      const isAuthorized = allowedRoles.includes(userRole);
      setAuthorized(isAuthorized);
    }, []);

    const autorizationRequest = async () => {
      sessionCheck();
    };

    // If the user is not authorized, render a message or redirect to a different page
    if (!authorized) {
      return (
        <div>
          {" "}
          <center>
            <h1>
              <b>Access Denied</b>
            </h1>
            <Link className="btn btn-primary mx-2" to="/home">
              Back To Home
            </Link>
          </center>
        </div>

        // <div className="unauthorized-access">
        //   <div className"w3-display-middle">
        //     <h1 className"w3-jumbo w3-animate-top w3-center">
        //       <code>Access Denied</code>
        //     </h1>
        //     <hr
        //       className"w3-border-white w3-animate-left"
        //       style="margin:auto;width:50%"
        //     />
        //     <h3 className"w3-center w3-animate-right">
        //       You dont have permission to view this site.
        //     </h3>
        //     <h3 className"w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
        //     <h6 className"w3-center w3-animate-zoom">error code:403 forbidden</h6>
        //   </div>
        // </div>
      );
    }

    // Otherwise, render the wrapped component with its original props
    return <WrappedComponent {...props} />;
  };

  return WithAuthorization;
};

export default withAuthorization;
