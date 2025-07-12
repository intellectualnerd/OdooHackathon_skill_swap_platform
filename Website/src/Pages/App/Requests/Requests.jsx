import React, { useState } from "react";

export default function SkillRequests() {
    const requests = [
      {
        id: 1,
        from: {
          name: "Alice",
          photoURL: "https://randomuser.me/api/portraits/women/44.jpg",
          location: "SF, USA",
          email: "alice@example.com",
        },
        skillOffered: "Graphic Design",
        skillWanted: "Web Development",
        status: "pending",
      },
      {
        id: 2,
        from: {
          name: "Bob",
          photoURL: "https://randomuser.me/api/portraits/men/45.jpg",
          location: "NY, USA",
          email: "bob@example.com",
        },
        skillOffered: "SEO",
        skillWanted: "Content Writing",
        status: "accepted",
      },
      {
        id: 3,
        from: {
          name: "Charlie",
          photoURL: "https://randomuser.me/api/portraits/men/46.jpg",
          location: "LA, USA",
          email: "charlie@example.com",
        },
        skillOffered: "Video Editing",
        skillWanted: "SEO",
        status: "rejected",
      },
    ];

  const [allRequests, setAllRequests] = useState(requests);

  const updateStatus = (id, newStatus) => {
    const updated = allRequests.map((req) =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    setAllRequests(updated);
  };

  return (
    <div className=" bg-slate-900">
      <div className="space-y-4 p-4 max-w-3xl mx-auto">
        {allRequests.length === 0 ? (
          <p className="text-slate-400 text-center">No requests found.</p>
        ) : (
          allRequests.map((req) => (
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
                <p className="text-xs text-slate-500">
                  Email: {req.from.email}
                </p>
              </div>

              <div className="flex flex-col items-end">
                {req.status === "pending" ? (
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
                        : "bg-red-700 text-red-200"
                    }`}
                  >
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
