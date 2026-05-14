import { useState, useRef, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'Spa Pools',    href: '#', hasDropdown: true },
  { label: 'Saunas',       href: '#', hasDropdown: true },
  { label: 'Hot Tubs',     href: '#', hasDropdown: true },
  { label: 'Swim Spas',    href: '#', hasDropdown: true },
  { label: 'Ice Baths',    href: '#', hasDropdown: true },
  { label: 'Spa Supplies', href: '#', hasDropdown: false },
]

export default function Header() {
  const [menuOpen, setMenuOpen]         = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchOpen, setSearchOpen]     = useState(false)
  const menuRef   = useRef(null)
  const searchRef = useRef(null)

  useEffect(() => {
    function handleOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
        setActiveDropdown(null)
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const toggleDropdown = (label) =>
    setActiveDropdown((prev) => (prev === label ? null : label))

  return (
    <header className="bg-white border-t-[3px] border-[#c8201a] shadow-sm sticky top-0 z-40 overflow-x-hidden">
      <div
        className="max-w-screen-2xl mx-auto flex items-center h-[68px] px-4 md:px-6 gap-3"
        ref={menuRef}
      >
        {/* ── Logo ── */}
        <a href="/" aria-label="Home" className="flex-shrink-0 focus-visible:outline-2 focus-visible:outline-[#c8201a] rounded">
          <img src="/logo.webp" alt="Alpine Spas" className="h-8 w-auto" />
        </a>

        {/* ── Desktop nav ── */}
        <nav className="hidden xl:flex items-center gap-0.5 flex-1 min-w-0" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <DesktopNavItem
              key={item.label}
              item={item}
              isActive={activeDropdown === item.label}
              onToggle={() => toggleDropdown(item.label)}
            />
          ))}

          {/* Divider */}
          <span className="mx-3 h-5 w-px bg-gray-300" aria-hidden="true" />

          {/* Sale */}
          <a
            href="#"
            className="px-3 py-2 text-sm font-semibold text-[#c8201a] hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-[#c8201a] rounded"
          >
            Sale
          </a>

          {/* Divider */}
          <span className="mx-3 h-5 w-px bg-gray-300" aria-hidden="true" />

          {/* Learn dropdown */}
          <DesktopNavItem
            item={{ label: 'Learn', href: '#', hasDropdown: true }}
            isActive={activeDropdown === 'Learn'}
            onToggle={() => toggleDropdown('Learn')}
          />
        </nav>

        {/* ── Right-side icons ── */}
        <div className="hidden xl:flex items-center gap-3 ml-auto flex-shrink-0">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            <button
              onClick={() => setSearchOpen((o) => !o)}
              aria-label="Search"
              className="p-1.5 text-gray-700 hover:text-[#c8201a] transition-colors focus-visible:outline-2 focus-visible:outline-[#c8201a] rounded"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50 flex overflow-hidden">
                <input
                  autoFocus
                  type="search"
                  placeholder="Search…"
                  className="flex-1 px-3 py-2 text-sm text-gray-800 outline-none"
                />
                <button className="px-3 text-gray-400 hover:text-[#c8201a]">
                  <SearchIcon className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Cart */}
          <button
            aria-label="Cart"
            className="p-1.5 text-gray-700 hover:text-[#c8201a] transition-colors focus-visible:outline-2 focus-visible:outline-[#c8201a] rounded"
          >
            <CartIcon className="w-5 h-5" />
          </button>

          {/* Phone */}
          <a
            href="tel:6135722777"
            className="text-sm font-semibold text-gray-800 hover:text-[#c8201a] transition-colors tracking-wide whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#c8201a] rounded"
          >
            613-572-2777
          </a>
        </div>

        {/* ── Mobile right ── */}
        <div className="xl:hidden flex items-center gap-2 ml-auto">
          <button aria-label="Search" className="p-2 text-gray-700 hover:text-[#c8201a] transition-colors rounded">
            <SearchIcon className="w-5 h-5" />
          </button>
          <button aria-label="Cart" className="p-2 text-gray-700 hover:text-[#c8201a] transition-colors rounded">
            <CartIcon className="w-5 h-5" />
          </button>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="p-2 rounded hover:bg-gray-100 transition-colors focus-visible:outline-2 focus-visible:outline-[#c8201a]"
          >
            {menuOpen ? <XIcon className="w-5 h-5" /> : <BurgerIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="xl:hidden border-t border-gray-100 bg-white shadow-lg">
          <nav aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <MobileNavItem
                key={item.label}
                item={item}
                isOpen={activeDropdown === item.label}
                onToggle={() => toggleDropdown(item.label)}
              />
            ))}
            <div className="border-t border-gray-100">
              <a href="#" className="block px-5 py-3 text-sm font-semibold text-[#c8201a] hover:bg-red-50 transition-colors">
                Sale
              </a>
            </div>
            <MobileNavItem
              item={{ label: 'Learn', href: '#', hasDropdown: true }}
              isOpen={activeDropdown === 'Learn'}
              onToggle={() => toggleDropdown('Learn')}
            />
          </nav>
          <div className="px-5 py-4 border-t border-gray-100">
            <a href="tel:6135722777" className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <PhoneIcon className="w-4 h-4 text-[#c8201a]" /> 613-572-2777
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

