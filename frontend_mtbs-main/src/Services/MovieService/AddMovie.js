import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { sessionCheck } from "./MovieService";
import { toast } from "react-toastify";
import withAuthorization from "../../Components/withAuthorization";
import Dropzone from "react-dropzone";

function AddMovie() {
  let navigate = useNavigate();

  const [movie, setMovie] = useState({
    movieName: "",
    releaseDate: "",
    duration: "",
    description: "",
    genre: "",
    image: null,
  });

  const [image, setImage] = useState(null);

  const {
    trigger,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    movieRequest();
  }, []);

  const movieRequest = async () => {
    sessionCheck();
  };

  const onSubmit = async (movie) => {
    console.log(movie);
    movieRequest();
    const formData = new FormData();
    formData.append("movie", JSON.stringify(movie));
    formData.append("image", image);

    await axios
      .post("http://localhost:8080/api/mtbs/movies/", formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("sessionToken")}`,
          "Content-Type": `multipart/form-data;boundary=` + formData._boundary,
        },
      })
      .then((result) => {
        toast.success("Movie Added Successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
        // alert("Movie added successfully");
        navigate("/movies");

        return false;
      })
      .catch((e) => {
        console.log(e);
        alert(e.response.data.message);
      });
  };
  // const handleFileUpload = (event) => {
  //   setMovie({ ...movie, imageFile: event.target.files[0] });
  // };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Movie</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="Movie Name" className="form-label">
                Movie Name
              </label>
              <input
                type={"text"}
                className={`form-control ${errors.movieName && "invalid"}`}
                placeholder="Enter movie name here"
                onChange={(e) =>
                  setMovie({ ...movie, movieName: e.target.value })
                }
                {...register("movieName", {
                  required: true,
                  maxLength: 50,
                  pattern: /^[a-zA-Z0-9_ ]*$/,
                })}
                onKeyUp={() => trigger("movieName")}
              />
              {errors.movieName && errors.movieName.type === "required" && (
                <p className="text-danger">{"Movie Name is required"}</p>
              )}
              {errors.movieName && errors.movieName.type === "maxLength" && (
                <p className="text-danger">
                  {"Movie Name should not exceed 50 characters"}
                </p>
              )}
              {errors.movieName && errors.movieName.type === "pattern" && (
                <p className="text-danger">{"Movie Name is not valid"}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Release Date" className="form-label">
                Release Date
              </label>
              <input
                type={"date"}
                className={`form-control ${errors.releaseDate && "invalid"}`}
                placeholder="Enter Release Date here "
                onChange={(e) =>
                  setMovie({ ...movie, releaseDate: e.target.value })
                }
                {...register("releaseDate", {
                  required: true,
                  pattern: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
                  maxLength: 10,
                })}
                onKeyUp={() => trigger("releaseDate")}
              />
              {errors.releaseDate && errors.releaseDate.type === "required" && (
                <p className="text-danger">{"Release Date is required"}</p>
              )}
              {errors.releaseDate &&
                errors.releaseDate.type === "maxLength" && (
                  <p className="text-danger">
                    {"Release Date should not exceed 10 characters"}
                  </p>
                )}
              {errors.releaseDate && errors.releaseDate.type === "pattern" && (
                <p className="text-danger">{"Release Date is not valid"}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Duration" className="form-label">
                Duration (in minutes)
              </label>
              <input
                type={"number"}
                className={`form-control ${errors.duration && "invalid"}`}
                placeholder="Enter duration here"
                onChange={(e) =>
                  setMovie({ ...movie, duration: e.target.value })
                }
                {...register("duration", {
                  required: true,
                  min: 60,
                  max: 200,
                  valueAsNumber: true,
                })}
                onKeyUp={() => trigger("duration")}
              />
              {errors.duration && errors.duration.type === "required" && (
                <p className="text-danger">{"Duration is required"}</p>
              )}
              {errors.duration && errors.duration.type === "max" && (
                <p className="text-danger">
                  {"Duration should not exceed 200 minutes"}
                </p>
              )}
              {errors.duration && errors.duration.type === "min" && (
                <p className="text-danger">
                  {"Duration should be greater than or equal to 60 minutes"}
                </p>
              )}
              {errors.duration && errors.duration.type === "valueAsNumber" && (
                <p className="text-danger">{"Duration is not valid"}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Description" className="form-label">
                Description
              </label>
              <input
                type={"text"}
                className={`form-control ${errors.description && "invalid"}`}
                placeholder="Enter description here"
                onChange={(e) =>
                  setMovie({ ...movie, description: e.target.value })
                }
                {...register("description", {
                  required: true,
                  maxLength: 500,
                  pattern: /^[a-zA-Z0-9_ @?,.;:"'#$%^&*()_\-+=[]{}<>|]*$/,
                })}
                onKeyUp={() => trigger("description")}
              />
              {errors.description && errors.description.type === "required" && (
                <p className="text-danger">{"Description is required"}</p>
              )}
              {errors.description &&
                errors.description.type === "maxLength" && (
                  <p className="text-danger">
                    {"Description should not exceed 500 characters"}
                  </p>
                )}
              {errors.description && errors.description.type === "pattern" && (
                <p className="text-danger">
                  {
                    "Description should only contain letters, numbers, spaces, and the following symbols: @, ?, ,, ., ;, :, \", ', #, $, %, ^, &, *, (, ), _, -, +, =, [, ], {, }, <, >, /, \\, |"
                  }
                </p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Genre" className="form-label">
                Genre
              </label>
              <input
                type={"text"}
                className={`form-control ${errors.genre && "invalid"}`}
                placeholder="Enter genre here"
                onChange={(e) => setMovie({ ...movie, genre: e.target.value })}
                {...register("genre", {
                  required: true,
                  maxLength: 20,
                  pattern: /^[a-zA-Z0-9 ]*$/,
                })}
                onKeyUp={() => trigger("genre")}
              />
              {errors.genre && errors.genre.type === "required" && (
                <p className="text-danger">{"Genre is required"}</p>
              )}
              {errors.genre && errors.genre.type === "maxLength" && (
                <p className="text-danger">
                  {"Genre should not exceed 20 characters"}
                </p>
              )}
              {errors.genre && errors.genre.type === "pattern" && (
                <p className="text-danger">{"Genre is not valid"}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="Image" className="form-label">
                Image
              </label>
              <Dropzone
                onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                accept=".jpeg, .png"
                maxSize={3 * 1024 * 1024}
                multiple={false}
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="mb-3">
                    <input {...getInputProps()} />
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Selected Pic"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                    ) : (
                      <p>Drag and drop an image or click to select a file.</p>
                    )}
                  </div>
                )}
              </Dropzone>
              {errors.image && errors.image.type === "required" && (
                <p className="text-danger">{"Image is required"}</p>
              )}
              {errors.image && errors.image.type === "validateFileType" && (
                <p className="text-danger">
                  {"Image should be in JPEG or PNG format"}
                </p>
              )}
              {errors.image && errors.image.type === "validateFileSize" && (
                <p className="text-danger">
                  {"Image size should be less than 3MB"}
                </p>
              )}
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/movies">
              Cancel
            </Link>
          </form>
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default withAuthorization(["ROLE_ADMIN"])(AddMovie);
