import { useState } from "react";
import { useAuthDispatch, useAuthState } from "./context/AuthContext";
import { logout } from "./context/actons";
import { ReactComponent as Logo } from "../images/pin-svgrepo-com.svg";
import { Link } from "react-router-dom";

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const providerName = "auth0";

const Nav = () => {
  const { isLoggedIn } = useAuthState();
  const dispatch = useAuthDispatch();
  const [isHidden, setIsHidden] = useState(true);

  return (
    <nav className="bg-gray-100">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* <!--     logo --> */}
            <div>
              <Link to="/">
                <a
                  href=""
                  className="flex items-center py-4 px-2 text-gray-700"
                >
                  <Logo className="w-8 mr-2" />
                  <span className="font-bold">Picterest</span>
                </a>
              </Link>
            </div>

            {/* Primary nav */}
            <div className="flex items-center space-x-1 hidden md:flex">
              <Link to="/">
                <a href="" className="py-4 px-2 text-gray-700">
                  All
                </a>
              </Link>
              {isLoggedIn && (
                <Link to="/mypins" className="py-4 px-2 text-gray-700">
                  My Pins
                </Link>
              )}
            </div>
          </div>
          {/* Secondary nav */}
          <div className="flex items-center space-x-1 hidden md:flex">
            {!isLoggedIn ? (
              <a
                href={`${backendUrl}/connect/${providerName}`}
                className="py-2 px-3 bg-yellow-400 text-yellow-900 rounded hover:text-gray-900 hover:bg-yellow-300 transition duration-300"
              >
                Login
              </a>
            ) : (
              <button
                onClick={() => logout(dispatch)}
                className="py-2 px-3 bg-gray-700 text-white rounded  hover:bg-gray-900 transition duration-300"
              >
                Logout
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="mobile-menu-button"
              onClick={() => setIsHidden(!isHidden)}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* <!--   mobile menu --> */}
      <div className={`${isHidden && "hidden"} mobile-menu md:hidden`}>
        <a href="" className="block py-2 px-4">
          All
        </a>
        {isLoggedIn && (
          <a href="" className="block py-2 px-4">
            My pins
          </a>
        )}
      </div>
    </nav>
  );
};

export default Nav;
