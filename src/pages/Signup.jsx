import { useState } from "react";
import AuthLayout from "../components/Home/AuthLayout";
import styles from "../styles/Login.module.css";
import api from "../api/api";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    institution: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await api.post("/auth/signup", form);

  // optional: you can skip storing token here
  // since user will login again
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/login";
};


  return (
    <AuthLayout
      title="Start your journey of impact."
      subtitle="Join the student-led movement creating a sustainable future through service, community and connection."
    >
      <div className={styles.heading}>Create Account</div>
      <div className={styles.sub}>Join the eco-system today</div>

      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
        />

        <input
          className={styles.input}
          name="email"
          type="email"
          placeholder="student@university.edu"
          onChange={handleChange}
          required
        />

        <input
          className={styles.input}
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <select
          className={styles.input}
          name="role"
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <input
          className={styles.input}
          name="institution"
          placeholder="Institution"
          onChange={handleChange}
        />

        <button className={styles.button}>Create Account →</button>
      </form>

      <div className={styles.footer}>
        Already have an account?{" "}
        <a href="/login" className={styles.link}>
          Log In
        </a>
      </div>
    </AuthLayout>
  );
};

export default Signup;
