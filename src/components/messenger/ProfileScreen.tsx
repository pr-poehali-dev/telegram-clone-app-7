import Icon from "@/components/ui/icon";

interface Props {
  onLogout: () => void;
}

export default function ProfileScreen({ onLogout }: Props) {
  return (
    <div className="screen-wrap">
      <div className="screen-header">
        <h1 className="screen-title">Профиль</h1>
        <button className="header-btn"><Icon name="Pencil" size={20} /></button>
      </div>

      <div className="profile-hero">
        <div className="profile-avatar-wrap">
          <div className="profile-avatar">АВ</div>
          <div className="profile-status-dot" />
          <button className="profile-avatar-edit">
            <Icon name="Camera" size={16} />
          </button>
        </div>
        <h2 className="profile-name">Александр Волков</h2>
        <p className="profile-username">@alex_volkov</p>
        <div className="profile-status-badge">
          <span className="status-dot-green" />
          <span>В сети</span>
        </div>
      </div>

      <div className="profile-stats">
        {[
          { label: "Контакты", value: "142" },
          { label: "Группы", value: "8" },
          { label: "Медиа", value: "394" },
        ].map(s => (
          <div key={s.label} className="profile-stat">
            <span className="profile-stat-value">{s.value}</span>
            <span className="profile-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="profile-info-card">
        {[
          { icon: "Phone", label: "Телефон", value: "+7 999 123-45-67" },
          { icon: "Mail", label: "Email", value: "alex@example.com" },
          { icon: "MapPin", label: "Город", value: "Москва" },
          { icon: "Calendar", label: "Дата регистрации", value: "Январь 2024" },
        ].map((item, i) => (
          <div key={i} className="profile-info-row">
            <div className="profile-info-icon">
              <Icon name={item.icon} size={18} />
            </div>
            <div>
              <div className="profile-info-label">{item.label}</div>
              <div className="profile-info-value">{item.value}</div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onLogout}
        className="profile-logout-btn"
      >
        <Icon name="LogOut" size={18} />
        Выйти из аккаунта
      </button>
    </div>
  );
}