import { useState, useMemo } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductBySlug, PRODUCTS } from '../data/products'
import { calculateCustomPrice, formatNZD } from '../utils/pricing'
import { useCart } from '../context/useCart'

const METAL_SWATCHES = {
  '9K Yellow Gold': '#D8C39A',
  '14K Yellow Gold': '#E6CA65',
  '18K Yellow Gold': '#FFD700',
  '14K White Gold': '#E5E4E2',
  '18K White Gold': '#F0F0F0',
  '14K Rose Gold': '#ECC5B9',
  '18K Rose Gold': '#E8B5A2',
  'Platinum': '#E5E4E2',
}

function ProductDetailContent({ slug }) {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const product = useMemo(() => {
    return getProductBySlug(slug) || PRODUCTS[0]
  }, [slug])

  // Selected custom options initialized directly per slug mount
  const [selectedImage, setSelectedImage] = useState(product.gallery?.[0] || product.image)
  const [selectedMetal, setSelectedMetal] = useState(product.metal || product.availableMetals?.[0] || '14K Yellow Gold')
  const [selectedGemstone, setSelectedGemstone] = useState(product.gemstone || product.availableGemstones?.[0] || 'White Lab Diamond')
  const [selectedShape, setSelectedShape] = useState(product.shapes?.[0] || 'Round')
  const [selectedCarat, setSelectedCarat] = useState(product.carats?.[0] || '1.00ct')
  const [selectedSize, setSelectedSize] = useState(product.ringSizes?.[0] || '')
  const [engraving, setEngraving] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [addedBanner, setAddedBanner] = useState(false)

  // Dynamic calculated price
  const currentPrice = useMemo(() => {
    return calculateCustomPrice({
      basePrice: product.price,
      metal: selectedMetal,
      gemstone: selectedGemstone,
      carat: selectedCarat,
      engraving,
    })
  }, [product.price, selectedMetal, selectedGemstone, selectedCarat, engraving])

  const handleAddToCart = () => {
    const customItem = {
      id: `${product.id}-${selectedMetal}-${selectedGemstone}-${selectedCarat}-${selectedSize || 'nosize'}`,
      productId: product.id,
      name: product.name,
      price: currentPrice,
      priceDisplay: formatNZD(currentPrice),
      image: selectedImage || product.image,
      quantity,
      metal: selectedMetal,
      gemstone: selectedGemstone,
      shape: selectedShape,
      carat: selectedCarat,
      size: selectedSize,
      engraving: engraving.trim() || undefined,
      details: `${selectedMetal} • ${selectedCarat} ${selectedGemstone} (${selectedShape})${selectedSize ? ` • Size: ${selectedSize}` : ''}${engraving ? ` • Engraving: "${engraving}"` : ''}`,
    }

    addToCart(customItem)
    setAddedBanner(true)
    setTimeout(() => setAddedBanner(false), 3000)
  }

  // Related products
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
  }, [product])

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-white text-neutral-900 min-h-screen">
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 mb-6">
        <ol className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
          <li>
            <Link to="/" className="hover:text-neutral-900">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link to={`/shop?cat=${product.category}`} className="hover:text-neutral-900">
              {product.category}
            </Link>
          </li>
          <li>/</li>
          <li className="text-neutral-900 truncate max-w-[200px] sm:max-w-none">{product.name}</li>
        </ol>
      </nav>

      {/* Main PDP Grid */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* ================= LEFT SIDE: IMAGE GALLERY ================= */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnail list */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto sm:w-20 shrink-0 pb-2 sm:pb-0">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square w-16 sm:w-20 rounded border overflow-hidden p-1.5 transition-all ${
                      selectedImage === img
                        ? 'border-neutral-900 ring-1 ring-neutral-900'
                        : 'border-neutral-200 hover:border-neutral-400 bg-neutral-50'
                    }`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} className="size-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Primary interactive preview */}
            <div className="relative flex-1 aspect-square rounded-lg bg-[#FAF9F6] border border-neutral-200 overflow-hidden flex items-center justify-center p-6 group">
              <img
                src={selectedImage}
                alt={product.name}
                className="max-h-full max-w-full object-contain transition-transform duration-700 group-hover:scale-110"
              />
              <span className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-wider text-neutral-400 bg-white/80 px-2 py-0.5 rounded backdrop-blur-xs">
                Hover to inspect
              </span>
            </div>
          </div>

          {/* ================= RIGHT SIDE: CUSTOMIZATION & BUY BOX ================= */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Collection tag & Title */}
            {product.collection && (
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1.5">
                {product.collection} Collection
              </span>
            )}
            <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900 leading-tight">
              {product.name}
            </h1>

            {/* Price display */}
            <div className="mt-4 flex items-baseline gap-3 pb-6 border-b border-neutral-200">
              <span className="text-2xl sm:text-3xl font-light font-mono text-neutral-900">
                {formatNZD(currentPrice)}
              </span>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                NZD • Tax & Duties Included
              </span>
            </div>

            {/* Notification alert on Add to Cart */}
            {addedBanner && (
              <div className="mt-4 rounded bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 font-mono uppercase tracking-wider flex items-center justify-between">
                <span>✓ Added to your shopping bag</span>
                <Link to="/shop" className="underline">
                  Continue
                </Link>
              </div>
            )}

            {/* Customization Selectors */}
            <div className="mt-6 space-y-6">
              {/* 1. Metal Selector */}
              {product.availableMetals && product.availableMetals.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2 font-mono text-xs">
                    <span className="uppercase tracking-wider text-neutral-500">Precious Metal:</span>
                    <span className="font-semibold text-neutral-900">{selectedMetal}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {product.availableMetals.map((metal) => (
                      <button
                        key={metal}
                        type="button"
                        onClick={() => setSelectedMetal(metal)}
                        className={`px-3 py-2 text-left rounded border font-mono text-[11px] transition-all flex items-center gap-2 ${
                          selectedMetal === metal
                            ? 'border-neutral-900 bg-neutral-900 text-white'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        <span
                          className="size-3 rounded-full border border-neutral-300 shrink-0"
                          style={{ backgroundColor: METAL_SWATCHES[metal] || '#D8C39A' }}
                        />
                        <span className="truncate">{metal.replace('Yellow Gold', 'Gold')}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Gemstone Selector */}
              {product.availableGemstones && product.availableGemstones.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2 font-mono text-xs">
                    <span className="uppercase tracking-wider text-neutral-500">Gemstone:</span>
                    <span className="font-semibold text-neutral-900">{selectedGemstone}</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {product.availableGemstones.map((gem) => (
                      <button
                        key={gem}
                        type="button"
                        onClick={() => setSelectedGemstone(gem)}
                        className={`px-3 py-2 text-left rounded border font-mono text-[11px] transition-all flex items-center gap-2 ${
                          selectedGemstone === gem
                            ? 'border-neutral-900 bg-neutral-900 text-white'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        <span
                          className="size-3 rounded-full border border-neutral-300 shrink-0"
                          style={{
                            background:
                              gem === 'White Lab Diamond'
                                ? 'linear-gradient(135deg, #FFFFFF 0%, #E0E7FF 100%)'
                                : gem === 'Emerald'
                                ? '#0F52BA'
                                : gem === 'Ruby'
                                ? '#9B111E'
                                : '#1E3A8A',
                          }}
                        />
                        <span className="truncate">{gem}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Stone Shape Selector */}
              {product.shapes && product.shapes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2 font-mono text-xs">
                    <span className="uppercase tracking-wider text-neutral-500">Stone Cut / Shape:</span>
                    <span className="font-semibold text-neutral-900">{selectedShape}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.shapes.map((shp) => (
                      <button
                        key={shp}
                        type="button"
                        onClick={() => setSelectedShape(shp)}
                        className={`px-3.5 py-1.5 rounded border font-mono text-xs uppercase tracking-wider transition-all ${
                          selectedShape === shp
                            ? 'border-neutral-900 bg-neutral-900 text-white'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        {shp}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Carat Weight Selector */}
              {product.carats && product.carats.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2 font-mono text-xs">
                    <span className="uppercase tracking-wider text-neutral-500">Carat Weight:</span>
                    <span className="font-semibold text-neutral-900">{selectedCarat}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.carats.map((crt) => (
                      <button
                        key={crt}
                        type="button"
                        onClick={() => setSelectedCarat(crt)}
                        className={`px-3 py-1.5 rounded border font-mono text-xs transition-all ${
                          selectedCarat === crt
                            ? 'border-neutral-900 bg-neutral-900 text-white font-medium'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400'
                        }`}
                      >
                        {crt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Ring Size (if Rings category) */}
              {product.category === 'RINGS' && product.ringSizes && product.ringSizes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2 font-mono text-xs">
                    <span className="uppercase tracking-wider text-neutral-500">Finger Size:</span>
                    <Link
                      to="/sizing-kits"
                      className="underline text-neutral-600 hover:text-neutral-900"
                    >
                      Need a Sizing Kit? ($15 Credit)
                    </Link>
                  </div>
                  <select
                    value={selectedSize}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-full rounded border border-neutral-300 bg-white px-3 py-2.5 font-mono text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none"
                  >
                    {product.ringSizes.map((sz) => (
                      <option key={sz} value={sz}>
                        {sz}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* 6. Optional Custom Engraving */}
              <div>
                <div className="flex justify-between items-center mb-2 font-mono text-xs">
                  <span className="uppercase tracking-wider text-neutral-500">
                    Complimentary Engraving (Optional):
                  </span>
                  <span className="text-[10px] text-neutral-400">Max 16 chars</span>
                </div>
                <input
                  type="text"
                  maxLength={16}
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  placeholder="e.g. FOREVER • 12.04"
                  className="w-full rounded border border-neutral-300 bg-white px-3 py-2 font-mono text-xs text-neutral-900 uppercase tracking-widest placeholder:normal-case placeholder:text-neutral-400 focus:border-neutral-900 focus:outline-none"
                />
              </div>

              {/* Quantity & CTA */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <div className="flex items-center border border-neutral-300 rounded font-mono text-xs w-28 shrink-0 justify-between px-2 py-2.5">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2 text-neutral-500 hover:text-neutral-900"
                  >
                    -
                  </button>
                  <span className="font-semibold">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2 text-neutral-500 hover:text-neutral-900"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 rounded bg-[#171717] py-3.5 px-6 font-mono text-xs uppercase tracking-widest text-[#EDE8E1] hover:bg-neutral-800 transition-colors shadow-md text-center font-medium"
                >
                  Add To Shopping Bag • {formatNZD(currentPrice * quantity)}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-neutral-200 grid grid-cols-2 gap-4 text-[11px] font-mono uppercase tracking-wider text-neutral-600">
                <div className="flex items-center gap-2">
                  <span className="text-neutral-900">✦</span>
                  <span>Insured Express Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-900">✦</span>
                  <span>Lifetime Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-900">✦</span>
                  <span>Complimentary Resizing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-900">✦</span>
                  <span>Conflict-Free Lab Grown</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ACCORDION & DEEP DETAILS ================= */}
        <div className="mt-20 border-t border-neutral-200 pt-12">
          {/* Tabs header */}
          <div className="flex flex-wrap border-b border-neutral-200 gap-6 sm:gap-10 font-mono text-xs uppercase tracking-widest">
            {[
              { id: 'description', label: 'Description & Philosophy' },
              { id: 'specifications', label: 'Specifications' },
              { id: 'craftsmanship', label: 'Artisanal Craftsmanship' },
              { id: 'shipping', label: 'Shipping & Delivery' },
              { id: 'warranty', label: 'Lifetime Warranty' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-neutral-900 font-bold border-b-2 border-neutral-900 -mb-px'
                    : 'text-neutral-400 hover:text-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="py-8 text-neutral-700 leading-relaxed max-w-4xl text-sm sm:text-base">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <p className="text-neutral-500 text-xs sm:text-sm">
                  Every HEIREST creation is designed in our studio and made to endure generations of daily living. We prioritize ergonomically balanced shanks and low-sitting crowns to ensure your fine jewellery is worn, never tucked away in a safe.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <ul className="space-y-2.5 font-mono text-xs sm:text-sm">
                {product.specifications?.map((spec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-neutral-400">—</span>
                    <span>{spec}</span>
                  </li>
                ))}
                {product.dimensions && (
                  <li className="flex items-start gap-3">
                    <span className="text-neutral-400">—</span>
                    <span>{product.dimensions}</span>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <span className="text-neutral-400">—</span>
                  <span>Origin: Hand-finished in our dedicated jewellery ateliers</span>
                </li>
              </ul>
            )}

            {activeTab === 'craftsmanship' && (
              <div className="space-y-4">
                <p>{product.craftsmanship}</p>
                <p className="text-neutral-500 text-xs sm:text-sm">
                  We melt 100% certified recycled precious metals, avoiding environmentally destructive mining. Our master diamond setters set under Leica stereomicroscopes with high-tensile collet burnishing for lifetime stability.
                </p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <p>{product.deliveryInfo}</p>
                <p className="text-neutral-500">
                  Every parcel is shipped in discreet, tamper-evident security packaging with real-time tracking, signature verification, and full transit insurance.
                </p>
                <Link to="/shipping" className="inline-block mt-2 underline text-neutral-900 font-bold">
                  View complete delivery policy →
                </Link>
              </div>
            )}

            {activeTab === 'warranty' && (
              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <p>
                  Every HEIREST piece includes our unconditional Lifetime Manufacturing Guarantee against metallurgical or setting defects.
                </p>
                <p className="text-neutral-500">
                  Includes complimentary annual prong tightening, ultrasonic cleaning, and repolishing at no charge.
                </p>
                <Link to="/warranty" className="inline-block mt-2 underline text-neutral-900 font-bold">
                  Learn more about our warranty →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ================= RELATED PRODUCTS ================= */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-neutral-200 pt-16">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">
                  Complete The Suite
                </p>
                <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900">
                  Related Designs
                </h2>
              </div>
              <Link
                to={`/shop?cat=${product.category}`}
                className="font-mono text-xs uppercase tracking-wider underline hover:opacity-70"
              >
                Shop All {product.category} →
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/products/${rel.slug}`)}
                  className="group cursor-pointer flex flex-col"
                >
                  <div className="aspect-square w-full overflow-hidden rounded bg-[#FAF9F6] border border-neutral-100 p-4 mb-3">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="size-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-mono text-xs uppercase tracking-wider font-medium text-neutral-900 group-hover:underline">
                    {rel.name}
                  </h3>
                  <p className="font-mono text-xs text-neutral-500 mt-1">
                    {rel.priceDisplay}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const { slug } = useParams()
  return <ProductDetailContent key={slug} slug={slug} />
}
