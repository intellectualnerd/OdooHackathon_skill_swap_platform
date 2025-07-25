import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../../../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    setLoading(false);

    if (error) {
      alert("Error sending reset email: " + error.message);
    } else {
      alert("Password reset email sent! Please check your inbox.");
      setEmail("");
      navigate("/login");
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 p-6 sm:p-8 shadow-lg rounded-xl">
          <h1 className="text-2xl font-bold text-white text-center mb-4">
            Forgot Password
          </h1>
          <p className="text-sm text-slate-400 text-center mb-6">
            Enter your email to receive a password reset link.
          </p>
          <form onSubmit={handleReset} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FontAwesomeIcon icon={faEnvelope} className="text-slate-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-slate-700 text-slate-200 pl-10 pr-4 py-3 rounded-lg border border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-all"
            >
              {loading ? "Sending..." : "Send Reset Link"}
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Back to
              <span
                onClick={() => navigate("/login")}
                className="ml-1 text-slate-400 hover:text-slate-300 font-medium cursor-pointer"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
