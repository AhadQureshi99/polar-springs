import { useState, useRef, useEffect, useCallback } from 'react'
import AnnouncementBar from '../../components/layout/AnnouncementBar'
import Header from '../../components/layout/Header'

const CLD     = 'https://res.cloudinary.com/dhc2lrcob/image/upload/f_auto,q_auto'
const CLD_VID = 'https://res.cloudinary.com/dhc2lrcob/video/upload/f_auto,q_auto'
const WP  = 'https://tan-caterpillar-713451.hostingersite.com/wp-content/uploads/2026/02'
const WP1 = 'https://tan-caterpillar-713451.hostingersite.com/wp-content/uploads/2026/01'

const GALLERY = [
  `${CLD}/v1773486896/Lummari-Summit-1024x1024-1_jbohxj.png`,
  `${CLD}/v1773486982/Lummari-Summit-1024x1024-2_j6locp.png`,
  `${CLD}/v1773486923/Lumari-Summit-3-1024x1024-1_yvedml.webp`,
]

const FEATURES_PRIMARY = [
  { type: 'img', src: `${CLD}/v1773486896/Lummari-Summit-1024x1024-1_jbohxj.png`, overlay: null },
  { type: 'img', src: `${CLD}/v1773486923/Lumari-Summit-3-1024x1024-1_yvedml.webp`, overlay: null },
  { type: 'img', src: `${CLD}/v1773486982/Lummari-Summit-1024x1024-2_j6locp.png`, overlay: null },
  { type: 'vid', src: `${CLD_VID}/v1773469466/Royale-Shahroz_ebsubp.mp4`, overlay: null },
]

const FEATURES_EXTRA = [
  { type: 'img', src: `${CLD}/v1773487629/Lumari-Summit-Tiles-582x815-1_whsqjk.avif`, overlay: null },
  { type: 'img', src: `${CLD}/v1773486728/582_x_815_Barrier_Free_Seating_qqdexu.png`, overlay: { title: 'BARRIER-FREE SEATING', sub: 'SOCIAL 8-PERSON NON-LOUNGER LAYOUT' } },
  { type: 'img', src: `${CLD}/v1773486730/582_x_815_Volcano_Foot_Dome_uljejs.png`, overlay: { title: 'VOLCANO FOOT DOME', sub: 'POWERFUL LOWER-BODY RELIEF' } },
  { type: 'img', src: `${CLD}/v1773487827/download-43_x06fgl.webp`, overlay: null },
]

const SPECS = [
  ['Brand',           'Polar Springs'],
  ['Total Seating',   '8 Person'],
  ['Jets',            '61 Adjustable Jets'],
  ['Massage Seating', '8 Ergonomic Seats (Non-Lounger)'],
  ['Control System',  'High-Performance Integrated Control'],
  ['Dimensions',      '90″ × 90″'],
  ['Electrical',      '240V / 60 Hz'],
  ['Water Capacity',  'Approx. 400 gallons'],
  ['Insulation',      'Northern Seal™ 4-Part'],
  ['Cover',           'Lockable Safety Cover Included'],
]

const WARRANTIES = [
  { years: 'lifetime', title: 'Lifetime Frame Warranty',   desc: 'Our proprietary frame is warranted for as long as you own the product — built to last a lifetime.' },
  { years: 5,          title: '5 Year Cabinet Warranty',   desc: 'Engineered for strength and style. Cabinet panels and corners are covered for five years against defects.' },
  { years: 3,          title: '3 Year Component Warranty', desc: 'Soothing heat you can trust. All factory-installed electrical and plumbing components are warranted for three years.' },
  { years: 1,          title: '1 Year Audio Warranty',     desc: 'The essentials are covered too. Factory-installed audio system is free from defects for one year of ownership.' },
]

const BUILD_PILLS = [
  { key: 'insulation', label: 'Northern Seal™ Insulation' },
  { key: 'shell',      label: 'Triple-Layer Acrylic Shell' },
]
const BUILD_POINTS = [
  { num: 1, label: 'Thermal Shell',        desc: 'Each shell is wrapped in high-density foam insulation for superior heat retention year-round.' },
  { num: 2, label: 'Perimeter Insulation', desc: 'Full perimeter foam sealing locks in heat and dramatically reduces energy running costs.' },
  { num: 3, label: 'ABS Base',             desc: 'A robust ABS base guards against moisture intrusion and structural wear for lasting performance.' },
]

const SEATING_ITEMS = [
  { label: 'Hydro-Massage Seats',      desc: 'Sit back and let powerful hydrotherapy jets target tight muscles in your neck, shoulders, and lower back. Purpose-built for serious daily stress relief.' },
  { label: 'Barrier-Free Non-Lounger', desc: 'An open, social layout seats 8 adults with equal jet coverage and face-to-face seating — no compromise seats, full spa for everyone.' },
  { label: 'Cool-Off Seat',            desc: 'A raised cool-down seat lets you regulate body temperature without leaving the spa — ideal for kids or between hydrotherapy sessions.' },
  { label: 'Volcano Foot Dome',        desc: 'A centrally located powerful jet system delivers an invigorating foot and calf massage accessible from every seat in the spa.' },
]

const FEATURES_TABLE_ROWS = [
  { icon: 'brand',     label: 'Brand',            value: 'Polar Springs' },
  { icon: 'seat',      label: 'Total Seating',    value: '8 Person' },
  { icon: 'jet',       label: 'Jets',             value: '61 Adjustable Jets' },
  { icon: 'massage',   label: 'Massage Seating',  value: '8 Ergonomic Seats (Non-Lounger)' },
  { icon: 'control',   label: 'Control System',   value: 'High-Performance Integrated Control' },
  { icon: 'filter',    label: 'Filtration',       value: 'UVC Cartridge Filtration System' },
  { icon: 'pump',      label: 'Circulation Pump', value: 'Dedicated Energy-Efficient Pump' },
  { icon: 'water',     label: 'Water Care',       value: 'UVC Purification & Ozone Sanitisation' },
  { icon: 'waterfall', label: 'Water Features',   value: 'LED Waterfall' },
  { icon: 'insulate',  label: 'Insulation',       value: 'Northern Seal™ 4-Part' },
  { icon: 'jetpump',   label: 'Jet Pump',         value: 'High-Performance Water Pump' },
  { icon: 'heater',    label: 'Heater',           value: 'Energy-Efficient Electric Heater' },
  { icon: 'shell',     label: 'Shell Material',   value: 'Triple-Layer Acrylic Shell' },
  { icon: 'light',     label: 'Lighting',         value: 'Multi-Colour LED Ambiance Lighting' },
]

const SPEC_BOX_ROWS = [
  { icon: 'weight', label: 'Weight',         value: '~350 kg' },
  { icon: 'drop',   label: 'Water Capacity', value: '~1514 L (400 gal)' },
  { icon: 'power',  label: 'Power',          value: '240V / 60 Hz' },
  { icon: 'dims',   label: 'Dimensions',     value: '90″ × 90″ (2286 × 2286 mm)' },
]

const KEY_FEATURES = [
  'Northern Seal™ 4-Part Insulation for extreme climates',
  '61 Adjustable Hydrotherapy Jets',
  '8 Ergonomic Non-Lounger Seats',
  'Inverted Precision Neck Jets',
  'Integrated Cool Down Seat',
  'Volcano Foot Dome (centrally located)',
  'UVC Water Purification System',
  'Ozone Sanitisation System',
  'Multi-Colour LED Ambiance Lighting',
  'Bluetooth Audio System',
  'High-Performance Integrated Control Panel',
  'Lockable Safety Cover Included',
]

const FEATURE_CATEGORIES = ['All Features', 'Water Care', 'Jets', 'Energy Efficiency', 'Seating', 'Construction']

