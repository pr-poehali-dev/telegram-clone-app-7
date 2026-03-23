import { useState, useEffect } from "react";
import LoginScreen from "@/components/messenger/LoginScreen";
import ChatsScreen from "@/components/messenger/ChatsScreen";
import ContactsScreen from "@/components/messenger/ContactsScreen";
import GroupsScreen from "@/components/messenger/GroupsScreen";
import SearchScreen from "@/components/messenger/SearchScreen";
import NotificationsScreen from "@/components/messenger/NotificationsScreen";
import CallsScreen from "@/components/messenger/CallsScreen";
import ProfileScreen from "@/components/messenger/ProfileScreen";
import SettingsScreen from "@/components/messenger/SettingsScreen";
import BottomNav from "@/components/messenger/BottomNav";
import ChatWindow from "@/components/messenger/ChatWindow";
import IncomingCall from "@/components/messenger/IncomingCall";
import ActiveCall from "@/components/messenger/ActiveCall";

export type Screen = "chats" | "contacts" | "groups" | "search" | "notifications" | "calls" | "profile" | "settings";

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  isGroup?: boolean;
}

type CallState = "none" | "incoming" | "active";
const DEMO_CALLER = { name: "Алёна Морозова", avatar: "АМ" };

const Index = () => {
  const [authed, setAuthed] = useState(false);
  const [activeScreen, setActiveScreen] = useState<Screen>("chats");
  const [openChat, setOpenChat] = useState<Chat | null>(null);
  const [callState, setCallState] = useState<CallState>("none");
  const [callVideo, setCallVideo] = useState(false);

  useEffect(() => {
    if (!authed) return;
    const t = setTimeout(() => setCallState("incoming"), 3500);
    return () => clearTimeout(t);
  }, [authed]);

  const startCall = (video = false) => {
    setCallVideo(video);
    setCallState("incoming");
  };

  const renderScreen = () => {
    if (openChat) {
      return <ChatWindow chat={openChat} onBack={() => setOpenChat(null)} onCall={startCall} />;
    }
    switch (activeScreen) {
      case "chats": return <ChatsScreen onOpenChat={setOpenChat} />;
      case "contacts": return <ContactsScreen onOpenChat={setOpenChat} />;
      case "groups": return <GroupsScreen onOpenChat={setOpenChat} />;
      case "search": return <SearchScreen onOpenChat={setOpenChat} />;
      case "notifications": return <NotificationsScreen />;
      case "calls": return <CallsScreen onCall={startCall} />;
      case "profile": return <ProfileScreen onLogout={() => setAuthed(false)} />;
      case "settings": return <SettingsScreen />;
      default: return <ChatsScreen onOpenChat={setOpenChat} />;
    }
  };

  if (!authed) {
    return (
      <div className="messenger-root">
        <div className="messenger-bg" />
        <div className="messenger-container">
          <LoginScreen onLogin={() => setAuthed(true)} />
        </div>
      </div>
    );
  }

  return (
    <div className="messenger-root">
      <div className="messenger-bg" />
      <div className="messenger-container">
        <div className="messenger-screen">
          {renderScreen()}
        </div>
        {!openChat && (
          <BottomNav active={activeScreen} onChange={setActiveScreen} />
        )}

        {callState === "incoming" && (
          <IncomingCall
            name={DEMO_CALLER.name}
            avatar={DEMO_CALLER.avatar}
            video={callVideo}
            onAccept={() => setCallState("active")}
            onDecline={() => setCallState("none")}
          />
        )}

        {callState === "active" && (
          <ActiveCall
            name={DEMO_CALLER.name}
            avatar={DEMO_CALLER.avatar}
            video={callVideo}
            onEnd={() => setCallState("none")}
          />
        )}
      </div>
    </div>
  );
};

export default Index;