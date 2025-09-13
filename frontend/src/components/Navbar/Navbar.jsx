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
<header className="fixed top-0 w-full bg-black shadow-md z-50">
  <nav className="max-w-7xl mx-auto flex justify-between items-center h-14 px-4 md:px-6">
    {/* Logo */}
    <Link to="/" className="text-xl font-bold text-white tracking-wide">
      LOGO
    </Link>

    {/* Desktop Links */}
    <div className="hidden md:flex items-center gap-4">
      <Link
        to="/content/group1"
        className="px-3 py-1 text-sm text-gray-200 border border-gray-700 rounded-md hover:bg-gray-800 transition"
      >
        Content 1
      </Link>
      <Link
        to="/content/group2"
        className="px-3 py-1 text-sm text-gray-200 border border-gray-700 rounded-md hover:bg-gray-800 transition"
      >
        Content 2
      </Link>

      {!user &&
        ["Login", "Signup"].map((text, index) => (
          <Link
            key={index}
            to={`/${text.toLowerCase()}`}
            className="px-3 py-1 text-sm text-gray-200 border border-gray-700 rounded-md hover:bg-gray-800 transition"
          >
            {text}
          </Link>
        ))}

      {user && (
        <button
          onClick={() => navigate("/admin")}
          disabled={user?.role !== "admin"}
          title={user?.role !== "admin" ? "Admin access only" : "Go to Admin Panel"}
          className={`px-3 py-1 text-sm rounded-md border flex items-center gap-1 transition
            ${
              user?.role === "admin"
                ? "text-white border-gray-700 hover:bg-gray-800 cursor-pointer"
                : "text-gray-500 border-gray-600 cursor-not-allowed"
            }`}
        >
          <span>{user?.role !== "admin" ? "🔒" : "🔓"}</span> Admin
        </button>
      )}

      {/* Avatar */}
      {user && (
        <div className="relative" ref={dropdownRef}>
          <img
            src={user?.avatar || "https://i.pravatar.cc/40"}
            alt="user avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-700 cursor-pointer"
            onClick={() => setOpenDropdown(!openDropdown)}
          />
          {openDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-950 border border-gray-700 rounded-lg shadow-lg p-4">
              <p className="text-gray-200 font-semibold">👋 Welcome</p>
              <p className="text-gray-400 text-sm ml-2">{user?.email}</p>
              <hr className="my-2 border-gray-700" />
              <button
                onClick={() => {
                  navigate("/reset-password");
                  setOpenDropdown(false);
                }}
                className="w-full text-left text-sm text-gray-200 hover:bg-gray-800 px-2 py-1 rounded"
              >
                Reset Password
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left text-sm text-red-400 hover:bg-gray-800 px-2 py-1 rounded"
              >
                Logout ➙
              </button>
            </div>
          )}
        </div>
      )}
    </div>

    {/* Mobile Hamburger */}
    <div className="md:hidden flex items-center">
      <button
        onClick={() => setOpenDropdown(!openDropdown)}
        className="text-white focus:outline-none"
      >
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
            d={openDropdown ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
    </div>
  </nav>

  {/* Mobile Menu */}
  {openDropdown && (
    <div className="md:hidden bg-black border-t border-gray-700 w-full px-4 py-4 space-y-3 flex flex-col">
      <Link
        to="/content/group1"
        className="px-3 py-2 text-gray-200 rounded-md hover:bg-gray-800 transition"
        onClick={() => setOpenDropdown(false)}
      >
        Content 1
      </Link>
      <Link
        to="/content/group2"
        className="px-3 py-2 text-gray-200 rounded-md hover:bg-gray-800 transition"
        onClick={() => setOpenDropdown(false)}
      >
        Content 2
      </Link>
      {!user &&
        ["Login", "Signup"].map((text) => (
          <Link
            key={text}
            to={`/${text.toLowerCase()}`}
            className="px-3 py-2 text-gray-200 rounded-md hover:bg-gray-800 transition"
            onClick={() => setOpenDropdown(false)}
          >
            {text}
          </Link>
        ))}
      {user && (
        <>
          <button
            onClick={() => {
              navigate("/admin");
              setOpenDropdown(false);
            }}
            disabled={user?.role !== "admin"}
            className={`px-3 py-2 rounded-md flex items-center gap-1 transition
              ${
                user?.role === "admin"
                  ? "text-white hover:bg-gray-800 cursor-pointer"
                  : "text-gray-500 cursor-not-allowed"
              }`}
          >
            Admin
          </button>
          <button
            onClick={() => {
              navigate("/reset-password");
              setOpenDropdown(false);
            }}
            className="px-3 py-2 text-gray-200 rounded-md hover:bg-gray-800 transition"
          >
            Reset Password
          </button>
          <button
            onClick={() => {
              handleLogout();
              setOpenDropdown(false);
            }}
            className="px-3 py-2 text-red-400 rounded-md hover:bg-gray-800 transition"
          >
            Logout ➙
          </button>
        </>
      )}
    </div>
  )}
</header>

  );
};

export default Navbar;
