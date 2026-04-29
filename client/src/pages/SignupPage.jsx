import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { departments, topics } from "@/data/mockData";
import { toast } from "sonner";

const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [agreed, setAgreed] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    department: departments[0].name,
    aiFocus: topics[0],
    bio: "",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const res = signup({
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password,
      role,
      department: role === "representative" ? form.department : undefined,
      aiFocus: role === "representative" ? form.aiFocus : undefined,
      bio: role === "representative" ? form.bio.trim() : undefined,
    });
    setLoading(false);
    if (!res.ok) {
      toast.error(res.error ?? "Sign up failed");
      return;
    }
    toast.success(role === "representative"
      ? "Account created! Awaiting admin approval."
      : "Welcome aboard!");
    navigate("/dashboard");
  };

  const roles = [
    {
      id: "student",
      label: "Student",
      desc: "Access curated research & labs",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
          <path d="M6 12v5c3.33 2 8.67 2 12 0v-5"/>
        </svg>
      ),
    },
    {
      id: "faculty",
      label: "Faculty",
      desc: "Manage publications & grants",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
      ),
    },
    {
      id: "admin",
      label: "Admin",
      desc: "System-wide governance",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
    },
  ];

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.navBrand}>AI House</span>
        <div style={s.navRight}>
          <span style={s.navText}>Already have an account?</span>
          <Link to="/login" style={s.navLink}>Portal Login</Link>
        </div>
      </nav>

      {/* Main */}
      <div style={s.main}>
        <div style={s.twoCol}>
          {/* Left dark panel */}
          <div style={s.leftPanel}>
            <div style={s.leftContent}>
              <h2 style={s.heroTitle}>The Digital<br />Curator</h2>
              <p style={s.heroDesc}>
                Join the University of Blida 1 elite research ecosystem. Empower your intellectual journey with autonomous AI insights.
              </p>
            </div>
            <div style={s.badges}>
              <div style={s.badge}>
                <span style={s.badgeIcon}>✦</span>
                <span style={s.badgeText}>Verified Academic Network</span>
              </div>
              <div style={s.badge}>
                <span style={{ ...s.badgeIcon, color: "#4ade80" }}>✦</span>
                <span style={s.badgeText}>AI-Powered Research Discovery</span>
              </div>
            </div>
          </div>

          {/* Right form panel */}
          <div style={s.rightPanel}>
            <h1 style={s.formTitle}>Create your account</h1>
            <p style={s.formSub}>Select your role to personalize your research experience.</p>

            {/* Role selector */}
            <div style={s.roleLabel}>ACADEMIC ROLE</div>
            <div style={s.roleGrid}>
              {roles.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  style={{
                    ...s.roleCard,
                    ...(role === r.id ? s.roleCardActive : {}),
                  }}
                >
                  <span style={{ ...s.roleIcon, color: role === r.id ? "#4f6ef7" : "#6b7280" }}>
                    {r.icon}
                  </span>
                  <div style={s.roleCardLabel}>{r.label}</div>
                  <div style={s.roleCardDesc}>{r.desc}</div>
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} style={s.form}>
              {/* Row 1 */}
              <div style={s.row2}>
                <div style={s.field}>
                  <label style={s.label}>Full Name</label>
                  <input
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    placeholder="Dr. Researcher"
                    style={s.input}
                  />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Department</label>
                  <div style={s.selectWrap}>
                    <select
                      value={form.department}
                      onChange={(e) => setForm({ ...form, department: e.target.value })}
                      style={s.select}
                    >
                      {departments.map((d) => (
                        <option key={d.id} value={d.name}>{d.name}</option>
                      ))}
                    </select>
                    <span style={s.selectArrow}>⌄</span>
                  </div>
                </div>
              </div>

              {/* Row 2 */}
              <div style={s.row2}>
                <div style={s.field}>
                  <label style={s.label}>Institutional Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@univ-blida.dz"
                    style={s.input}
                  />
                </div>
                <div style={s.field}>
                  <label style={s.label}>Secure Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    style={s.input}
                  />
                </div>
              </div>

              {/* Representative extras */}
              {role === "representative" && (
                <>
                  <div style={s.field}>
                    <label style={s.label}>AI Focus</label>
                    <select
                      value={form.aiFocus}
                      onChange={(e) => setForm({ ...form, aiFocus: e.target.value })}
                      style={{ ...s.select, width: "100%" }}
                    >
                      {topics.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Short Bio</label>
                    <textarea
                      rows={3}
                      value={form.bio}
                      onChange={(e) => setForm({ ...form, bio: e.target.value })}
                      placeholder="Briefly describe your teaching/research background"
                      style={{ ...s.input, resize: "vertical", height: "80px" }}
                    />
                  </div>
                </>
              )}

              {/* Checkbox */}
              <label style={s.checkRow}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  style={s.checkbox}
                />
                <span style={s.checkText}>
                  I agree to the{" "}
                  <a href="#" style={s.checkLink}>Scholarly Intelligence Ethics AI Policy</a>.
                </span>
              </label>

              {/* Submit */}
              <button type="submit" disabled={loading} style={s.btn}>
                {loading ? "Creating account..." : "Initialize Membership →"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={s.footer}>
        <span style={s.footerBrand}>AI House</span>
        <div style={s.footerLinks}>
          <a href="#" style={s.footerLink}>Privacy Policy</a>
          <a href="#" style={s.footerLink}>Terms of Service</a>
          <a href="#" style={s.footerLink}>Contact</a>
          <a href="#" style={s.footerLink}>Ethics AI</a>
        </div>
        <span style={s.copyright}>© 2024 University of Blida 1 · Scholarly Intelligence Framework</span>
      </footer>
    </div>
  );
};

