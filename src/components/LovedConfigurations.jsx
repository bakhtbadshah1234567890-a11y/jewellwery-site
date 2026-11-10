import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { useCart } from '../context/useCart'

const categories = ['ALL', 'RINGS', 'NECKLACES', 'EARRINGS', 'BRACELETS']

export default function LovedConfigurations() {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const { addToCart } = useCart()

  // Filter products by category
  const filtered = PRODUCTS.filter((p) => {
    if (activeCategory === 'ALL') return p.isFeatured || p.isBestSeller
    return p.category === activeCategory
  }).slice(0, 8)

  return (
    <section
      className="border-b-2 border-dotted border-black bg-white py-16 px-5 sm:px-10 lg:px-16"
      aria-labelledby="loved-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">
              Curated Favorites
            </p>
            <h2 id="loved-title" className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-900">
              Our most loved configurations
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors border-b ${
                  activeCategory === cat
                    ? 'border-neutral-900 text-neutral-900 font-semibold'
                    : 'border-transparent text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col justify-between border border-neutral-200/80 rounded-md bg-[#faf9f8] p-4 transition-all hover:border-neutral-400 hover:shadow-md"
            >
              <Link
                to={`/products/${product.slug}`}
                className="relative block aspect-square w-full overflow-hidden rounded bg-[#f1eeea] mb-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="size-full object-contain p-4 transition-opacity duration-300 group-hover:opacity-0"
                  loading="lazy"
                />
                <img
                  src={product.hoverImage || product.image}
                  alt={`${product.name} lifestyle`}
                  className="absolute inset-0 size-full object-contain p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  loading="lazy"
                />
              </Link>

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <Link
                    to={`/products/${product.slug}`}
                    className="text-base font-normal tracking-tight text-neutral-900 group-hover:underline block"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-1 font-mono text-xs text-neutral-500 uppercase">
                    {product.metal}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between">
                  <span className="font-mono text-sm font-medium text-neutral-900">
                    {product.priceDisplay}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          priceDisplay: product.priceDisplay,
                          image: product.image,
                          details: `${product.metal} • ${product.gemstone}`,
                          quantity: 1,
                        })
                      }
                      className="font-mono text-[11px] uppercase tracking-wider text-neutral-900 hover:opacity-70 underline"
                    >
                      + Bag
                    </button>
                    <Link
                      to={`/products/${product.slug}`}
                      className="font-mono text-xs uppercase tracking-wider text-neutral-900 border-b border-dotted border-current hover:opacity-70"
                    >
                      Configure →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
