import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../../utils/supabaseClient";

export default function SkillRequests() {
  const { profile, user } = useSelector((state) => state.auth);

  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);

  const fetchIncomingRequests = async (userId) => {
  const { data, error } = await supabase
    .from("swap_requests")
    .select(
      `request_id, skill_offered, skill_wanted, status, message,
       from_user_id,
       from:user_profile!swap_requests_from_user_id_fkey(name, image_url, location, email)`
    )
    .eq("to_user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching incoming requests:", error.message);
    return [];
  }

  return data.map((req) => ({
    id: req.request_id,
    from: {
      name: req.from.name,
      photoURL: req.from.image_url,
      location: req.from.location,
      email: req.from.email,
    },
    skillOffered: req.skill_offered,
    skillWanted: req.skill_wanted,
    status: req.status,
  }));
};

const fetchOutgoingRequests = async (userId) => {
  console.log(userId,"us")
  const { data, error } = await supabase
    .from("swap_requests")
    .select(
      `request_id, skill_offered, skill_wanted, status, message,
       to_user_id,
       to:user_profile!swap_requests_to_user_id_fkey(name, image_url, location, email)`
    )
    .eq("from_user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching outgoing requests:", error.message);
    return [];
  }

  return data.map((req) => ({
    id: req.request_id,
    from: {
      name: req.to.name,
      photoURL: req.to.image_url,
      location: req.to.location,
      email: req.to.email,
    },
    skillOffered: req.skill_offered,
    skillWanted: req.skill_wanted,
    status: req.status,
  }));
};

  useEffect(() => {
    console.log(user,"",profile)
    if (!user || !profile) return;
    fetchIncomingRequests(user.id).then(setIncomingRequests);
    fetchOutgoingRequests(user.id).then(setOutgoingRequests);
  }, [user, profile]);

  const updateStatus = async(id, newStatus) => {
    console.log(id,"id")
     await  supabase
      .from("swap_requests")
      .update({ status: newStatus })
      .eq("request_id", id);
    setIncomingRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: newStatus } : req
      )
    );

    // Optional: update status in Supabase too
 
  };

  const renderCard = (req, allowActions = false) => (
    <div
      key={req.id}
      className="bg-slate-800 border border-slate-700 rounded-lg p-4 flex gap-4 items-center"
    >
      <img
        src={req.from.photoURL}
        alt={req.from.name}
        className="w-16 h-16 rounded-full border-2 border-slate-600"
      />

      <div className="flex-grow space-y-1 text-sm text-slate-300">
        <p className="font-semibold text-white">{req.from.name}</p>
        <p className="text-xs text-slate-400">{req.from.location}</p>
        <p>
          <span className="text-blue-400 font-medium">Offers:</span>{" "}
          {req.skillOffered}
        </p>
        <p>
          <span className="text-purple-400 font-medium">Wants:</span>{" "}
          {req.skillWanted}
        </p>
        <p className="text-xs text-slate-500">Email: {req.from.email}</p>
      </div>

      <div className="flex flex-col items-end">
        {allowActions && req.status === "pending" ? (
          <div className="flex gap-2">
            <button
              onClick={() => updateStatus(req.id, "accepted")}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 text-sm rounded"
            >
              Accept
            </button>
            <button
              onClick={() => updateStatus(req.id, "rejected")}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-sm rounded"
            >
              Reject
            </button>
          </div>
        ) : (
          <span
            className={`text-xs font-medium mt-2 px-2 py-1 rounded ${
              req.status === "accepted"
                ? "bg-green-700 text-green-200"
                : req.status === "rejected"
                ? "bg-red-700 text-red-200"
                : "bg-yellow-700 text-yellow-200"
            }`}
          >
            {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-slate-900 min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-10">

        <section>
          <h2 className="text-xl font-bold text-white mb-4">🔁 Requests To You</h2>
          {incomingRequests.length === 0 ? (
            <p className="text-slate-400">No incoming requests.</p>
          ) : (
            incomingRequests.map((req) => renderCard(req, true))
          )}
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-4">📤 Your Sent Requests</h2>
          {outgoingRequests.length === 0 ? (
            <p className="text-slate-400">You haven’t sent any requests.</p>
          ) : (
            outgoingRequests.map((req) => renderCard(req, false))
          )}
        </section>

      </div>
    </div>
  );
}