const FEATURES_LIST = [
  {
    category: 'Water Care',
    img: `${CLD}/v1773487827/download-43_x06fgl.webp`,
    title: 'UVC Water Purification',
    desc: 'Built-in UVC sanitisation destroys 99.9% of bacteria and viruses, keeping your water crystal clear with less chemical use.',
  },
  {
    category: 'Water Care',
    img: `${CLD}/v1773486896/Lummari-Summit-1024x1024-1_jbohxj.png`,
    title: 'Ozone Sanitisation',
    desc: 'Ozone works alongside your sanitiser to break down contaminants at the molecular level — cleaner water, lower chemical costs.',
  },
  {
    category: 'Jets',
    img: `${CLD}/v1773486730/582_x_815_Volcano_Foot_Dome_uljejs.png`,
    title: 'Volcano Foot Dome™',
    desc: 'A centrally located foot dome delivers powerful lower-body hydrotherapy, targeting feet, calves, and ankles for full relief.',
  },
  {
    category: 'Jets',
    img: `${CLD}/v1773486923/Lumari-Summit-3-1024x1024-1_yvedml.webp`,
    title: '61 Hydrotherapy Jets',
    desc: 'Every seat is equipped with precision adjustable jets engineered for targeted muscle relief from shoulders to lower back.',
  },
  {
    category: 'Energy Efficiency',
    img: `${CLD}/v1773487629/Lumari-Summit-Tiles-582x815-1_whsqjk.avif`,
    title: 'Northern Seal™ Insulation',
    desc: 'Our 4-part insulation system locks heat in year-round, dramatically reducing energy use — even in Canadian winters.',
  },
  {
    category: 'Energy Efficiency',
    img: `${CLD}/v1773486982/Lummari-Summit-1024x1024-2_j6locp.png`,
    title: 'High-Performance Control',
    desc: 'Smart integrated controls make it easy to manage temperature, jets, and lighting from the spa or your phone.',
  },
  {
    category: 'Seating',
    img: `${CLD}/v1773486728/582_x_815_Barrier_Free_Seating_qqdexu.png`,
    title: 'Barrier-Free Seating',
    desc: 'A social 8-person non-lounger layout gives every guest the same comfort and jet coverage — no compromises.',
  },
  {
    category: 'Construction',
    img: `${CLD}/v1773487827/download-43_x06fgl.webp`,
    title: 'Premium Shell Construction',
    desc: 'Triple-layer acrylic shell reinforced with fibreglass for lasting durability, shape retention, and a luxurious finish.',
  },
]

const FAQS = [
  { q: 'Where Was This Spa Designed?', a: 'The Lumari Summit was designed and engineered with Canadian climates in mind, built to handle extreme winters while delivering year-round hydrotherapy comfort.' },
  { q: 'How Does Financing Work?', a: 'We offer flexible payment plans starting from $150/month OAC. Contact us for a personalised quote and financing options tailored to your budget.' },
  { q: 'What Kind Of Jet Pump Does This Spa Have?', a: 'The Lumari Summit features a high-performance pump system delivering powerful, consistent pressure to all 61 adjustable hydrotherapy jets across every seat.' },
  { q: 'What Is A Circulation Pump?', a: 'A dedicated circulation pump runs continuously at low speed to keep water filtered and heated efficiently — reducing running costs and maintaining water quality.' },
  { q: 'Does This Spa Have Low Running Costs?', a: 'Yes. The Northern Seal™ 4-Part Insulation system significantly reduces heat loss, keeping energy consumption low even through Canadian winters.' },
  { q: 'What Add-Ons Can I Choose?', a: 'Popular add-ons include upgraded covers, steps, aromatherapy systems, and extended service packages. Ask our team for the full list of available accessories.' },
  { q: 'What Is The Northern Seal™ Insulation System?', a: 'Our proprietary 4-part insulation wraps the shell, base, and cabinet to lock heat in from every angle — delivering industry-leading thermal efficiency.' },
  { q: 'What Type Of Customer Is This Spa Ideal For?', a: 'The Lumari Summit suits families and social groups wanting a spacious, non-lounger 8-person layout with powerful jets and minimal maintenance.' },
  { q: 'What Type Of Lighting Does This Spa Offer?', a: 'Multi-colour LED ambiance lighting is built into the spa shell and footwell, creating a relaxing atmosphere day or night.' },
  { q: 'How Long Does Delivery Take?', a: 'Delivery timelines vary by location. We serve Brockville, Ottawa, and surrounding Ontario regions. Call us at 613-572-2777 for an accurate estimate.' },
]

const FOOTER_COLUMNS = [
  {
    title: 'Shop',
    links: ['Spa Pools', 'Bullfrog Spas', 'Swim Spas', 'Swim Spas', 'Hot Tubs', 'Ice Baths', 'Combo Deals', 'Plates Reformers', 'Red Light Therapy', 'Accessories', 'Promotions & Events'],
  },
  {
    title: 'Learn',
    links: ['FAQ\'s', 'Learn Centre', 'Sauna Buyers Guide', 'Infrared Sauna Buyers Guide', 'Spa Pool Buyers Guide', 'Hot Tub Buyers Guide', 'Swim Spa Buyers Guide', 'Product Finder'],
  },
  {
    title: 'Customer Service',
    links: ['Support', 'Manuals', 'Delivery Options', 'Payment & Finance Options', 'Privacy Policy', 'Terms and Conditions', 'Personal Warranty', 'Commercial Warranty', 'Pricing', 'Contact us'],
  },
  {
    title: 'Showrooms',
    links: ['OPEN 7 DAYS', 'Mon - Fri: 9am - 5pm', 'Sat - Sun: 10am - 5pm', '', 'Christchurch Showroom', '105 Ensors Road', 'Riccarton, 8041', 'Christchurch', '', 'Auckland Showroom', '551 Great South Road', 'Penrose, 1061', 'Auckland'],
  },
  {
    title: 'About Us',
    links: ['About Us', 'Why Choose Alpine', 'Our Awards', 'Showrooms', 'Alpine Spas Australia'],
  },
  {
    title: 'Our Customers',
    links: ['Google Reviews', 'Product Reviews', 'Company Reviews', 'Ambassadors'],
  },
]

const CMS_VID  = 'https://cms.alpinespas.co.nz/assets/content/products/spa-pools/_global/videos/features'
const ALP_IMG  = 'https://alpinespas.imgix.net/assets/content/products/spa-pools/_global/images/features'
const ALP_ICON = 'https://alpinespas.imgix.net/assets/icons'
const WC_BG    = 'https://alpinespas.imgix.net/assets/demo/TextIconsWithSlider-bg.webp?auto=format,compress&h=800&q=90'

const WATER_CARE_LIST = [
  { key: 'uvc',       lines: ['UltraClear™',         'UV-C'],               icon: `${ALP_ICON}/texticonswithslider-icon-1.svg?auto=format,compress&q=90&fit=fill` },
  { key: 'circ',      lines: ['WhisperQuiet™',        'Circulation Pump'],   icon: `${ALP_ICON}/texticonswithslider-icon-4.svg?auto=format,compress&q=90&fit=fill` },
  { key: 'filter',    lines: ['Dual Microban™',       'Filters'],            icon: `${ALP_ICON}/texticonswithslider-icon-2.svg?auto=format,compress&q=90&fit=fill` },
  { key: 'ozone',     lines: ['Ozone',                'Sanitisation'],       icon: `${ALP_ICON}/texticonswithslider-icon-3.svg?auto=format,compress&q=90&fit=fill` },
  { key: 'waterfall', lines: ['Perpetual Filtration', 'LED Waterfall'],      icon: `${ALP_ICON}/texticonswithslider-icon-6.svg?auto=format,compress&q=90&fit=fill` },
]

