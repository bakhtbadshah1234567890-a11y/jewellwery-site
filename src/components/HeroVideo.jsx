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
        aria-label="Jewellery being designed by hand"
      />
      <div className="absolute inset-0 -z-10 bg-black/35" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-8 px-6 pb-8 pt-36 sm:px-10 sm:pb-12 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div>
          <h1 className="max-w-3xl text-3xl font-normal leading-tight tracking-tight sm:text-5xl lg:text-[3.25rem]">
            Author what others inherit.
          </h1>
          <p className="mt-4 text-base sm:text-xl text-white/90">
            Every decision yours. Every step visible.
          </p>
        </div>

        <Link
          to="/bespoke"
          className="inline-flex min-h-12 items-center justify-center rounded-md border border-white/80 px-8 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-stone-900 lg:min-w-53.75 shadow-sm"
        >
          Design yours
        </Link>
      </div>
    </div>
  )
}