/* ── Sub-components ─────────────────────────────── */

const DROPDOWN_LINKS = {
  'Spa Pools':    ['Above Ground', 'In-Ground', 'Plunge Pools', 'View All'],
  'Saunas':       ['Traditional', 'Infrared', 'Steam', 'View All'],
  'Hot Tubs':     ['2–3 Person', '4–5 Person', '6–8 Person', 'View All'],
  'Swim Spas':    ['Exercise Spas', 'Dual Zone', 'Compact', 'View All'],
  'Ice Baths':    ['Portable', 'Permanent', 'Accessories', 'View All'],
  'Learn':        ['Buying Guides', 'Blog', 'Videos', 'FAQs'],
}

function DesktopNavItem({ item, isActive, onToggle }) {
  const { label, href, hasDropdown } = item
  const links = DROPDOWN_LINKS[label] ?? []

  if (!hasDropdown) {
    return (
      <a href={href} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-[#c8201a] rounded transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#c8201a]">
        {label}
      </a>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        aria-expanded={isActive}
        aria-haspopup="true"
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#c8201a] ${
          isActive ? 'text-[#c8201a]' : 'text-gray-700 hover:text-[#c8201a]'
        }`}
      >
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isActive ? 'rotate-180' : ''}`} />
      </button>

      {isActive && (
        <div className="absolute left-0 top-full mt-0 w-auto min-w-[12rem] bg-white rounded-b shadow-lg border border-gray-100 border-t-2 border-t-[#c8201a] z-50 py-1">
          {links.map((sub) => (
            <a key={sub} href="#" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#c8201a] transition-colors whitespace-nowrap">
              {sub}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function MobileNavItem({ item, isOpen, onToggle }) {
  const { label, href, hasDropdown } = item
  const links = DROPDOWN_LINKS[label] ?? []

  if (!hasDropdown) {
    return (
      <a href={href} className="block px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#c8201a] transition-colors border-b border-gray-100">
        {label}
      </a>
    )
  }

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#c8201a] transition-colors"
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="bg-gray-50 pb-1">
          {links.map((sub) => (
            <a key={sub} href="#" className="block px-8 py-2 text-sm text-gray-600 hover:text-[#c8201a] border-l-2 border-transparent hover:border-[#c8201a] transition-colors ml-5 whitespace-nowrap">
              {sub}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Icon primitives ─────────────────────────────── */

function ChevronDown({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

function SearchIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path strokeLinecap="round" d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function CartIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.4 7h12.8M7 13l-.6-3M17 21a1 1 0 100-2 1 1 0 000 2zm-10 0a1 1 0 100-2 1 1 0 000 2z" />
    </svg>
  )
}

function PhoneIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  )
}

function BurgerIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function XIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
