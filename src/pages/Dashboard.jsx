import { useState } from "react";
import api from "../api/api";

const Dashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    role: storedUser?.role || "",
    institution: storedUser?.institution || "",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    const res = await api.put("/auth/me", {
      email: form.email,
      name: form.name,
      institution: form.institution,
    });

    localStorage.setItem("user", JSON.stringify(res.data));
    setEditing(false);
    alert("Profile updated");
  };

  return (
    <div style={{ padding: "24px", maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>
        My Dashboard
      </h1>

      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "16px",
        }}
      >
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={!editing}
          style={inputStyle(editing)}
        />

        <label>Email</label>
        <input value={form.email} disabled style={inputStyle(false)} />

        <label>Role</label>
        <input value={form.role} disabled style={inputStyle(false)} />

        <label>Institution</label>
        <input
          name="institution"
          value={form.institution}
          onChange={handleChange}
          disabled={!editing}
          style={inputStyle(editing)}
        />

        {!editing ? (
          <button onClick={() => setEditing(true)} style={btnStyle}>
            Edit Profile
          </button>
        ) : (
          <button onClick={handleSave} style={btnStyle}>
            Save Changes
          </button>
        )}
      </div>
    </div>
  );
};

const inputStyle = (enabled) => ({
  width: "100%",
  padding: "10px",
  marginBottom: "14px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  background: enabled ? "#fff" : "#f3f4f6",
});

const btnStyle = {
  background: "#166534",
  color: "white",
  padding: "10px 16px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
};

export default Dashboard;
