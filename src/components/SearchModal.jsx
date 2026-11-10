import { useState } from 'react'
import { useCart } from '../context/useCart'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'

const trendingTags = ['Pinky Ring', 'Tennis Bracelet', 'Bezel Pendant', 'Eternity Ring', 'Emerald', 'Sapphire']

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useCart()
  const [query, setQuery] = useState('')

  if (!isSearchOpen) return null

  const q = query.trim().toLowerCase()

  const results = q
    ? PRODUCTS.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.collection?.toLowerCase().includes(q) ||
          item.metal.toLowerCase().includes(q) ||
          item.gemstone?.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      )
    : []

  const handleClose = () => {
    setIsSearchOpen(false)
    setQuery('')
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white/98 backdrop-blur-md" role="dialog" aria-modal="true">
      {/* Top bar with input */}
      <div className="border-b border-neutral-200 px-6 py-6 sm:px-12">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-3">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5 text-neutral-400">
              <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.6" />
              <path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.6" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fine jewellery, gemstones, metals, collections..."
              autoFocus
              className="w-full bg-transparent text-lg sm:text-2xl font-light tracking-tight text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900"
          >
            Esc [✕]
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-12">
        <div className="mx-auto max-w-4xl">
          {query.trim() === '' ? (
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {trendingTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="rounded-full border border-neutral-200 bg-white px-4 py-2 font-mono text-xs uppercase tracking-wider text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-neutral-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <Link
                  to="/shop?cat=RINGS"
                  onClick={handleClose}
                  className="p-4 rounded border border-neutral-200 bg-[#FAF9F6] hover:border-neutral-900 text-center"
                >
                  Rings Collection →
                </Link>
                <Link
                  to="/shop?cat=NECKLACES"
                  onClick={handleClose}
                  className="p-4 rounded border border-neutral-200 bg-[#FAF9F6] hover:border-neutral-900 text-center"
                >
                  Necklaces →
                </Link>
                <Link
                  to="/shop?cat=EARRINGS"
                  onClick={handleClose}
                  className="p-4 rounded border border-neutral-200 bg-[#FAF9F6] hover:border-neutral-900 text-center"
                >
                  Earrings →
                </Link>
                <Link
                  to="/shop?cat=PENDANTS"
                  onClick={handleClose}
                  className="p-4 rounded border border-neutral-200 bg-[#FAF9F6] hover:border-neutral-900 text-center"
                >
                  Bezel Pendants →
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6">
                Results ({results.length})
              </p>

              {results.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-base text-neutral-600 mb-2">
                    No fine jewellery matching &ldquo;{query}&rdquo; found.
                  </p>
                  <p className="font-mono text-xs text-neutral-400">
                    Try searching for &ldquo;Bezel&rdquo;, &ldquo;Ring&rdquo;, &ldquo;Emerald&rdquo;, or &ldquo;Tennis&rdquo;.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {results.map((item) => (
                    <Link
                      key={item.id}
                      to={`/products/${item.slug}`}
                      onClick={handleClose}
                      className="group flex gap-4 rounded-lg border border-neutral-200 p-3 hover:border-neutral-900 hover:shadow-md transition-all bg-white"
                    >
                      <div className="size-20 shrink-0 overflow-hidden rounded bg-[#FAF9F6] p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <span className="font-mono text-[10px] uppercase text-neutral-400 tracking-wider">
                          {item.category} • {item.collection}
                        </span>
                        <h3 className="text-sm font-normal text-neutral-900 group-hover:underline leading-snug">
                          {item.name}
                        </h3>
                        <span className="font-mono text-xs font-semibold text-neutral-900 mt-1">
                          {item.priceDisplay}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
