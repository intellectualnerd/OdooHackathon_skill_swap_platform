import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
      role,
      password,
      remember,
    });

    alert("Login successful! (This is a demo)");

    // Reset form
    setEmail("");
    setRole("");
    setPassword("");
    setRemember(false);
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-xl p-8 custom-shadow transition-all hover:shadow-xl">
          <div className="text-center mb-8">
            <i className="fas fa-user-shield text-5xl text-slate-300 mb-4"></i>
            <h1 className="text-3xl font-bold text-slate-100">Welcome Back</h1>
            <p className="text-slate-400 mt-2">
              Please enter your credentials to login
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-slate-500"></i>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-slate-700 text-slate-200 w-full pl-10 pr-4 py-3 rounded-lg border border-slate-600 focus:outline-none input-focus transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Role
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user-tag text-slate-500"></i>
                </div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="bg-slate-700 text-slate-200 w-full pl-10 pr-4 py-3 rounded-lg border border-slate-600 focus:outline-none input-focus appearance-none transition-all"
                >
                  <option value="" disabled>
                    Select your role
                  </option>
                  <option value="admin">Administrator</option>
                  <option value="manager">Manager</option>
                  <option value="editor">Editor</option>
                  <option value="viewer">Viewer</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <i className="fas fa-chevron-down text-slate-500"></i>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-lock text-slate-500"></i>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-slate-700 text-slate-200 w-full pl-10 pr-4 py-3 rounded-lg border border-slate-600 focus:outline-none input-focus transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    } text-slate-500 hover:text-slate-300`}
                  ></i>
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

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 text-slate-600 focus:ring-slate-500 border-slate-600 rounded bg-slate-700"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-slate-400"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?
              <a
                href="#"
                className="font-medium text-slate-400 hover:text-slate-300 transition-colors ml-1"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            © 2023 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
