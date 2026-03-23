import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { NOTIFICATIONS } from "./data";

const typeIcon: Record<string, string> = {
  message: "MessageCircle",
  group: "Users",
  call: "Phone",
};
const typeColor: Record<string, string> = {
  message: "notif-icon-msg",
  group: "notif-icon-grp",
  call: "notif-icon-call",
};

export default function NotificationsScreen() {
  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  return (
    <div className="screen-wrap">
      <div className="screen-header">
        <h1 className="screen-title">Уведомления</h1>
        {unread > 0 && <span className="unread-badge">{unread}</span>}
      </div>

      <div className="chat-list">
        {NOTIFICATIONS.map((n, i) => (
          <div key={n.id} className={`notif-item ${!n.read ? "notif-unread" : ""}`} style={{ animationDelay: `${i * 40}ms` }}>
            <div className="notif-avatar-wrap">
              <Avatar initials={n.avatar} index={i} />
              <div className={`notif-type-icon ${typeColor[n.type]}`}>
                <Icon name={typeIcon[n.type]} size={10} />
              </div>
            </div>
            <div className="chat-info">
              <div className="chat-top">
                <span className="chat-name">{n.name}</span>
                <span className="chat-time">{n.time}</span>
              </div>
              <span className="chat-last">{n.text}</span>
            </div>
            {!n.read && <div className="notif-dot" />}
          </div>
        ))}
      </div>
    </div>
  );
}
