import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { MESSAGES } from "./data";
import type { Chat } from "@/pages/Index";

interface Props {
  chat: Chat;
  onBack: () => void;
  onCall?: (video: boolean) => void;
}

export default function ChatWindow({ chat, onBack, onCall }: Props) {
  const [messages, setMessages] = useState(MESSAGES);
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const send = () => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now(), text: text.trim(), time: new Date().toLocaleTimeString("ru", { hour: "2-digit", minute: "2-digit" }), mine: true
    }]);
    setText("");
  };

  return (
    <div className="chatwin-wrap">
      <div className="chatwin-header">
        <button className="back-btn" onClick={onBack}>
          <Icon name="ChevronLeft" size={24} />
        </button>
        <Avatar initials={chat.avatar} online={chat.online} size="sm" index={chat.id} />
        <div className="chatwin-info">
          <span className="chatwin-name">{chat.name}</span>
          <span className="chatwin-status">{chat.online ? "в сети" : "был(а) недавно"}</span>
        </div>
        <div className="chatwin-actions">
          <button className="header-btn" onClick={() => onCall?.(false)}><Icon name="Phone" size={20} /></button>
          <button className="header-btn" onClick={() => onCall?.(true)}><Icon name="Video" size={20} /></button>
        </div>
      </div>

      <div className="messages-area">
        {messages.map((msg, i) => (
          <div key={msg.id} className={`msg-row ${msg.mine ? "msg-mine" : "msg-theirs"}`} style={{ animationDelay: `${i * 30}ms` }}>
            {!msg.mine && <Avatar initials={chat.avatar} size="sm" index={chat.id} />}
            <div className={`msg-bubble ${msg.mine ? "msg-bubble-mine" : "msg-bubble-theirs"}`}>
              <p className="msg-text">{msg.text}</p>
              <span className="msg-time">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="input-bar">
        <button className="attach-btn"><Icon name="Paperclip" size={20} /></button>
        <input
          ref={inputRef}
          className="msg-input"
          placeholder="Сообщение..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && send()}
        />
        <button className="attach-btn"><Icon name="Smile" size={20} /></button>
        <button className="send-btn" onClick={send}>
          <Icon name="Send" size={18} />
        </button>
      </div>
    </div>
  );
}