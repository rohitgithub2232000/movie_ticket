// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function Navbary() {
//   let navigate = useNavigate();
//   const userName = sessionStorage.getItem("sessionUserName");
//   const role = sessionStorage.getItem("sessionRole");

//   const logout = () => {
//     if (window.confirm("Do you want to Log out?")) {
//       sessionStorage.clear();
//       toast.success("User Logged out Successfully", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: 1000,
//       });
//       navigate("/");
//     } else {
//       navigate("/home");
//     }
//     return false;
//   };
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//       {/* <div className="container-fluid"> */}
//       <div className="container">
//         {sessionStorage.getItem("sessionToken") == null ? (
//           <Link className="navbar-brand" to="/">
//             MTBS App
//           </Link>
//         ) : (
//           <Link className="navbar-brand" to="/home">
//             MTBS App
//           </Link>
//           {sessionStorage.getItem("sessionRole") === "ROLE_USER" ? (
//             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//               <ul className="navbar-nav me-auto mb-2 mb-lg-1">
//                 <li className="nav-item">
//                   <Link className="nav-link active" to="/home">
//                     Movies
//                   </Link>
//                 </li>

//                 <li className="nav-item">
//                   <Link className="nav-link active" to="/bookinglist">
//                     Bookings
//                   </Link>
//                 </li>

//                 <li className="nav-item">
//                   <Link className="nav-link active" to="/ratinglist">
//                     Ratings
//                   </Link>
//                 </li>
//                 {/* <li className="nav-item">
//                       <Link className="nav-link active" to="/edituser">
//                         Profile
//                       </Link>
//                     </li> */}
//               </ul>
//               <button
//                 className="btn btn-outline-light text-dark bg-light btn-space"
//                 onClick={logout}
//                 type="submit"
//               >
//                 Sign Out
//               </button>
//             </div>
//           )
//         (<div className="container">
//         <button
//           className="navbar-toggler"
//           type="button"
//           data-bs-toggle="collapse"
//           data-bs-target="#navbarSupportedContent"
//           aria-controls="navbarSupportedContent"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//         >
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div
//           className="collapse navbar-collapse"
//           id="navbarSupportedContent"
//         >
//           <ul className="navbar-nav me-auto mb-2 mb-lg-1">
//             <li className="nav-item">
//               <Link className="nav-link active" to="/home">
//                 Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link active" to="/movies">
//                 Movies
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link active" to="/theatres">
//                 Theatres
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link active" to="/showdetails">
//                 Show Details
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link active" to="/bookings">
//                 Bookings
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link active" to="/users">
//                 Users
//               </Link>
//             </li>
//           </ul>
//           <button
//             className="btn btn-outline-light text-dark bg-light btn-space"
//             onClick={logout}
//             type="submit"
//           >
//             Sign Out
//           </button>
//         </div>
//       </div>
//       )}

//         )}

//       </div>
//     </nav>
//   );
// }
