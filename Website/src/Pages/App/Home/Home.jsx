import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faClock,
  faExchangeAlt,
} from "@fortawesome/free-solid-svg-icons";

const skills = [
  "Web Development",
  "Graphic Design",
  "Content Writing",
  "Photography",
  "Video Editing",
  "Social Media Management",
  "SEO",
  "Data Analysis",
  "Mobile App Development",
  "UI/UX Design",
  "Copywriting",
  "Translation",
  "Music Production",
  "Cooking",
  "Language Teaching",
  "Fitness Training",
  "Accounting",
  "Legal Advice",
  "Marketing",
  "Public Speaking",
  "Gardening",
  "DIY Crafts",
  "Interior Design",
  "Fashion Design",
];

const users = [
  {
    id: 1,
    name: "Alex Johnson",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    skillsOffered: ["Web Development", "SEO", "Data Analysis"],
    skillsWanted: ["Graphic Design", "Video Editing"],
    location: "New York, USA",
    availability: "Weekdays",
  },
  {
    id: 2,
    name: "Sarah Miller",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    skillsOffered: ["Graphic Design", "UI/UX Design"],
    skillsWanted: ["Content Writing", "SEO"],
    location: "London, UK",
    availability: "Weekends",
  },
  {
    id: 3,
    name: "Carlos Rodriguez",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    skillsOffered: ["Video Editing", "Photography"],
    skillsWanted: ["Social Media Management", "Marketing"],
    location: "Madrid, Spain",
    availability: "Available Now",
  },
  {
    id: 4,
    name: "Priya Patel",
    image: "https://randomuser.me/api/portraits/women/63.jpg",
    skillsOffered: ["Content Writing", "Copywriting"],
    skillsWanted: ["Web Development", "Data Analysis"],
    location: "Mumbai, India",
    availability: "Weekdays",
  },
  {
    id: 5,
    name: "James Wilson",
    image: "https://randomuser.me/api/portraits/men/81.jpg",
    skillsOffered: ["Fitness Training", "Public Speaking"],
    skillsWanted: ["Music Production", "DIY Crafts"],
    location: "Sydney, Australia",
    availability: "Weekends",
  },
  {
    id: 6,
    name: "Emma Chen",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    skillsOffered: ["Language Teaching", "Translation"],
    skillsWanted: ["Cooking", "Gardening"],
    location: "Toronto, Canada",
    availability: "Available Now",
  },
];

