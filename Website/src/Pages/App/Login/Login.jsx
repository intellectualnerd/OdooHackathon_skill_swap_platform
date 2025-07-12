import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserShield,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    alert("Login successful! (This is a demo)");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 w-full sm:rounded-xl rounded-none p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all">
          <div className="text-center mb-6">
            <FontAwesomeIcon
              icon={faUserShield}
              className="text-5xl text-slate-300 mb-4"
            />
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-slate-400 mt-2 text-sm">
              Please enter your credentials to login
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="text-slate-500"
                  />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-700 text-slate-200 pl-10 pr-4 py-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faLock} className="text-slate-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-700 text-slate-200 pl-10 pr-10 py-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    className="text-slate-500 hover:text-slate-300"
                  />
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <a
                  href="#"
                  className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              Sign In
            </button>
          </form>

          {/* Navigation Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?
              <span
                onClick={() => navigate("/signup")}
                className="font-medium text-slate-400 hover:text-slate-300 ml-1 cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center px-2">
          <p className="text-xs text-slate-500">
            © 2025 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
