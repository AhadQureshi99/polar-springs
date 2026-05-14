export default function HeroSection() {
  return (
    <section className="relative w-full h-[420px] sm:h-[480px] md:h-[520px] overflow-hidden bg-[#0077c8]">
      {/* ── Video background ── */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="https://res.cloudinary.com/dhc2lrcob/video/upload/f_auto,q_auto/v1773474069/Hero-Section-Compressed_yf5kye.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      {/* ── Button at bottom-centre + small disclaimer bottom-right ── */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between px-6 sm:px-10 pb-7">
        {/* Spacer */}
        <div className="flex-1" />

        {/* Shop Deals button — centred */}
        <div className="flex-1 flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-1.5 whitespace-nowrap bg-[#fbc92e] hover:bg-[#e8b82a] text-gray-900 font-bold text-sm sm:text-base px-5 py-2 rounded-xl transition-colors shadow-lg"
          >
            Shop Deals
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Disclaimer — bottom-right */}
        <div className="flex-1 flex justify-end">
          <span className="text-white/70 text-xs sm:text-sm font-medium tracking-wide">*ON SELECTED MODELS</span>
        </div>
      </div>
    </section>
  )
}
