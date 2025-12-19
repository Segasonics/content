import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Admin from "./pages/Admin/Admin";
import { Toaster } from "react-hot-toast";
import Contents from "./pages/Contents/Contents";
import { useDispatch, useSelector } from "react-redux";
import { authUser, setUser } from "./features/AuthDataSlice/AuthDataSlice";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import GroupOne from "./pages/Group1/GroupOne";
import GroupTwo from "./pages/Group2/GroupTwo";
import ContentTwo from "./pages/Contents2/ContentTwo";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const hideNavbar = [`/content/group2`, "/content/group1"];
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !user) {
      dispatch(authUser());
    }
  }, [dispatch, user]);
  console.log(user);

  //hide navbaron specific routes
  const shouldShowNavbar = !hideNavbar.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/group1/add" element={<GroupOne />} />
        <Route path="/group2/add" element={<GroupTwo />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            !user ? null : user.role !== "admin" ? (
              <Navigate to="/" />
            ) : (
              <Admin />
            )
          }
        />
        <Route path="/content/group1" element={<Contents />} />
        <Route path="/content/group2" element={<ContentTwo />} />
        <Route
          path="/reset-password"
          element={user ? <ResetPassword /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
