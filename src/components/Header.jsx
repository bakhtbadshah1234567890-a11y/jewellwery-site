import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const mainLinks = [
  { label: 'Shop', href: '/shop', hasMega: true },
  { label: 'Bespoke', href: '/bespoke' },
  { label: 'Our standards', href: '/standards' },
  { label: 'Sizing kits', href: '/sizing-kits' },
  { label: 'Sisters & Co Trunk Show', href: '/trunk-show' },
]

const megaShopCategories = [
  { name: 'Rings', href: '/shop?cat=RINGS', desc: 'Pinky, Eternity, 5-Stone & Signet' },
  { name: 'Necklaces', href: '/shop?cat=NECKLACES', desc: 'Tennis, Solitaire & Graduated' },
  { name: 'Earrings', href: '/shop?cat=EARRINGS', desc: 'Studs, Huggies & Drops' },
  { name: 'Bracelets', href: '/shop?cat=BRACELETS', desc: 'Tennis & Solitaire Chains' },
  { name: 'Pendants', href: '/shop?cat=PENDANTS', desc: 'Bezel Set & Custom Cuts' },
  { name: 'All Pieces', href: '/shop', desc: 'Browse the full archive' },
]

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5.5">
      <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.5" />
      <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function AccountIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5.5">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="2.7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.8 18c.8-2.5 2.6-3.8 5.2-3.8s4.4 1.3 5.2 3.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5.5">
      <path d="M4 8h16l-1 13H5L4 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { setIsCartOpen, setIsSearchOpen, itemCount } = useCart()

  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Header background logic
  const isTransparent = isHome && !scrolled && !menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 w-full transition-all duration-300 ${
        isTransparent
          ? 'border-b border-transparent bg-transparent text-white'
          : 'border-b border-neutral-200 bg-white/95 backdrop-blur-md text-neutral-900 shadow-xs'
      }`}
    >
      <div className="relative flex min-h-20 items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-12">
        {/* Brand Logo */}
        <Link
          to="/"
          className="shrink-0 text-[1.65rem] font-semibold tracking-[0.14em] sm:text-[2rem] transition-opacity hover:opacity-85"
          aria-label="Heirest home"
        >
          HEIREST
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex md:items-center md:justify-center md:gap-7 lg:gap-10 text-xs uppercase tracking-widest font-mono"
        >
          {mainLinks.map((link) => (
            <div
              key={link.label}
              className="relative py-2"
              onMouseEnter={() => link.hasMega && setMegaOpen(true)}
              onMouseLeave={() => link.hasMega && setMegaOpen(false)}
            >
              <Link
                to={link.href}
                className="whitespace-nowrap transition-opacity hover:opacity-70 py-1"
              >
                {link.label}
              </Link>

              {/* Mega Menu Dropdown */}
              {link.hasMega && megaOpen && (
                <div className="absolute top-full -left-20 w-80 rounded-md border border-neutral-200 bg-white p-4 shadow-xl text-neutral-900 normal-case font-sans">
                  <div className="grid grid-cols-1 gap-2">
                    {megaShopCategories.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => setMegaOpen(false)}
                        className="rounded p-2.5 transition-colors hover:bg-neutral-50 flex flex-col"
                      >
                        <span className="font-mono text-xs uppercase font-medium text-neutral-900">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-neutral-500">
                          {item.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right utility buttons */}
        <div className="flex shrink-0 items-center gap-4 sm:gap-6">
          <button
            type="button"
            className="hidden items-center gap-1.5 font-mono text-xs uppercase tracking-wider sm:flex"
            aria-label="Currency selector"
          >
            NZD <span aria-hidden="true" className="mt-0.5 border-x-3 border-t-[4px] border-x-transparent border-t-current" />
          </button>

          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search site"
            className="hover:opacity-75 transition-opacity p-1"
          >
            <SearchIcon />
          </button>

          <Link
            to="/contact"
            aria-label="Account / Showroom"
            className="hidden sm:block hover:opacity-75 transition-opacity p-1"
          >
            <AccountIcon />
          </Link>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping bag"
            className="relative hover:opacity-75 transition-opacity p-1"
          >
            <BagIcon />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-4.5 items-center justify-center rounded-full bg-neutral-900 font-mono text-[10px] text-white">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            className="relative flex size-8 flex-col items-center justify-center gap-1.5 md:hidden"
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

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="flex flex-col border-b border-neutral-200 bg-white px-6 py-6 text-neutral-900 md:hidden space-y-4 font-mono text-xs uppercase tracking-wider shadow-lg">
          {mainLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 border-b border-neutral-100 hover:text-neutral-500"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex justify-between items-center text-[11px] text-neutral-500">
            <span>Currency: NZD</span>
            <Link to="/contact" onClick={() => setMenuOpen(false)} className="underline">
              Contact Concierge
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
