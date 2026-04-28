import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const LANGUAGES = [
  { code: "en", label: "English", native: "English", flag: "🇬🇧" },
  { code: "hi", label: "Hindi", native: "हिंदी", flag: "🇮🇳" },
  { code: "bn", label: "Bengali", native: "বাংলা", flag: "🇧🇩" },
  { code: "te", label: "Telugu", native: "తెలుగు", flag: "🇮🇳" },
  { code: "mr", label: "Marathi", native: "मराठी", flag: "🇮🇳" },
  { code: "ta", label: "Tamil", native: "தமிழ்", flag: "🇮🇳" },
];

const SettingsScreen = ({ onNavigate, user, language, setLanguage }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const [activeSection, setActiveSection] = useState("language");
  const [selectedLang, setSelectedLang] = useState(language || "en");
  const [toast, setToast] = useState(null);

  const handleLangSave = () => {
    setLanguage(selectedLang);
    localStorage.setItem("rakshak_language", selectedLang);
    showToast("Language updated successfully!");
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const sections = [
    { id: "language", label: "Language", icon: "🌐", desc: "Regional Settings" },
    { id: "account", label: "Account", icon: "👤", desc: "Profile & Security" },
    { id: "appearance", label: "Appearance", icon: "🎨", desc: "Theme & Display" },
  ];

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=DM+Sans:wght@400;500;700&display=swap');
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,183,3,0.4); }
          50% { box-shadow: 0 0 0 6px rgba(255,183,3,0); }
        }
        .settings-nav-btn:hover { transform: translateX(4px); }
        .lang-card:hover { transform: translateY(-2px); }
        .action-row:hover { transform: translateX(4px); }
      `}</style>

      {/* Toast Notification */}
      {toast && (
        <div style={styles.toast}>
          ✅ {toast}
        </div>
      )}

      {/* Page Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.headerIcon}>⚙️</div>
          <div>
            <h1 style={styles.headerTitle}>SETTINGS</h1>
            <p style={styles.headerSub}>Customize your RakshakPath experience</p>
          </div>
        </div>
        {/* Online Status */}
        <div style={styles.statusBadge}>
          <div style={styles.statusDot} />
          <span style={styles.statusText}>System Online</span>
        </div>
      </div>

      <div style={styles.layout}>

        {/* ── LEFT SIDEBAR NAV ── */}
        <div style={styles.sidebar}>
          <p style={styles.sidebarLabel}>NAVIGATION</p>
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                className="settings-nav-btn"
                onClick={() => setActiveSection(sec.id)}
                style={{
                  ...styles.navBtn,
                  background: isActive
                    ? 'linear-gradient(90deg, rgba(255,183,3,0.15), rgba(255,183,3,0.03))'
                    : 'transparent',
                  borderLeft: isActive ? '3px solid #FFB703' : '3px solid transparent',
                  color: isActive ? '#FFB703' : '#8888AA',
                  boxShadow: isActive ? '0 0 20px rgba(255,183,3,0.06)' : 'none',
                }}
              >
                <div style={{
                  ...styles.navIconBox,
                  background: isActive ? 'rgba(255,183,3,0.15)' : 'rgba(255,255,255,0.04)',
                  border: isActive ? '1px solid rgba(255,183,3,0.3)' : '1px solid rgba(255,255,255,0.06)',
                }}>
                  <span style={{ fontSize: 18 }}>{sec.icon}</span>
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 'bold', letterSpacing: '0.3px' }}>{sec.label}</div>
                  <div style={{ fontSize: 11, color: '#555', marginTop: 2 }}>{sec.desc}</div>
                </div>
                {isActive && (
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFB703', animation: 'pulse-dot 1.5s infinite' }} />
                )}
              </button>
            );
          })}

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '16px 0' }} />

          {/* Quick Logout */}
          <button
            onClick={() => onNavigate("auth", { logout: true })}
            style={styles.logoutBtn}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(230,57,70,0.15)'; e.currentTarget.style.borderColor = 'rgba(230,57,70,0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(230,57,70,0.06)'; e.currentTarget.style.borderColor = 'rgba(230,57,70,0.2)'; }}
          >
            <span style={{ fontSize: 16 }}>🚪</span>
            <span style={{ fontSize: 12, fontWeight: 'bold', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Secure Logout</span>
          </button>
        </div>

        {/* ── RIGHT CONTENT ── */}
        <div style={{ flex: 1, animation: 'fadeSlideIn 0.3s ease' }} key={activeSection}>

          {/* ── LANGUAGE SECTION ── */}
          {activeSection === "language" && (
            <div>
              <SectionHeader icon="🌐" title="Language Settings" subtitle="Select your preferred regional language" />

              <div style={styles.langGrid}>
                {LANGUAGES.map((lang) => {
                  const chosen = selectedLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      className="lang-card"
                      onClick={() => setSelectedLang(lang.code)}
                      style={{
                        ...styles.langCard,
                        background: chosen ? 'rgba(255,183,3,0.08)' : 'rgba(255,255,255,0.02)',
                        border: chosen ? '1px solid rgba(255,183,3,0.4)' : '1px solid rgba(255,255,255,0.06)',
                        boxShadow: chosen ? '0 0 24px rgba(255,183,3,0.1)' : 'none',
                      }}
                    >
                      <div style={{
                        ...styles.flagBox,
                        background: chosen ? 'rgba(255,183,3,0.12)' : 'rgba(255,255,255,0.04)',
                        border: chosen ? '1px solid rgba(255,183,3,0.2)' : '1px solid rgba(255,255,255,0.06)',
                      }}>
                        <span style={{ fontSize: 24 }}>{lang.flag}</span>
                      </div>
                      <div style={{ flex: 1, textAlign: 'left' }}>
                        <div style={{ fontWeight: 'bold', fontSize: 14, color: chosen ? '#FFB703' : '#F0F0FF' }}>
                          {lang.label}
                        </div>
                        <div style={{ fontSize: 12, color: '#8888AA', marginTop: 2 }}>{lang.native}</div>
                      </div>
                      {chosen && (
                        <div style={styles.checkBadge}>✓</div>
                      )}
                    </button>
                  );
                })}
              </div>

              <button onClick={handleLangSave} style={styles.saveBtn}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                <span style={{ fontSize: 16 }}>💾</span>
                Save Language Preference
              </button>

              <div style={styles.infoBox}>
                <span style={{ fontSize: 16 }}>💡</span>
                <span style={{ fontSize: 13, color: '#8888AA', lineHeight: 1.5 }}>
                  Language changes affect all UI text including navigation, alerts, and system messages.
                </span>
              </div>
            </div>
          )}

          {/* ── ACCOUNT SECTION ── */}
          {activeSection === "account" && (
            <div>
              <SectionHeader icon="👤" title="Account Settings" subtitle="Your identity & security node" />

              {/* User Profile Card */}
              <div style={styles.profileCard}>
                <div style={styles.avatarRing}>
                  <div style={styles.avatar}>
                    {user?.profilePic
                      ? <img src={user.profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                      : <span style={{ fontSize: 28 }}>👤</span>
                    }
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: 20, color: '#F0F0FF', fontFamily: "'Rajdhani', sans-serif" }}>
                    {user?.name || "User"}
                  </div>
                  <div style={{ fontSize: 13, color: '#8888AA', marginTop: 2 }}>{user?.email || "No email"}</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                    <span style={styles.trustBadge}>🛡️ Trust Level 4</span>
                    <span style={{ ...styles.trustBadge, background: 'rgba(45,198,83,0.1)', color: '#2DC653', borderColor: 'rgba(45,198,83,0.2)' }}>✅ Verified</span>
                  </div>
                </div>
              </div>

              {/* Action Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { icon: '✏️', label: 'Edit Profile', desc: 'Update name, address & emergency contacts', color: '#FFB703', action: () => onNavigate('profile') },
                  { icon: '🔐', label: 'Security & Privacy', desc: 'Manage account permissions & 2FA', color: '#4C9EFF', action: () => showToast('Coming soon!') },
                  { icon: '📱', label: 'Linked Devices', desc: 'Manage trusted devices & sessions', color: '#2DC653', action: () => showToast('Coming soon!') },
                  { icon: '🔔', label: 'Notifications', desc: 'Alert sounds & push notification settings', color: '#9B59B6', action: () => showToast('Coming soon!') },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="action-row"
                    onClick={item.action}
                    style={styles.actionRow}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = item.color;
                      e.currentTarget.style.background = `${item.color}0D`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                      e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                    }}
                  >
                    <div style={{ ...styles.actionIcon, background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                    </div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{ fontWeight: 'bold', fontSize: 14, color: '#F0F0FF' }}>{item.label}</div>
                      <div style={{ fontSize: 12, color: '#8888AA', marginTop: 2 }}>{item.desc}</div>
                    </div>
                    <span style={{ color: '#555', fontSize: 20 }}>›</span>
                  </button>
                ))}
              </div>

              {/* Danger Zone */}
              <div style={styles.dangerZone}>
                <p style={{ margin: '0 0 12px 0', fontSize: 11, color: '#E63946', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 'bold' }}>
                  ⚠️ Danger Zone
                </p>
                <button
                  onClick={() => onNavigate("auth", { logout: true })}
                  style={styles.dangerBtn}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(230,57,70,0.12)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  🚪 Logout from RakshakPath
                </button>
              </div>
            </div>
          )}

          {/* ── APPEARANCE SECTION ── */}
          {activeSection === "appearance" && (
            <div>
              <SectionHeader icon="🎨" title="Appearance" subtitle="Customize the look & feel" />

              <div style={styles.themeRow}>
                {[
                  { id: 'dark', label: 'Dark Mode', icon: '🌙', desc: 'Deep space dark theme', accent: '#FFB703' },
                  { id: 'light', label: 'Light Mode', icon: '☀️', desc: 'Clean light interface', accent: '#B45309' },
                ].map((th) => {
                  const isActive = theme === th.id;
                  return (
                    <button
                      key={th.id}
                      onClick={toggleTheme}
                      style={{
                        ...styles.themeCard,
                        border: isActive ? `2px solid ${th.accent}` : '1px solid rgba(255,255,255,0.06)',
                        background: isActive ? `${th.accent}0D` : 'rgba(255,255,255,0.02)',
                        boxShadow: isActive ? `0 0 30px ${th.accent}18` : 'none',
                      }}
                    >
                      <div style={{ fontSize: 36, marginBottom: 12 }}>{th.icon}</div>
                      <div style={{ fontWeight: 'bold', fontSize: 15, color: isActive ? th.accent : '#F0F0FF', fontFamily: "'Rajdhani', sans-serif" }}>
                        {th.label}
                      </div>
                      <div style={{ fontSize: 12, color: '#8888AA', marginTop: 4 }}>{th.desc}</div>
                      {isActive && (
                        <div style={{ ...styles.checkBadge, marginTop: 12, background: th.accent }}>✓</div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div style={styles.infoBox}>
                <span style={{ fontSize: 16 }}>🎨</span>
                <span style={{ fontSize: 13, color: '#8888AA', lineHeight: 1.5 }}>
                  Theme changes apply instantly across all screens. Your preference is saved automatically.
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

/* ── Reusable Components ── */
const SectionHeader = ({ icon, title, subtitle }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
      <span style={{ fontSize: 28 }}>{icon}</span>
      <h2 style={{ margin: 0, fontSize: 24, color: '#F0F0FF', fontFamily: "'Rajdhani', sans-serif", fontWeight: 'bold', letterSpacing: '0.5px' }}>
        {title}
      </h2>
    </div>
    <p style={{ margin: 0, fontSize: 13, color: '#8888AA', paddingLeft: 40 }}>{subtitle}</p>
    <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginTop: 20 }} />
  </div>
);

/* ── Styles ── */
const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'transparent',     // ✅ transparent — App.jsx background shows
    color: '#F0F0FF',
    fontFamily: "'DM Sans', sans-serif",
    overflowY: 'auto',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '40px 40px 24px 40px',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    backdropFilter: 'blur(20px)',
    background: 'rgba(8,8,18,0.3)',      // ✅ semi-transparent header
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
  },
  headerIcon: {
    width: 48, height: 48, borderRadius: 14,
    background: 'rgba(255,183,3,0.1)',
    border: '1px solid rgba(255,183,3,0.2)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 22,
  },
  headerTitle: {
    margin: 0,
    fontSize: 28,
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 'bold',
    color: '#FFB703',
    letterSpacing: '2px',
  },
  headerSub: {
    margin: 0,
    fontSize: 13,
    color: '#8888AA',
    marginTop: 2,
  },
  statusBadge: {
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '8px 16px', borderRadius: 20,
    background: 'rgba(45,198,83,0.08)',
    border: '1px solid rgba(45,198,83,0.15)',
  },
  statusDot: {
    width: 8, height: 8, borderRadius: '50%',
    background: '#2DC653',
    boxShadow: '0 0 8px rgba(45,198,83,0.6)',
  },
  statusText: {
    fontSize: 12, color: '#2DC653', fontWeight: 'bold', letterSpacing: '0.5px',
  },
  layout: {
    display: 'flex',
    gap: 24,
    padding: '28px 40px',
    alignItems: 'flex-start',
  },
  sidebar: {
    width: 220,
    flexShrink: 0,
    position: 'sticky',
    top: 110,
    backgroundColor: 'rgba(255,255,255,0.02)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 20,
    padding: '16px 12px',
  },
  sidebarLabel: {
    margin: '0 0 10px 10px',
    fontSize: 10,
    color: '#555',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  navBtn: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '11px 12px', borderRadius: 12,
    border: 'none', cursor: 'pointer', width: '100%',
    transition: 'all 0.2s ease',
    marginBottom: 4,
  },
  navIconBox: {
    width: 36, height: 36, borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  logoutBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    width: '100%', padding: '12px 16px', borderRadius: 12,
    background: 'rgba(230,57,70,0.06)',
    border: '1px solid rgba(230,57,70,0.2)',
    color: '#E63946', cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  langGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    marginBottom: 20,
  },
  langCard: {
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '16px 18px', borderRadius: 16,
    cursor: 'pointer', transition: 'all 0.2s ease',
    backdropFilter: 'blur(20px)',
  },
  flagBox: {
    width: 44, height: 44, borderRadius: 12,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  checkBadge: {
    width: 20, height: 20, borderRadius: '50%',
    background: '#FFB703',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, color: '#000', fontWeight: 'bold',
    flexShrink: 0,
  },
  saveBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    width: '100%', padding: '16px 24px', borderRadius: 16,
    background: 'linear-gradient(135deg, #FFB703, #E6A502)',
    color: '#000', fontWeight: 'bold', fontSize: 15,
    border: 'none', cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: '0.3px',
    boxShadow: '0 8px 24px rgba(255,183,3,0.25)',
  },
  infoBox: {
    marginTop: 16,
    display: 'flex', gap: 12, alignItems: 'flex-start',
    padding: '14px 18px', borderRadius: 14,
    background: 'rgba(255,183,3,0.04)',
    border: '1px solid rgba(255,183,3,0.12)',
  },
  profileCard: {
    display: 'flex', alignItems: 'center', gap: 20,
    padding: '24px', borderRadius: 20, marginBottom: 20,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
  },
  avatarRing: {
    padding: 3, borderRadius: '50%',
    background: 'linear-gradient(135deg, #FFB703, #2DC653)',
    flexShrink: 0,
  },
  avatar: {
    width: 64, height: 64, borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(255,183,3,0.2), rgba(45,198,83,0.1))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '3px solid #0D0D1A',
    overflow: 'hidden',
  },
  trustBadge: {
    background: 'rgba(255,183,3,0.1)',
    color: '#FFB703',
    border: '1px solid rgba(255,183,3,0.2)',
    padding: '3px 10px', borderRadius: 20,
    fontSize: 11, fontWeight: 'bold',
  },
  actionRow: {
    display: 'flex', alignItems: 'center', gap: 16,
    padding: '16px 18px', borderRadius: 16,
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    cursor: 'pointer', width: '100%',
    transition: 'all 0.2s ease',
    backdropFilter: 'blur(10px)',
  },
  actionIcon: {
    width: 44, height: 44, borderRadius: 12,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  dangerZone: {
    marginTop: 24,
    padding: '20px',
    borderRadius: 16,
    background: 'rgba(230,57,70,0.03)',
    border: '1px solid rgba(230,57,70,0.12)',
  },
  dangerBtn: {
    width: '100%', padding: '14px', borderRadius: 12,
    background: 'transparent',
    border: '1.5px solid rgba(230,57,70,0.4)',
    color: '#E63946', fontWeight: 'bold', fontSize: 14,
    cursor: 'pointer', transition: 'all 0.2s ease',
    fontFamily: "'DM Sans', sans-serif",
    letterSpacing: '0.3px',
  },
  themeRow: {
    display: 'grid', gridTemplateColumns: '1fr 1fr',
    gap: 16, marginBottom: 20,
  },
  themeCard: {
    padding: '28px 24px', borderRadius: 20,
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    cursor: 'pointer', transition: 'all 0.25s ease',
    backdropFilter: 'blur(20px)',
  },
  toast: {
    position: 'fixed', bottom: 32, left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(22,22,37,0.95)',
    backdropFilter: 'blur(20px)',
    color: '#F0F0FF',
    padding: '14px 28px', borderRadius: 30,
    fontWeight: 'bold', fontSize: 14,
    zIndex: 9999,
    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,183,3,0.2)',
    animation: 'toastIn 0.3s ease',
    whiteSpace: 'nowrap',
  },
};

export default SettingsScreen;