const WATER_CARE_CARDS = [
  {
    key: 'uvc',
    title: 'UltraClear™ UV-C',
    desc: 'UltraClear™ UV-C helps neutralise bacteria before they become a problem. 99% of germs are removed from water passing through our UV-C sanitiser, meaning easier maintenance and less chlorine.',
    type: 'video',
    src: `${CMS_VID}/body-portrait-scroll-uvc-(1485x2200).mp4`,
  },
  {
    key: 'circ',
    title: 'WhisperQuiet™ Circulation Pump',
    desc: "Enjoy cleaner water with our WhisperQuiet™ Circulation Pump that's dedicated to drawing water through your sanitisation systems, while reducing noise by up to 90% for a peaceful spa experience.",
    type: 'video',
    src: `${CMS_VID}/circ-jet.mp4`,
  },
  {
    key: 'filter',
    title: 'Dual Microban™ Filters',
    desc: 'Dual antibacterial filters keep bacteria from multiplying, so your water stays cleaner longer. Thanks to their Microban® coating, they last longer and need less frequent replacement, making your spa care easier.',
    type: 'img',
    src: `${ALP_IMG}/body-portrait-scroll-filter-(1485x2200).jpg?auto=format,compress&w=620`,
  },
  {
    key: 'ozone',
    title: 'Ozone Sanitisation',
    desc: "Ozone water care breaks down bacteria and contaminants, helping your spa stay clean between water changes. It's low maintenance, chemical-friendly, and keeps things crystal clear.",
    type: 'video',
    src: `${CMS_VID}/body-portrait-scroll-ozone-(1485x2200).mp4`,
  },
]

