import { cn } from "@/lib/utils";

/** รถไฟมุมมองจากด้านบนสำหรับวิ่งทับรางแนวตั้งใน SectionRail */
export function TrainMarker({ className, width = 24, height = 180 }: { className?: string; width?: number; height?: number }) {
  return (
    <span
      className={cn("relative block text-rust drop-shadow-[0_4px_5px_rgb(0_0_0/0.45)]", className)}
      style={{ animation: "rail-train-topdown 0.9s ease-in-out infinite" }}
    >
      <svg width={width} height={height} viewBox="0 0 24 132" fill="none" className="block overflow-visible">
        {/* ล้อและเงาใต้ตัวรถ */}
        <rect x="0.5" y="19" width="3" height="10" rx="1.5" fill="#05080d" />
        <rect x="20.5" y="19" width="3" height="10" rx="1.5" fill="#05080d" />
        <rect x="0.5" y="39" width="3" height="10" rx="1.5" fill="#05080d" />
        <rect x="20.5" y="39" width="3" height="10" rx="1.5" fill="#05080d" />

        {/* ตัวถังหัวมนและท้ายสอบ มองจากด้านบน */}
        <path
          d="M12 1.5C6.1 1.5 2.5 6.7 2.5 13v39.5c0 5.6 4.1 9.5 9.5 10 5.4-.5 9.5-4.4 9.5-10V13C21.5 6.7 17.9 1.5 12 1.5Z"
          fill="var(--bg)"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M12 4C7.7 4 5.2 7.7 5.2 12v39.6c0 4 2.8 7 6.8 7.7 4-.7 6.8-3.7 6.8-7.7V12C18.8 7.7 16.3 4 12 4Z"
          stroke="currentColor"
          strokeWidth="0.65"
          opacity="0.45"
        />

        {/* กระจกหน้าคนขับและไฟหน้าคู่ */}
        <path d="M6.3 12.8C7 8.4 9 6.4 12 6.4s5 2 5.7 6.4l-2.2 2.7h-7l-2.2-2.7Z" fill="currentColor" opacity="0.78" />
        <circle cx="6.2" cy="10" r="1.1" fill="#fff3cf" className="drop-shadow-[0_0_3px_currentColor]" />
        <circle cx="17.8" cy="10" r="1.1" fill="#fff3cf" className="drop-shadow-[0_0_3px_currentColor]" />

        {/* แผงหลังคาและชุดระบายอากาศ */}
        <rect x="6.2" y="18" width="11.6" height="30" rx="3" fill="currentColor" opacity="0.09" />
        <rect x="7.4" y="19.5" width="9.2" height="10" rx="1.8" stroke="currentColor" strokeWidth="0.8" opacity="0.72" />
        <path d="M9 22h6M9 24.5h6M9 27h6" stroke="currentColor" strokeWidth="0.65" opacity="0.7" />
        <rect x="8.2" y="33" width="7.6" height="11.5" rx="1.8" stroke="currentColor" strokeWidth="0.8" opacity="0.55" />
        <circle cx="12" cy="38.75" r="2.4" stroke="currentColor" strokeWidth="0.7" opacity="0.65" />
        <path d="M12 36.8v3.9M10.1 38.75h3.8" stroke="currentColor" strokeWidth="0.55" opacity="0.65" />

        {/* กระจกท้ายและไฟสถานะที่ไล่สว่างเบา ๆ */}
        <path d="M7.2 52.2h9.6l-1.4 4.1c-1 .8-2.1 1.2-3.4 1.4-1.3-.2-2.4-.6-3.4-1.4l-1.4-4.1Z" fill="currentColor" opacity="0.42" />
        {[23, 33, 43].map((cy, index) => (
          <g key={cy} style={{ animation: `rail-window-glow 1.6s ease-in-out infinite ${index * 0.18}s` }}>
            <rect x="4.4" y={cy} width="1.8" height="4.2" rx="0.8" fill="currentColor" />
            <rect x="17.8" y={cy} width="1.8" height="4.2" rx="0.8" fill="currentColor" />
          </g>
        ))}

        {/* ข้อต่อและโบกี้โดยสารสองคันต่อท้ายหัวรถ */}
        <rect x="10.2" y="62" width="3.6" height="6.5" rx="1.5" fill="currentColor" opacity="0.72" />

        {[68, 101].map((y, carriageIndex) => (
          <g key={y}>
            <rect x="0.5" y={y + 5} width="3" height="7" rx="1.5" fill="#05080d" />
            <rect x="20.5" y={y + 5} width="3" height="7" rx="1.5" fill="#05080d" />
            <rect x="0.5" y={y + 18} width="3" height="7" rx="1.5" fill="#05080d" />
            <rect x="20.5" y={y + 18} width="3" height="7" rx="1.5" fill="#05080d" />

            <rect
              x="2.5"
              y={y}
              width="19"
              height="29"
              rx="5.5"
              fill="var(--bg)"
              stroke="currentColor"
              strokeWidth="1.45"
            />
            <rect
              x="5.1"
              y={y + 2.7}
              width="13.8"
              height="23.6"
              rx="3"
              fill="currentColor"
              opacity="0.08"
            />
            {[y + 7, y + 15.5].map((windowY, windowIndex) => (
              <g
                key={windowY}
                style={{
                  animation: `rail-window-glow 1.6s ease-in-out infinite ${0.54 + carriageIndex * 0.3 + windowIndex * 0.16}s`,
                }}
              >
                <rect x="6.2" y={windowY} width="4.1" height="5.2" rx="1" fill="currentColor" opacity="0.72" />
                <rect x="13.7" y={windowY} width="4.1" height="5.2" rx="1" fill="currentColor" opacity="0.72" />
              </g>
            ))}

            {carriageIndex === 0 && (
              <rect x="10.2" y={y + 28.5} width="3.6" height="5" rx="1.5" fill="currentColor" opacity="0.72" />
            )}
          </g>
        ))}

        <circle cx="7" cy="126.5" r="1.15" fill="#e4002b" />
        <circle cx="17" cy="126.5" r="1.15" fill="#e4002b" />
      </svg>
    </span>
  );
}
