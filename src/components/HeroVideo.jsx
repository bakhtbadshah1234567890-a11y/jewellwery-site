import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function HeroVideo() {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {})
    }
  }, [])

  return (
    <div className="relative isolate min-h-155 h-svh max-h-275 w-full overflow-hidden bg-stone-900 text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 size-full object-cover"
        src="/jewel.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-label="Fine jewellery being crafted by hand"
      />
      <div className="absolute inset-0 -z-10 bg-black/40" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 px-6 pb-10 pt-36 sm:px-10 sm:pb-14 lg:flex-row lg:items-end lg:justify-between lg:px-14">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-[#D6C2A1] mb-2">
            Fine Jewellery Reimagined
          </p>
          <h1 className="text-3xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-[3.5rem]">
            Author what others inherit.
          </h1>
          <p className="mt-3 text-base sm:text-xl text-white/90 font-light leading-relaxed">
            Every decision yours. Every step visible. Hand-finished fine jewellery cast in solid recycled gold.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <Link
            to="/shop"
            className="inline-flex min-h-12 items-center justify-center rounded bg-white px-8 font-mono text-xs uppercase tracking-widest text-neutral-900 transition-colors hover:bg-neutral-100 shadow-md font-medium"
          >
            Shop Collection
          </Link>
          <a
            href="#configurator"
            className="inline-flex min-h-12 items-center justify-center rounded border border-white/80 px-8 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-stone-900 backdrop-blur-xs"
          >
            Design Your Own
          </a>
        </div>
      </div>
    </div>
  )
}
