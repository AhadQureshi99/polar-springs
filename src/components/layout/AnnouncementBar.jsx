import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '../icons/ChevronIcons'

const slides = [
  {
    id: 1,
    text: 'Spa & Sauna Sale On Now!',
    linkLabel: 'Shop Now',
    linkHref: '#',
  },
  {
    id: 2,
    text: 'Free Delivery On Orders Over $999!',
    linkLabel: 'Learn More',
    linkHref: '#',
  },
  {
    id: 3,
    text: 'Book A Free In-Home Consultation',
    linkLabel: 'Book Now',
    linkHref: '#',
  },
]

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c === 0 ? slides.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === slides.length - 1 ? 0 : c + 1))

  const { text, linkLabel, linkHref } = slides[current]

  return (
    <div className="bg-[#ea3838] text-white w-full">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between h-10 px-4 md:px-6">

        {/* Left nav links — hidden on small screens */}
        <nav className="hidden xl:flex items-center gap-6 min-w-[220px]" aria-label="Utility navigation">
          {/* placeholder to balance flex layout on desktop */}
        </nav>

        {/* Announcement carousel */}
        <div className="flex items-center gap-3 flex-1 justify-center min-w-0">
          <button
            onClick={prev}
            aria-label="Previous announcement"
            className="flex-shrink-0 p-1 rounded hover:bg-white/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronLeftIcon className="w-3.5 h-3.5" />
          </button>

          <p className="text-sm font-semibold tracking-wide text-center truncate select-none">
            {text}{' '}
            <a
              href={linkHref}
              className="underline underline-offset-2 font-semibold hover:text-white/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded"
            >
              {linkLabel}
            </a>
          </p>

          <button
            onClick={next}
            aria-label="Next announcement"
            className="flex-shrink-0 p-1 rounded hover:bg-white/20 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            <ChevronRightIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right nav links */}
        <nav
          className="hidden xl:flex items-center gap-6 min-w-[220px] justify-end"
          aria-label="Top navigation"
        >
          <NavLink href="#">About</NavLink>
          <NavLink href="#">Showrooms</NavLink>
          <NavDropdown label="Support" />
        </nav>

      </div>
    </div>
  )
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-white hover:text-white/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded whitespace-nowrap"
    >
      {children}
    </a>
  )
}

function NavDropdown({ label }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1 text-sm font-medium text-white hover:text-white/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded whitespace-nowrap"
      >
        {label}
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 bg-white text-gray-800 rounded shadow-lg z-50 py-1">
          {['FAQs', 'Contact Us', 'Warranty', 'Installation'].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
