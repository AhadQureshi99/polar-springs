function MapleLeafIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 32 36" fill="currentColor" aria-hidden="true">
      {/* 11-point maple leaf crown */}
      <path d="M16,1 L18,8 L25,5 L22,12 L29,10 L24,15 L28,20 L21,18 L20,26 L16,23 L12,26 L11,18 L4,20 L8,15 L3,10 L10,12 L7,5 L14,8 Z" />
      {/* Stem */}
      <rect x="14" y="25" width="4" height="10" rx="1" />
    </svg>
  )
}

function TruckIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 3h13v13H1zM14 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="1.5" />
      <circle cx="18.5" cy="18.5" r="1.5" />
    </svg>
  )
}

function ShieldIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 3v6c0 5-3.5 8.5-7 10C8.5 19.5 5 16 5 11V5l7-3z" />
    </svg>
  )
}

const BADGES = [
  {
    icon: <span className="text-lg sm:text-xl leading-none" role="img" aria-label="Maple leaf">🍁</span>,
    text: '100% CAN Owned',
  },
  {
    icon: <TruckIcon className="w-5 h-5 text-gray-600" />,
    text: 'Fast Delivery',
  },
  {
    icon: <ShieldIcon className="w-5 h-5 text-gray-600" />,
    text: "Best Warranty",
  },
]

export default function TrustBar() {
  return (
    <div className="bg-gray-100 border-b border-gray-200 w-full">
      <div className="max-w-screen-xl mx-auto px-3 py-2.5 sm:py-3 flex flex-row items-center justify-between sm:justify-center sm:gap-10 md:gap-16">
        {BADGES.map(({ icon, text }, i) => (
          <>
            <div key={text} className="flex flex-1 sm:flex-none min-w-0 flex-col sm:flex-row items-center gap-1 sm:gap-2.5">
              <span className="sm:text-gray-600">{icon}</span>
              <span className="text-[10px] sm:text-sm font-semibold text-gray-700 text-center sm:text-left leading-tight whitespace-nowrap">
                {text}
              </span>
            </div>
            {i < BADGES.length - 1 && (
              <div key={`sep-${i}`} className="hidden sm:block w-px h-5 bg-gray-300 mx-1" />
            )}
          </>
        ))}
      </div>
    </div>
  )
}
