import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Components/Layout/Navbar";
import Movies from "./Components/Admin/Movies/Movies";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddMovie from "./Services/MovieService/AddMovie";
import EditMovie from "./Services/MovieService/EditMovie";
import ViewMovie from "./Services/MovieService/ViewMovie";
import Theatres from "./Components/Admin/Theatres/Theatres";
import AddTheatre from "./Services/TheatreService/AddTheatre";
import EditTheatre from "./Services/TheatreService/EditTheatre";
import ViewTheatre from "./Services/TheatreService/ViewTheatre";
import ShowDetails from "./Components/Admin/ShowDetails/ShowDetails";
import AddShowDetail from "./Services/ShowDetailsService/AddShowDetail";
import EditShowDetail from "./Services/ShowDetailsService/EditShowDetail";
import ViewShowDetail from "./Services/ShowDetailsService/ViewShowDetail";
import Bookings from "./Components/Admin/Bookings/Bookings";
import ViewBooking from "./Services/BookingService/ViewBooking";
import EditBooking from "./Services/BookingService/EditBooking";
import AddBooking from "./Services/BookingService/AddBooking";
import Login from "./Components/Login/Login";
import Register from "./Components/Login/Register";
import Users from "./Components/Admin/Users/Users";
import EditUser from "./Services/UserService/EditUser";
import ViewUser from "./Services/UserService/ViewUser";
import AddUser from "./Services/UserService/AddUser";
import MovieList from "./Components/User/MovieList";
import ShowDetailList from "./Components/User/ShowDetailList";

import BookingList from "./Components/User/BookingList";
import Ratings from "./Components/Admin/Ratings/Ratings";
import withAuthorization from "./Components/withAuthorization";
import AddRating from "./Services/RatingService/AddRating";
import EditRating from "./Services/RatingService/EditRating";
import ViewRating from "./Services/RatingService/ViewRating";
import RatingList from "./Components/User/RatingList";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route
          exact
          path="/withAuthorization"
          element={<withAuthorization />}
        />

        <Route exact path="/movies" element={<Movies />} />

        <Route exact path="/addmovie" element={<AddMovie />} />
        <Route exact path="/editmovie/:id" element={<EditMovie />} />
        <Route exact path="/viewmovie/:id" element={<ViewMovie />} />

        <Route exact path="/theatres" element={<Theatres />} />
        <Route exact path="/addtheatre" element={<AddTheatre />} />
        <Route exact path="/edittheatre/:id" element={<EditTheatre />} />
        <Route exact path="/viewtheatre/:id" element={<ViewTheatre />} />

        <Route exact path="/showDetails" element={<ShowDetails />} />
        <Route exact path="/addshowDetail" element={<AddShowDetail />} />
        <Route exact path="/editshowDetail/:id" element={<EditShowDetail />} />
        <Route exact path="/viewshowDetail/:id" element={<ViewShowDetail />} />

        <Route exact path="/bookings" element={<Bookings />} />
        <Route exact path="/addbooking/:id" element={<AddBooking />} />
        <Route exact path="/editbooking/:id" element={<EditBooking />} />
        <Route exact path="/viewbooking/:id" element={<ViewBooking />} />

        <Route exact path="/ratings" element={<Ratings />} />
        <Route exact path="/addrating/:id" element={<AddRating />} />
        <Route exact path="/editrating/:id" element={<EditRating />} />
        <Route exact path="/viewrating/:id" element={<ViewRating />} />

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route exact path="/users" element={<Users />} />
        <Route exact path="/adduser" element={<AddUser />} />
        <Route exact path="/edituser/:id" element={<EditUser />} />
        <Route exact path="/viewuser/:id" element={<ViewUser />} />

        <Route exact path="/home" element={<MovieList />} />
        <Route exact path="/showdetaillist/:id" element={<ShowDetailList />} />
        <Route exact path="/bookinglist" element={<BookingList />} />
        <Route exact path="/ratinglist" element={<RatingList />} />
      </Routes>
    </Router>
  );
}

export default App;
