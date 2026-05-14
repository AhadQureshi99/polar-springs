import { useRef, useState, useEffect, useCallback } from 'react'

const CARD_W = 320
const CARD_GAP = 16

const BASE = 'https://alpinespas.imgix.net/assets/_sales/sale-2'
const img  = (name) => `${BASE}/${name}.jpg?auto=format,compress&w=640&h=900&q=90`

const CATEGORIES = [
  {
    id: 1,
    label: 'Hot Tubs',
    href: '#',
    image: img('homepage-category-hot-tubs-includes-freebies'),
  },
  {
    id: 2,
    label: 'Saunas',
    href: '#',
    image: img('homepage-category-saunas-20off'),
  },
  {
    id: 3,
    label: 'Swim Spas',
    href: '#',
    image: img('homepage-category-swim-spa-price-drop'),
  },
  {
    id: 4,
    label: 'Cold Plunges',
    href: '#',
    image: img('homepage-category-ice-bath-hot-deal'),
  },
  {
    id: 5,
    label: 'Spa Pools',
    href: '#',
    image: img('homepage-category-spa-pool-save-1000s'),
  },
  {
    id: 6,
    label: 'Shop All',
    href: '#',
    image: img('homepage-category-combo-save-1000s'),
  },
]

export default function BrowseRangeSection() {
  const trackRef  = useRef(null)
  const barRef    = useRef(null)
  const dragging  = useRef(false)
  const [canPrev,  setCanPrev]  = useState(false)
  const [canNext,  setCanNext]  = useState(true)
  const [progress, setProgress] = useState(0)

  const updateState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanPrev(scrollLeft > 4)
    setCanNext(scrollLeft < scrollWidth - clientWidth - 4)
    const max = scrollWidth - clientWidth
    setProgress(max > 0 ? Math.min(100, (scrollLeft / max) * 100) : 100)
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateState()
    el.addEventListener('scroll', updateState, { passive: true })
    window.addEventListener('resize', updateState)
    return () => {
      el.removeEventListener('scroll', updateState)
      window.removeEventListener('resize', updateState)
    }
  }, [updateState])

  // ── Drag-to-scrub helpers ──────────────────────────
  const seekToClientX = useCallback((clientX) => {
    const bar   = barRef.current
    const track = trackRef.current
    if (!bar || !track) return
    const rect = bar.getBoundingClientRect()
    const pct  = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    track.scrollLeft = pct * (track.scrollWidth - track.clientWidth)
  }, [])

  useEffect(() => {
    const onMove = (e) => { if (dragging.current) seekToClientX(e.clientX) }
    const onUp   = ()  => { dragging.current = false }
    const onTouchMove = (e) => { if (dragging.current) seekToClientX(e.touches[0].clientX) }
    window.addEventListener('mousemove',  onMove)
    window.addEventListener('mouseup',    onUp)
    window.addEventListener('touchmove',  onTouchMove, { passive: true })
    window.addEventListener('touchend',   onUp)
    return () => {
      window.removeEventListener('mousemove',  onMove)
      window.removeEventListener('mouseup',    onUp)
      window.removeEventListener('touchmove',  onTouchMove)
      window.removeEventListener('touchend',   onUp)
    }
  }, [seekToClientX])

  const scroll = (dir) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * (CARD_W + CARD_GAP), behavior: 'smooth' })
  }

  return (
    <section className="bg-white py-10 md:py-14 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">

        {/* ── Header row ── */}
        <div className="relative flex items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Browse Our Range</h2>
          <div className="flex gap-2 absolute right-0">
            <NavBtn onClick={() => scroll(-1)} disabled={!canPrev} label="Previous">
              <AlpineArrow left />
            </NavBtn>
            <NavBtn onClick={() => scroll(1)} disabled={!canNext} label="Next">
              <AlpineArrow />
            </NavBtn>
          </div>
        </div>

        {/* ── Scrollable track ── */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
          {/* Spacer so last card can be snapped while showing peek of overflow */}
          <div className="flex-shrink-0 w-1" aria-hidden />
        </div>

        {/* ── Progress bar — draggable/wipeable ── */}
        <div
          ref={barRef}
          role="slider"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-5 h-[6px] w-full bg-gray-200 rounded-full overflow-hidden cursor-pointer select-none"
          onMouseDown={(e) => { dragging.current = true; seekToClientX(e.clientX) }}
          onTouchStart={(e) => { dragging.current = true; seekToClientX(e.touches[0].clientX) }}
        >
          <div
            className="h-full bg-[#1565c0] rounded-full transition-[width] duration-150"
            style={{ width: `${Math.max(4, progress)}%` }}
          />
        </div>

      </div>
    </section>
  )
}

/* ── Card ─────────────────────────────────────────── */
function CategoryCard({ cat }) {
  const { label, href, image } = cat
  return (
    <a
      href={href}
      style={{
        scrollSnapAlign: 'start',
        boxShadow: '0px 4px 5px 0px rgba(0, 0, 0, 0.25)',
        width: `${CARD_W}px`,
        minWidth: `${CARD_W}px`,
        height: '450px',
      }}
      className="relative flex-shrink-0 rounded-lg overflow-hidden group cursor-pointer"
    >
      {/* Background image (Alpine Spas images have badges baked-in) */}
      <img
        src={image}
        alt={label}
        className="absolute top-0 left-0 w-full h-full object-cover z-[1] transition-opacity duration-300"
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(0,0,0,0.72) 100%)' }}
      />

      {/* Label — bottom-LEFT */}
      <div className="absolute bottom-6 left-4 z-20 flex items-center gap-2">
        <span className="text-white text-xl font-semibold">{label}</span>
        <svg
          width="7" height="12" viewBox="0 0 7 12" fill="none"
          className="group-hover:translate-x-1 transition-transform duration-300"
        >
          <path d="M1 11L6 6L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  )
}

/* ── Nav button (Alpine Spas style: neutral-200 fill) ── */
function NavBtn({ onClick, disabled, label, children }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`bg-neutral-200 p-2 flex items-center justify-center rounded-full transition-colors
        ${ disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-neutral-300' }`}
    >
      {children}
    </button>
  )
}

/* ── Alpine Spas arrow SVG (exact path from their site) ── */
function AlpineArrow({ left = false }) {
  return (
    <svg
      width="17" height="19" viewBox="0 0 17 19" fill="none"
      className={`w-4 h-4 ${left ? 'rotate-180' : ''}`}
    >
      <path
        d="M7.7782 17.2781L15.5564 9.49998L7.7782 1.7218"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      />
      <path
        d="M1.00012 8.28723C0.447836 8.28723 0.000120211 8.73495 0.000120163 9.28723C0.000120115 9.83951 0.447836 10.2872 1.00012 10.2872L1.00012 8.28723ZM15.0001 9.28723L15.0001 8.28723L1.00012 8.28723L1.00012 9.28723L1.00012 10.2872L15.0001 10.2872L15.0001 9.28723Z"
        fill="currentColor"
      />
    </svg>
  )
}
