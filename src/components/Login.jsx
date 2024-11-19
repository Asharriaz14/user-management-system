import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../redux/user/userSlice.js";

import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const navigate = useNavigate();
  const loginToken = "token-" + Date.now() + "";
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log("formData======",formData);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      return setErrorMessage("Please fill all fields");
    }
    if (email === "admin@example.com" && password === "password123") {
      const userData = {
        email,
        token: loginToken,
        islogin: true,
      };
      dispatch(signInStart());
      try {
        dispatch(signInSuccess(userData));
        // localStorage.setItem("currentUser", JSON.stringify(userData));
        alert("Login Successful");
        navigate("/home");
      } catch (error) {
        dispatch(signInFailure(error.message));
        setErrorMessage("Some inconvience occured. Try again!");
      }
    } else {
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };
  return (
    <>
      <div className="grident-color h-screen flex justify-center items-center w-full">
        <form onSubmit={handleSubmit}>
          <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
            <div className="space-y-4">
              <h1 className="text-center text-2xl font-bold text-mainBlue">
                Login
              </h1>
              <hr />
              {errorMessage && (
                <div className="text-red-700 text-sm"> {errorMessage}</div>
              )}
              <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                <MdEmail className="h-5 w-5 text-hoverBlue" />
                <input
                  className="pl-2 outline-none border-none w-full"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center border-2 py-2 px-3 rounded-md">
                <RiLockPasswordFill className="h-5 w-5 text-hoverBlue" />
                <input
                  className="pl-2 outline-none border-none w-full"
                  type={passwordVisible ? "password" : "text"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="ml-2 text-hoverBlue focus:outline-none"
                >
                  {passwordVisible ? (
                    <AiFillEye className="h-5 w-5" />
                  ) : (
                    <AiFillEyeInvisible className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              value="login"
              id="login"
              className="mt-6 w-full shadow-xl bg-mainBlue hover:bg-hoverBlue text-White py-2 rounded-md text-lg tracking-wide transition duration-1000"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
