// ProfileCard.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExchangeAlt,
  faMapMarkerAlt,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

const ProfileCard = ({ user, handleOpenModal }) => {
  return (
    <div
      key={user.id}
      className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 flex flex-col sm:flex-row overflow-hidden"
    >
      <div className="sm:w-1/3 flex items-center justify-center bg-slate-700 p-6">
        <img
          src={user.photoURL}
          alt={user.name}
          className="w-32 h-32 object-cover rounded-full border-4 border-slate-800"
        />
      </div>
      <div className="sm:w-2/3 p-6">
        <h4 className="text-xl font-semibold mb-2">{user.name}</h4>
        <p className="text-slate-400 text-sm mb-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
          {user.location}
        </p>
        <p className="text-slate-400 text-sm mb-4">
          <FontAwesomeIcon icon={faClock} className="mr-1" />
          {user.availability}
        </p>

        <div className="mb-2">
          <span className="text-sm font-medium text-blue-400">Offers:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {user.skillsOffered.map((skill) => (
              <span
                key={skill}
                className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <span className="text-sm font-medium text-purple-400">Wants:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {user.skillsWanted.map((skill) => (
              <span
                key={skill}
                className="bg-purple-900 text-purple-200 text-xs px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
          onClick={() => handleOpenModal(user)}
        >
          <FontAwesomeIcon icon={faExchangeAlt} className="mr-2" />
          Request Skill Exchange
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
