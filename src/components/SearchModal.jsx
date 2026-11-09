import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'

const searchDirectory = [
  { name: 'Raised Bezel Pinky Ring', category: 'Rings', href: '/shop', price: '$1,751 NZD', img: '/pics/gen-ring.png' },
  { name: 'Georgian Pinky Ring', category: 'Rings', href: '/shop', price: '$2,050 NZD', img: '/pics/prod-ring2.png' },
  { name: 'Pave Eternity Ring', category: 'Rings', href: '/shop', price: '$1,787 NZD', img: '/pics/prod-ring3.png' },
  { name: 'Signature 5-Stone Ring', category: 'Rings', href: '/shop', price: '$2,672 NZD', img: '/pics/prod-ring4.png' },
  { name: 'Prong Solitaire Necklace', category: 'Necklaces', href: '/shop', price: '$2,450 NZD', img: '/pics/gen-necklace.png' },
  { name: 'Prong Tennis Necklace', category: 'Necklaces', href: '/shop', price: '$6,890 NZD', img: '/pics/prod-neck2.png' },
  { name: 'Basket Stud Earrings', category: 'Earrings', href: '/shop', price: '$980 NZD', img: '/pics/prod-ear1.png' },
  { name: 'Bezel Tennis Bracelet', category: 'Bracelets', href: '/shop', price: '$3,820 NZD', img: '/pics/gen-bracelet.png' },
  { name: 'Ring + Bracelet Sizing Kit', category: 'Sizing', href: '/sizing-kits', price: '$15 NZD', img: '/pics/sizing-kit-1.png' },
  { name: 'Collection: Bezel Pendant', category: 'Pendants', href: '/shop', price: '$1,890 NZD', img: '/pics/pendant-round.png' },
]

const trendingTags = ['Pinky Ring', 'Tennis Bracelet', 'Bezel Pendant', 'Eternity Ring', 'Sizing Kit']

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useCart()
  const [query, setQuery] = useState('')

  if (!isSearchOpen) return null

  const results = query.trim()
    ? searchDirectory.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-md" role="dialog" aria-modal="true">
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
              placeholder="Search fine jewellery, metals, categories..."
              autoFocus
              className="w-full bg-transparent text-lg sm:text-2xl font-light tracking-tight text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSearchOpen(false)
              setQuery('')
            }}
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
            </div>
          ) : (
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-6">
                Results ({results.length})
              </p>

              {results.length === 0 ? (
                <p className="text-sm text-neutral-500 py-8">
                  No jewellery matching &ldquo;{query}&rdquo; found. Try searching for &ldquo;Ring&rdquo;, &ldquo;Earrings&rdquo;, or &ldquo;Tennis&rdquo;.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {results.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => {
                        setIsSearchOpen(false)
                        setQuery('')
                      }}
                      className="group flex gap-4 items-center rounded-lg border border-neutral-200 p-3 hover:border-neutral-400 bg-white"
                    >
                      <img src={item.img} alt={item.name} className="size-16 object-contain bg-neutral-50 rounded" />
                      <div>
                        <h4 className="text-sm font-normal text-neutral-900 group-hover:underline">
                          {item.name}
                        </h4>
                        <span className="font-mono text-xs text-neutral-500 block">
                          {item.price}
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
