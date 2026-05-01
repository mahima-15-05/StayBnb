import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axiosInstance';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") {
      let s = 0;
      if (value.length >= 8) s++;
      if (/[A-Z]/.test(value)) s++;
      if (/[0-9]/.test(value)) s++;
      if (/[^A-Za-z0-9]/.test(value)) s++;
      setStrength(value.length === 0 ? 0 : s);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.email || !formData.name || !formData.password) {
      alert("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const response = await api.post('/auth/register', formData);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "#e05c5c", "#d4943a", "#9B9BD2", "#5cb87a"];

  return (
    <div style={{
      minHeight: "100vh", background: "#0e0e28",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      position: "relative", overflow: "hidden", padding: "40px 20px", boxSizing: "border-box",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@700&display=swap');
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes spin { to { transform:rotate(360deg); } }
        @keyframes shimmer {
          0%   { background-position:-200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulseOrb {
          0%,100% { transform:scale(1); opacity:.9; }
          50%      { transform:scale(1.07); opacity:.7; }
        }
        @keyframes barGrow {
          from { width:0; }
        }
        .sb-input {
          width:100%; background:rgba(22,22,48,.75);
          border:1.5px solid rgba(155,155,210,.18); border-radius:12px;
          padding:13px 14px 13px 42px; color:#e8e8f5; font-size:14px;
          font-family:'DM Sans',sans-serif; outline:none;
          transition:border-color .25s,box-shadow .25s,background .25s;
          box-sizing:border-box;
        }
        .sb-input::placeholder { color:rgba(155,155,210,.32); }
        .sb-input:focus {
          border-color:#9B9BD2; background:rgba(22,22,48,.98);
          box-shadow:0 0 0 3px rgba(155,155,210,.12);
        }
        .sb-btn {
          width:100%; padding:14px; border-radius:12px; border:none;
          background:linear-gradient(135deg,#9B9BD2 0%,#7878b8 100%);
          color:#161630; font-size:14px; font-weight:600;
          font-family:'DM Sans',sans-serif; cursor:pointer; letter-spacing:.3px;
          transition:transform .18s,box-shadow .18s; position:relative; overflow:hidden;
        }
        .sb-btn:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 8px 28px rgba(155,155,210,.35); }
        .sb-btn:active:not(:disabled) { transform:translateY(0); }
        .sb-btn:disabled { opacity:.65; cursor:not-allowed; }
        .sb-btn.loading::after {
          content:''; position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);
          background-size:200% 100%; animation:shimmer 1.2s infinite;
        }
        .toggle-pw {
          position:absolute; right:13px; top:50%; transform:translateY(-50%);
          background:none; border:none; cursor:pointer;
          color:rgba(155,155,210,.45); padding:0; display:flex; align-items:center;
          transition:color .2s;
        }
        .toggle-pw:hover { color:#9B9BD2; }
        .check-item {
          display:flex; align-items:center; gap:6px;
          font-size:11px; color:rgba(155,155,210,.4);
          transition:color .3s;
        }
        .check-item.active { color:rgba(182,182,222,.75); }
      `}</style>

      {/* Orbs */}
      <div style={{
        position:"absolute", width:500, height:500, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(155,155,210,.12) 0%,transparent 70%)",
        top:"-140px", right:"-100px",
        animation:"pulseOrb 7s ease-in-out infinite", pointerEvents:"none",
      }}/>
      <div style={{
        position:"absolute", width:350, height:350, borderRadius:"50%",
        background:"radial-gradient(circle,rgba(182,182,222,.08) 0%,transparent 70%)",
        bottom:"-80px", left:"-60px",
        animation:"pulseOrb 9s ease-in-out infinite reverse", pointerEvents:"none",
      }}/>
      {/* Grid */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:`linear-gradient(rgba(155,155,210,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(155,155,210,.04) 1px,transparent 1px)`,
        backgroundSize:"48px 48px",
      }}/>

      <div style={{
        width:"100%", maxWidth:420, zIndex:1,
        animation:"fadeSlideUp .55s cubic-bezier(.22,1,.36,1) both",
      }}>
        {/* Brand */}
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{
            display:"inline-flex", alignItems:"center", justifyContent:"center",
            width:50, height:50, borderRadius:14,
            background:"rgba(155,155,210,.12)", border:"1.5px solid rgba(155,155,210,.25)", marginBottom:12,
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z" fill="#9B9BD2"/>
              <circle cx="12" cy="11" r="2" fill="#161630"/>
            </svg>
          </div>
          <h1 style={{
            fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700,
            color:"#e8e8f5", margin:"0 0 4px", letterSpacing:"-.3px",
          }}>
            Stay<span style={{ color:"#9B9BD2" }}>BnB</span>
          </h1>
          <p style={{ color:"rgba(182,182,222,.48)", fontSize:13, margin:0 }}>
            Create your account and start exploring
          </p>
        </div>

        {/* Card */}
        <div style={{
          background:"rgba(22,22,48,.62)", border:"1.5px solid rgba(155,155,210,.14)",
          borderRadius:20, padding:"28px 26px",
          backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
          boxShadow:"0 24px 64px rgba(10,10,30,.55)",
        }}>
          {/* Step indicator */}
          

          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div style={{ marginBottom:15 }}>
              <label style={{
                display:"block", marginBottom:7, fontSize:12, fontWeight:500,
                color: focused === "name" ? "#9B9BD2" : "rgba(182,182,222,.6)",
                transition:"color .2s", letterSpacing:".2px",
              }}>Full name</label>
              <div style={{ position:"relative" }}>
                <span style={{
                  position:"absolute", left:13, top:"50%", transform:"translateY(-50%)",
                  color: focused === "name" ? "#9B9BD2" : "rgba(155,155,210,.32)",
                  transition:"color .2s", pointerEvents:"none", display:"flex",
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
                  </svg>
                </span>
                <input
                  className="sb-input"
                  type="text" name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused("")}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom:15 }}>
              <label style={{
                display:"block", marginBottom:7, fontSize:12, fontWeight:500,
                color: focused === "email" ? "#9B9BD2" : "rgba(182,182,222,.6)",
                transition:"color .2s", letterSpacing:".2px",
              }}>Email address</label>
              <div style={{ position:"relative" }}>
                <span style={{
                  position:"absolute", left:13, top:"50%", transform:"translateY(-50%)",
                  color: focused === "email" ? "#9B9BD2" : "rgba(155,155,210,.32)",
                  transition:"color .2s", pointerEvents:"none", display:"flex",
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"/>
                  </svg>
                </span>
                <input
                  className="sb-input"
                  type="email" name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused("")}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom:20 }}>
              <label style={{
                display:"block", marginBottom:7, fontSize:12, fontWeight:500,
                color: focused === "password" ? "#9B9BD2" : "rgba(182,182,222,.6)",
                transition:"color .2s", letterSpacing:".2px",
              }}>Password</label>
              <div style={{ position:"relative" }}>
                <span style={{
                  position:"absolute", left:13, top:"50%", transform:"translateY(-50%)",
                  color: focused === "password" ? "#9B9BD2" : "rgba(155,155,210,.32)",
                  transition:"color .2s", pointerEvents:"none", display:"flex",
                }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15.1 8H8.9V6C8.9 4.29 10.29 2.9 12 2.9C13.71 2.9 15.1 4.29 15.1 6V8Z"/>
                  </svg>
                </span>
                <input
                  className="sb-input"
                  type={showPassword ? "text" : "password"} name="password"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocused("password")}
                  onBlur={() => setFocused("")}
                  style={{ paddingRight:44 }}
                />
                <button type="button" className="toggle-pw" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword
                    ? <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z"/></svg>
                    : <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7C14.76 7 17 9.24 17 12C17 12.65 16.87 13.26 16.64 13.83L19.56 16.75C21.07 15.49 22.26 13.86 23 12C21.27 7.61 17 4.5 12 4.5C10.6 4.5 9.26 4.75 8.01 5.2L10.17 7.36C10.74 7.13 11.35 7 12 7ZM2 4.27L4.28 6.55L4.73 7C3.08 8.3 1.78 10.02 1 12C2.73 16.39 7 19.5 12 19.5C13.55 19.5 15.03 19.2 16.38 18.66L16.8 19.08L19.73 22L21 20.73L3.27 3L2 4.27ZM7.53 9.8L9.08 11.35C9.03 11.56 9 11.78 9 12C9 13.66 10.34 15 12 15C12.22 15 12.44 14.97 12.65 14.92L14.2 16.47C13.53 16.8 12.79 17 12 17C9.24 17 7 14.76 7 12C7 11.21 7.2 10.47 7.53 9.8Z"/></svg>
                  }
                </button>
              </div>

              {/* Strength bar */}
              {formData.password.length > 0 && (
                <div style={{ marginTop:10 }}>
                  <div style={{ display:"flex", gap:4, marginBottom:5 }}>
                    {[1,2,3,4].map(i => (
                      <div key={i} style={{
                        flex:1, height:3, borderRadius:2,
                        background: i <= strength ? strengthColor[strength] : "rgba(155,155,210,.12)",
                        transition:"background .3s",
                      }}/>
                    ))}
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ display:"flex", gap:10 }}>
                      {[
                        { label:"8+ chars", check: formData.password.length >= 8 },
                        { label:"Uppercase", check: /[A-Z]/.test(formData.password) },
                        { label:"Number", check: /[0-9]/.test(formData.password) },
                      ].map(({ label, check }) => (
                        <span key={label} className={`check-item ${check ? "active" : ""}`}>
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                            <circle cx="6" cy="6" r="5.5" stroke={check ? "#9B9BD2" : "rgba(155,155,210,.25)"}/>
                            {check && <path d="M3.5 6L5.2 7.7L8.5 4.5" stroke="#9B9BD2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>}
                          </svg>
                          {label}
                        </span>
                      ))}
                    </div>
                    <span style={{ fontSize:11, fontWeight:600, color: strengthColor[strength] }}>
                      {strengthLabel[strength]}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Terms */}
            <p style={{ fontSize:11, color:"rgba(155,155,210,.35)", marginBottom:16, lineHeight:1.6 }}>
              By creating an account you agree to our{" "}
              <a href="#" style={{ color:"rgba(155,155,210,.65)", textDecoration:"none" }}>Terms of Service</a>
              {" "}and{" "}
              <a href="#" style={{ color:"rgba(155,155,210,.65)", textDecoration:"none" }}>Privacy Policy</a>.
            </p>

            <button type="submit" className={`sb-btn ${loading ? "loading" : ""}`} disabled={loading}>
              {loading
                ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                    <svg style={{ animation:"spin .8s linear infinite" }} width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="rgba(22,22,48,.35)" strokeWidth="3"/>
                      <path d="M12 2A10 10 0 0 1 22 12" stroke="#161630" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                    Creating account...
                  </span>
                : "Create account"
              }
            </button>
          </form>

          {/* Divider */}
          <div style={{ display:"flex", alignItems:"center", gap:10, margin:"20px 0" }}>
            <div style={{ flex:1, height:1, background:"linear-gradient(to right,transparent,rgba(155,155,210,.18),transparent)" }}/>
            <span style={{ fontSize:11, color:"rgba(155,155,210,.3)", whiteSpace:"nowrap" }}>already have an account?</span>
            <div style={{ flex:1, height:1, background:"linear-gradient(to right,rgba(155,155,210,.18),transparent)" }}/>
          </div>

          <Link to="/" style={{ textDecoration:"none" }}>
            <div style={{
              width:"100%", padding:"12px", borderRadius:12,
              border:"1.5px solid rgba(155,155,210,.18)",
              textAlign:"center", color:"#B6B6DE", fontSize:13, fontWeight:500,
              cursor:"pointer", transition:"all .2s", background:"rgba(155,155,210,.04)",
              boxSizing:"border-box",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(155,155,210,.4)"; e.currentTarget.style.color="#9B9BD2"; e.currentTarget.style.background="rgba(155,155,210,.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(155,155,210,.18)"; e.currentTarget.style.color="#B6B6DE"; e.currentTarget.style.background="rgba(155,155,210,.04)"; }}
            >
              Sign in instead →
            </div>
          </Link>
        </div>

        <p style={{ textAlign:"center", marginTop:18, fontSize:11, color:"rgba(155,155,210,.22)" }}>
          © 2025 StayBnB · All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Register;