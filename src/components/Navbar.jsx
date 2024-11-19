import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice.js";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Navbar = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const email = currentUser?.email || "User";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [arrow, setArrow] = useState(true);
  const dispatch = useDispatch();
  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setArrow(!arrow);
  };

  const handleLogout = () => {
    // console.log("User logged out");
    localStorage.removeItem("currentUser");
    dispatch(signOutSuccess());
  };

  return (
    <div className="top-0 py-1  w-full    lg:relative z-50 bg-mainBlue">
      <nav className="z-10 sticky top-0 left-0 right-0 max-w-4xl xl:max-w-5xl mx-auto px-5 py-2.5 lg:border-none ">
        <div className="flex items-center justify-between">
          <button>
            <div className="flex items-center space-x-2">
              <h2 className="text-White font-bold text-2xl">Naviquis </h2>
            </div>
          </button>

          <div className="hidden lg:block">
            <ul className="flex space-x-10 text-base font-bold text-White">
              <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                <Link to="/home">Home </Link>
              </li>
              <li className="hover:underline hover:underline-offset-4 hover:w-fit transition-all duration-100 ease-linear">
                <Link to="/dashboard">All Users</Link>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex lg:items-center gap-x-2 relative text-center ">
            <button
              className="flex items-center justify-center rounded-md text-white px-6 py-2.5 font-semibold hover:shadow-lg hover:drop-shadow transition duration-200 space-x-2"
              onClick={handleDropdown}
            >
              <span>{email}</span>
              {arrow ? (
                <IoIosArrowDown className="text-white" />
              ) : (
                <IoIosArrowUp className="text-white" />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-50">
                <ul className="py-2">
                  <li
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center lg:hidden">
            <button className="focus:outline-none text-slate-800">
              <FaBars className="text-2xl text-slate-800 focus:outline-none active:scale-110 active:text-red-500" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
