import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Message {
  sender: string;
  receiver: string;
  message: string;
  timestamp: string | Date;
}

const ChatPage: React.FC = () => {
  // Read parentPhone and mentorPhone from URL params
  const { parentPhone, mentorPhone } = useParams<{ parentPhone: string; mentorPhone: string }>();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!parentPhone || !mentorPhone) return;

    const fetchChatHistory = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:5000/api/chat/history", {
          user1: parentPhone,
          user2: mentorPhone,
        });
        setMessages(response.data);
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [parentPhone, mentorPhone]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !parentPhone || !mentorPhone) return;

    try {
      await axios.post("http://localhost:5000/api/chat/store", {
        sender: "parentPhone",
        receiver: "mentorPhone",
        message: "newMessage",
        time: 123
      });

      setMessages((prev) => [
        ...prev,
        { sender: parentPhone, receiver: mentorPhone, message: newMessage, timestamp: new Date() },
      ]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>Chat with Mentor</h2>
      <div
        style={{
          height: 400,
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: 10,
          marginBottom: 10,
          backgroundColor: "#f9f9f9",
          borderRadius: 6,
        }}
      >
        {loading && <p>Loading chat history...</p>}
        {!loading && messages.length === 0 && <p>No messages yet. Say hi!</p>}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              textAlign: msg.sender === parentPhone ? "right" : "left",
              marginBottom: 12,
            }}
          >
            <div
              style={{
                display: "inline-block",
                backgroundColor: msg.sender === parentPhone ? "#DCF8C6" : "#E5E5EA",
                padding: "8px 12px",
                borderRadius: 20,
                maxWidth: "70%",
                wordWrap: "break-word",
              }}
            >
              {msg.message}
              <div style={{ fontSize: "0.7em", color: "#555", marginTop: 4 }}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{
            flexGrow: 1,
            padding: "10px",
            borderRadius: 20,
            border: "1px solid #ccc",
            outline: "none",
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: 8,
            padding: "10px 20px",
            borderRadius: 20,
            border: "none",
            backgroundColor: "#007bff",
            color: "white",
            cursor: "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
