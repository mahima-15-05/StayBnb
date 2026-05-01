import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosInstance";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.email || !formData.password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const response = await api.post("/auth/login", formData);
      const token = response?.data?.token;
      let role = response?.data?.user?.role;
      if (!token) { alert("Login failed, token not received"); return; }
      if (!role) { role="user"; return; }
      localStorage.setItem("token", token);
      localStorage.setItem("role",role);
      role ==="admin"? navigate("/admin/dashboard"): navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0e0e28",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient background orbs */}
      <div style={{
        position: "absolute", width: 480, height: 480,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(155,155,210,0.13) 0%, transparent 70%)",
        top: "-120px", left: "-100px", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", width: 360, height: 360,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(182,182,222,0.09) 0%, transparent 70%)",
        bottom: "-80px", right: "-60px", pointerEvents: "none",
      }} />
      {/* Subtle grid pattern */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(rgba(155,155,210,0.04) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(155,155,210,0.04) 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
      }} />

      <div style={{
        width: "100%", maxWidth: 420,
        padding: "0 20px",
        animation: "fadeSlideUp 0.55s cubic-bezier(0.22,1,0.36,1) both",
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap');
          @keyframes fadeSlideUp {
            from { opacity: 0; transform: translateY(28px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          @keyframes shimmer {
            0%   { background-position: -200% center; }
            100% { background-position:  200% center; }
          }
          .staybnb-input {
            width: 100%;
            background: rgba(22, 22, 48, 0.7);
            border: 1.5px solid rgba(155,155,210,0.18);
            border-radius: 12px;
            padding: 14px 16px;
            color: #e8e8f5;
            font-size: 15px;
            font-family: 'DM Sans', sans-serif;
            outline: none;
            transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
            box-sizing: border-box;
          }
          .staybnb-input::placeholder { color: rgba(155,155,210,0.4); }
          .staybnb-input:focus {
            border-color: #9B9BD2;
            background: rgba(22, 22, 48, 0.95);
            box-shadow: 0 0 0 3px rgba(155,155,210,0.12);
          }
          .staybnb-btn {
            width: 100%;
            padding: 15px;
            border-radius: 12px;
            border: none;
            background: linear-gradient(135deg, #9B9BD2 0%, #7878b8 100%);
            color: #161630;
            font-size: 15px;
            font-weight: 600;
            font-family: 'DM Sans', sans-serif;
            cursor: pointer;
            letter-spacing: 0.3px;
            transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
            position: relative;
            overflow: hidden;
          }
          .staybnb-btn:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 8px 28px rgba(155,155,210,0.35);
          }
          .staybnb-btn:active:not(:disabled) { transform: translateY(0); }
          .staybnb-btn:disabled {
            opacity: 0.7; cursor: not-allowed;
          }
          .staybnb-btn.loading::after {
            content: '';
            position: absolute; inset: 0;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
            background-size: 200% 100%;
            animation: shimmer 1.2s infinite;
          }
          .toggle-pw {
            background: none; border: none; cursor: pointer;
            color: rgba(155,155,210,0.55);
            padding: 0; font-size: 18px;
            transition: color 0.2s;
            display: flex; align-items: center;
          }
          .toggle-pw:hover { color: #9B9BD2; }
          .divider-line {
            flex: 1; height: 1px;
            background: linear-gradient(to right, transparent, rgba(155,155,210,0.2), transparent);
          }
        `}</style>

        {/* Logo / Brand */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 52, height: 52, borderRadius: 16,
            background: "rgba(155,155,210,0.12)",
            border: "1.5px solid rgba(155,155,210,0.25)",
            marginBottom: 14,
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
                fill="#9B9BD2" />
              <circle cx="12" cy="11" r="2" fill="#161630" />
            </svg>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 28, fontWeight: 700,
            color: "#e8e8f5", margin: "0 0 4px",
            letterSpacing: "-0.3px",
          }}>
            Stay<span style={{ color: "#9B9BD2" }}>BnB</span>
          </h1>
          <p style={{ color: "rgba(182,182,222,0.55)", fontSize: 14, margin: 0 }}>
            Welcome back — sign in to continue
          </p>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(22, 22, 48, 0.6)",
          border: "1.5px solid rgba(155,155,210,0.14)",
          borderRadius: 20,
          padding: "32px 28px",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          boxShadow: "0 24px 64px rgba(10,10,30,0.5)",
        }}>
          <form onSubmit={handleSubmit} noValidate>

            {/* Email field */}
            <div style={{ marginBottom: 18 }}>
              <label style={{
                display: "block", marginBottom: 7,
                fontSize: 13, fontWeight: 500,
                color: focused === "email" ? "#9B9BD2" : "rgba(182,182,222,0.7)",
                transition: "color 0.2s", letterSpacing: "0.2px",
              }}>
                Email address
              </label>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                  color: focused === "email" ? "#9B9BD2" : "rgba(155,155,210,0.35)",
                  transition: "color 0.2s", pointerEvents: "none",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/>
                  </svg>
                </span>
                <input
                  className="staybnb-input"
                  style={{ paddingLeft: 40 }}
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                />
              </div>
            </div>

            {/* Password field */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                <label style={{
                  fontSize: 13, fontWeight: 500,
                  color: focused === "password" ? "#9B9BD2" : "rgba(182,182,222,0.7)",
                  transition: "color 0.2s", letterSpacing: "0.2px",
                }}>
                  Password
                </label>
                <a href="#" style={{
                  fontSize: 12, color: "rgba(155,155,210,0.55)",
                  textDecoration: "none", transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color="#9B9BD2"}
                  onMouseLeave={e => e.target.style.color="rgba(155,155,210,0.55)"}
                >
                  Forgot password?
                </a>
              </div>
              <div style={{ position: "relative" }}>
                <span style={{
                  position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                  color: focused === "password" ? "#9B9BD2" : "rgba(155,155,210,0.35)",
                  transition: "color 0.2s", pointerEvents: "none",
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z"/>
                  </svg>
                </span>
                <input
                  className="staybnb-input"
                  style={{ paddingLeft: 40, paddingRight: 44 }}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}
                >
                  {showPassword
                    ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 13.66 13.66 9 12 9Z"/></svg>
                    : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 23 12C21.27 7.61 17 4.5 12 4.5C10.6 4.5 9.26 4.75 8.01 5.2L10.17 7.36C10.74 7.13 11.35 7 12 7ZM2 4.27L4.28 6.55L4.73 7C3.08 8.3 1.78 10.02 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.8 19.08L19.73 22L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8Z"/></svg>
                  }
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`staybnb-btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading
                ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <svg style={{ animation: "spin 0.8s linear infinite" }} width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(22,22,48,0.4)" strokeWidth="3"/>
                      <path d="M12 2A10 10 0 0 1 22 12" stroke="#161630" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Signing in...
                  </span>
                : "Sign in"
              }
            </button>

          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div className="divider-line" />
            <span style={{ fontSize: 12, color: "rgba(155,155,210,0.35)", whiteSpace: "nowrap" }}>
              new to staybnb?
            </span>
            <div className="divider-line" />
          </div>

          {/* Sign up link */}
          <Link to="/register" style={{ textDecoration: "none" }}>
            <div style={{
              width: "100%",
              padding: "13px",
              borderRadius: 12,
              border: "1.5px solid rgba(155,155,210,0.2)",
              textAlign: "center",
              color: "#B6B6DE",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "border-color 0.2s, color 0.2s, background 0.2s",
              background: "rgba(155,155,210,0.04)",
              boxSizing: "border-box",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(155,155,210,0.45)";
                e.currentTarget.style.color = "#9B9BD2";
                e.currentTarget.style.background = "rgba(155,155,210,0.08)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(155,155,210,0.2)";
                e.currentTarget.style.color = "#B6B6DE";
                e.currentTarget.style.background = "rgba(155,155,210,0.04)";
              }}
            >
              Create an account →
            </div>
          </Link>
        </div>

        {/* Footer */}
        <p style={{
          textAlign: "center", marginTop: 20,
          fontSize: 12, color: "rgba(155,155,210,0.25)",
        }}>
          © 2025 StayBnB · All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Login;