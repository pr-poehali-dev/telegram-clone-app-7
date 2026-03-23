import { useState } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { CONTACTS } from "./data";
import type { Chat } from "@/pages/Index";

interface Props {
  onOpenChat: (chat: Chat) => void;
}

export default function ContactsScreen({ onOpenChat }: Props) {
  const [search, setSearch] = useState("");
  const filtered = CONTACTS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="screen-wrap">
      <div className="screen-header">
        <h1 className="screen-title">Контакты</h1>
        <button className="header-btn"><Icon name="UserPlus" size={20} /></button>
      </div>

      <div className="search-bar">
        <Icon name="Search" size={16} />
        <input className="search-input" placeholder="Поиск контактов..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="section-label">Все контакты · {filtered.length}</div>

      <div className="chat-list">
        {filtered.map((c, i) => (
          <div key={c.id} className="chat-item" style={{ animationDelay: `${i * 40}ms` }}
            onClick={() => onOpenChat({ id: c.id, name: c.name, avatar: c.avatar, lastMessage: c.status, time: "", unread: 0, online: c.online })}>
            <Avatar initials={c.avatar} online={c.online} index={i} />
            <div className="chat-info">
              <div className="chat-top">
                <span className="chat-name">{c.name}</span>
                <span className={`online-tag ${c.online ? "online-tag-on" : "online-tag-off"}`}>
                  {c.online ? "в сети" : "не в сети"}
                </span>
              </div>
              <div className="chat-bottom">
                <span className="chat-last">{c.status}</span>
              </div>
            </div>
            <div className="contact-actions">
              <button className="header-btn" onClick={e => { e.stopPropagation(); }}><Icon name="Phone" size={18} /></button>
              <button className="header-btn" onClick={e => { e.stopPropagation(); }}><Icon name="Video" size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
