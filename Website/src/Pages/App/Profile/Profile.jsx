import React, { useState, useEffect } from "react";
import SkillInput from "../Signup/SkillInput";
import {
  faEnvelope,
  faMapMarkerAlt,
  faClock,
  faEye,
  faEyeSlash,
  faPen,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { supabase } from "../../../utils/supabaseClient";

const Profile = () => {
  const { profile, user: authUser } = useSelector((state) => state.auth);

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [allOfferedSkills, setAllOfferedSkills] = useState([]);
  const [allWantedSkills, setAllWantedSkills] = useState([]);

  // Load user profile and skills
  useEffect(() => {
    if (profile) {
      setUser({
        name: profile.name || "",
        email: profile.email || "",
        location: profile.location || "",
        photoURL: profile.image_url || "",
        availability: profile.availability || "weekdays",
        skillsOffered: [],
        skillsWanted: [],
        profile_status: profile.profile_status || "public",
      });
      fetchUserSkills(profile.user_id || authUser?.id);
    }
    fetchAllSkills();
  }, [profile]);

  const fetchAllSkills = async () => {
    const offered = await supabase
      .from("user_skills_offered")
      .select("skills_offered", { distinct: true });
    const wanted = await supabase
      .from("user_skills_wanted")
      .select("skills_wanted", { distinct: true });

    if (!offered.error) {
      const unique = [
        ...new Set(offered.data.map((d) => d.skills_offered).filter(Boolean)),
      ];
      setAllOfferedSkills(unique);
    }

    if (!wanted.error) {
      const unique = [
        ...new Set(wanted.data.map((d) => d.skills_wanted).filter(Boolean)),
      ];
      setAllWantedSkills(unique);
    }
  };

  const fetchUserSkills = async (user_id) => {
    const { data: offered } = await supabase
      .from("user_skills_offered")
      .select("skills_offered")
      .eq("user_id", user_id);

    const { data: wanted } = await supabase
      .from("user_skills_wanted")
      .select("skills_wanted")
      .eq("user_id", user_id);

    setUser((prev) => ({
      ...prev,
      skillsOffered: offered?.map((d) => d.skills_offered) || [],
      skillsWanted: wanted?.map((d) => d.skills_wanted) || [],
    }));
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const userId = profile?.user_id || authUser?.id;
    if (!user || !userId) return alert("Missing user ID");

    setIsEditing(false);
    setLoading(true);

    const updates = {
      name: user.name,
      email: user.email,
      location: user.location,
      image_url: user.photoURL,
      availability: user.availability,
      profile_status: user.profile_status,
    };

    const { error: profileError } = await supabase
      .from("user_profile")
      .update(updates)
      .eq("user_id", userId);

    // Clear old skills
    await supabase.from("user_skills_offered").delete().eq("user_id", userId);
    await supabase.from("user_skills_wanted").delete().eq("user_id", userId);

    // Insert new skills
    const offeredInsert = user.skillsOffered.map((skill) => ({
      user_id: userId,
      skills_offered: skill,
    }));
    const wantedInsert = user.skillsWanted.map((skill) => ({
      user_id: userId,
      skills_wanted: skill,
    }));

    const { error: offeredError } = await supabase
      .from("user_skills_offered")
      .insert(offeredInsert);
    const { error: wantedError } = await supabase
      .from("user_skills_wanted")
      .insert(wantedInsert);

    setLoading(false);

    if (profileError || offeredError || wantedError) {
      console.error({ profileError, offeredError, wantedError });
      return alert("❌ Failed to update profile or skills");
    }

    alert("✅ Profile updated!");
  };

  const toggleStatus = () => {
    if (!user) return;
    setUser({
      ...user,
      profile_status: user.profile_status === "public" ? "private" : "public",
    });
  };

  if (!user) {
    return (
      <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="text-white flex justify-center p-4 pt-5">
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
                className="text-slate-300 hover:text-white text-xs flex items-center"
                disabled={loading}
              >
                <FontAwesomeIcon
                  icon={isEditing ? faSave : faPen}
                  className="mr-1"
                  spin={loading && isEditing}
                />
                {loading && isEditing
                  ? "Saving..."
                  : isEditing
                  ? "Save"
                  : "Edit"}
              </button>
            </div>

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

            {/* Skills Offered */}
            <div className="text-xs">
              <span className="text-blue-400 font-medium">Offers:</span>
              {isEditing ? (
                <SkillInput
                  placeholder="Add skill..."
                  suggestions={allOfferedSkills}
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

            {/* Skills Wanted */}
            <div className="text-xs">
              <span className="text-purple-400 font-medium">Wants:</span>
              {isEditing ? (
                <SkillInput
                  placeholder="Add skill..."
                  suggestions={allWantedSkills}
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

            {/* Profile Status */}
            <button
              onClick={toggleStatus}
              className="mt-1 text-slate-400 hover:text-white text-xs"
            >
              <FontAwesomeIcon
                icon={user.profile_status === "public" ? faEye : faEyeSlash}
                className="mr-1"
              />
              {user.profile_status === "public" ? "Public" : "Private"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
