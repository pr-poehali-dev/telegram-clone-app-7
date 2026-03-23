import { useState } from "react";
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

const Index = () => {
  const [activeScreen, setActiveScreen] = useState<Screen>("chats");
  const [openChat, setOpenChat] = useState<Chat | null>(null);

  const renderScreen = () => {
    if (openChat) {
      return <ChatWindow chat={openChat} onBack={() => setOpenChat(null)} />;
    }
    switch (activeScreen) {
      case "chats": return <ChatsScreen onOpenChat={setOpenChat} />;
      case "contacts": return <ContactsScreen onOpenChat={setOpenChat} />;
      case "groups": return <GroupsScreen onOpenChat={setOpenChat} />;
      case "search": return <SearchScreen onOpenChat={setOpenChat} />;
      case "notifications": return <NotificationsScreen />;
      case "calls": return <CallsScreen />;
      case "profile": return <ProfileScreen />;
      case "settings": return <SettingsScreen />;
      default: return <ChatsScreen onOpenChat={setOpenChat} />;
    }
  };

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
      </div>
    </div>
  );
};

export default Index;
