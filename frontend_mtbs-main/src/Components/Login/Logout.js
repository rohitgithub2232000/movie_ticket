import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export const Logout = () => {
  let navigate = useNavigate();

  if (window.confirm("Do you want to Log out?")) {
    sessionStorage.clear();
    toast.success("User Logged out Successfully", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
    navigate("/");

  } else {
    navigate("/home");
  }
};

