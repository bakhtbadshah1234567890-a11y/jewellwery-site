import { useState } from 'react'

const products = [
  {
    category: 'RINGS',
    name: 'Raised Bezel Pinky Ring',
    metal: 'Raised Bezel Pinky Ring - 9K Yellow Gold',
    price: 'FROM $1,751',
    image: '/pics/gen-ring.png',
    hoverImage: '/pics/prod-ring1-hover.png',
    href: '#shop',
  },
  {
    category: 'RINGS',
    name: 'Georgian Pinky Ring',
    metal: 'Georgian Pinky Ring - 9K Yellow Gold',
    price: 'FROM $2,050',
    image: '/pics/prod-ring2.png',
    hoverImage: '/pics/prod-ring2-hover.png',
    href: '#shop',
  },
  {
    category: 'RINGS',
    name: 'Pave Eternity Ring',
    metal: 'Pave Eternity Ring - 9K Yellow Gold',
    price: 'FROM $1,787',
    image: '/pics/prod-ring3.png',
    hoverImage: '/pics/prod-ring3-hover.png',
    href: '#shop',
  },
  {
    category: 'RINGS',
    name: 'Signature 5-Stone Ring',
    metal: 'Signature 5-Stone Ring - 9K Yellow Gold',
    price: 'FROM $2,672',
    image: '/pics/prod-ring4.png',
    hoverImage: '/pics/prod-ring4-hover.jpg',
    href: '#shop',
  },
  {
    category: 'NECKLACES',
    name: 'Prong Solitaire Necklace',
    metal: 'Prong Solitaire Necklace - 14K Yellow Gold',
    price: 'FROM $2,450',
    image: '/pics/gen-necklace.png',
    hoverImage: '/pics/prod-neck2-hover.jpg',
    href: '#shop',
  },
  {
    category: 'NECKLACES',
    name: 'Prong Tennis Necklace',
    metal: 'Prong Tennis Necklace - 14K Yellow Gold',
    price: 'FROM $6,890',
    image: '/pics/prod-neck2.png',
    hoverImage: '/pics/prod-neck2-hover.jpg',
    href: '#shop',
  },
  {
    category: 'EARRINGS',
    name: 'Basket Stud Earrings',
    metal: 'Basket Stud Earrings - 9K Yellow Gold',
    price: 'FROM $980',
    image: '/pics/prod-ear1.png',
    hoverImage: '/pics/prod-ear1-hover.png',
    href: '#shop',
  },
  {
    category: 'BRACELETS',
    name: 'Bezel Tennis Bracelet',
    metal: 'Bezel Tennis Bracelet - 9K Yellow Gold',
    price: 'FROM $3,820',
    image: '/pics/gen-bracelet.png',
    hoverImage: '/pics/prod-brac1-hover.jpg',
    href: '#shop',
  },
]

const categories = ['ALL', 'RINGS', 'NECKLACES', 'EARRINGS', 'BRACELETS']

export default function LovedConfigurations() {
  const [activeCategory, setActiveCategory] = useState('ALL')

  const filtered = activeCategory === 'ALL'
    ? products
    : products.filter(p => p.category === activeCategory)

  return (
    <section className="border-b-2 border-dotted border-black bg-white py-16 px-5 sm:px-10 lg:px-16" aria-labelledby="loved-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">Curated Favorites</p>
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
            <article key={product.name} className="group flex flex-col justify-between border border-neutral-200/80 rounded-md bg-[#faf9f8] p-4 transition-all hover:border-neutral-400">
              <a href={product.href} className="relative block aspect-square w-full overflow-hidden rounded bg-[#f1eeea] mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="size-full object-contain p-4 transition-opacity duration-300 group-hover:opacity-0"
                  loading="lazy"
                />
                <img
                  src={product.hoverImage}
                  alt={`${product.name} lifestyle`}
                  className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  loading="lazy"
                />
              </a>

              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-base font-normal tracking-tight text-neutral-900 group-hover:underline">
                    {product.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-neutral-500 uppercase">
                    {product.metal}
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between">
                  <span className="font-mono text-sm font-medium text-neutral-900">
                    {product.price}
                  </span>
                  <a
                    href={product.href}
                    className="font-mono text-xs uppercase tracking-wider text-neutral-900 border-b border-dotted border-current hover:opacity-70"
                  >
                    Shop now →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
