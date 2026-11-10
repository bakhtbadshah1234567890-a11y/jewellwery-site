import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { COLLECTIONS, getProductsByCollection, PRODUCTS } from '../data/products'

export default function CollectionDetailPage() {
  const { slug } = useParams()

  const collection = useMemo(() => {
    return (
      COLLECTIONS.find((c) => c.slug.toLowerCase() === (slug || '').toLowerCase()) ||
      COLLECTIONS[0]
    )
  }, [slug])

  const products = useMemo(() => {
    const list = getProductsByCollection(collection.slug)
    // fallback if specific collection has few items, show related catalog
    return list.length > 0 ? list : PRODUCTS.slice(0, 6)
  }, [collection.slug])

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-white text-neutral-900 min-h-screen">
      {/* Editorial Collection Hero Banner */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 mb-14">
        <div className="relative overflow-hidden rounded-xl bg-neutral-900 text-white min-h-[340px] sm:min-h-[440px] flex items-end p-8 sm:p-14">
          <img
            src={collection.heroImage}
            alt={collection.name}
            className="absolute inset-0 size-full object-cover opacity-60 mix-blend-luminosity scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          <div className="relative z-10 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-[#D6C2A1] mb-2">
              Signature Fine Jewellery Collection
            </p>
            <h1 className="text-4xl sm:text-6xl font-normal tracking-tight leading-tight">
              {collection.name}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-neutral-200 font-light leading-relaxed">
              {collection.description}
            </p>
          </div>
        </div>
      </div>

      {/* Collection Grid */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end border-b border-neutral-200 pb-5 mb-10 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-normal text-neutral-900">
              Curated Pieces ({products.length})
            </h2>
            <p className="text-xs text-neutral-500 font-mono mt-1">
              Solid recycled gold & platinum • Exceptional lab diamonds
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs uppercase">
            <Link
              to="/shop"
              className="text-neutral-500 hover:text-neutral-900 underline"
            >
              Browse All Categories
            </Link>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((prod) => (
            <Link
              key={prod.id}
              to={`/products/${prod.slug}`}
              className="group flex flex-col rounded-md border border-neutral-200/70 p-4 transition-all duration-300 hover:border-neutral-900 hover:shadow-lg bg-white"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded bg-[#FAF9F6] p-4 mb-4">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="size-full object-contain transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src={prod.hoverImage || prod.image}
                  alt={`${prod.name} on angle`}
                  className="absolute inset-0 size-full object-contain p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                {prod.isBestSeller && (
                  <span className="absolute top-2 left-2 bg-neutral-900 text-white font-mono text-[9px] uppercase tracking-wider px-2 py-0.5 rounded">
                    Best Seller
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                    {prod.category}
                  </span>
                  <h3 className="text-base font-normal text-neutral-900 group-hover:underline mt-0.5">
                    {prod.name}
                  </h3>
                  <p className="font-mono text-xs text-neutral-500 mt-1">
                    {prod.metal}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-neutral-900">
                    {prod.priceDisplay}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-900 underline group-hover:opacity-75">
                    Configure →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
