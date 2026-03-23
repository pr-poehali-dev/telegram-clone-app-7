import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";

interface Props {
  name: string;
  avatar: string;
  video?: boolean;
  onEnd: () => void;
}

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export default function ActiveCall({ name, avatar, video = false, onEnd }: Props) {
  const [seconds, setSeconds] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="activecall-wrap">
      <div className="activecall-bg" />

      <div className="activecall-inner">
        <div className="activecall-top">
          <p className="activecall-label">{video ? "Видеозвонок" : "Голосовой звонок"}</p>
          <h2 className="activecall-name">{name}</h2>
          <div className="activecall-timer">
            <span className="timer-dot" />
            {formatTime(seconds)}
          </div>
        </div>

        <div className="activecall-avatar-area">
          <div className="activecall-glow" />
          <div className="activecall-avatar-big">
            <Avatar initials={avatar} size="lg" index={3} />
          </div>
        </div>

        <div className="activecall-controls">
          <button
            className={`ctrl-btn ${muted ? "ctrl-btn-active" : ""}`}
            onClick={() => setMuted(m => !m)}
          >
            <Icon name={muted ? "MicOff" : "Mic"} size={22} />
            <span>{muted ? "Включить" : "Выкл. микр."}</span>
          </button>

          <button className="ctrl-btn-end" onClick={onEnd}>
            <Icon name="PhoneOff" size={26} />
          </button>

          <button
            className={`ctrl-btn ${speaker ? "ctrl-btn-active" : ""}`}
            onClick={() => setSpeaker(s => !s)}
          >
            <Icon name={speaker ? "Volume2" : "VolumeX"} size={22} />
            <span>{speaker ? "Динамик" : "Телефон"}</span>
          </button>
        </div>

        <div className="activecall-extra">
          <button className="extra-btn">
            <Icon name="Video" size={20} />
          </button>
          <button className="extra-btn">
            <Icon name="MessageCircle" size={20} />
          </button>
          <button className="extra-btn">
            <Icon name="UserPlus" size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
