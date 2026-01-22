import { useState } from "react";
import AuthLayout from "../components/Home/AuthLayout";
import styles from "../styles/Login.module.css";
import api from "../api/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await api.post("/auth/login", form);

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  window.location.href = "/";
};


  return (
    <AuthLayout
      title="Welcome back to the flow."
      subtitle="Join the student-led movement creating a sustainable future through service, community and connection."
    >
      <div className={styles.heading}>Sign In</div>
      <div className={styles.sub}>Enter your details to continue</div>

      <form onSubmit={handleSubmit}>
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

        <button className={styles.button}>Sign In →</button>
      </form>

      <div className={styles.footer}>
        Don’t have an account?{" "}
        <a href="/signup" className={styles.link}>
          Sign Up
        </a>
      </div>
    </AuthLayout>
  );
};

export default Login;
