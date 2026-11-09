import { useEffect, useRef, useState } from 'react'

const links = [
  { label: 'Shop', href: '#shop' },
  { label: 'Bespoke', href: '#bespoke' },
  { label: 'Our standards', href: '#standards' },
  { label: 'Sizing kits', href: '#sizing-kits' },
  { label: 'Sisters & Co Trunk Show', href: '#trunk-show' },
]

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6">
      <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.6" />
      <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}

function AccountIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="9" r="2.7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6.8 18c.8-2.5 2.6-3.8 5.2-3.8s4.4 1.3 5.2 3.8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6">
      <path d="M4 8h16l-1 13H5L4 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 9V6a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolledPastVideo, setScrolledPastVideo] = useState(false)
  const heroRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }

    const updateHeader = () => {
      const heroBottom = heroRef.current?.getBoundingClientRect().bottom
      setScrolledPastVideo(heroBottom !== undefined && heroBottom <= 80)
    }

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    window.addEventListener('resize', updateHeader)

    return () => {
      window.removeEventListener('scroll', updateHeader)
      window.removeEventListener('resize', updateHeader)
    }
  }, [])

  return (
    <>
      <div
        className={`fixed inset-x-0 top-0 z-50 w-full border-b transition-colors duration-300 ${
          scrolledPastVideo
            ? 'border-black/10 bg-white text-black shadow-sm'
            : 'border-transparent bg-transparent text-white'
        }`}
      >
        <div className="relative flex min-h-20 items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-12">
          <a
            href="/"
            className="shrink-0 text-[1.65rem] font-semibold tracking-[0.14em] sm:text-[2rem]"
            aria-label="Heirest home"
          >
            HEIREST
          </a>

          <nav
            aria-label="Main navigation"
            className={`${menuOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col gap-5 border-b px-6 py-6 text-sm uppercase tracking-wide md:static md:flex md:flex-row md:items-center md:justify-center md:gap-6 md:border-0 md:bg-transparent md:p-0 lg:gap-10 ${
              scrolledPastVideo
                ? 'border-black/10 bg-white text-black'
                : 'border-white/20 bg-black/85 text-white'
            }`}
          >
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="whitespace-nowrap transition-opacity hover:opacity-70"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-4 sm:gap-6">
            <button type="button" className="hidden items-center gap-2 text-sm sm:flex" aria-label="Currency: New Zealand dollars">
              NZD <span aria-hidden="true" className="mt-1 border-x-4 border-t-[5px] border-x-transparent border-t-current" />
            </button>
            <button type="button" aria-label="Search" className="hidden sm:block hover:opacity-75 transition-opacity">
              <SearchIcon />
            </button>
            <button type="button" aria-label="Account" className="hidden sm:block hover:opacity-75 transition-opacity">
              <AccountIcon />
            </button>
            <button type="button" aria-label="Shopping bag" className="hover:opacity-75 transition-opacity">
              <BagIcon />
            </button>
            <button
              type="button"
              className="relative flex size-8 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`h-px w-6 bg-current transition-transform duration-200 ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`h-px w-6 bg-current transition-transform duration-200 ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      <header ref={heroRef} className="relative isolate min-h-155 h-svh max-h-275 w-full overflow-hidden bg-stone-900 text-white">
        <video
          ref={videoRef}
          className="absolute inset-0 -z-20 size-full object-cover"
          src="/jewel.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Jewellery being designed by hand"
        />
        <div className="absolute inset-0 -z-10 bg-black/35" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 px-6 pb-8 pt-36 sm:px-10 sm:pb-10 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div>
            <h1 className="max-w-3xl text-3xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-[3rem]">
              Author what others inherit.
            </h1>
            <p className="mt-4 text-base sm:text-xl text-white/90">Every decision yours. Every step visible.</p>
          </div>
          <a
            href="#bespoke"
            className="inline-flex min-h-11 items-center justify-center border rounded-md border-white/80 px-8 text-sm uppercase tracking-wider transition-colors hover:bg-white hover:text-stone-900 lg:min-w-53.75"
          >
            Design yours
          </a>
        </div>
      </header>
    </>
  )
}
