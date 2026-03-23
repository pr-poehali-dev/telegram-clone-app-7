import type { Chat } from "@/pages/Index";

export const CHATS: Chat[] = [
  { id: 1, name: "Алёна Морозова", avatar: "АМ", lastMessage: "Увидимся завтра? 😊", time: "12:45", unread: 3, online: true },
  { id: 2, name: "Дмитрий Козлов", avatar: "ДК", lastMessage: "Отправил файл по проекту", time: "11:20", unread: 0, online: false },
  { id: 3, name: "Команда Дизайн", avatar: "КД", lastMessage: "Макеты готовы к ревью!", time: "10:05", unread: 12, online: true, isGroup: true },
  { id: 4, name: "Катя Волкова", avatar: "КВ", lastMessage: "Хорошо, договорились", time: "вчера", unread: 0, online: true },
  { id: 5, name: "Артём Петров", avatar: "АП", lastMessage: "🎉 С днём рождения!", time: "вчера", unread: 1, online: false },
  { id: 6, name: "Разработка", avatar: "РА", lastMessage: "Деплой прошёл успешно", time: "вчера", unread: 5, online: false, isGroup: true },
  { id: 7, name: "Мария Иванова", avatar: "МИ", lastMessage: "Пришли ссылку пожалуйста", time: "пн", unread: 0, online: false },
  { id: 8, name: "Никита Смирнов", avatar: "НС", lastMessage: "👍", time: "пн", unread: 0, online: true },
];

export const CONTACTS = [
  { id: 1, name: "Алёна Морозова", avatar: "АМ", status: "На работе", online: true, phone: "+7 999 123-45-67" },
  { id: 2, name: "Артём Петров", avatar: "АП", status: "Не беспокоить", online: false, phone: "+7 999 234-56-78" },
  { id: 3, name: "Дмитрий Козлов", avatar: "ДК", status: "В дороге 🚗", online: false, phone: "+7 999 345-67-89" },
  { id: 4, name: "Екатерина Новикова", avatar: "ЕН", status: "Свободна", online: true, phone: "+7 999 456-78-90" },
  { id: 5, name: "Катя Волкова", avatar: "КВ", status: "Спит 😴", online: true, phone: "+7 999 567-89-01" },
  { id: 6, name: "Мария Иванова", avatar: "МИ", status: "На встрече", online: false, phone: "+7 999 678-90-12" },
  { id: 7, name: "Никита Смирнов", avatar: "НС", status: "Играю 🎮", online: true, phone: "+7 999 789-01-23" },
  { id: 8, name: "Ольга Фёдорова", avatar: "ОФ", status: "Кофе ☕", online: false, phone: "+7 999 890-12-34" },
];

export const GROUPS = [
  { id: 3, name: "Команда Дизайн", avatar: "КД", members: 8, lastMessage: "Макеты готовы к ревью!", time: "10:05", unread: 12, isGroup: true, online: false },
  { id: 6, name: "Разработка", avatar: "РА", members: 15, lastMessage: "Деплой прошёл успешно", time: "вчера", unread: 5, isGroup: true, online: false },
  { id: 9, name: "Маркетинг 2026", avatar: "МК", members: 23, lastMessage: "Новая кампания стартует в пятницу", time: "вчера", unread: 0, isGroup: true, online: false },
  { id: 10, name: "Общий чат", avatar: "ОЧ", members: 142, lastMessage: "Привет всем! 👋", time: "пн", unread: 3, isGroup: true, online: false },
];

export const MESSAGES = [
  { id: 1, text: "Привет! Как дела?", time: "11:30", mine: false },
  { id: 2, text: "Всё отлично, спасибо! Работаю над новым проектом 🚀", time: "11:31", mine: true },
  { id: 3, text: "О, круто! Что за проект?", time: "11:32", mine: false },
  { id: 4, text: "Мессенджер для мобилок. Очень интересная задача!", time: "11:33", mine: true },
  { id: 5, text: "Звучит классно! Когда можно будет посмотреть?", time: "11:35", mine: false },
  { id: 6, text: "Скоро покажу первую версию 😊", time: "11:36", mine: true },
  { id: 7, text: "Жду с нетерпением!", time: "11:37", mine: false },
  { id: 8, text: "Увидимся завтра? 😊", time: "12:45", mine: false },
];

export const NOTIFICATIONS = [
  { id: 1, type: "message", name: "Алёна Морозова", text: "написала вам сообщение", time: "12:45", avatar: "АМ", read: false },
  { id: 2, type: "group", name: "Команда Дизайн", text: "Артём добавил новые файлы", time: "10:05", avatar: "КД", read: false },
  { id: 3, type: "call", name: "Дмитрий Козлов", text: "пропущенный звонок", time: "09:15", avatar: "ДК", read: false },
  { id: 4, type: "message", name: "Катя Волкова", text: "ответила на ваше сообщение", time: "вчера", avatar: "КВ", read: true },
  { id: 5, type: "group", name: "Разработка", text: "новые участники добавлены", time: "вчера", avatar: "РА", read: true },
  { id: 6, type: "call", name: "Никита Смирнов", text: "видеозвонок 5 минут", time: "пн", avatar: "НС", read: true },
];

export const CALLS_HISTORY = [
  { id: 1, name: "Алёна Морозова", avatar: "АМ", type: "incoming", video: false, time: "сегодня 12:30", duration: "5:23" },
  { id: 2, name: "Дмитрий Козлов", avatar: "ДК", type: "missed", video: false, time: "сегодня 09:15", duration: "" },
  { id: 3, name: "Катя Волкова", avatar: "КВ", type: "outgoing", video: true, time: "вчера 18:40", duration: "12:01" },
  { id: 4, name: "Никита Смирнов", avatar: "НС", type: "outgoing", video: false, time: "вчера 14:22", duration: "3:45" },
  { id: 5, name: "Команда Дизайн", avatar: "КД", type: "incoming", video: true, time: "пн 16:00", duration: "45:12" },
  { id: 6, name: "Артём Петров", avatar: "АП", type: "missed", video: false, time: "пн 11:05", duration: "" },
];
