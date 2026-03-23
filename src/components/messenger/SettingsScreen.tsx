import { useState } from "react";
import Icon from "@/components/ui/icon";

const SETTINGS = [
  {
    group: "Аккаунт",
    items: [
      { icon: "User", label: "Личные данные", sub: "Имя, фото, статус" },
      { icon: "Lock", label: "Конфиденциальность", sub: "Кто видит ваши данные" },
      { icon: "Shield", label: "Безопасность", sub: "Двухфакторная аутентификация" },
    ],
  },
  {
    group: "Уведомления",
    items: [
      { icon: "Bell", label: "Push-уведомления", sub: "Настройка звуков и вибрации", toggle: true, on: true },
      { icon: "Volume2", label: "Звуки", sub: "Звуки сообщений и звонков", toggle: true, on: true },
    ],
  },
  {
    group: "Чаты",
    items: [
      { icon: "Palette", label: "Тема оформления", sub: "Тёмная / Светлая / Авто" },
      { icon: "Download", label: "Медиафайлы", sub: "Автозагрузка фото и видео" },
      { icon: "Archive", label: "Архив чатов", sub: "Управление архивом" },
    ],
  },
  {
    group: "Другое",
    items: [
      { icon: "HelpCircle", label: "Помощь", sub: "Часто задаваемые вопросы" },
      { icon: "Info", label: "О приложении", sub: "Версия 1.0.0" },
      { icon: "LogOut", label: "Выйти", sub: "Выход из аккаунта", danger: true },
    ],
  },
];

export default function SettingsScreen() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({ "Push-уведомления": true, "Звуки": true });

  return (
    <div className="screen-wrap">
      <div className="screen-header">
        <h1 className="screen-title">Настройки</h1>
      </div>

      {SETTINGS.map(section => (
        <div key={section.group} className="settings-section">
          <div className="section-label">{section.group}</div>
          <div className="settings-group">
            {section.items.map((item, i) => (
              <div key={i} className={`settings-row ${item.danger ? "settings-row-danger" : ""}`}>
                <div className={`settings-icon ${item.danger ? "settings-icon-danger" : ""}`}>
                  <Icon name={item.icon} size={18} />
                </div>
                <div className="settings-text">
                  <span className={`settings-label ${item.danger ? "text-rose-400" : ""}`}>{item.label}</span>
                  <span className="settings-sub">{item.sub}</span>
                </div>
                {item.toggle ? (
                  <button
                    className={`toggle-btn ${toggles[item.label] ? "toggle-on" : "toggle-off"}`}
                    onClick={() => setToggles(t => ({ ...t, [item.label]: !t[item.label] }))}
                  >
                    <span className="toggle-thumb" />
                  </button>
                ) : (
                  <Icon name="ChevronRight" size={18} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
