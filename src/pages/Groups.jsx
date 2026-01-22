import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import JoinGroupModal from "../components/Home/JoinGroupModal";

const Groups = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [showJoin, setShowJoin] = useState(false);

  const fetchGroups = async () => {
    const res = await api.get("/chat/groups");
    setGroups(res.data);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6fbf7] px-4 pt-6 pb-24">
      {/* HEADER */}
      <h1 className="text-xl font-semibold text-green-800 mb-4">
        Groups
      </h1>

      {/* SEARCH (UI ONLY) */}
      <input
        placeholder="Search groups..."
        className="w-full mb-4 px-4 py-2 rounded-xl border bg-white"
      />

      {/* GROUP LIST */}
      <div className="space-y-4">
        {groups.map((group) => {
          const joined = group.members.includes(user.email);

          return (
            <div
              key={group._id}
              onClick={() =>
                joined && navigate(`/chat/${group.chatId}`)
              }
              className="flex items-center justify-between bg-white rounded-2xl p-4 shadow-sm cursor-pointer"
            >
              {/* LEFT ICON */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-600 text-white flex items-center justify-center text-xl">
                  🌱
                </div>

                {/* GROUP INFO */}
                <div>
                  <h3 className="font-medium text-green-900">
                    {group.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {group.members.length} members
                  </p>
                </div>
              </div>

              {/* RIGHT ACTION */}
              {joined ? (
                <span className="text-xs text-gray-400">
                  Open
                </span>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    api.post("/chat/join", {
                      chatId: group.chatId,
                      email: user.email,
                    }).then(fetchGroups);
                  }}
                  className="text-green-700 border border-green-700 px-3 py-1 rounded-lg text-sm"
                >
                  Join
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* FLOATING + BUTTON */}
      <button
        onClick={() => setShowJoin(true)}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-green-700 text-white text-3xl shadow-lg"
      >
        +
      </button>

      {showJoin && <JoinGroupModal close={() => setShowJoin(false)} />}
    </div>
  );
};

export default Groups;
