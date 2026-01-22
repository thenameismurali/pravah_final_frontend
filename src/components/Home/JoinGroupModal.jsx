import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const JoinGroupModal = ({ close }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [chatId, setChatId] = useState("");
  const navigate = useNavigate();

  const joinGroup = async () => {
    if (!chatId) return;

    await api.post("/chat/join", {
      chatId,
      email: user.email,
    });

    // close modal
    close();

    // navigate directly to chat page
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-80">
        <h3 className="text-lg font-semibold mb-2 text-green-800">
          Join a Group
        </h3>

        <p className="text-sm text-gray-500 mb-4">
          Enter the Chat ID to join a group
        </p>

        <input
          value={chatId}
          onChange={(e) => setChatId(e.target.value)}
          placeholder="Enter Chat ID"
          className="border w-full p-2 rounded-lg mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={close}
            className="px-4 py-2 rounded-lg text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={joinGroup}
            className="bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Join Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinGroupModal;
