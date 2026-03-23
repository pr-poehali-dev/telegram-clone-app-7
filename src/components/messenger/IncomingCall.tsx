import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";

interface Props {
  name: string;
  avatar: string;
  video?: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export default function IncomingCall({ name, avatar, video = false, onAccept, onDecline }: Props) {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setPulse(p => p + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="incall-overlay">
      <div className="incall-bg" />

      <div className="incall-wrap">
        <div className="incall-top">
          <div className="incall-type-label">
            <Icon name={video ? "Video" : "Phone"} size={14} />
            <span>{video ? "Видеозвонок" : "Голосовой звонок"}</span>
          </div>
          <h2 className="incall-name">{name}</h2>
          <p className="incall-status">Входящий звонок...</p>
        </div>

        <div className="incall-avatar-area">
          <div className="incall-ring ring-3" style={{ animationDelay: "0s" }} />
          <div className="incall-ring ring-2" style={{ animationDelay: "0.35s" }} />
          <div className="incall-ring ring-1" style={{ animationDelay: "0.7s" }} />
          <div className="incall-avatar">
            <Avatar initials={avatar} size="lg" index={2} />
          </div>
        </div>

        <div className="incall-actions">
          <div className="incall-action-wrap">
            <button className="incall-btn incall-decline" onClick={onDecline}>
              <Icon name="PhoneOff" size={28} />
            </button>
            <span className="incall-action-label">Отклонить</span>
          </div>

          <div className="incall-action-wrap">
            <button className="incall-btn incall-message">
              <Icon name="MessageCircle" size={24} />
            </button>
            <span className="incall-action-label">Сообщение</span>
          </div>

          <div className="incall-action-wrap">
            <button className="incall-btn incall-accept" onClick={onAccept}>
              <Icon name="Phone" size={28} />
            </button>
            <span className="incall-action-label">Принять</span>
          </div>
        </div>
      </div>
    </div>
  );
}
