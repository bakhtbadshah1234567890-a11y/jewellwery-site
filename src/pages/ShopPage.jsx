import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { useCart } from '../context/useCart'
import { formatNZD } from '../utils/pricing'
import ProductImageLightbox from '../components/ProductImageLightbox'

const CATEGORIES = ['ALL', 'RINGS', 'NECKLACES', 'EARRINGS', 'BRACELETS', 'PENDANTS']
const COLLECTIONS = ['ALL', 'Bezel', 'Classic', 'Georgian', 'Tennis']
const METALS = ['ALL', 'Yellow Gold', 'White Gold', 'Rose Gold', 'Platinum']
const GEMSTONES = ['ALL', 'White Lab Diamond', 'Emerald', 'Sapphire', 'Ruby']
const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $1,500', min: 0, max: 1500 },
  { label: '$1,500 – $2,500', min: 1500, max: 2500 },
  { label: '$2,500 – $5,000', min: 2500, max: 5000 },
  { label: 'Above $5,000', min: 5000, max: Infinity },
]

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { addToCart } = useCart()

  // Derive category and collection directly from URL parameters
  const category = (searchParams.get('cat') || 'ALL').toUpperCase()
  const collection = searchParams.get('col') || 'ALL'

  const [metal, setMetal] = useState('ALL')
  const [gemstone, setGemstone] = useState('ALL')
  const [priceIdx, setPriceIdx] = useState(0)
  const [sortBy, setSortBy] = useState('featured')
  const [wishlist, setWishlist] = useState({})
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [lightboxData, setLightboxData] = useState(null)

  // Sync category changes to URL
  const updateCategory = (newCat) => {
    const newParams = new URLSearchParams(searchParams)
    if (newCat === 'ALL') {
      newParams.delete('cat')
    } else {
      newParams.set('cat', newCat)
    }
    setSearchParams(newParams)
  }

  // Sync collection changes to URL
  const updateCollection = (newCol) => {
    const newParams = new URLSearchParams(searchParams)
    if (newCol === 'ALL') {
      newParams.delete('col')
    } else {
      newParams.set('col', newCol)
    }
    setSearchParams(newParams)
  }

  // Clear all filters
  const clearFilters = () => {
    setMetal('ALL')
    setGemstone('ALL')
    setPriceIdx(0)
    setSearchParams({})
  }

  const hasActiveFilters =
    category !== 'ALL' ||
    collection !== 'ALL' ||
    metal !== 'ALL' ||
    gemstone !== 'ALL' ||
    priceIdx !== 0

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS

    // Category filter
    if (category !== 'ALL') {
      result = result.filter((p) => p.category === category)
    }

    // Collection filter
    if (collection !== 'ALL') {
      result = result.filter((p) => p.collection?.toLowerCase() === collection.toLowerCase())
    }

    // Metal filter
    if (metal !== 'ALL') {
      result = result.filter(
        (p) =>
          p.metal?.toLowerCase().includes(metal.toLowerCase()) ||
          p.availableMetals?.some((m) => m.toLowerCase().includes(metal.toLowerCase()))
      )
    }

    // Gemstone filter
    if (gemstone !== 'ALL') {
      result = result.filter(
        (p) =>
          p.gemstone?.toLowerCase().includes(gemstone.toLowerCase()) ||
          p.availableGemstones?.some((g) => g.toLowerCase().includes(gemstone.toLowerCase()))
      )
    }

    // Price range
    const selectedRange = PRICE_RANGES[priceIdx]
    result = result.filter((p) => p.price >= selectedRange.min && p.price <= selectedRange.max)

    // Sorting
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price)
    } else if (sortBy === 'bestseller') {
      result = [...result].sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0))
    }

    return result
  }, [category, collection, metal, gemstone, priceIdx, sortBy])

  const toggleWishlist = (id, e) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleQuickAdd = (product, e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      priceDisplay: formatNZD(product.price),
      image: product.image,
      details: `${product.metal} • ${product.gemstone}`,
      quantity: 1,
    })
  }

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-white text-neutral-900 min-h-screen">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Header Title */}
        <div className="border-b border-neutral-200 pb-8 mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
            The Permanent Archive
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl sm:text-5xl font-normal tracking-tight text-neutral-900">
                Shop Fine Jewellery
              </h1>
              <p className="mt-2 text-sm text-neutral-600 font-light">
                Architectural solitaires, hand-rubbed bezels, and tennis ribbons cast in 100% recycled solid gold.
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden rounded border border-neutral-300 px-4 py-2 font-mono text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="size-2 rounded-full bg-neutral-900" />
                )}
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-neutral-500 uppercase tracking-wider hidden sm:inline">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded border border-neutral-300 bg-white px-3 py-2 text-xs uppercase font-mono tracking-wider focus:border-neutral-900 focus:outline-none"
                >
                  <option value="featured">Featured Archive</option>
                  <option value="bestseller">Best Selling</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-neutral-100 font-mono text-xs uppercase tracking-wider">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => updateCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                category === cat
                  ? 'bg-neutral-900 text-white font-medium'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Body: Desktop Sidebar Filters + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* ================= DESKTOP SIDEBAR FILTERS ================= */}
          <aside className="hidden lg:block space-y-8 font-mono text-xs pr-4 border-r border-neutral-100">
            {/* Active Filters / Reset */}
            {hasActiveFilters && (
              <div className="bg-[#FAF9F6] border border-neutral-200 rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold uppercase tracking-wider text-neutral-900">
                    Active Filters
                  </span>
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="underline text-[11px] text-neutral-500 hover:text-neutral-900"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {category !== 'ALL' && (
                    <span className="bg-white border border-neutral-300 rounded px-2 py-0.5 text-[10px]">
                      {category}
                    </span>
                  )}
                  {collection !== 'ALL' && (
                    <span className="bg-white border border-neutral-300 rounded px-2 py-0.5 text-[10px]">
                      {collection}
                    </span>
                  )}
                  {metal !== 'ALL' && (
                    <span className="bg-white border border-neutral-300 rounded px-2 py-0.5 text-[10px]">
                      {metal}
                    </span>
                  )}
                  {gemstone !== 'ALL' && (
                    <span className="bg-white border border-neutral-300 rounded px-2 py-0.5 text-[10px]">
                      {gemstone}
                    </span>
                  )}
                  {priceIdx !== 0 && (
                    <span className="bg-white border border-neutral-300 rounded px-2 py-0.5 text-[10px]">
                      {PRICE_RANGES[priceIdx].label}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Collection Filter */}
            <div>
              <h3 className="uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                Collection
              </h3>
              <div className="space-y-1.5 text-neutral-700">
                {COLLECTIONS.map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => updateCollection(col)}
                    className={`block w-full text-left py-1 hover:text-neutral-900 ${
                      collection.toLowerCase() === col.toLowerCase() ? 'font-bold text-neutral-900 underline' : ''
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Metal Filter */}
            <div>
              <h3 className="uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                Precious Metal
              </h3>
              <div className="space-y-1.5 text-neutral-700">
                {METALS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMetal(m)}
                    className={`block w-full text-left py-1 hover:text-neutral-900 ${
                      metal === m ? 'font-bold text-neutral-900 underline' : ''
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Gemstone Filter */}
            <div>
              <h3 className="uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                Gemstone
              </h3>
              <div className="space-y-1.5 text-neutral-700">
                {GEMSTONES.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGemstone(g)}
                    className={`block w-full text-left py-1 hover:text-neutral-900 ${
                      gemstone === g ? 'font-bold text-neutral-900 underline' : ''
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="uppercase tracking-widest text-neutral-500 font-semibold mb-3">
                Price (NZD)
              </h3>
              <div className="space-y-1.5 text-neutral-700">
                {PRICE_RANGES.map((rng, idx) => (
                  <button
                    key={rng.label}
                    type="button"
                    onClick={() => setPriceIdx(idx)}
                    className={`block w-full text-left py-1 hover:text-neutral-900 ${
                      priceIdx === idx ? 'font-bold text-neutral-900 underline' : ''
                    }`}
                  >
                    {rng.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ================= PRODUCT GRID ================= */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6 font-mono text-xs text-neutral-500">
              <span>Showing {filteredProducts.length} pieces</span>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="underline hover:text-neutral-900 lg:hidden"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-[#FAF9F6] border border-neutral-200 rounded-lg">
                <p className="font-mono text-sm uppercase tracking-widest text-neutral-500 mb-2">
                  No matching jewellery found
                </p>
                <p className="text-xs text-neutral-500 mb-6 max-w-sm mx-auto">
                  Try adjusting or clearing your filters to explore our complete handcrafted archive.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded bg-neutral-900 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white hover:bg-neutral-800"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="group relative flex flex-col rounded-lg border border-neutral-200/80 bg-white p-4 transition-all duration-300 hover:border-neutral-900 hover:shadow-xl"
                  >
                    {/* Image Box */}
                    <Link
                      to={`/products/${prod.slug}`}
                      className="relative aspect-square w-full overflow-hidden rounded bg-[#FAF9F6] p-4 mb-4 block"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="size-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                      />
                      <img
                        src={prod.hoverImage || prod.image}
                        alt={`${prod.name} alternate view`}
                        className="absolute inset-0 size-full object-contain p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />

                      {/* Best seller badge */}
                      {prod.isBestSeller && (
                        <span className="absolute top-2 left-2 bg-neutral-900 text-white font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                          Best Seller
                        </span>
                      )}

                      {/* Wishlist Button */}
                      <button
                        type="button"
                        onClick={(e) => toggleWishlist(prod.id, e)}
                        aria-label="Save to wishlist"
                        className="absolute top-2 right-2 rounded-full bg-white/90 p-2 text-neutral-600 shadow-xs hover:text-rose-600 transition-colors"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill={wishlist[prod.id] ? '#e11d48' : 'none'}
                          stroke={wishlist[prod.id] ? '#e11d48' : 'currentColor'}
                          strokeWidth="1.5"
                          className="size-4"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>

                      {/* Quick View Button on Hover */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setQuickViewProduct(prod)
                        }}
                        className="absolute bottom-2 inset-x-2 rounded bg-white/95 py-2 font-mono text-[10px] uppercase tracking-widest text-neutral-900 shadow opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neutral-900 hover:text-white"
                      >
                        Quick View
                      </button>
                    </Link>

                    {/* Meta info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                            {prod.category}
                          </span>
                          {prod.collection && (
                            <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                              {prod.collection}
                            </span>
                          )}
                        </div>

                        <Link
                          to={`/products/${prod.slug}`}
                          className="text-base font-normal text-neutral-900 group-hover:underline block leading-snug"
                        >
                          {prod.name}
                        </Link>
                        <p className="font-mono text-xs text-neutral-500 mt-1">
                          {prod.metal}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-neutral-900">
                          {prod.priceDisplay}
                        </span>

                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(prod, e)}
                          className="font-mono text-[11px] uppercase tracking-wider text-neutral-900 underline hover:opacity-70"
                        >
                          + Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= QUICK VIEW MODAL ================= */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="relative bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-900 font-mono text-sm"
            >
              ✕ Close
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div
                onClick={() => {
                  setLightboxData({
                    images: quickViewProduct.gallery && quickViewProduct.gallery.length > 0
                      ? quickViewProduct.gallery
                      : [quickViewProduct.image, quickViewProduct.hoverImage || quickViewProduct.image],
                    index: 0,
                    name: quickViewProduct.name,
                  })
                }}
                className="aspect-square bg-[#FAF9F6] border border-neutral-200 rounded p-6 cursor-zoom-in relative group"
                role="button"
                tabIndex={0}
                aria-label="Click for fullscreen view"
              >
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="size-full object-contain"
                />
                <span className="absolute bottom-2 right-2 text-[10px] font-mono uppercase bg-white/95 px-2 py-0.5 rounded shadow-xs text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                  Click for Fullscreen
                </span>
              </div>

              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  {quickViewProduct.category} • {quickViewProduct.collection}
                </span>
                <h2 className="text-2xl font-normal text-neutral-900">
                  {quickViewProduct.name}
                </h2>
                <div className="font-mono text-lg font-semibold text-neutral-900">
                  {quickViewProduct.priceDisplay}
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    to={`/products/${quickViewProduct.slug}`}
                    onClick={() => setQuickViewProduct(null)}
                    className="w-full text-center rounded bg-neutral-900 py-3 font-mono text-xs uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors"
                  >
                    Customize & View Details →
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => {
                      handleQuickAdd(quickViewProduct, e)
                      setQuickViewProduct(null)
                    }}
                    className="w-full text-center rounded border border-neutral-300 py-2.5 font-mono text-xs uppercase tracking-widest text-neutral-900 hover:border-neutral-900"
                  >
                    Quick Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs lg:hidden">
          <div className="relative w-full max-w-sm bg-white h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center border-b border-neutral-200 pb-4 mb-6">
                <h2 className="font-mono text-xs uppercase tracking-widest font-semibold">
                  Filter Catalog
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="text-neutral-500 font-mono text-sm"
                >
                  ✕
                </button>
              </div>

              {/* Collections */}
              <div className="mb-6 font-mono text-xs">
                <h3 className="font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Collection
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {COLLECTIONS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => updateCollection(c)}
                      className={`px-3 py-1.5 rounded border text-[11px] ${
                        collection.toLowerCase() === c.toLowerCase()
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 text-neutral-700'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metal */}
              <div className="mb-6 font-mono text-xs">
                <h3 className="font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Metal
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {METALS.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMetal(m)}
                      className={`px-3 py-1.5 rounded border text-[11px] ${
                        metal === m
                          ? 'border-neutral-900 bg-neutral-900 text-white'
                          : 'border-neutral-200 text-neutral-700'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="mb-6 font-mono text-xs">
                <h3 className="font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                  Price
                </h3>
                <div className="flex flex-col gap-1.5">
                  {PRICE_RANGES.map((rng, idx) => (
                    <button
                      key={rng.label}
                      type="button"
                      onClick={() => setPriceIdx(idx)}
                      className={`text-left py-1 text-[11px] ${
                        priceIdx === idx ? 'font-bold text-neutral-900 underline' : 'text-neutral-600'
                      }`}
                    >
                      {rng.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 flex gap-3 font-mono text-xs uppercase">
              <button
                type="button"
                onClick={clearFilters}
                className="flex-1 py-3 border border-neutral-300 rounded text-center"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 bg-neutral-900 text-white rounded text-center font-semibold"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Photo Lightbox Modal for Quick View */}
      {lightboxData && (
        <ProductImageLightbox
          isOpen={Boolean(lightboxData)}
          onClose={() => setLightboxData(null)}
          images={lightboxData.images}
          currentIndex={lightboxData.index}
          onIndexChange={(idx) => setLightboxData((prev) => (prev ? { ...prev, index: idx } : null))}
          productName={lightboxData.name}
        />
      )}
    </div>
  )
}
