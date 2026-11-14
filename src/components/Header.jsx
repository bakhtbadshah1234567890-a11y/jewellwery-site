import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/useCart'

const announcements = [
  'COMPLIMENTARY INSURED WORLDWIDE EXPRESS SHIPPING ON ALL ORDERS',
  'LIFETIME MANUFACTURING WARRANTY & ANNUAL COMPLIMENTARY SERVICING',
  'BESPOKE CONSULTATIONS AVAILABLE IN-STUDIO & VIRTUALLY VIA VIDEO',
]

const shopMegaCategories = [
  {
    name: 'Rings',
    href: '/shop?cat=RINGS',
    desc: 'Pinky, Solitaire, Five-Stone & Eternity Bands',
    image: '/pics/gen-ring.png',
  },
  {
    name: 'Necklaces',
    href: '/shop?cat=NECKLACES',
    desc: 'Tennis, Solitaire & Graduated Rivieres',
    image: '/pics/gen-necklace.png',
  },
  {
    name: 'Earrings',
    href: '/shop?cat=EARRINGS',
    desc: 'Classic Studs, Bezel Huggies & Solitaire Drops',
    image: '/pics/gen-earrings.png',
  },
  {
    name: 'Bracelets',
    href: '/shop?cat=BRACELETS',
    desc: 'Bezel Tennis & Fine Gold Links',
    image: '/pics/gen-bracelet.png',
  },
  {
    name: 'Pendants',
    href: '/shop?cat=PENDANTS',
    desc: 'Bezel-Set Gemstone & Diamond Charms',
    image: '/pics/pendant-round.png',
  },
  {
    name: 'Shop All Archive',
    href: '/shop',
    desc: 'Explore the complete fine jewellery collection',
    image: '/pics/prod-ring2.png',
  },
]