function ChevronDown({ open }) {
  return (
    <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}



export default function LumariSummit() {
  const [activeImg, setActiveImg] = useState(0)
  const [accordion, setAccordion] = useState('description')
  const [showMore,  setShowMore]  = useState(false)
  const [activeFeatureCat, setActiveFeatureCat] = useState('All Features')
  const [faqOpen,          setFaqOpen]          = useState(null)
  const [showFaqVideo,     setShowFaqVideo]     = useState(false)
  const [buildPill, setBuildPill] = useState('insulation')
  const [seatTab,   setSeatTab]   = useState('seating')
  const [openSeat,  setOpenSeat]  = useState(0)

  const featTrackRef  = useRef(null)
  const featBarRef    = useRef(null)
  const featDragging  = useRef(false)
  const waterCareRef  = useRef(null)
  const [featCanPrev,  setFeatCanPrev]  = useState(false)
  const [featCanNext,  setFeatCanNext]  = useState(true)
  const [featProgress, setFeatProgress] = useState(0)

  const prev   = () => setActiveImg(i => (i - 1 + GALLERY.length) % GALLERY.length)
  const next   = () => setActiveImg(i => (i + 1) % GALLERY.length)
  const toggle = id => setAccordion(a => (a === id ? null : id))

  const visibleFeatures = showMore ? [...FEATURES_PRIMARY, ...FEATURES_EXTRA] : FEATURES_PRIMARY

  const filteredFeatures = FEATURES_LIST.filter(f => activeFeatureCat === 'All Features' || f.category === activeFeatureCat)

  const updateFeatState = useCallback(() => {
    const el = featTrackRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setFeatCanPrev(scrollLeft > 4)
    setFeatCanNext(scrollLeft < scrollWidth - clientWidth - 4)
    const max = scrollWidth - clientWidth
    setFeatProgress(max > 0 ? Math.min(100, (scrollLeft / max) * 100) : 100)
  }, [])

  const seekFeatBar = useCallback((clientX) => {
    const bar   = featBarRef.current
    const track = featTrackRef.current
    if (!bar || !track) return
    const rect = bar.getBoundingClientRect()
    const pct  = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    track.scrollLeft = pct * (track.scrollWidth - track.clientWidth)
  }, [])

  useEffect(() => {
    const el = featTrackRef.current
    if (!el) return
    el.scrollLeft = 0
    updateFeatState()
    el.addEventListener('scroll', updateFeatState, { passive: true })
    return () => el.removeEventListener('scroll', updateFeatState)
  }, [updateFeatState, activeFeatureCat])

  useEffect(() => {
    const onMove      = (e) => { if (featDragging.current) seekFeatBar(e.clientX) }
    const onUp        = ()  => { featDragging.current = false }
    const onTouchMove = (e) => { if (featDragging.current) seekFeatBar(e.touches[0].clientX) }
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
  }, [seekFeatBar])

  const scrollFeat = (dir) => {
    const el = featTrackRef.current
    if (!el) return
    el.scrollBy({ left: dir * (270 + 16), behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6 flex-1 w-full">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-5">
          <a href="/" className="hover:text-gray-800 transition">Home</a>
          <span>›</span>
          <a href="/hot-tubs" className="hover:text-gray-800 transition">Hot Tubs</a>
          <span>›</span>
          <span className="text-gray-900 font-medium">Lumari Summit</span>
        </nav>

        {/* SECTION 1 — Gallery + Product Info */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">

          {/* LEFT: Image gallery */}
          <div className="w-full lg:w-[58%]">
            <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 aspect-square select-none">
              <div className="absolute top-4 left-4 z-10 bg-[#c8201a] text-white text-xs font-bold px-3 py-1.5 rounded-md shadow">
                + FREE ESSENTIALS PACK
              </div>
              <img key={activeImg} src={GALLERY[activeImg]} alt="Lumari Summit"
                className="w-full h-full object-contain" />
              <button onClick={prev} aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2.5 hover:bg-gray-50 transition">
                <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={next} aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md p-2.5 hover:bg-gray-50 transition">
                <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex gap-3 mt-3">
              {GALLERY.map((src, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition flex-shrink-0 bg-gray-50 ${
                    activeImg === i ? 'border-[#1565c0] shadow-sm' : 'border-gray-200 hover:border-gray-400'
                  }`}>
                  <img src={src} alt={`View ${i + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product info */}
          <div className="w-full lg:w-[42%]">
            <img src={`${WP}/LOGO-NEW-POLAR-SPRINGS.png`} alt="Polar Springs"
              className="h-7 w-auto mb-3 opacity-80" />

            <div className="flex items-center gap-2 mb-1.5">
              <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">Lumari Summit</h1>
              <span className="text-[11px] font-bold bg-gray-800 text-white px-2 py-0.5 rounded">XL</span>
            </div>

            <div className="flex items-center gap-1.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-gray-500 font-medium ml-1">5 Stars</span>
            </div>

            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-gray-200">
              <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <p className="text-sm">
                <span className="text-green-600 font-semibold">In stock</span>
                <span className="text-gray-500"> and ready to ship</span>
              </p>
            </div>

            <p className="text-sm text-gray-400 line-through mb-1">$18,995 Similar elsewhere*</p>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl font-extrabold text-[#c8201a]">$11,995</span>
              <span className="bg-[#c8201a] text-white text-xs font-bold px-3 py-1.5 rounded-md whitespace-nowrap">
                Save Up To $6,000
              </span>
            </div>

            <button className="w-full flex items-center justify-center gap-2 border-2 border-[#c8201a] text-[#c8201a] text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-red-50 transition mb-3">
              + FREE ESSENTIALS PACK
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
              </svg>
            </button>

            <p className="text-sm text-gray-500 mb-5">
              Flexible Payment Plans From{' '}
              <span className="font-semibold text-gray-800">$150/M OAC</span>
            </p>

            <a href="#"
              className="flex items-center justify-center gap-2 w-full bg-[#fbc92e] hover:bg-[#e8b82a] text-gray-900 font-extrabold text-base py-4 rounded-xl transition shadow-sm mb-5">
              Get a Quote
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Trust badges */}
            <div className="flex items-start justify-between border-t border-b border-gray-200 py-3 gap-2">
              <div className="flex flex-col items-center gap-1 flex-1">
                <span className="text-2xl leading-none">🍁</span>
                <span className="text-[10px] text-gray-600 font-semibold text-center leading-tight">Canadian{'\n'}Owned</span>
              </div>
              <div className="flex flex-col items-center gap-1 flex-1">
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M1 3h13v13H1zM14 8h4l3 3v5h-7V8z"/>
                  <circle cx="5.5" cy="18.5" r="1.5"/><circle cx="18.5" cy="18.5" r="1.5"/>
                </svg>
                <span className="text-[10px] text-gray-600 font-semibold text-center leading-tight">Fast{'\n'}Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1 flex-1">
                <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 3v6c0 5-3.5 8.5-7 10C8.5 19.5 5 16 5 11V5l7-3z"/>
                </svg>
                <span className="text-[10px] text-gray-600 font-semibold text-center leading-tight">World-Class{'\n'}Warranties</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2 — Feature images + Accordion */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-lg font-bold text-gray-800">3,000+ Happy Customers</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

            {/* LEFT: Feature image/video grid */}
            <div className="w-full lg:w-[62%]">
              <div className="grid grid-cols-2 gap-2">
                {visibleFeatures.map(({ type, src, overlay }, i) => (
                  <div key={i} className="relative rounded-xl overflow-hidden aspect-square bg-gray-100">
                    {type === 'vid' ? (
                      <video src={src} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                    ) : (
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    )}
                    {overlay && (
                      <div className="absolute bottom-0 inset-x-0 bg-[#1565c0] px-3 py-2">
                        <p className="text-white text-xs font-extrabold tracking-wide leading-tight">{overlay.title}</p>
                        <p className="text-blue-200 text-[10px] font-semibold tracking-widest mt-0.5">{overlay.sub}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <button onClick={() => setShowMore(s => !s)}
                  className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-50 transition">
                  {showMore ? 'Show Less' : 'Show More'}
                  <svg className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* RIGHT: Accordion */}
            <div className="w-full lg:w-[38%] space-y-2">

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => toggle('description')}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition">
                  Description <ChevronDown open={accordion === 'description'} />
                </button>
                {accordion === 'description' && (
                  <div className="px-4 pb-5 pt-3 text-sm text-gray-600 border-t border-gray-100 leading-relaxed space-y-3">
                    <p>The Lumari Summit is Polar Springs' flagship 8-person hot tub, engineered specifically for Canadian climates and built for those who love to host.</p>
                    <p>Featuring a spacious 90″ × 90″ non-lounger layout, 61 adjustable jets, and Northern Seal™ 4-Part Insulation, it delivers powerful hydrotherapy for every guest while keeping energy costs low year-round — even in the harshest winters.</p>
                    <p>With UVC water purification, ozone sanitisation, and a Volcano Foot Dome centrally accessible from every seat, the Summit is the centrepiece of your backyard.</p>
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => toggle('features')}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition">
                  Key Features <ChevronDown open={accordion === 'features'} />
                </button>
                {accordion === 'features' && (
                  <div className="px-4 pb-4 pt-3 border-t border-gray-100">
                    <ul className="space-y-1.5 text-sm text-gray-600">
                      {KEY_FEATURES.map(f => (
                        <li key={f} className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => toggle('specs')}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition">
                  Specifications <ChevronDown open={accordion === 'specs'} />
                </button>
                {accordion === 'specs' && (
                  <div className="px-4 pb-4 pt-3 border-t border-gray-100">
                    <table className="w-full text-xs text-gray-700">
                      <tbody>
                        {SPECS.map(([label, value]) => (
                          <tr key={label} className="border-b border-gray-100 last:border-0">
                            <td className="py-2 font-semibold text-gray-800 w-1/2">{label}</td>
                            <td className="py-2 text-gray-600">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => toggle('warranties')}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition">
                  Warranties <ChevronDown open={accordion === 'warranties'} />
                </button>
                {accordion === 'warranties' && (
                  <div className="px-4 pb-4 pt-3 border-t border-gray-100 space-y-3">
                    {WARRANTIES.map(({ title, desc }) => (
                      <div key={title}>
                        <p className="text-sm font-semibold text-gray-800">{title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => toggle('delivery')}
                  className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition">
                  Delivery <ChevronDown open={accordion === 'delivery'} />
                </button>
                {accordion === 'delivery' && (
                  <div className="px-4 pb-4 pt-3 text-sm text-gray-600 border-t border-gray-100 leading-relaxed">
                    We offer professional white-glove delivery to your home. Our team will coordinate a convenient delivery window and position the spa exactly where you need it. Contact us at{' '}
                    <a href="tel:6135722777" className="text-[#1565c0] font-medium">613-572-2777</a>{' '}
                    for an estimate. We serve Brockville, Ottawa, and surrounding Ontario regions.
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* PRICE BEAT SECTION */}
        <div className="rounded-2xl overflow-hidden bg-[#0d3b6e] flex items-center gap-6 px-8 py-6 mt-10">
          <img
            src="https://alpinespas.imgix.net/assets/demo/pricebeat-logo.png?auto=format,compress&q=90"
            alt="Price Beat"
            className="w-36 h-auto flex-shrink-0"
          />
          <div>
            <p className="text-white text-base leading-relaxed">
              We know Spa Pools, we know quality, and we definitely know value, so if you can find a better price on the same spec'd in-stock Spa, bring it to us and we'll beat it!
            </p>
            <p className="text-blue-300 text-sm mt-1">T's &amp; C's apply</p>
          </div>
        </div>

        {/* FEATURES TAB SECTION */}
        <div className="mt-14 mb-12">
          <div className="relative flex items-center mb-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Every Feature, Thoughtfully Designed</h2>
            <div className="flex gap-2 absolute right-0">
              <button onClick={() => scrollFeat(-1)} disabled={!featCanPrev} aria-label="Previous"
                className={`bg-neutral-200 p-2 rounded-full transition ${featCanPrev ? 'hover:bg-neutral-300' : 'opacity-40 cursor-not-allowed'}`}>
                <FeatArrow left />
              </button>
              <button onClick={() => scrollFeat(1)} disabled={!featCanNext} aria-label="Next"
                className={`bg-neutral-200 p-2 rounded-full transition ${featCanNext ? 'hover:bg-neutral-300' : 'opacity-40 cursor-not-allowed'}`}>
                <FeatArrow />
              </button>
            </div>
          </div>
          <p className="text-gray-500 text-sm sm:text-base mb-7 max-w-2xl">
            Designed to bring people together. With a versatile layout, full-body hydrotherapy, and smarter water care — built for comfort, connection, and the Canadian climate.
          </p>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap mb-6">
            {FEATURE_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFeatureCat(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  activeFeatureCat === cat
                    ? 'bg-[#1565c0] text-white border-[#1565c0]'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Scrollable track */}
          <div
            ref={featTrackRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {filteredFeatures.map((f, i) => (
              <div key={i} style={{ width: '270px', minWidth: '270px', scrollSnapAlign: 'start' }}>
                <div className="rounded-xl overflow-hidden aspect-square bg-gray-100">
                  <img src={f.img} alt={f.title} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-bold text-gray-900 mt-3 text-sm sm:text-base">{f.title}</h3>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{f.desc}</p>
              </div>
            ))}
            <div className="flex-shrink-0 w-1" aria-hidden />
          </div>

          {/* Progress bar */}
          <div
            ref={featBarRef}
            className="mt-5 h-[6px] w-full bg-gray-200 rounded-full overflow-hidden cursor-pointer select-none"
            onMouseDown={(e) => { featDragging.current = true; seekFeatBar(e.clientX) }}
            onTouchStart={(e) => { featDragging.current = true; seekFeatBar(e.touches[0].clientX) }}
          >
            <div
              className="h-full bg-[#1565c0] rounded-full transition-[width] duration-150"
              style={{ width: `${Math.max(4, featProgress)}%` }}
            />
          </div>
        </div>

        {/* VIDEO SECTION */}
        <div className="mt-14 mb-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Take A Closer Look At What The Lumari Summit Offers</h2>
          <p className="text-gray-500 text-sm sm:text-base mb-6">See why families love the Lumari Summit for easy year-round soaking</p>
          <div className="relative rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => {
              const v = document.getElementById('lumari-video')
              if (v) { v.style.display = 'block'; v.play(); document.getElementById('lumari-thumb').style.display = 'none' }
            }}
          >
            <img
              id="lumari-thumb"
              src="https://alpinespas.imgix.net/assets/content/products/spa-pools/lucania/images/video-thumbnails/lucania-screenshot.webp?auto=format,compress&w=2048"
              alt="Lumari Summit video"
              className="w-full object-cover"
            />
            <video
              id="lumari-video"
              className="w-full hidden"
              controls
              playsInline
              src={`${CLD_VID}/v1773469466/Royale-Shahroz_ebsubp.mp4`}
            />
            <div id="lumari-play-btn"
              className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
              style={{ pointerEvents: 'none' }}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                <svg className="w-7 h-7 sm:w-9 sm:h-9 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ SECTION */}
        <div className="mt-14 mb-12 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* LEFT: Portrait video */}
          <div className="w-full lg:w-[38%] flex-shrink-0 lg:h-[640px]">
            <div className="relative rounded-2xl overflow-hidden bg-black cursor-pointer group h-full min-h-[320px]"
              onClick={() => setShowFaqVideo(true)}
            >
              <video
                src="https://cms.alpinespas.co.nz/assets/content/products/spa-pools/_global/videos/spa-pool-faqs/standard-(subtitles)/tell-me-about-the-smarttouch-controller_9x16.mp4"
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay={showFaqVideo}
                controls={showFaqVideo}
                muted={!showFaqVideo}
                loop={!showFaqVideo}
                playsInline
              />
              {!showFaqVideo && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform" style={{ pointerEvents: 'none' }}>
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                      <svg className="w-6 h-6 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-5" style={{ pointerEvents: 'none' }}>
                    <p className="text-white text-sm font-semibold leading-snug">It gives you full control over temperature, jets, lighting and more.</p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* RIGHT: FAQ accordion */}
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Lumari Summit FAQs</h2>
            <p className="text-gray-500 text-sm sm:text-base mb-6">Curious about the Lumari Summit? Dive into these FAQs and soak up the details below.</p>

            <div className="max-h-[540px] overflow-y-auto scrollbar-hide space-y-2 pr-1">
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setFaqOpen(f => (f === i ? null : i))}
                    className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition text-left gap-3"
                  >
                    <span>{q}</span>
                    <ChevronDown open={faqOpen === i} />
                  </button>
                  {faqOpen === i && (
                    <div className="px-4 pb-4 pt-2 border-t border-gray-100 text-sm text-gray-600 leading-relaxed">
                      {a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HYDROTHERAPY SECTION */}
        <div className="mt-14 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Feel The Power Of Hydrotherapy</h2>
          <p className="text-gray-500 text-sm sm:text-base mb-7 max-w-3xl">
            With a mix of powerful hydrotherapy jets and ergonomic seating, the Lumari Summit gives every muscle the care it deserves. Experience full-body relaxation with every soak.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                img: `${CLD}/v1773486730/582_x_815_Volcano_Foot_Dome_uljejs.png`,
                title: 'Full Body Massage',
                desc: "The Lumari Summit's 61 jets are placed to ease tension from your neck to your toes. Each seat targets key pressure points, giving you the full-body relief you deserve, all in the comfort of your backyard.",
              },
              {
                img: `${CLD}/v1773486728/582_x_815_Barrier_Free_Seating_qqdexu.png`,
                title: 'Neck and Shoulder Massage',
                desc: "Ease tension with the Lumari Summit's inverted precision neck jets. Jets are placed above the water line to target the areas where stress builds up most, giving you the deep relief your body needs.",
              },
            ].map(({ img, title, desc }, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img src={img} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.78) 100%)' }} />
                <div className="absolute bottom-0 inset-x-0 px-6 py-6">
                  <h3 className="text-white font-bold text-lg mb-1.5">{title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TECHNOLOGY SECTION */}
        <div className="mt-14 mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Integrated Control Technology</h2>
          <p className="text-gray-500 text-sm sm:text-base mb-8 max-w-3xl">
            Built to be water-compatible and heat-resistant, our integrated control technology delivers unmatched performance, efficiency, and reliability — engineered for spa pools that go the distance.
          </p>

          {/* Flex layout: tall image left, text + image stacked right */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-stretch lg:min-h-[520px]">

            {/* Left: image - roughly half the video height */}
            <div className="lg:w-[45%] flex-shrink-0 rounded-2xl overflow-hidden" style={{ height: '860px' }}>
              <img
                src="https://alpinespas.imgix.net/assets/content/products/spa-pools/_global/images/features/features-controller-smarttouch(1975x1560).jpg?auto=format,compress&w=1164"
                alt="Control Technology"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right: text block on top, video + text on bottom */}
            <div className="flex-1 flex flex-col gap-6 min-h-0">

              {/* Text block */}
              <div className="flex items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Take Control With Our Integrated Panel™</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Effortless control at your fingertips. Just tap to set your perfect temperature, lights, and jet strength. With a sleek interface, lower running costs, and advanced filtration programming, enjoy cleaner water every day.
                  </p>
                </div>
              </div>

              {/* Video fills remaining height, text below */}
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 rounded-2xl overflow-hidden min-h-0">
                  <video
                    src="https://cms.alpinespas.co.nz/assets/content/products/spa-pools/_global/videos/features/features-running-cost-(1560x2200).mp4"
                    autoPlay muted loop playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mt-4 mb-2">Intelligently Designed For Lower Running Costs</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our Northern Seal™ 4-Part insulation system uses dynamic thermal retention to run more efficiently. It minimises heat loss through cool-down and heating cycles — contributing to energy savings of up to 30%.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* ADD-ONS SECTION */}
        <div className="mt-14 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Next-Level Add-Ons</h2>
          <p className="text-gray-500 text-sm sm:text-base mb-10 max-w-3xl">
            Take your Lumari Summit to the next level with key upgrades that make your life easier. From smart control to easy cover lifting, these extras bring more comfort, convenience, and time to relax.
          </p>

          <div className="space-y-10">
            {[
              {
                img: `${CLD}/v1773486923/Lumari-Summit-3-1024x1024-1_yvedml.webp`,
                side: 'left',
                title: 'EcoCube™ Heat Pump',
                desc: 'The EcoCube™ Heat Pump slashes running costs by up to 75%. It\'s one of the most efficient spa heaters available, giving you more heat with far less energy — keeping your tub ready year-round.',
              },
              {
                img: `${CLD}/v1773486982/Lummari-Summit-1024x1024-2_j6locp.png`,
                side: 'right',
                title: 'SmartLink™ WiFi Upgrade',
                desc: 'Control your spa anytime, anywhere. The SmartLink™ module lets you adjust jets, temperature settings, and more — all from your smartphone or tablet. Connect with Alexa or Google for voice control.',
              },
              {
                img: `${CLD}/v1773486896/Lummari-Summit-1024x1024-1_jbohxj.png`,
                side: 'left',
                title: 'Cover Lifter',
                desc: 'Enjoy your spa without the struggle. A cover lifter makes removing the lid quick and easy for one person — no heavy lifting, no hassle.',
              },
            ].map(({ img, side, title, desc }, i) => (
              <div key={i} className={`flex flex-col ${side === 'left' ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}>
                <div className="w-full lg:w-[62%] rounded-2xl overflow-hidden flex-shrink-0" style={{ aspectRatio: '16/10' }}>
                  <img src={img} alt={title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WATER CARE SECTION */}
        <div className="mt-10 sm:mt-14 mb-10 sm:mb-12 overflow-x-hidden">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">

            {/* LEFT: blue panel (same height as cards) + icon list below */}
            <div className="w-full lg:w-[34%] flex flex-col gap-5 lg:gap-6">

              {/* Blue panel */}
              <div className="rounded-2xl overflow-hidden relative min-h-[300px] sm:min-h-[360px] lg:min-h-[430px]">
                <img
                  src={WC_BG}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 p-5 sm:p-7 lg:p-8 flex flex-col min-h-[300px] sm:min-h-[360px] lg:min-h-[430px]">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-snug">
                    The Lumari Summit Makes Water Care Easy
                  </h2>
                  <p className="text-gray-700 text-sm leading-relaxed mb-5 sm:mb-8">
                    The Lumari Summit's Mountain Pure™ Sanitisation System combines Ozone Purification with
                    UV-C Technology to maintain fresh, healthy water. Spend less time cleaning and more time
                    enjoying your spa.
                  </p>
                  {/* Nav arrows */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => waterCareRef.current?.scrollBy({ left: -326, behavior: 'smooth' })}
                      className="w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition shadow-sm"
                      aria-label="Previous water care feature"
                    >
                      <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => waterCareRef.current?.scrollBy({ left: 326, behavior: 'smooth' })}
                      className="w-9 h-9 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition shadow-sm"
                      aria-label="Next water care feature"
                    >
                      <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Icon list — 2-col on mobile/desktop, 3-col on tablet (full-width) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-4 gap-y-4 sm:gap-x-6 sm:gap-y-5">
                {WATER_CARE_LIST.map(({ key, lines, icon }) => (
                  <div key={key} className="flex items-center gap-2 sm:gap-3">
                    <img src={icon} alt={lines.join(' ')} className="w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-gray-700 font-medium leading-tight">
                      {lines[0]}<br />{lines[1]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: scrollable cards */}
            <div className="flex-1 min-w-0 w-full">
              <div
                ref={waterCareRef}
                className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide"
                style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
              >
                {WATER_CARE_CARDS.map((card) => (
                  <div
                    key={card.key}
                    className="flex-shrink-0 rounded-2xl overflow-hidden relative"
                    style={{
                      width: 'min(310px, calc(80vw - 1rem))',
                      minHeight: 'clamp(340px, 55vw, 430px)',
                      scrollSnapAlign: 'start',
                      background: '#0a1929',
                    }}
                  >
                    {/* Background media */}
                    {card.type === 'video' ? (
                      <video
                        src={card.src}
                        autoPlay muted loop playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <img src={card.src} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
                    )}

                    {/* Top brand icon */}
                    <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
                      <WaterCardIcon type={card.key} />
                    </div>

                    {/* Text overlay */}
                    <div className="absolute bottom-0 inset-x-0 px-4 sm:px-5 pt-5 pb-4 sm:pb-5 z-10"
                      style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.72) 0%,rgba(0,0,0,0.28) 70%,transparent 100%)' }}>
                      <h3 className="text-white font-bold text-sm sm:text-base mb-1 sm:mb-2 leading-snug">{card.title}</h3>
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                ))}
                <div className="flex-shrink-0 w-1" aria-hidden />
              </div>

              {/* Scroll indicator */}
              <div className="mt-3 sm:mt-4 h-[4px] bg-gray-200 rounded-full overflow-hidden w-full">
                <div className="h-full bg-[#1565c0] rounded-full" style={{ width: '55%' }} />
              </div>
            </div>

          </div>
        </div>

        {/* ─── BUILT FOR CANADIAN CONDITIONS ─────────────────────────────── */}
        <div className="mt-14 mb-12">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">

            {/* Left: product image */}
            <div className="w-full lg:w-[48%] rounded-2xl overflow-hidden shadow-sm">
              <img
                src={`${CLD}/v1773487629/Lumari-Summit-Tiles-582x815-1_whsqjk.avif`}
                alt="Lumari Summit construction quality"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Right: content */}
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-snug">
                Built For Canadian Conditions
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Every Polar Springs spa is crafted with care, using top-quality materials and engineered
                to handle Canada's toughest climates. Stays strong, retains heat, and looks great year after year.
              </p>

              {/* Pill buttons */}
              <div className="flex flex-wrap gap-2 mb-8">
                {BUILD_PILLS.map(pill => (
                  <button
                    key={pill.key}
                    onClick={() => setBuildPill(pill.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      buildPill === pill.key
                        ? 'bg-[#1565c0] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >{pill.label}</button>
                ))}
              </div>

              {/* Numbered build points */}
              <div className="space-y-5">
                {BUILD_POINTS.map(pt => (
                  <div key={pt.num} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#1565c0] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {pt.num}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{pt.label}</p>
                      <p className="text-gray-500 text-sm leading-relaxed mt-0.5">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── COMFORT THAT BRINGS THE FAMILY TOGETHER ───────────────────── */}
        <div className="mt-14 mb-12">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-snug">
              Comfort That Brings The Family Together
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-3xl">
              Sit back or stretch out. Every seat in the Lumari Summit is designed for comfort, conversation,
              and full-body relaxation. It's the perfect layout for families who want to spa together.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[{ key: 'seating', label: 'Seating Layout' }, { key: 'jets', label: 'Hydrotherapy Jets™' }].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSeatTab(tab.key)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  seatTab === tab.key
                    ? 'bg-[#1565c0] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >{tab.label}</button>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left: image */}
            <div className="w-full lg:w-[45%] rounded-2xl overflow-hidden shadow-sm">
              <img
                src={seatTab === 'seating'
                  ? `${CLD}/v1773486728/582_x_815_Barrier_Free_Seating_qqdexu.png`
                  : `${CLD}/v1773486730/582_x_815_Volcano_Foot_Dome_uljejs.png`}
                alt={seatTab === 'seating' ? 'Seating layout' : 'Hydrotherapy jets'}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Right: description + accordion */}
            <div className="flex-1 pt-1">
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                {seatTab === 'seating'
                  ? 'The Lumari Summit seats eight with Hydro-Massage Seats, a Barrier-Free Non-Lounger Layout, and a Cool-Off Seat — ideal for social soaking and full-body relaxation.'
                  : 'Every seat is equipped with precision adjustable jets engineered for targeted muscle relief from shoulders to lower back, plus a centrally located Volcano Foot Dome.'}
              </p>

              <div className="divide-y divide-gray-200 border-t border-gray-200">
                {(seatTab === 'seating' ? SEATING_ITEMS : SEATING_ITEMS.slice(0, 2)).map((item, i) => (
                  <div key={i}>
                    <button
                      onClick={() => setOpenSeat(openSeat === i ? null : i)}
                      className="w-full flex items-center justify-between py-4 text-left gap-4"
                    >
                      <span className={`text-sm sm:text-base font-semibold transition-colors ${openSeat === i ? 'text-[#1565c0]' : 'text-gray-900'}`}>
                        {item.label}
                      </span>
                      <svg className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${openSeat === i ? 'rotate-180 text-[#1565c0]' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openSeat === i && (
                      <p className="pb-4 text-sm text-gray-600 leading-relaxed -mt-2">{item.desc}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── FEATURES & SPECIFICATIONS ─────────────────────────────────── */}
        <div className="mt-14 mb-12">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* LEFT: Features table */}
            <div className="w-full lg:w-[55%]">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Features</h2>
              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                {FEATURES_TABLE_ROWS.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-center gap-4 px-5 py-3.5 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#e8f0fe] flex items-center justify-center flex-shrink-0">
                      <SpecIcon type={row.icon} />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-36 flex-shrink-0">{row.label}</span>
                    <span className="text-sm text-gray-900">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Specifications */}
            <div className="flex-1 w-full">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Specifications</h2>

              {/* Product image */}
              <div className="rounded-2xl overflow-hidden mb-5 shadow-sm">
                <img
                  src={`${CLD}/v1773486896/Lummari-Summit-1024x1024-1_jbohxj.png`}
                  alt="Lumari Summit"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Spec metrics */}
              <div className="rounded-2xl border border-gray-200 overflow-hidden mb-6">
                {SPEC_BOX_ROWS.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-center gap-4 px-5 py-3.5 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#e8f0fe] flex items-center justify-center flex-shrink-0">
                      <SpecIcon type={row.icon} />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-32 flex-shrink-0">{row.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                >
                  Download Brochure
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M16 12l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                >
                  Add to Compare
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm12-3c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ─── PREMIUM WARRANTIES ─────────────────────────────────────────── */}
        <div className="mt-14 mb-12 rounded-2xl overflow-hidden" style={{ background: '#0d2244' }}>
          <div className="px-6 sm:px-8 lg:px-10 py-10 sm:py-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Premium Warranties</h2>
            <p className="text-blue-200/70 text-sm sm:text-base mb-8 max-w-xl">
              Every Polar Springs hot tub is backed by a premium warranty — so you can relax knowing you're well covered.
            </p>
            <div className="flex flex-col lg:flex-row gap-6 items-stretch">

              {/* Video panel */}
              <div className="w-full lg:w-[240px] xl:w-[260px] flex-shrink-0">
                <div className="rounded-xl overflow-hidden relative h-full" style={{ minHeight: '260px' }}>
                  <video
                    src="https://cms.alpinespas.co.nz/assets/content/products/hot-tubs/_global/videos/hot-tubs-faqs/general-(no-subtitles)/what-s-the-warranty-and-what-does-it-actually-cover_9x16.mp4"
                    controls
                    className="w-full h-full object-cover rounded-xl"
                    style={{ maxHeight: '420px', display: 'block' }}
                  />
                  <div className="absolute bottom-0 inset-x-0 px-4 py-3 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)' }}>
                    <p className="text-white font-bold text-sm leading-tight">Premium Warranties</p>
                    <p className="text-white/70 text-xs">&amp; Expert Advice</p>
                  </div>
                </div>
              </div>

              {/* Warranty cards */}
              <div className="flex-1 flex flex-col gap-3">
                {WARRANTIES.map(({ years, title, desc }) => (
                  <div key={title}
                    className="flex items-start gap-4 rounded-xl px-4 py-4 border border-white/10"
                    style={{ background: 'rgba(255,255,255,0.07)' }}>
                    <WarrantyBadge years={years} />
                    <div>
                      <h3 className="text-white font-bold text-sm sm:text-base mb-1">{title}</h3>
                      <p className="text-blue-100/70 text-xs sm:text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ─── AWARDS TRUST BAR ───────────────────────────────────────────── */}
        <div className="mt-14 -mx-4 sm:-mx-6 lg:-mx-10 overflow-hidden" style={{ background: '#f5c800' }}>
          <div className="px-4 sm:px-6 lg:px-10 py-10 sm:py-14">

            {/* Scrolling award logos */}
            <div
              className="overflow-hidden mb-10 sm:mb-12"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                maskImage:        'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              }}
            >
              <div className="awards-track flex items-center" style={{ gap: '4rem', width: 'max-content' }}>
                {[
                  { src: `${ALP_ICON}/awards/awards-airbnb.svg`,        alt: 'Airbnb – Featured in 5-Star Escapes' },
                  { src: `${ALP_ICON}/awards/awards-spasa-retailer.svg`, alt: 'SPASA Retailer of the Year' },
                  { src: `${ALP_ICON}/awards/awards-google.svg`,         alt: 'Google – Rated 4.9 Stars' },
                  { src: `${ALP_ICON}/awards/awards-if-design.svg`,      alt: 'iF Design Award' },
                  { src: `${ALP_ICON}/awards/awards-yotpo.svg`,          alt: 'Yotpo – Rated 4.9 Stars' },
                  // duplicate set for seamless loop
                  { src: `${ALP_ICON}/awards/awards-airbnb.svg`,        alt: 'Airbnb b' },
                  { src: `${ALP_ICON}/awards/awards-spasa-retailer.svg`, alt: 'SPASA b' },
                  { src: `${ALP_ICON}/awards/awards-google.svg`,         alt: 'Google b' },
                  { src: `${ALP_ICON}/awards/awards-if-design.svg`,      alt: 'iF Design b' },
                  { src: `${ALP_ICON}/awards/awards-yotpo.svg`,          alt: 'Yotpo b' },
                ].map(({ src, alt }) => (
                  <img
                    key={alt}
                    src={`${src}?auto=format,compress&h=120&q=90&fm=webp&fit=fill`}
                    alt={alt}
                    className="h-16 sm:h-20 lg:h-24 w-auto object-contain flex-shrink-0"
                    draggable={false}
                  />
                ))}
              </div>
            </div>

            {/* Heading + CTA */}
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-3">
                Canada's Award-Winning Hot Tub &amp; Spa Specialist
              </h2>
              <p className="text-gray-700/90 text-sm sm:text-base mb-6 max-w-xl mx-auto leading-relaxed">
                From stocked showrooms and speedy delivery to local support, we're setting the standard in the wellness industry, and the awards prove it.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 border-2 border-gray-800 text-gray-800 font-semibold px-7 py-2.5 rounded-full hover:bg-gray-800 hover:text-yellow-400 transition-colors text-sm sm:text-base"
              >
                See Why We Win <span aria-hidden="true">→</span>
              </a>
            </div>

          </div>
        </div>

      </main>

      <footer className="bg-[#1f1f1f] text-gray-300 mt-8">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.15fr_repeat(5,minmax(0,1fr))] gap-10 lg:gap-8">
            <div className="space-y-4">
              <img src="/logo.webp" alt="Polar Springs" className="h-12 w-auto object-contain" />
              <div>
                <a href="tel:0800993388" className="block text-2xl font-semibold text-white leading-none">0800 99 33 88</a>
                <a href="mailto:Info@polarsprings.ca" className="block text-sm text-gray-400 hover:text-white transition mt-1">Info@polarsprings.ca</a>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="w-6 h-6 rounded border border-gray-500 flex items-center justify-center text-[10px] font-bold">f</span>
                <span className="w-6 h-6 rounded border border-gray-500 flex items-center justify-center text-[10px] font-bold">ig</span>
                <span className="w-6 h-6 rounded border border-gray-500 flex items-center justify-center text-[10px] font-bold">yt</span>
              </div>
            </div>

            {FOOTER_COLUMNS.map(({ title, links }) => (
              <div key={title} className="space-y-3">
                <h3 className="text-white font-semibold text-lg">{title}</h3>
                <ul className="space-y-1.5 text-sm text-gray-300">
                  {links.map((link, index) => (
                    link ? (
                      <li key={`${title}-${link}-${index}`}>
                        <a href="#" className="hover:text-white transition">{link}</a>
                      </li>
                    ) : (
                      <li key={`${title}-spacer-${index}`} className="h-2" />
                    )
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-gray-400">
            <p>© Polar Springs Ltd - All Rights Reserved.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms & Conditions</a>
              <a href="#" className="hover:text-white transition">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatArrow({ left = false }) {
  return (
    <svg width="17" height="19" viewBox="0 0 17 19" fill="none" className={`w-4 h-4 ${left ? 'rotate-180' : ''}`}>
      <path d="M7.7782 17.2781L15.5564 9.49998L7.7782 1.7218" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.00012 8.28723C0.447836 8.28723 0.000120211 8.73495 0.000120163 9.28723C0.000120115 9.83951 0.447836 10.2872 1.00012 10.2872L1.00012 8.28723ZM15.0001 9.28723L15.0001 8.28723L1.00012 8.28723L1.00012 9.28723L1.00012 10.2872L15.0001 10.2872L15.0001 9.28723Z" fill="currentColor" />
    </svg>
  )
}

/* ── Warranty shield badge ───────────────────────────────────────────── */
function WarrantyBadge({ years }) {
  const label = years === 'lifetime' ? '∞' : String(years)
  const isLifetime = years === 'lifetime'
  return (
    <svg viewBox="0 0 60 72" fill="none" className="w-14 h-16 flex-shrink-0">
      {/* Shield body */}
      <path d="M30 3 L5 13 L5 36 Q5 56 30 69 Q55 56 55 36 L55 13 Z" fill="#1565c0"/>
      {/* Inner highlight ring */}
      <path d="M30 9 L10 18 L10 36 Q10 52 30 63 Q50 52 50 36 L50 18 Z" fill="none" stroke="white" strokeOpacity="0.15" strokeWidth="1.2"/>
      {/* Year or infinity */}
      <text x="30" y="37" textAnchor="middle" dominantBaseline="middle"
        fontSize={isLifetime ? '28' : '22'} fontWeight="800" fill="white" fontFamily="system-ui, sans-serif">
        {label}
      </text>
      {/* YEARS label */}
      {!isLifetime && (
        <text x="30" y="51" textAnchor="middle" fontSize="7" fontWeight="600"
          fill="white" fillOpacity="0.8" fontFamily="system-ui, sans-serif" letterSpacing="1">
          YEARS
        </text>
      )}
      {/* WARRANTY banner ribbon */}
      <path d="M5 57 Q5 69 9 69 L51 69 Q55 69 55 57 L55 57 Z" fill="#0d47a1"/>
      <text x="30" y="65" textAnchor="middle" fontSize="6.2" fontWeight="700"
        fill="white" fontFamily="system-ui, sans-serif" letterSpacing="0.8">
        WARRANTY
      </text>
    </svg>
  )
}

/* ── Features / Spec table icons ──────────────────────────────────────── */
function SpecIcon({ type }) {
  const p = { className: 'w-5 h-5 text-[#1565c0]', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  if (type === 'brand')     return <svg {...p}><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1" fill="currentColor" stroke="none"/></svg>
  if (type === 'seat')      return <svg {...p}><circle cx="12" cy="7" r="3"/><path d="M5 20c0-3.31 3.13-6 7-6s7 2.69 7 6"/></svg>
  if (type === 'jet')       return <svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
  if (type === 'massage')   return <svg {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
  if (type === 'control')   return <svg {...p}><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
  if (type === 'filter')    return <svg {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
  if (type === 'pump')      return <svg {...p}><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg>
  if (type === 'water')     return <svg {...p}><path d="M12 2c0 0-7 6.5-7 11a7 7 0 0014 0c0-4.5-7-11-7-11z"/></svg>
  if (type === 'waterfall') return <svg {...p}><path d="M3 6h18M3 12h14M3 18h10"/></svg>
  if (type === 'insulate')  return <svg {...p}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
  if (type === 'jetpump')   return <svg {...p}><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
  if (type === 'heater')    return <svg {...p}><path d="M12 22a7 7 0 007-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 007 7z"/></svg>
  if (type === 'shell')     return <svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  if (type === 'light')     return <svg {...p}><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14"/></svg>
  if (type === 'weight')    return <svg {...p}><path d="M6 2h12l4 18H2L6 2z"/><line x1="12" y1="6" x2="12" y2="14"/><path d="M9 9h6"/></svg>
  if (type === 'drop')      return <svg {...p}><path d="M12 2c0 0-7 6.5-7 11a7 7 0 0014 0c0-4.5-7-11-7-11z"/></svg>
  if (type === 'power')     return <svg {...p}><path d="M18.36 6.64a9 9 0 1 1-12.73 0"/><line x1="12" y1="2" x2="12" y2="12"/></svg>
  if (type === 'dims')      return <svg {...p}><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
  return null
}

/* ── Water Care icons (left feature list) ─────────────────────────────── */
function WaterCareIcon({ type }) {
  const cls = 'w-5 h-5 text-[#1565c0]'
  if (type === 'uvc') return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
  if (type === 'circ') return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M4 12a8 8 0 0 1 8-8 8 8 0 0 1 5.66 2.34M20 12a8 8 0 0 1-8 8 8 8 0 0 1-5.66-2.34" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 4v4h-4M4 20v-4h4" />
    </svg>
  )
  if (type === 'filter') return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M6 8h12M9 12h6M11 16h2" />
    </svg>
  )
  if (type === 'ozone') return (
    <svg className={cls} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <text x="12" y="15.5" textAnchor="middle" fontSize="7" fontWeight="700" fill="currentColor" fontFamily="sans-serif">O₃</text>
    </svg>
  )
  /* waterfall */
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 9h14M3 13h10M3 17h6" />
    </svg>
  )
}

/* ── Water Care card top brand marks ──────────────────────────────────── */
function WaterCardIcon({ type }) {
  if (type === 'uvc') return (
    <div className="flex items-center gap-1.5">
      <svg className="w-8 h-8 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
  )
  if (type === 'filter') return (
    <span className="text-white/90 text-[11px] font-black tracking-[0.18em] uppercase">
      MICROBAN<sup style={{ fontSize: '7px', verticalAlign: 'super' }}>®</sup>
    </span>
  )
  if (type === 'ozone') return (
    <div className="w-10 h-10 rounded-full border-2 border-white/60 flex items-center justify-center">
      <span className="text-white/90 text-[11px] font-bold leading-none">O₃</span>
    </div>
  )
  return null
}

/* ── Water Care card decorative illustration ──────────────────────────── */
function WaterCardDecor({ type }) {
  if (type === 'uvc') return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <svg viewBox="0 0 80 120" className="w-44 h-56" fill="none">
        <circle cx="40" cy="58" r="36" stroke="white" strokeOpacity="0.07" strokeWidth="1" />
        <circle cx="40" cy="58" r="26" stroke="white" strokeOpacity="0.09" strokeWidth="1" />
        {/* body */}
        <rect x="28" y="24" width="24" height="68" rx="12" fill="white" fillOpacity="0.14" />
        {/* glow core */}
        <ellipse cx="40" cy="58" rx="10" ry="34" fill="rgba(160,80,240,0.18)" />
        {/* pins */}
        <rect x="32" y="13" width="4" height="13" rx="2" fill="white" fillOpacity="0.28" />
        <rect x="44" y="13" width="4" height="13" rx="2" fill="white" fillOpacity="0.28" />
        {/* water droplets */}
        {[16,24,32,20,28,36,22,30].map((x, i) => (
          <circle key={i} cx={x} cy={22 + i * 10} r="1.2" fill="white" fillOpacity="0.25" />
        ))}
      </svg>
    </div>
  )
  if (type === 'circ') return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <svg viewBox="0 0 100 100" className="w-52 h-52" fill="none">
        <circle cx="50" cy="50" r="44" stroke="white" strokeOpacity="0.07" strokeDasharray="4 3" />
        <circle cx="50" cy="50" r="30" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
        <circle cx="50" cy="50" r="14" stroke="white" strokeOpacity="0.12" strokeWidth="1.5" />
        <path d="M50 6 A44 44 0 1 1 6 50" stroke="white" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" />
        <polygon points="50,3 44,12 56,12" fill="white" fillOpacity="0.3" />
        {/* water ripples */}
        <ellipse cx="50" cy="75" rx="20" ry="5" stroke="white" strokeOpacity="0.1" strokeWidth="1" />
        <ellipse cx="50" cy="75" rx="30" ry="8" stroke="white" strokeOpacity="0.06" strokeWidth="1" />
      </svg>
    </div>
  )
  if (type === 'filter') return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <svg viewBox="0 0 70 100" className="w-36 h-52" fill="none">
        <ellipse cx="35" cy="14" rx="28" ry="8" stroke="white" strokeOpacity="0.2" strokeWidth="1.2" />
        <rect x="7" y="14" width="56" height="58" rx="4" stroke="white" strokeOpacity="0.18" strokeWidth="1.2" />
        <ellipse cx="35" cy="72" rx="28" ry="8" stroke="white" strokeOpacity="0.2" strokeWidth="1.2" />
        {[30, 40, 50, 60].map((y, i) => (
          <line key={i} x1="14" y1={y} x2="56" y2={y} stroke="white" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 2" />
        ))}
        <line x1="35" y1="80" x2="35" y2="100" stroke="white" strokeOpacity="0.18" strokeWidth="1.5" />
      </svg>
    </div>
  )
  if (type === 'ozone') return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <svg viewBox="0 0 100 100" className="w-52 h-52" fill="none">
        <circle cx="50" cy="50" r="44" stroke="white" strokeOpacity="0.06" strokeDasharray="3 2" />
        <circle cx="50" cy="50" r="30" stroke="white" strokeOpacity="0.1" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="14" stroke="white" strokeOpacity="0.14" strokeWidth="1.5" />
        {/* Molecule nodes */}
        <circle cx="50" cy="18" r="5.5" fill="white" fillOpacity="0.15" />
        <circle cx="74" cy="64" r="5.5" fill="white" fillOpacity="0.15" />
        <circle cx="26" cy="64" r="5.5" fill="white" fillOpacity="0.15" />
        {/* Bonds */}
        <line x1="50" y1="23.5" x2="50" y2="36" stroke="white" strokeOpacity="0.2" strokeWidth="1.2" />
        <line x1="69" y1="59" x2="61" y2="53" stroke="white" strokeOpacity="0.2" strokeWidth="1.2" />
        <line x1="31" y1="59" x2="39" y2="53" stroke="white" strokeOpacity="0.2" strokeWidth="1.2" />
      </svg>
    </div>
  )
  return null
}
