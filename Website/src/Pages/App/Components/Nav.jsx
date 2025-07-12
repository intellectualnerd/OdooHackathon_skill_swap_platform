import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../../utils/supabaseClient";
export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, user } = useSelector((state) => state.auth);

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLogout = async () => {
    alert("Logged out! (Demo)");
    await supabase.auth.signOut();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

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
          className={`text-sm transition ${
            isActive("/")
              ? "text-white font-semibold"
              : "text-slate-300 hover:text-white font-medium"
          }`}
        >
          Home
        </Link>

        <Link
          to="/requests"
          className={`text-sm transition ${
            isActive("/requests")
              ? "text-white font-semibold"
              : "text-slate-300 hover:text-white font-medium"
          }`}
        >
          Requests
        </Link>

        <Link to="/profile" className="flex items-center relative w-8 h-8">
          {!imageLoaded && (
            <div className="w-8 h-8 rounded-full bg-slate-500 animate-pulse"></div>
          )}
          <img
            src={profile?.image_url}
            alt="Profile"
            className={`w-8 h-8 rounded-full border-2 border-slate-600 hover:border-blue-400 transition absolute top-0 left-0 ${
              imageLoaded ? "block" : "hidden"
            }`}
            style={{
              borderColor: isActive("/profile") ? "#ffffff" : "#999999",
            }}
            onLoad={() => setImageLoaded(true)}
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
