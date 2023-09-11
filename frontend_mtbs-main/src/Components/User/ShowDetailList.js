import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

export default function ShowDetailList() {
  const [showDetails, setShowDetails] = useState([]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const { id } = useParams();

  useEffect(() => {
    loadShowDetails();
  }, []);

  const loadShowDetails = async () => {
    const result = await axios.get(
      `http://localhost:8080/api/mtbs/search/showDetails/${id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
        },
      }
    );
    setShowDetails(result.data);
    console.log(id);
  };

  const setStartDate = (date) => {
    setSelectedDate(date);
    const format = moment(date).format("yyyy-MM-DD");
    setShowDetails(
      showDetails.filter((show) => {
        let day = show.showDate[2];
        let month = show.showDate[1];
        if (show.showDate[1] < 10) {
          month = "0" + show.showDate[1];
        }
        if (show.showDate[2] < 10) {
          day = "0" + show.showDate[2];
        }
        const newDate = show.showDate[0] + "-" + month + "-" + day;
        console.log(newDate, format);
        return newDate === format.toString();
      })
    );
  };
  return (
    <div className="container">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="yyyy-MM-dd"
      />
      {!showDetails.length ? (
        <p>There are no Shows to display.</p>
      ) : (
        <div className="row p-2">
          {showDetails.map((showDetail, index) => {
            const {
              showId,
              showDate,
              showStartTime,
              ticketRate,
              movieFormat,
              movieLanguage,
              movie,
              theatre,
            } = showDetail;
            return (
              // <div className="container">

              <div className="card" key={index}>
                <div className="card-header">
                  <b>Show Details </b>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <b>Show Date : </b>
                      {showDate[0]}/{showDate[1]}/{showDate[2]}
                    </li>
                    <li className="list-group-item">
                      <b>Show Time : </b>
                      {showStartTime[0]}:{showStartTime[1]}
                    </li>
                    <li className="list-group-item">
                      <b>Theatre Details : </b>
                      {theatre.theatreName} - {theatre.theatreLocation}
                    </li>
                    <li className="list-group-item">
                      <b>Movie Details : </b>
                      {movie.movieName} / {movieFormat} / {movieLanguage} /{" "}
                      {movie.duration} mins
                    </li>

                    <li className="list-group-item">
                      <b>Ticket Rate :</b>
                      {ticketRate}
                    </li>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/addbooking/${showId}`}
                    >
                      Book Ticket
                    </Link>
                  </ul>
                </div>
              </div>
              // </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
