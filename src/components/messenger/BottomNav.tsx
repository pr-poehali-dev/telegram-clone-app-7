import Icon from "@/components/ui/icon";
import type { Screen } from "@/pages/Index";

interface Props {
  active: Screen;
  onChange: (s: Screen) => void;
}

const navItems: { id: Screen; icon: string; label: string }[] = [
  { id: "chats", icon: "MessageCircle", label: "Чаты" },
  { id: "contacts", icon: "Users", label: "Контакты" },
  { id: "groups", icon: "UsersRound", label: "Группы" },
  { id: "calls", icon: "Phone", label: "Звонки" },
  { id: "profile", icon: "User", label: "Профиль" },
];

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${active === item.id ? "nav-item-active" : ""}`}
          onClick={() => onChange(item.id)}
        >
          <div className={`nav-icon-wrap ${active === item.id ? "nav-icon-active" : ""}`}>
            <Icon name={item.icon} size={22} />
          </div>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