const s = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef0f8 0%, #e8ebf5 100%)",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    height: "56px",
    background: "white",
    borderBottom: "1px solid #e5e7eb",
  },
  navBrand: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#0f1340",
    letterSpacing: "-0.3px",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  navText: {
    fontSize: "13px",
    color: "#6b7280",
  },
  navLink: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#4f6ef7",
    textDecoration: "none",
  },
  main: {
    flex: 1,
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "40px 24px",
  },
  twoCol: {
    display: "flex",
    width: "100%",
    maxWidth: "1000px",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 40px rgba(60,80,180,0.10)",
  },
  leftPanel: {
    width: "260px",
    minWidth: "260px",
    background: "linear-gradient(170deg, #0f1b3d 0%, #0a1128 60%, #0d1535 100%)",
    padding: "40px 28px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  leftContent: {},
  heroTitle: {
    fontSize: "30px",
    fontWeight: "800",
    color: "white",
    lineHeight: 1.2,
    margin: "0 0 20px",
    letterSpacing: "-0.5px",
  },
  heroDesc: {
    fontSize: "14px",
    color: "#8fa3c8",
    lineHeight: 1.7,
    margin: 0,
  },
  badges: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    marginTop: "40px",
  },
  badge: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
  },
  badgeIcon: {
    color: "#4f6ef7",
    fontSize: "16px",
    marginTop: "2px",
    flexShrink: 0,
  },
  badgeText: {
    fontSize: "13px",
    fontWeight: "600",
    color: "white",
    lineHeight: 1.4,
  },
  rightPanel: {
    flex: 1,
    background: "white",
    padding: "40px 44px",
  },
  formTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#0f1340",
    margin: "0 0 6px",
    letterSpacing: "-0.3px",
  },
  formSub: {
    fontSize: "14px",
    color: "#6b7280",
    margin: "0 0 28px",
  },
  roleLabel: {
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "0.1em",
    color: "#9ca3af",
    marginBottom: "10px",
  },
  roleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginBottom: "28px",
  },
  roleCard: {
    border: "1.5px solid #e5e7eb",
    borderRadius: "10px",
    padding: "16px 14px",
    textAlign: "left",
    background: "white",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  roleCardActive: {
    border: "1.5px solid #4f6ef7",
    background: "#f5f7ff",
  },
  roleIcon: {
    display: "block",
    marginBottom: "10px",
  },
  roleCardLabel: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#111827",
    marginBottom: "3px",
  },
  roleCardDesc: {
    fontSize: "12px",
    color: "#6b7280",
    lineHeight: 1.4,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  row2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "500",
    color: "#374151",
  },
  input: {
    padding: "10px 14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#111",
    background: "#fafafa",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  selectWrap: {
    position: "relative",
  },
  select: {
    padding: "10px 36px 10px 14px",
    border: "1.5px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#111",
    background: "#fafafa",
    outline: "none",
    width: "100%",
    appearance: "none",
    cursor: "pointer",
  },
  selectArrow: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: "#9ca3af",
    fontSize: "18px",
  },
  checkRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#4f6ef7",
    flexShrink: 0,
  },
  checkText: {
    fontSize: "13px",
    color: "#374151",
  },
  checkLink: {
    color: "#4f6ef7",
    textDecoration: "none",
    fontWeight: "500",
  },
  btn: {
    width: "100%",
    padding: "13px",
    background: "linear-gradient(135deg, #4f6ef7 0%, #3a55e8 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    letterSpacing: "0.02em",
    boxShadow: "0 4px 16px rgba(79,110,247,0.35)",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 40px",
    background: "white",
    borderTop: "1px solid #e5e7eb",
    flexWrap: "wrap",
    gap: "12px",
  },
  footerBrand: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#0f1340",
  },
  footerLinks: {
    display: "flex",
    gap: "20px",
  },
  footerLink: {
    fontSize: "13px",
    color: "#6b7280",
    textDecoration: "none",
  },
  copyright: {
    fontSize: "12px",
    color: "#9ca3af",
  },
};

export default SignupPage;