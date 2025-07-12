import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    alert("Logged out! (Demo)");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 px-6 py-3 shadow-md flex justify-between items-center">
      {/* Logo/Brand */}
      <Link to="/" className="text-2xl font-bold text-blue-400">
        SkillSwap
      </Link>

      {/* Navigation links */}
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="text-slate-300 hover:text-white text-sm font-medium transition"
        >
          Home
        </Link>
        <Link
          to="/requests"
          className="text-slate-300 hover:text-white text-sm font-medium transition"
        >
          Requests
        </Link>
        <Link to="/profile" className="flex items-center">
          <img
            src="https://randomuser.me/api/portraits/men/45.jpg"
            alt="Profile"
            className="w-8 h-8 rounded-full border-2 border-slate-600 hover:border-blue-400 transition"
          />
        </Link>

        <button
          onClick={handleLogout}
          className="text-sm bg-slate-600 hover:bg-slate-700 text-white px-4 py-1.5 rounded-md transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
