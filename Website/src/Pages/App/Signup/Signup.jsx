import React, { useState } from "react";
import SkillInput from "./SkillInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { supabase } from "../../../utils/supabaseClient";

import {
  faUser,
  faEnvelope,
  faMapMarkerAlt,
  faImage,
  faLock,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    photoURL: "",
    password: "",
    availability: "weekdays",
    skillsOffered: [],
    skillsWanted: [],
  });

  const allSkills = [
    "Web Development",
    "Graphic Design",
    "Digital Marketing",
    "Content Writing",
    "Video Editing",
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: signup, error: signUpError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    if (signUpError) {
      console.error("Signup failed:", signUpError.message);
      return;
    }
    const userId = signup.user?.id;

    if (userId) {
      const { error: rpcError } = await supabase.rpc(
        "signup_with_profile_and_skills",
        {
          p_user_id: userId,
          p_email: formData.email,
          p_name: formData.name,
          p_location: formData.location,
          p_availability: formData.availability,
          p_profile_status: "public",
          p_image_url: formData.photoURL,
          p_skills_offered: formData.skillsOffered,
          p_skills_wanted: formData.skillsWanted,
        }
      );

      if (rpcError) {
        console.error("Error inserting profile + skills:", rpcError.message);
      } else {
        console.log("Profile + skills inserted!");
      }
    }
    if (signup.user) {
      navigate("/login");
    }
    console.log("Signup data:", formData);
    alert("Account created successfully! (This is a demo)");
    setFormData({
      name: "",
      email: "",
      location: "",
      photoURL: "",
      password: "",
      availability: "weekdays",
      skillsOffered: [],
      skillsWanted: [],
    });
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 rounded-xl p-8 custom-shadow transition-all hover:shadow-xl w-full max-w-xl space-y-6"
      >
        <div className="text-center mb-4">
          <FontAwesomeIcon
            icon={faUserPlus}
            className="text-5xl text-slate-300 mb-4"
          />
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-slate-400 mt-2">Join our community</p>
        </div>

        {/* Name */}
        <InputField
          label="Full Name"
          icon={faUser}
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
        />

        {/* Email */}
        <InputField
          label="Email Address"
          icon={faEnvelope}
          name="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Location */}
        <InputField
          label="Location"
          icon={faMapMarkerAlt}
          name="location"
          placeholder="City, Country"
          value={formData.location}
          onChange={handleChange}
        />

        {/* Skills Offered */}
        <SkillInput
          label="Skills Offered"
          placeholder="Type a skill..."
          suggestions={allSkills}
          onChange={(skills) =>
            setFormData({ ...formData, skillsOffered: skills })
          }
        />

        {/* Skills Wanted */}
        <SkillInput
          label="Skills Wanted"
          placeholder="Type a skill..."
          suggestions={allSkills}
          onChange={(skills) =>
            setFormData({ ...formData, skillsWanted: skills })
          }
        />

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Availability
          </label>
          <div className="space-y-2">
            {["weekdays", "wholeWeek", "notAvailable"].map((val) => (
              <label key={val} className="flex items-center text-slate-400">
                <input
                  type="radio"
                  name="availability"
                  value={val}
                  checked={formData.availability === val}
                  onChange={handleChange}
                  className="h-4 w-4 text-slate-600 border-slate-600 bg-slate-700"
                />
                <span className="mx-2">
                  {val === "weekdays" && "Weekdays Only"}
                  {val === "wholeWeek" && "Whole Week"}
                  {val === "notAvailable" && "Not Currently Available"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Photo URL */}
        <InputField
          label="Profile Photo URL"
          icon={faImage}
          name="photoURL"
          placeholder="https://example.com/photo.jpg"
          value={formData.photoURL}
          onChange={handleChange}
        />

        {/* Password */}
        <InputField
          label="Password"
          icon={faLock}
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
        >
          Sign Up
        </button>
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?
            <span
              onClick={() => navigate("/login")}
              className="font-medium text-slate-400 hover:text-slate-300 transition-colors ml-1 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

function InputField({
  label,
  icon,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-1">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FontAwesomeIcon icon={icon} className="text-slate-500" />
          </div>
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="bg-slate-700 text-slate-200 w-full pl-10 pr-4 py-3 rounded-lg border border-slate-600 focus:outline-none input-focus transition-all"
            placeholder={placeholder}
            required
          />
        </div>
      </div>
    </>
  );
}
