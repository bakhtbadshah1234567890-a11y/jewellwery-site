import { useState, useEffect, useCallback } from 'react'

export default function ProductImageLightbox({
  isOpen,
  onClose,
  images = [],
  currentIndex = 0,
  onIndexChange,
  productName = 'Fine Jewellery Piece',
}) {
  const [isZoomed, setIsZoomed] = useState(false)

  const activeIndex = currentIndex >= 0 && currentIndex < images.length ? currentIndex : 0

  const handleNext = useCallback(() => {
    if (images.length <= 1) return
    setIsZoomed(false)
    const next = (activeIndex + 1) % images.length
    if (onIndexChange) onIndexChange(next)
  }, [activeIndex, images.length, onIndexChange])

  const handlePrev = useCallback(() => {
    if (images.length <= 1) return
    setIsZoomed(false)
    const prev = (activeIndex - 1 + images.length) % images.length
    if (onIndexChange) onIndexChange(prev)
  }, [activeIndex, images.length, onIndexChange])

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      }
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, handleNext, handlePrev])

  if (!isOpen || images.length === 0) return null

  const currentImg = images[activeIndex]

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${productName} Fullscreen Image Viewer`}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md select-none text-white animate-fade-in"
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 z-10 bg-black/40">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#D6C2A1]">
            Fullscreen Inspection
          </span>
          <span className="text-white/40 hidden sm:inline">•</span>
          <span className="text-sm font-light text-white/90 truncate max-w-xs sm:max-w-md hidden sm:inline">
            {productName}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Zoom toggle button */}
          <button
            type="button"
            onClick={() => setIsZoomed((z) => !z)}
            className="flex items-center gap-1.5 rounded border border-white/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white hover:bg-white/10 transition-colors"
            title={isZoomed ? 'Zoom Out (100%)' : 'Zoom In (180%)'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
              <path d={isZoomed ? 'M8 11h6' : 'M11 8v6M8 11h6'} strokeLinecap="round" />
            </svg>
            <span className="hidden sm:inline">{isZoomed ? 'Zoom Out' : 'Zoom In'}</span>
          </button>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close fullscreen view"
            className="rounded border border-white/20 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-white hover:bg-white hover:text-black transition-colors"
          >
            Esc [✕]
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-10 overflow-hidden">
        {/* Previous Arrow */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full border border-white/20 bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all shadow-lg text-lg"
          >
            ←
          </button>
        )}

        {/* Center Image Container */}
        <div
          onClick={() => setIsZoomed((z) => !z)}
          className={`relative max-h-full max-w-full flex items-center justify-center transition-transform duration-300 ${
            isZoomed ? 'scale-150 sm:scale-175 cursor-zoom-out overflow-auto' : 'scale-100 cursor-zoom-in'
          }`}
        >
          <img
            src={currentImg}
            alt={`${productName} view ${activeIndex + 1}`}
            className="max-h-[75vh] max-w-[85vw] object-contain drop-shadow-2xl transition-all"
            draggable={false}
          />
        </div>

        {/* Next Arrow */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 size-12 rounded-full border border-white/20 bg-black/50 text-white flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all shadow-lg text-lg"
          >
            →
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Strip & Counter */}
      <div className="flex flex-col items-center justify-center pb-6 pt-3 px-6 border-t border-white/10 bg-black/40 gap-3 z-10">
        <div className="flex items-center gap-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setIsZoomed(false)
                if (onIndexChange) onIndexChange(idx)
              }}
              className={`size-14 rounded overflow-hidden border p-1 transition-all ${
                activeIndex === idx
                  ? 'border-white ring-2 ring-white/50 scale-105 bg-white/10'
                  : 'border-white/20 opacity-50 hover:opacity-100 bg-white/5'
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx + 1}`} className="size-full object-contain" />
            </button>
          ))}
        </div>

        <div className="font-mono text-[11px] uppercase tracking-widest text-white/60">
          Angle {activeIndex + 1} of {images.length} • Click image to {isZoomed ? 'zoom out' : 'magnify'}
        </div>
      </div>
    </div>
  )
}
