import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/AuthDataSlice/AuthDataSlice";

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className="fixed top-0 w-full h-14 bg-black shadow-md z-50">
      <nav className="flex justify-between items-center h-full px-6">
        {/* Left - Logo */}
        <div>
          <Link to="/" className="text-xl font-bold text-white tracking-wide">
            LOGO
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="text-white focus:outline-none"
          >
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Right - Nav Links */}
        <div
          className={`flex-col md:flex md:flex-row md:items-center gap-4 md:gap-4 absolute md:static top-14 left-0 w-full md:w-auto bg-black md:bg-transparent transition-all duration-300 ${openDropdown ? "flex" : "hidden md:flex"
            }`}
        >
          <Link
            to="/content/group1"
            className="text-sm text-gray-200 border border-gray-700 px-3 py-1 rounded-md hover:bg-gray-800 transition"
          >
            Content 1
          </Link>
          <Link
            to="/content/group2"
            className="text-sm text-gray-200 border border-gray-700 px-3 py-1 rounded-md hover:bg-gray-800 transition"
          >
            Content 2
          </Link>

          {!user &&
            ["Login", "Signup"].map((text, index) => (
              <Link
                key={index}
                to={`/${text.toLowerCase()}`}
                className="text-sm text-gray-200 border border-gray-700 px-3 py-1 rounded-md hover:bg-gray-800 transition"
              >
                {text}
              </Link>
            ))}

          {user && (
            <button
              onClick={() => navigate("/admin")}
              disabled={user?.role !== "admin"}
              title={user?.role !== "admin" ? "Admin access only" : "Go to Admin Panel"}
              className={`text-sm px-3 py-1 rounded-md border transition flex items-center gap-1
          ${user?.role === "admin"
                  ? "text-white border-gray-700 hover:bg-gray-800 cursor-pointer"
                  : "text-gray-500 border-gray-600 cursor-not-allowed"
                }`}
            >
              <span>{user?.role !== "admin" ? "🔒" : "🔓"}</span>
              Admin
            </button>
          )}

          {/* Avatar + Dropdown */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <img
                src={user?.avatar || "https://i.pravatar.cc/40"}
                alt="user avatar"
                className="w-10 h-10 rounded-full border-2 border-gray-700 cursor-pointer"
                onClick={() => setOpenDropdown(!openDropdown)}
              />
              {openDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-950 border border-gray-700 rounded-md shadow-lg p-4 z-50">
                  <p className="text-gray-200 font-semibold">👋 Welcome</p>
                  <p className="text-gray-400 text-sm ml-2">{user?.email}</p>
                  <hr className="my-2 border-gray-700" />
                  <button
                    onClick={() => {
                      navigate("/reset-password");
                      setOpenDropdown(false);
                    }}
                    className="w-full text-left text-sm cursor-pointer text-gray-200 hover:bg-gray-800 px-2 py-1 rounded"
                  >
                    Reset your password ?
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm text-red-400 cursor-pointer hover:bg-gray-800 px-2 py-1 rounded"
                  >
                    Logout ➙
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