const collectionsMega = [
  {
    name: 'Bezel Collection',
    slug: 'bezel',
    desc: 'Architectural clean lines and smooth protective rims',
    image: '/pics/pendant-emerald.png',
  },
  {
    name: 'Classic Collection',
    slug: 'classic',
    desc: 'Timeless diamond solitaires and eternal pavé',
    image: '/pics/gen-necklace.png',
  },
  {
    name: 'Georgian Collection',
    slug: 'georgian',
    desc: '18th-century antique collet and step-cut elegance',
    image: '/pics/prod-ring2.png',
  },
  {
    name: 'Tennis Collection',
    slug: 'tennis',
    desc: 'Continuous fluid ribbons of brilliant-cut light',
    image: '/pics/prod-neck2.png',
  },
  {
    name: 'Letter & Talisman',
    slug: 'letter',
    desc: 'Personalized bespoke monogram talismans',
    image: '/pics/pic 1.jpg',
  },
]

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
      <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.5" />
      <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function AccountIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="2.7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.8 18c.8-2.5 2.6-3.8 5.2-3.8s4.4 1.3 5.2 3.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
      <path d="M4 8h16l-1 13H5L4 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function Header() {
  const [announcementIdx, setAnnouncementIdx] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeMega, setActiveMega] = useState(null) // 'shop' | 'collections' | null
  const [mobileShopOpen, setMobileShopOpen] = useState(false)
  const [mobileCollectionsOpen, setMobileCollectionsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const location = useLocation()
  const { setIsCartOpen, setIsSearchOpen, itemCount } = useCart()

  const isHome = location.pathname === '/'

  // Rotate announcement bar every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % announcements.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  // Close menus on page navigation
  useEffect(() => {
    const timer = setTimeout(() => {
      setMenuOpen(false)
      setActiveMega(null)
    }, 0)
    return () => clearTimeout(timer)
  }, [location.pathname, location.search])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isTransparent = isHome && !scrolled && !menuOpen && !activeMega

  return (
    <div className="fixed inset-x-0 top-0 z-40 w-full transition-all duration-300">
      {/* 1. Slim Announcement Bar */}
      <div className="bg-[#171717] text-[#EDE8E1] py-1.5 px-4 text-center text-[10px] sm:text-[11px] font-mono tracking-widest uppercase transition-colors border-b border-white/10 flex items-center justify-center min-h-[28px] overflow-hidden">
        <span
          key={announcementIdx}
          className="animate-fade-in inline-block whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
        >
          {announcements[announcementIdx]}
        </span>
      </div>

      {/* 2. Main Navigation Bar */}
      <header
        className={`w-full transition-all duration-300 ${
          isTransparent
            ? 'border-b border-transparent bg-transparent text-white'
            : 'border-b border-neutral-200 bg-white/95 backdrop-blur-md text-neutral-900 shadow-xs'
        }`}
        onMouseLeave={() => setActiveMega(null)}
      >
        <div className="relative flex min-h-18 items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
          {/* Logo on Left */}
          <Link
            to="/"
            className="shrink-0 text-[1.65rem] font-semibold tracking-[0.16em] sm:text-[2rem] transition-opacity hover:opacity-85 font-sans"
            aria-label="Gemly home"
          >
            GEMLY
          </Link>

          {/* Desktop Navigation in Center */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex lg:items-center lg:justify-center lg:gap-8 xl:gap-10 text-[11px] uppercase tracking-widest font-mono"
          >
            {/* SHOP with Mega Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => setActiveMega('shop')}
            >
              <Link
                to="/shop"
                className={`transition-opacity hover:opacity-60 flex items-center gap-1 ${
                  activeMega === 'shop' ? 'opacity-60 font-semibold' : ''
                }`}
              >
                Shop
                <span className="text-[8px] opacity-70">▾</span>
              </Link>
            </div>

            {/* COLLECTIONS with Mega Dropdown */}
            <div
              className="relative py-4"
              onMouseEnter={() => setActiveMega('collections')}
            >
              <Link
                to="/shop"
                className={`transition-opacity hover:opacity-60 flex items-center gap-1 ${
                  activeMega === 'collections' ? 'opacity-60 font-semibold' : ''
                }`}
              >
                Collections
                <span className="text-[8px] opacity-70">▾</span>
              </Link>
            </div>

            {/* BESPOKE */}
            <Link
              to="/bespoke"
              className="whitespace-nowrap transition-opacity hover:opacity-60 py-4"
            >
              Bespoke
            </Link>

            {/* OUR STANDARDS */}
            <Link
              to="/standards"
              className="whitespace-nowrap transition-opacity hover:opacity-60 py-4"
            >
              Our Standards
            </Link>

            {/* OUR PROCESS */}
            <Link
              to="/our-process"
              className="whitespace-nowrap transition-opacity hover:opacity-60 py-4"
            >
              Our Process
            </Link>

            {/* JOURNAL */}
            <Link
              to="/journal"
              className="whitespace-nowrap transition-opacity hover:opacity-60 py-4"
            >
              Journal
            </Link>
          </nav>

          {/* Right Utility Icons */}
          <div className="flex shrink-0 items-center gap-4 sm:gap-6">
            <button
              type="button"
              className="hidden items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider md:flex hover:opacity-75"
              aria-label="Currency selector"
            >
              NZD <span aria-hidden="true" className="mt-0.5 border-x-3 border-t-[4px] border-x-transparent border-t-current" />
            </button>

            {/* Search */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search collection"
              className="hover:opacity-70 transition-opacity p-1.5"
            >
              <SearchIcon />
            </button>

            {/* Account */}
            <Link
              to="/account"
              aria-label="Customer Account & Appointments"
              className="hidden sm:block hover:opacity-70 transition-opacity p-1.5"
            >
              <AccountIcon />
            </Link>

            {/* Shopping Bag */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping bag"
              className="relative hover:opacity-70 transition-opacity p-1.5"
            >
              <BagIcon />
              {itemCount > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 flex size-4 items-center justify-center rounded-full bg-neutral-900 font-mono text-[9px] text-white">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              className="relative flex size-8 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span
                className={`h-px w-6 bg-current transition-transform duration-200 ${
                  menuOpen ? 'translate-y-[3.5px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-6 bg-current transition-transform duration-200 ${
                  menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* ================= DESKTOP MEGA MENU ================= */}
        {activeMega === 'shop' && (
          <div
            className="absolute top-full inset-x-0 border-b border-neutral-200 bg-white/98 backdrop-blur-md px-12 py-8 shadow-2xl text-neutral-900"
            onMouseEnter={() => setActiveMega('shop')}
            onMouseLeave={() => setActiveMega(null)}
          >
            <div className="mx-auto max-w-7xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  Shop Fine Jewellery By Category
                </span>
                <Link
                  to="/shop"
                  onClick={() => setActiveMega(null)}
                  className="font-mono text-xs uppercase tracking-widest text-neutral-900 underline hover:opacity-70"
                >
                  View All Pieces →
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {shopMegaCategories.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setActiveMega(null)}
                    className="group flex flex-col rounded-sm p-3 transition-colors hover:bg-neutral-50"
                  >
                    <div className="aspect-square w-full overflow-hidden rounded bg-neutral-100 p-2 mb-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider font-medium text-neutral-900 group-hover:underline">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed font-sans">
                      {item.desc}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeMega === 'collections' && (
          <div
            className="absolute top-full inset-x-0 border-b border-neutral-200 bg-white/98 backdrop-blur-md px-12 py-8 shadow-2xl text-neutral-900"
            onMouseEnter={() => setActiveMega('collections')}
            onMouseLeave={() => setActiveMega(null)}
          >
            <div className="mx-auto max-w-7xl">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-100">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                  Curated Design Collections
                </span>
                <Link
                  to="/shop"
                  onClick={() => setActiveMega(null)}
                  className="font-mono text-xs uppercase tracking-widest text-neutral-900 underline hover:opacity-70"
                >
                  Browse Full Catalog →
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {collectionsMega.map((col) => (
                  <Link
                    key={col.slug}
                    to={`/collections/${col.slug}`}
                    onClick={() => setActiveMega(null)}
                    className="group flex flex-col rounded-sm p-3 transition-colors hover:bg-neutral-50"
                  >
                    <div className="aspect-4/3 w-full overflow-hidden rounded bg-neutral-100 p-2 mb-3">
                      <img
                        src={col.image}
                        alt={col.name}
                        className="size-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider font-medium text-neutral-900 group-hover:underline">
                      {col.name}
                    </span>
                    <span className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed font-sans">
                      {col.desc}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ================= MOBILE DRAWER MENU ================= */}
      {menuOpen && (
        <div className="flex flex-col border-b border-neutral-200 bg-white px-6 py-6 text-neutral-900 lg:hidden font-mono text-xs uppercase tracking-wider shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Shop Accordion */}
          <div className="border-b border-neutral-100 py-2">
            <button
              type="button"
              onClick={() => setMobileShopOpen(!mobileShopOpen)}
              className="flex w-full items-center justify-between py-2 text-left font-semibold"
            >
              <span>Shop</span>
              <span>{mobileShopOpen ? '—' : '+'}</span>
            </button>
            {mobileShopOpen && (
              <div className="pl-4 pb-2 space-y-2 text-neutral-600 normal-case font-sans text-xs">
                {shopMegaCategories.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-1 hover:text-neutral-900"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Collections Accordion */}
          <div className="border-b border-neutral-100 py-2">
            <button
              type="button"
              onClick={() => setMobileCollectionsOpen(!mobileCollectionsOpen)}
              className="flex w-full items-center justify-between py-2 text-left font-semibold"
            >
              <span>Collections</span>
              <span>{mobileCollectionsOpen ? '—' : '+'}</span>
            </button>
            {mobileCollectionsOpen && (
              <div className="pl-4 pb-2 space-y-2 text-neutral-600 normal-case font-sans text-xs">
                {collectionsMega.map((col) => (
                  <Link
                    key={col.slug}
                    to={`/collections/${col.slug}`}
                    onClick={() => setMenuOpen(false)}
                    className="block py-1 hover:text-neutral-900"
                  >
                    {col.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/bespoke"
            onClick={() => setMenuOpen(false)}
            className="py-3 border-b border-neutral-100 hover:text-neutral-500"
          >
            Bespoke
          </Link>
          <Link
            to="/standards"
            onClick={() => setMenuOpen(false)}
            className="py-3 border-b border-neutral-100 hover:text-neutral-500"
          >
            Our Standards
          </Link>
          <Link
            to="/our-process"
            onClick={() => setMenuOpen(false)}
            className="py-3 border-b border-neutral-100 hover:text-neutral-500"
          >
            Our Process
          </Link>
          <Link
            to="/journal"
            onClick={() => setMenuOpen(false)}
            className="py-3 border-b border-neutral-100 hover:text-neutral-500"
          >
            Journal
          </Link>
          <Link
            to="/sizing-kits"
            onClick={() => setMenuOpen(false)}
            className="py-3 border-b border-neutral-100 hover:text-neutral-500"
          >
            Sizing Kits
          </Link>
          <Link
            to="/account"
            onClick={() => setMenuOpen(false)}
            className="py-3 border-b border-neutral-100 hover:text-neutral-500"
          >
            My Account
          </Link>

          <div className="pt-4 flex justify-between items-center text-[11px] text-neutral-500">
            <span>Currency: NZD ($)</span>
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="underline text-neutral-900"
            >
              Concierge Service
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
