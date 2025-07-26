import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    //get the user from the store
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    return (
        <header className="fixed top-0 w-full h-14 bg-black shadow-md z-50">
            <nav className="flex justify-between items-center h-full px-6">
                {/* Left - Logo */}
                <div>
                    <Link to="/" className="text-xl font-bold text-white tracking-wide">LOGO</Link>
                </div>


                {/* Right - Nav Links */}
                <div className="flex gap-4">
                    {/* if user is logged in hide the signup and login page */}
                    {!user && ["Login", "Signup"].map((text, index) => (
                        <Link
                            key={index}
                            to={`/${text.toLowerCase()}`}
                            className="text-sm text-gray-200 border border-gray-700 px-3 py-1 rounded-md hover:bg-gray-800 transition"
                        >
                            {text}
                        </Link>
                    ))}
                    {
                        user && <Link to='/approved-notes'
                            className="text-sm text-gray-200 border border-gray-700 px-3 py-1 rounded-md hover:bg-gray-800 transition">
                            Content
                        </Link>
                    }
                    {user && <button
                        onClick={() => navigate('/admin')}
                        disabled={user?.role !== 'admin'}
                        title={user?.role !== 'admin' ? 'Admin access only' : 'Go to Admin Panel'}
                        className={`text-sm px-3 py-1 rounded-md border transition flex items-center gap-1
    ${user?.role === 'admin'
                                ? 'text-white border-gray-700 hover:bg-gray-800 cursor-pointer'
                                : 'text-gray-500 border-gray-600 cursor-not-allowed'}
  `}
                    >
                        <span>{user?.role !== 'admin' ? '🔒' : '🔓'}</span>
                        Admin
                    </button>}

                </div>
            </nav>
        </header>
    );
};

export default Navbar;
