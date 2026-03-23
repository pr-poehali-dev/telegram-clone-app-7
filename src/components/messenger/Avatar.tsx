interface Props {
  initials: string;
  online?: boolean;
  size?: "sm" | "md" | "lg";
  index?: number;
}

const GRADIENTS = [
  "from-violet-500 to-pink-500",
  "from-blue-500 to-cyan-400",
  "from-emerald-400 to-teal-500",
  "from-orange-400 to-rose-500",
  "from-purple-500 to-indigo-500",
  "from-pink-400 to-fuchsia-500",
  "from-amber-400 to-orange-500",
  "from-cyan-400 to-blue-500",
];

export default function Avatar({ initials, online, size = "md", index = 0 }: Props) {
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const sizeClass = size === "sm" ? "w-10 h-10 text-sm" : size === "lg" ? "w-16 h-16 text-xl" : "w-12 h-12 text-base";

  return (
    <div className="relative flex-shrink-0">
      <div className={`${sizeClass} rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white shadow-lg`}>
        {initials}
      </div>
      {online !== undefined && (
        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[var(--bg-surface)] ${online ? "bg-emerald-400" : "bg-gray-500"}`} />
      )}
    </div>
  );
}
