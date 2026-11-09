import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const catalog = [
  {
    id: 'ring-1',
    name: 'Raised Bezel Pinky Ring',
    category: 'RINGS',
    metal: '9K Yellow Gold',
    price: 1751,
    image: '/pics/gen-ring.png',
    hoverImage: '/pics/prod-ring1-hover.png',
  },
  {
    id: 'ring-2',
    name: 'Georgian Pinky Ring',
    category: 'RINGS',
    metal: '9K Yellow Gold',
    price: 2050,
    image: '/pics/prod-ring2.png',
    hoverImage: '/pics/prod-ring2-hover.png',
  },
  {
    id: 'ring-3',
    name: 'Pave Eternity Ring',
    category: 'RINGS',
    metal: '9K Yellow Gold',
    price: 1787,
    image: '/pics/prod-ring3.png',
    hoverImage: '/pics/prod-ring3-hover.png',
  },
  {
    id: 'ring-4',
    name: 'Signature 5-Stone Ring',
    category: 'RINGS',
    metal: '9K Yellow Gold',
    price: 2672,
    image: '/pics/prod-ring4.png',
    hoverImage: '/pics/prod-ring4-hover.jpg',
  },
  {
    id: 'neck-1',
    name: 'Prong Solitaire Necklace',
    category: 'NECKLACES',
    metal: '14K Yellow Gold',
    price: 2450,
    image: '/pics/gen-necklace.png',
    hoverImage: '/pics/prod-neck2-hover.jpg',
  },
  {
    id: 'neck-2',
    name: 'Prong Tennis Necklace',
    category: 'NECKLACES',
    metal: '14K Yellow Gold',
    price: 6890,
    image: '/pics/prod-neck2.png',
    hoverImage: '/pics/prod-neck2-hover.jpg',
  },
  {
    id: 'ear-1',
    name: 'Basket Stud Earrings',
    category: 'EARRINGS',
    metal: '9K Yellow Gold',
    price: 980,
    image: '/pics/prod-ear1.png',
    hoverImage: '/pics/prod-ear1-hover.png',
  },
  {
    id: 'ear-2',
    name: 'Bezel Stud Earrings',
    category: 'EARRINGS',
    metal: '9K Yellow Gold',
    price: 1290,
    image: '/pics/gen-earrings.png',
    hoverImage: '/pics/prod-ear1-hover.png',
  },
  {
    id: 'brac-1',
    name: 'Bezel Tennis Bracelet',
    category: 'BRACELETS',
    metal: '9K Yellow Gold',
    price: 3820,
    image: '/pics/gen-bracelet.png',
    hoverImage: '/pics/prod-brac1-hover.jpg',
  },
  {
    id: 'pendant-1',
    name: 'Round Cut Bezel Pendant',
    category: 'PENDANTS',
    metal: '14K Yellow Gold',
    price: 1890,
    image: '/pics/pendant-round.png',
    hoverImage: '/pics/pendant-model.png',
  },
  {
    id: 'pendant-2',
    name: 'Pear Cut Bezel Pendant',
    category: 'PENDANTS',
    metal: '14K Rose Gold',
    price: 1950,
    image: '/pics/pendant-pear.png',
    hoverImage: '/pics/pendant-model.png',
  },
  {
    id: 'pendant-3',
    name: 'Emerald Cut Bezel Pendant',
    category: 'PENDANTS',
    metal: '14K Yellow Gold',
    price: 2150,
    image: '/pics/pendant-emerald.png',
    hoverImage: '/pics/pendant-model.png',
  },
  {
    id: 'sizing-kit-shop',
    name: 'Ring + Bracelet Sizing Kit',
    category: 'RINGS',
    metal: 'Complimentary Credit Included',
    price: 15,
    image: '/pics/sizing-kit-1.png',
    hoverImage: '/pics/sizing-kit-2.png',
  },
]

const categoryFilters = ['ALL', 'RINGS', 'NECKLACES', 'EARRINGS', 'BRACELETS', 'PENDANTS']

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCat = searchParams.get('cat') || 'ALL'
  const [selectedCategory, setSelectedCategory] = useState(initialCat)
  const [sortBy, setSortBy] = useState('featured')
  const { addToCart } = useCart()

  const filteredProducts = useMemo(() => {
    let result = catalog
    if (selectedCategory !== 'ALL') {
      result = result.filter((p) => p.category === selectedCategory)
    }
    if (sortBy === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price)
    }
    return result
  }, [selectedCategory, sortBy])

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat)
    if (cat === 'ALL') {
      searchParams.delete('cat')
    } else {
      searchParams.set('cat', cat)
    }
    setSearchParams(searchParams)
  }

  return (
    <div className="pt-28 pb-20 px-5 sm:px-10 lg:px-16 bg-white min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-8 mb-8">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">
            Collection Archive
          </p>
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-900">
            Shop All
          </h1>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed">
            Handcrafted fine jewellery made with 100% recycled precious metals and ethical lab-grown diamonds. Authored by you with total transparency.
          </p>
        </div>

        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-4 border-b border-neutral-100">
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-1.5 font-mono text-xs uppercase tracking-wider rounded-full transition-all ${
                  selectedCategory === cat
                    ? 'bg-neutral-900 text-white'
                    : 'border border-neutral-200 bg-white text-neutral-600 hover:border-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase text-neutral-500">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="font-mono text-xs uppercase tracking-wider border border-neutral-200 bg-white px-3 py-1.5 rounded text-neutral-800 focus:outline-none focus:border-neutral-900"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col justify-between border border-neutral-200/80 rounded-md bg-[#faf9f8] p-4 transition-all hover:border-neutral-400 hover:shadow-xs"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded bg-[#f1eeea] mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="size-full object-contain p-4 transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src={product.hoverImage}
                  alt={`${product.name} on model`}
                  className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h2 className="text-base font-normal tracking-tight text-neutral-900 leading-snug">
                    {product.name}
                  </h2>
                  <p className="mt-1 font-mono text-xs text-neutral-500 uppercase">
                    {product.metal}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-200 flex items-center justify-between">
                  <span className="font-mono text-sm font-medium text-neutral-900">
                    ${product.price.toLocaleString()} NZD
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        details: product.metal,
                      })
                    }
                    className="font-mono text-xs uppercase tracking-wider bg-neutral-900 text-white px-3 py-1.5 rounded hover:opacity-85 transition-opacity"
                  >
                    + Add to Bag
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
