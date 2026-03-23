import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Props {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="login-root">
      {/* Background grid */}
      <div className="login-grid" />
      <div className="login-glow-tl" />
      <div className="login-glow-br" />

      <div className="login-wrap">
        {/* Logo block */}
        <div className="login-logo-block">
          <div className="login-logo-icon">
            <Icon name="Plane" size={28} />
            <Icon name="Wifi" size={16} style={{ position: "absolute", bottom: 4, right: 4 }} />
          </div>
          <div className="login-logo-text">
            <div className="login-logo-title">DA·LINK</div>
            <div className="login-logo-sub">DRONE ACADEMY</div>
          </div>
        </div>

        {/* Status line */}
        <div className="login-status-bar">
          <span className="login-status-dot" />
          <span className="login-status-text">ЗАЩИЩЁННЫЙ КАНАЛ АКТИВЕН</span>
          <span className="login-status-code">DA·2026</span>
        </div>

        {/* Tabs */}
        <div className="login-tabs">
          <button
            className={`login-tab ${tab === "login" ? "login-tab-active" : ""}`}
            onClick={() => setTab("login")}
          >
            ВХОД
          </button>
          <button
            className={`login-tab ${tab === "register" ? "login-tab-active" : ""}`}
            onClick={() => setTab("register")}
          >
            РЕГИСТРАЦИЯ
          </button>
        </div>

        {/* Form */}
        <div className="login-form">
          {tab === "register" && (
            <div className="login-field">
              <label className="login-label">ПОЗЫВНОЙ / ФИО</label>
              <div className="login-input-wrap">
                <Icon name="User" size={16} />
                <input
                  className="login-input"
                  placeholder="Введите ваше имя"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="login-field">
            <label className="login-label">НОМЕР ТЕЛЕФОНА</label>
            <div className="login-input-wrap">
              <Icon name="Phone" size={16} />
              <input
                className="login-input"
                placeholder="+7 000 000-00-00"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                type="tel"
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label">ПАРОЛЬ ДОСТУПА</label>
            <div className="login-input-wrap">
              <Icon name="Lock" size={16} />
              <input
                className="login-input"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </div>
          </div>

          <button className="login-btn" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <span className="login-btn-loading">
                <span className="login-spinner" />
                АВТОРИЗАЦИЯ...
              </span>
            ) : (
              <span className="login-btn-content">
                <Icon name={tab === "login" ? "LogIn" : "UserPlus"} size={18} />
                {tab === "login" ? "ВОЙТИ В СИСТЕМУ" : "СОЗДАТЬ АККАУНТ"}
              </span>
            )}
          </button>

          {tab === "login" && (
            <button className="login-forgot">ВОССТАНОВИТЬ ДОСТУП</button>
          )}
        </div>

        {/* Footer */}
        <div className="login-footer">
          <span>DRONE ACADEMY © 2026</span>
          <span className="login-footer-sep">|</span>
          <span>v1.0.0</span>
        </div>
      </div>
    </div>
  );
}