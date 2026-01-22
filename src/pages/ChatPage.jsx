import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";

const ChatPage = () => {
  const { chatId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [groupName, setGroupName] = useState("");

  const bottomRef = useRef(null);

  /* FETCH GROUP NAME */
  const fetchGroupName = async () => {
    const res = await api.get("/chat/groups");
    const group = res.data.find((g) => g.chatId === chatId);
    if (group) setGroupName(group.name);
  };

  /* FETCH MESSAGES */
  const fetchMessages = async () => {
    const res = await api.get(`/chat/messages/${chatId}`);
    setMessages(res.data);
  };

  useEffect(() => {
    fetchGroupName();
    fetchMessages();

    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [chatId]);

  /* AUTO SCROLL */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!text.trim()) return;

    await api.post("/chat/send", {
      chatId,
      email: user.email,
      text,
    });

    setText("");
    fetchMessages();
  };

  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto">

      {/* ✅ GROUP HEADER */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-700 text-white flex items-center justify-center text-lg">
            🌱
          </div>
          <div>
            <h2 className="font-semibold text-green-900">
              {groupName || "Group Chat"}
            </h2>
            <p className="text-xs text-gray-500">
              Chat ID: {chatId}
            </p>
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto space-y-4 px-4 py-3 hide-scrollbar">
        {messages.map((m) => {
          const isMe = m.senderEmail === user.email;

          return (
            <div
              key={m._id}
              className={`flex flex-col ${
                isMe ? "items-end" : "items-start"
              }`}
            >
              <span className="text-xs text-gray-500 mb-1">
                {isMe ? "You" : m.senderName}
              </span>

              <div
                className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                  isMe
                    ? "bg-green-700 text-white"
                    : "bg-white border"
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="flex gap-2 px-4 py-3 border-t bg-white">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded-xl px-3 py-2"
          placeholder="Type a message..."
        />
        <button
          onClick={send}
          className="bg-green-700 text-white px-4 rounded-xl"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
