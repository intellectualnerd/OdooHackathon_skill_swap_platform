// Profile.jsx
import React, { useState } from "react";
import SkillInput from "../Signup/SkillInput";
import {
  faUser,
  faEnvelope,
  faMapMarkerAlt,
  faClock,
  faEye,
  faEyeSlash,
  faPen,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const allSkills = [
  "Web Development",
  "Graphic Design",
  "Content Writing",
  "Video Editing",
  "SEO",
  "Digital Marketing",
];

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    location: "New York, USA",
    photoURL: "https://randomuser.me/api/portraits/men/45.jpg",
    availability: "weekdays",
    skillsOffered: ["Web Development", "Content Writing"],
    skillsWanted: ["Graphic Design"],
    visibility: "public",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile saved!");
  };

  const toggleVisibility = () => {
    setUser({
      ...user,
      visibility: user.visibility === "public" ? "private" : "public",
    });
  };

  return (
    <div className="bg-slate-900" style={{minHeight:"100vh"}}>
      <div className=" bg-slate-900 text-white flex justify-center p-4 pt-5">
        <div className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 flex flex-col sm:flex-row overflow-hidden w-full max-w-3xl">
          {/* Profile Picture */}
          <div className="sm:w-1/3 flex items-center justify-center bg-slate-700 p-4">
            <img
              src={user.photoURL}
              alt={user.name}
              className="w-24 h-24 object-cover rounded-full border-4 border-slate-800"
            />
          </div>

          {/* Details */}
          <div className="sm:w-2/3 p-4 space-y-2 text-sm leading-tight">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {isEditing ? (
                  <input
                    className="bg-transparent border-b border-slate-500 outline-none text-white"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />
                ) : (
                  user.name
                )}
              </h2>
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="text-slate-300 hover:text-white text-xs"
              >
                <FontAwesomeIcon
                  icon={isEditing ? faSave : faPen}
                  className="mr-1"
                />
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>

            {/* Email & Location */}
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              {isEditing ? (
                <input
                  className="bg-transparent border-b border-slate-500 outline-none text-white w-40"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              ) : (
                user.email
              )}
            </p>

            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              {isEditing ? (
                <input
                  className="bg-transparent border-b border-slate-500 outline-none text-white w-40"
                  name="location"
                  value={user.location}
                  onChange={handleChange}
                />
              ) : (
                user.location
              )}
            </p>

            {/* Availability */}
            <p>
              <FontAwesomeIcon icon={faClock} className="mr-2" />
              {isEditing ? (
                <select
                  name="availability"
                  value={user.availability}
                  onChange={handleChange}
                  className="bg-slate-700 border border-slate-600 text-white rounded px-2 py-1 text-xs"
                >
                  <option value="weekdays">Weekdays</option>
                  <option value="wholeWeek">Whole Week</option>
                  <option value="notAvailable">Not Available</option>
                </select>
              ) : (
                user.availability
              )}
            </p>

            {/* Skills */}
            <div className="text-xs">
              <span className="text-blue-400 font-medium">Offers:</span>
              {isEditing ? (
                <SkillInput
                  placeholder="Add skill..."
                  suggestions={allSkills}
                  onChange={(skills) =>
                    setUser({ ...user, skillsOffered: skills })
                  }
                />
              ) : (
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.skillsOffered.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-900 text-blue-200 px-2 py-0.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="text-xs">
              <span className="text-purple-400 font-medium">Wants:</span>
              {isEditing ? (
                <SkillInput
                  placeholder="Add skill..."
                  suggestions={allSkills}
                  onChange={(skills) =>
                    setUser({ ...user, skillsWanted: skills })
                  }
                />
              ) : (
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.skillsWanted.map((skill) => (
                    <span
                      key={skill}
                      className="bg-purple-900 text-purple-200 px-2 py-0.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Visibility Toggle */}
            <button
              onClick={toggleVisibility}
              className="mt-1 text-slate-400 hover:text-white text-xs"
            >
              <FontAwesomeIcon
                icon={user.visibility === "public" ? faEye : faEyeSlash}
                className="mr-1"
              />
              {user.visibility === "public" ? "Public" : "Private"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
