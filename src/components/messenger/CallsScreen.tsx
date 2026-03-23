import Icon from "@/components/ui/icon";
import Avatar from "./Avatar";
import { CALLS_HISTORY } from "./data";

const callIcon: Record<string, string> = {
  incoming: "PhoneIncoming",
  outgoing: "PhoneOutgoing",
  missed: "PhoneMissed",
};
const callColor: Record<string, string> = {
  incoming: "text-emerald-400",
  outgoing: "text-blue-400",
  missed: "text-rose-400",
};

export default function CallsScreen() {
  return (
    <div className="screen-wrap">
      <div className="screen-header">
        <h1 className="screen-title">Звонки</h1>
        <button className="header-btn"><Icon name="Phone" size={20} /></button>
      </div>

      <div className="calls-tabs">
        <button className="calls-tab calls-tab-active">Все</button>
        <button className="calls-tab">Пропущенные</button>
      </div>

      <div className="chat-list">
        {CALLS_HISTORY.map((call, i) => (
          <div key={call.id} className="chat-item" style={{ animationDelay: `${i * 40}ms` }}>
            <Avatar initials={call.avatar} index={i} />
            <div className="chat-info">
              <div className="chat-top">
                <span className="chat-name">{call.name}</span>
                <span className="chat-time">{call.duration || "—"}</span>
              </div>
              <div className="chat-bottom">
                <div className={`call-type ${callColor[call.type]}`}>
                  <Icon name={callIcon[call.type]} size={14} />
                  <span>{call.time}</span>
                </div>
                {call.video && <span className="video-tag"><Icon name="Video" size={12} /> Видео</span>}
              </div>
            </div>
            <div className="call-action-btns">
              <button className="call-btn"><Icon name={call.video ? "Video" : "Phone"} size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
