import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Login } from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Admin from './pages/Admin/Admin'
import { Toaster } from 'react-hot-toast'
import Contents from './pages/Contents/Contents'
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from './features/AuthDataSlice/AuthDataSlice'
import ResetPassword from './pages/ResetPassword/ResetPassword'

function App() {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation()
  console.log("Render check:", { user, loading });

  const hideNavbar = ["/approved-notes"];
  useEffect(() => {
    dispatch(authUser())
  }, [dispatch])
  console.log(user)
  //hide navbaron specific routes
  const shouldShowNavbar = !hideNavbar.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path='/' element={user ? <Home />:<Login />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup />} />
        <Route path='/admin' element={user?.role !== "admin" ? <Navigate to={'/'} /> : <Admin />} />
        <Route
          path="/approved-notes"
          element={
            loading ? (
              <div className="text-white text-center p-8">Loading...</div>
            ) : user ? (
              <Contents />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      <Route path='/reset-password' element={user ? <ResetPassword /> : <Navigate to='/login' />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
