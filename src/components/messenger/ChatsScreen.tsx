import { useState } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { CHATS } from "./data";
import type { Chat } from "@/pages/Index";

interface Props {
  onOpenChat: (chat: Chat) => void;
}

export default function ChatsScreen({ onOpenChat }: Props) {
  const [search, setSearch] = useState("");
  const filtered = CHATS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="screen-wrap">
      <div className="screen-header">
        <div>
          <h1 className="screen-title">Связь</h1>
          <div className="app-brand">DRONE ACADEMY</div>
        </div>
        <button className="header-btn">
          <Icon name="PenSquare" size={20} />
        </button>
      </div>

      <div className="search-bar">
        <Icon name="Search" size={16} />
        <input
          className="search-input"
          placeholder="Поиск чатов..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="stories-row">
        {CHATS.slice(0, 6).map((c, i) => (
          <div key={c.id} className="story-item" onClick={() => onOpenChat(c)}>
            <div className={`story-ring ${c.online ? "story-ring-active" : "story-ring-muted"}`}>
              <Avatar initials={c.avatar} size="sm" index={i} />
            </div>
            <span className="story-name">{c.name.split(" ")[0]}</span>
          </div>
        ))}
      </div>

      <div className="chat-list">
        {filtered.map((chat, i) => (
          <div key={chat.id} className="chat-item" onClick={() => onOpenChat(chat)} style={{ animationDelay: `${i * 40}ms` }}>
            <Avatar initials={chat.avatar} online={chat.online} index={i} />
            <div className="chat-info">
              <div className="chat-top">
                <span className="chat-name">{chat.name}</span>
                <span className="chat-time">{chat.time}</span>
              </div>
              <div className="chat-bottom">
                <span className="chat-last">{chat.lastMessage}</span>
                {chat.unread > 0 && (
                  <span className="unread-badge">{chat.unread}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}