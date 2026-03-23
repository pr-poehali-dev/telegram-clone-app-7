import { useState } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { CHATS, CONTACTS } from "./data";
import type { Chat } from "@/pages/Index";

interface Props {
  onOpenChat: (chat: Chat) => void;
}

export default function SearchScreen({ onOpenChat }: Props) {
  const [query, setQuery] = useState("");

  const allItems = [...CHATS, ...CONTACTS.map(c => ({ ...c, lastMessage: c.status, time: "", unread: 0 }))];
  const results = query.length > 1
    ? allItems.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="screen-wrap">
      <div className="screen-header">
        <h1 className="screen-title">Поиск</h1>
      </div>

      <div className="search-bar search-bar-lg">
        <Icon name="Search" size={18} />
        <input
          className="search-input"
          placeholder="Люди, сообщения, группы..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
        {query && <button onClick={() => setQuery("")}><Icon name="X" size={16} /></button>}
      </div>

      {!query && (
        <div className="search-empty">
          <div className="search-empty-icon">
            <Icon name="Search" size={40} />
          </div>
          <p className="search-empty-title">Начните поиск</p>
          <p className="search-empty-sub">Найдите людей, группы и сообщения</p>
        </div>
      )}

      {query && results.length === 0 && (
        <div className="search-empty">
          <div className="search-empty-icon">
            <Icon name="SearchX" size={40} />
          </div>
          <p className="search-empty-title">Ничего не найдено</p>
          <p className="search-empty-sub">Попробуйте другой запрос</p>
        </div>
      )}

      {results.length > 0 && (
        <>
          <div className="section-label">Результаты · {results.length}</div>
          <div className="chat-list">
            {results.map((item, i) => (
              <div key={`${item.id}-${i}`} className="chat-item"
                onClick={() => onOpenChat({ id: item.id, name: item.name, avatar: item.avatar, lastMessage: (item as Chat).lastMessage || "", time: (item as Chat).time || "", unread: (item as Chat).unread || 0, online: item.online })}>
                <Avatar initials={item.avatar} online={item.online} index={i} />
                <div className="chat-info">
                  <span className="chat-name">{item.name}</span>
                  <span className="chat-last">{(item as Chat).lastMessage}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