export default function SkillSwapApp() {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [filters, setFilters] = useState({
    skillWanted: "",
    skillOffered: "",
    name: "",
    availability: "",
  });

  const [modalUser, setModalUser] = useState(null);
  const [exchangeData, setExchangeData] = useState({
    skillYouWant: "",
    skillYouGive: "",
    message: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filterUsers = () => {
    const { skillWanted, skillOffered, name, availability } = filters;
    const skillW = skillWanted.toLowerCase();
    const skillO = skillOffered.toLowerCase();
    const nameQuery = name.toLowerCase();
    const avail = availability.toLowerCase();

    const filtered = users.filter((user) => {
      const hasSkillWanted =
        !skillW ||
        user.skillsOffered.some((s) => s.toLowerCase().includes(skillW));
      const hasSkillOffered =
        !skillO ||
        user.skillsWanted.some((s) => s.toLowerCase().includes(skillO));
      const matchesName =
        !nameQuery || user.name.toLowerCase().includes(nameQuery);
      const matchesAvailability =
        !avail || user.availability.toLowerCase().includes(avail);

      return (
        hasSkillWanted && hasSkillOffered && matchesName && matchesAvailability
      );
    });

    setFilteredUsers(filtered);
  };

  useEffect(() => {
    filterUsers();
  }, [filters]);

  const handleOpenModal = (user) => {
    setModalUser(user);
    setExchangeData({ skillYouWant: "", skillYouGive: "", message: "" });
  };

  const handleCloseModal = () => {
    setModalUser(null);
  };

  const handleExchangeChange = (e) => {
    setExchangeData({ ...exchangeData, [e.target.name]: e.target.value });
  };

  const handleSendRequest = () => {
    console.log("To:", modalUser.name);
    console.log("Want:", exchangeData.skillYouWant);
    console.log("Give:", exchangeData.skillYouGive);
    console.log("Msg:", exchangeData.message);
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-4">
      <section className="py-12 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">
          Exchange Skills, Grow Together
        </h1>
        <p className="text-xl text-slate-300 mb-8">
          Connect with people who have the skills you need and need the skills
          you have.
        </p>

        <div className="bg-slate-800 rounded-xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              name="skillWanted"
              className="bg-slate-700 border border-slate-600 rounded-md py-2 px-3"
              onChange={handleChange}
            >
              <option value="">Skill Wanted</option>
              {skills.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <select
              name="skillOffered"
              className="bg-slate-700 border border-slate-600 rounded-md py-2 px-3"
              onChange={handleChange}
            >
              <option value="">Skill Offered</option>
              {skills.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
            <input
              type="text"
              name="name"
              placeholder="Search by name"
              className="bg-slate-700 border border-slate-600 rounded-md py-2 px-3"
              onChange={handleChange}
            />
            <select
              name="availability"
              className="bg-slate-700 border border-slate-600 rounded-md py-2 px-3"
              onChange={handleChange}
            >
              <option value="">Availability</option>
              <option value="available">Available Now</option>
              <option value="weekdays">Weekdays</option>
              <option value="weekends">Weekends</option>
            </select>
          </div>
        </div>
      </section>

      <section className="py-8 max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6">People to Connect With</h3>
        <div className="flex flex-col gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-slate-800 rounded-xl shadow-lg border border-slate-700 flex flex-col sm:flex-row overflow-hidden"
            >
              <div className="sm:w-1/3 flex items-center justify-center bg-slate-700 p-6">
                <img
                  src={user.image}
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
                  <span className="text-sm font-medium text-blue-400">
                    Offers:
                  </span>
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
                  <span className="text-sm font-medium text-purple-400">
                    Wants:
                  </span>
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
          ))}
        </div>
      </section>

      {/* Modal */}
      {modalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-800 text-slate-100 rounded-xl shadow-2xl w-[90%] max-w-lg p-6 relative animate-fade-in">
            {/* Close Button */}
            <button
              className="absolute top-3 right-4 text-slate-400 hover:text-red-500 text-xl transition"
              onClick={handleCloseModal}
            >
              &times;
            </button>

            {/* Header */}
            <div className="text-center mb-6 border-b border-slate-600 pb-4">
              <h2 className="text-2xl font-bold text-slate-100">
                Skill Exchange Request
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                Send request to{" "}
                <strong className="text-white">{modalUser.name}</strong>
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                  Skill You Want
                </label>
                <select
                  name="skillYouWant"
                  value={exchangeData.skillYouWant}
                  onChange={handleExchangeChange}
                  className="w-full rounded-md border border-slate-600 bg-slate-700 text-slate-100 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select a skill</option>
                  {modalUser.skillsOffered.map((skill) => (
                    <option key={skill}>{skill}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                  Skill You Give
                </label>
                <select
                  name="skillYouGive"
                  value={exchangeData.skillYouGive}
                  onChange={handleExchangeChange}
                  className="w-full rounded-md border border-slate-600 bg-slate-700 text-slate-100 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                >
                  <option value="">Select a skill</option>
                  {modalUser.skillsWanted.map((skill) => (
                    <option key={skill}>{skill}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                  Message
                </label>
                <textarea
                  name="message"
                  value={exchangeData.message}
                  onChange={handleExchangeChange}
                  rows="4"
                  placeholder="Write a short message..."
                  className="w-full rounded-md border border-slate-600 bg-slate-700 text-slate-100 px-3 py-2 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                ></textarea>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 border-t border-slate-600 pt-4 text-right">
              <button
                onClick={handleSendRequest}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md transition"
              >
                Send Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
