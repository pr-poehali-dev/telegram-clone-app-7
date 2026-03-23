interface Props {
  initials: string;
  online?: boolean;
  size?: "sm" | "md" | "lg";
  index?: number;
}

const DRONE_COLORS = [
  { bg: "rgba(0,212,255,0.12)", border: "rgba(0,212,255,0.3)", text: "#00d4ff" },
  { bg: "rgba(0,255,136,0.1)",  border: "rgba(0,255,136,0.25)", text: "#00ff88" },
  { bg: "rgba(0,144,204,0.12)", border: "rgba(0,144,204,0.3)",  text: "#0090cc" },
  { bg: "rgba(0,212,255,0.08)", border: "rgba(0,212,255,0.2)",  text: "#5dd8f0" },
  { bg: "rgba(0,255,136,0.08)", border: "rgba(0,255,136,0.2)",  text: "#4dffa8" },
  { bg: "rgba(100,200,255,0.1)",border: "rgba(100,200,255,0.25)",text: "#64c8ff" },
  { bg: "rgba(0,180,200,0.12)", border: "rgba(0,180,200,0.3)",  text: "#00b4c8" },
  { bg: "rgba(50,220,150,0.1)", border: "rgba(50,220,150,0.25)",text: "#32dc96" },
];

export default function Avatar({ initials, online, size = "md", index = 0 }: Props) {
  const color = DRONE_COLORS[index % DRONE_COLORS.length];
  const sizeClass = size === "sm" ? "w-10 h-10 text-xs" : size === "lg" ? "w-16 h-16 text-lg" : "w-12 h-12 text-sm";

  return (
    <div className="relative flex-shrink-0">
      <div
        className={`${sizeClass} flex items-center justify-center font-bold`}
        style={{
          background: color.bg,
          border: `1px solid ${color.border}`,
          borderRadius: "8px",
          color: color.text,
          fontFamily: "'Orbitron', sans-serif",
          letterSpacing: "1px",
          boxShadow: `0 0 12px ${color.border}`,
        }}
      >
        {initials}
      </div>
      {online !== undefined && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-[var(--bg-surface)]`}
          style={{
            borderRadius: "2px",
            background: online ? "#00ff88" : "#2e4060",
            boxShadow: online ? "0 0 6px rgba(0,255,136,0.6)" : "none",
          }}
        />
      )}
    </div>
  );
}
