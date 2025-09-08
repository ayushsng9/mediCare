import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../store/appSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {token, userProfileData} = useSelector((state) => state.apps);
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    dispatch(setToken(""));
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-36 sm:w-48 md:w-60 cursor-pointer flex-shrink-0"
        src={assets.logo}
        alt="Logo"
      />
      
      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={"/"} className={({isActive}) => isActive ? "text-indigo-600" : "hover:text-indigo-600"}>
          <li className="py-1">HOME</li>
        </NavLink>
        <NavLink to={"/doctors"} className={({isActive}) => isActive ? "text-indigo-600" : "hover:text-indigo-600"}>
          <li className="py-1">ALL DOCTORS</li>
        </NavLink>
        <NavLink to={"/about"} className={({isActive}) => isActive ? "text-indigo-600" : "hover:text-indigo-600"}>
          <li className="py-1">ABOUT</li>
        </NavLink>
        <NavLink to={"/contact"} className={({isActive}) => isActive ? "text-indigo-600" : "hover:text-indigo-600"}>
          <li className="py-1">CONTACT</li>
        </NavLink>
      </ul>

      {/* Right side content */}
      <div className="flex items-center gap-2 sm:gap-4">
        {token ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover" 
              src={userProfileData ? userProfileData.image : assets.profile_pic} 
              alt="Profile" 
            />
            <img className="w-2.5 hidden sm:block" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-12 sm:pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg border">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer transition-colors"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer transition-colors"
                >
                  My Appointments
                </p>
                <p
                  onClick={handleLogout}
                  className="hover:text-black cursor-pointer transition-colors"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-500 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full font-light hidden sm:block hover:bg-indigo-600 transition-colors"
          >
            Create account
          </button>
        )}
        
        {/* Mobile menu button */}
        <button
          onClick={() => setShowMenu(true)}
          className="w-6 h-6 md:hidden flex-shrink-0"
          aria-label="Open menu"
        >
          <img src={assets.menu_icon} alt="" className="w-full h-full" />
        </button>

        {/* Mobile Menu Overlay */}
        {showMenu && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div 
              className="fixed inset-0 bg-black bg-opacity-25" 
              onClick={() => setShowMenu(false)}
            ></div>
            <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl">
              <div className="flex items-center justify-between px-5 py-6 border-b">
                <img className="w-32" src={assets.logo} alt="Logo" />
                <button
                  className="w-7 h-7 p-1"
                  onClick={() => setShowMenu(false)}
                  aria-label="Close menu"
                >
                  <img src={assets.cross_icon} alt="" className="w-full h-full" />
                </button>
              </div>
              
              <div className="px-5 py-6">
                <ul className="flex flex-col gap-6 text-lg font-medium">
                  <NavLink 
                    onClick={() => setShowMenu(false)} 
                    to="/"
                    className={({isActive}) => `block py-2 ${isActive ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"} transition-colors`}
                  >
                    HOME
                  </NavLink>
                  <NavLink 
                    onClick={() => setShowMenu(false)} 
                    to="/doctors"
                    className={({isActive}) => `block py-2 ${isActive ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"} transition-colors`}
                  >
                    ALL DOCTORS
                  </NavLink>
                  <NavLink 
                    onClick={() => setShowMenu(false)} 
                    to="/about"
                    className={({isActive}) => `block py-2 ${isActive ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"} transition-colors`}
                  >
                    ABOUT
                  </NavLink>
                  <NavLink 
                    onClick={() => setShowMenu(false)} 
                    to="/contact"
                    className={({isActive}) => `block py-2 ${isActive ? "text-indigo-600" : "text-gray-700 hover:text-indigo-600"} transition-colors`}
                  >
                    CONTACT
                  </NavLink>
                </ul>
                
                {/* Mobile menu user actions */}
                {token ? (
                  <div className="mt-8 pt-6 border-t">
                    <div className="flex items-center gap-3 mb-6">
                      <img 
                        className="w-10 h-10 rounded-full object-cover" 
                        src={userProfileData ? userProfileData.image : assets.profile_pic} 
                        alt="Profile" 
                      />
                      <span className="font-medium text-gray-700">My Account</span>
                    </div>
                    <ul className="flex flex-col gap-4 text-base">
                      <li>
                        <button
                          onClick={() => {
                            navigate("/my-profile");
                            setShowMenu(false);
                          }}
                          className="text-gray-600 hover:text-indigo-600 transition-colors w-full text-left py-2"
                        >
                          My Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            navigate("/my-appointments");
                            setShowMenu(false);
                          }}
                          className="text-gray-600 hover:text-indigo-600 transition-colors w-full text-left py-2"
                        >
                          My Appointments
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowMenu(false);
                          }}
                          className="text-red-600 hover:text-red-700 transition-colors w-full text-left py-2"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="mt-8 pt-6 border-t">
                    <button
                      onClick={() => {
                        navigate("/login");
                        setShowMenu(false);
                      }}
                      className="w-full bg-indigo-500 text-white py-3 rounded-full font-medium hover:bg-indigo-600 transition-colors"
                    >
                      Create account
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;