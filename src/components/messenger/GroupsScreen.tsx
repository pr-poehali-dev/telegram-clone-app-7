import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { GROUPS } from "./data";
import type { Chat } from "@/pages/Index";

interface Props {
  onOpenChat: (chat: Chat) => void;
}

export default function GroupsScreen({ onOpenChat }: Props) {
  return (
    <div className="screen-wrap">
      <div className="screen-header">
        <h1 className="screen-title">Группы</h1>
        <button className="header-btn"><Icon name="Plus" size={20} /></button>
      </div>

      <button className="create-group-btn">
        <div className="create-group-icon">
          <Icon name="Plus" size={22} />
        </div>
        <div>
          <div className="create-group-title">Создать группу</div>
          <div className="create-group-sub">Добавьте участников и начните общение</div>
        </div>
      </button>

      <div className="section-label">Мои группы · {GROUPS.length}</div>

      <div className="chat-list">
        {GROUPS.map((g, i) => (
          <div key={g.id} className="chat-item" style={{ animationDelay: `${i * 40}ms` }}
            onClick={() => onOpenChat({ id: g.id, name: g.name, avatar: g.avatar, lastMessage: g.lastMessage, time: g.time, unread: g.unread, online: false, isGroup: true })}>
            <div className="group-avatar-wrap">
              <Avatar initials={g.avatar} index={i} />
              <div className="group-badge"><Icon name="Users" size={10} /></div>
            </div>
            <div className="chat-info">
              <div className="chat-top">
                <span className="chat-name">{g.name}</span>
                <span className="chat-time">{g.time}</span>
              </div>
              <div className="chat-bottom">
                <span className="chat-last">{g.lastMessage}</span>
                <div className="group-meta">
                  <Icon name="Users" size={12} />
                  <span>{g.members}</span>
                  {g.unread > 0 && <span className="unread-badge">{g.unread}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
