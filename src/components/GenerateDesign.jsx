import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { calculateCustomPrice, formatNZD } from '../utils/pricing'

const JEWELLERY_TYPES = [
  {
    type: 'Ring',
    slug: 'raised-bezel-pinky-ring',
    name: 'Raised Bezel Pinky Ring',
    basePrice: 1751,
    image: '/pics/gen-ring.png',
    settingStyles: ['Raised Bezel', 'Georgian Collet', 'Classic Solitaire'],
    dimensionLabel: 'Ring Size',
    dimensionOptions: ['US 3.5 / UK G', 'US 4 / UK H', 'US 4.5 / UK I', 'US 5 / UK J', 'US 6 / UK L'],
  },
  {
    type: 'Necklace',
    slug: 'prong-solitaire-necklace',
    name: 'Prong Solitaire Necklace',
    basePrice: 2450,
    image: '/pics/gen-necklace.png',
    settingStyles: ['Solitaire Prong', 'Low Bezel Collar', 'Floating Halo'],
    dimensionLabel: 'Chain Length',
    dimensionOptions: ['38cm (Choker)', '40cm (Standard)', '42cm (Princess)', '45cm (Matinee)'],
  },
  {
    type: 'Earrings',
    slug: 'bezel-stud-earrings',
    name: 'Bezel Stud Earrings',
    basePrice: 1290,
    image: '/pics/gen-earrings.png',
    settingStyles: ['Bezel Border', '4-Prong Basket', 'Scalloped Crown'],
    dimensionLabel: 'Backing Style',
    dimensionOptions: ['Friction Butterfly Backs', 'Screw-Back Security', 'La Pousette Guardian'],
  },
  {
    type: 'Bracelet',
    slug: 'bezel-tennis-bracelet',
    name: 'Bezel Tennis Bracelet',
    basePrice: 3820,
    image: '/pics/gen-bracelet.png',
    settingStyles: ['Full Bezel Articulated', 'Shared Prong Ribbon', 'Baguette Link'],
    dimensionLabel: 'Wrist Length',
    dimensionOptions: ['16.5cm (6.5")', '17.8cm (7.0")', '19.0cm (7.5")'],
  },
]

const METALS = [
  '9K Yellow Gold',
  '14K Yellow Gold',
  '18K Yellow Gold',
  '14K White Gold',
  '18K White Gold',
  '14K Rose Gold',
  'Platinum',
]

const GEMSTONES = [
  'White Lab Diamond',
  'Emerald',
  'Sapphire',
  'Ruby',
]

const SHAPES = [
  'Round',
  'Oval',
  'Pear',
  'Emerald',
  'Princess',
  'Cushion',
  'Heart',
]

const CARATS = ['0.50ct', '0.75ct', '1.00ct', '1.50ct', '2.00ct']

export default function GenerateDesign() {
  const [selectedTypeIdx, setSelectedTypeIdx] = useState(0)
  const [selectedMetal, setSelectedMetal] = useState('14K Yellow Gold')
  const [selectedGemstone, setSelectedGemstone] = useState('White Lab Diamond')
  const [selectedShape, setSelectedShape] = useState('Round')
  const [selectedCarat, setSelectedCarat] = useState('1.00ct')
  const [selectedSetting, setSelectedSetting] = useState(JEWELLERY_TYPES[0].settingStyles[0])
  const [selectedDimension, setSelectedDimension] = useState(JEWELLERY_TYPES[0].dimensionOptions[1])
  const [engraving, setEngraving] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)
  const [addedBanner, setAddedBanner] = useState(false)

  const { addToCart } = useCart()

  const currentType = JEWELLERY_TYPES[selectedTypeIdx]

  // Update dependent defaults on jewellery type switch
  const handleTypeChange = (idx) => {
    setIsAnimating(true)
    setSelectedTypeIdx(idx)
    setSelectedSetting(JEWELLERY_TYPES[idx].settingStyles[0])
    setSelectedDimension(JEWELLERY_TYPES[idx].dimensionOptions[1] || JEWELLERY_TYPES[idx].dimensionOptions[0])
    setTimeout(() => setIsAnimating(false), 250)
  }

  // Calculate live dynamic price
  const price = useMemo(() => {
    return calculateCustomPrice({
      basePrice: currentType.basePrice,
      metal: selectedMetal,
      gemstone: selectedGemstone,
      carat: selectedCarat,
      engraving,
    })
  }, [currentType.basePrice, selectedMetal, selectedGemstone, selectedCarat, engraving])

  const handleAddToCart = () => {
    const configuredItem = {
      id: `config-${currentType.type}-${selectedMetal}-${selectedGemstone}-${selectedCarat}-${selectedShape}`,
      productId: currentType.slug,
      name: `${currentType.name} (Custom Configured)`,
      price,
      priceDisplay: formatNZD(price),
      image: currentType.image,
      quantity: 1,
      metal: selectedMetal,
      gemstone: selectedGemstone,
      shape: selectedShape,
      carat: selectedCarat,
      details: `${selectedMetal} • ${selectedCarat} ${selectedGemstone} (${selectedShape}) • ${selectedSetting} • ${selectedDimension}${engraving ? ` • Engraving: "${engraving}"` : ''}`,
    }

    addToCart(configuredItem)
    setAddedBanner(true)
    setTimeout(() => setAddedBanner(false), 3000)
  }

  return (
    <section
      id="configurator"
      className="border-b-2 border-dotted border-black bg-white py-16 px-5 sm:px-10 lg:px-16"
      aria-labelledby="generate-title"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header with Title & Category Tabs */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
              Bespoke Atelier Simulator
            </p>
            <h2 id="generate-title" className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-900">
              Interactive 3D Configurator
            </h2>
            <p className="mt-2 text-sm text-neutral-600 font-light max-w-xl">
              Choose your precious metal alloy, carat weight, conflict-free gemstone, and personal engraving with real-time transparent pricing.
            </p>
          </div>

          {/* Jewellery Type Tabs */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Jewellery types">
            {JEWELLERY_TYPES.map((item, idx) => (
              <button
                key={item.type}
                role="tab"
                aria-selected={selectedTypeIdx === idx}
                onClick={() => handleTypeChange(idx)}
                type="button"
                className={`rounded-full px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedTypeIdx === idx
                    ? 'bg-neutral-900 text-white shadow-sm font-semibold'
                    : 'border border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900'
                }`}
              >
                Design a {item.type}
              </button>
            ))}
          </div>
        </div>

        {/* Configurator Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-xl bg-[#FAF9F6] border border-neutral-200/90 p-6 sm:p-10 shadow-sm">
          {/* Left Preview Box */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center relative min-h-[360px] sm:min-h-[460px] bg-white rounded-lg border border-neutral-200/80 p-8">
            <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider bg-neutral-100 text-neutral-700 px-3 py-1 rounded">
              High-Precision Model
            </div>

            <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
              {currentType.type} • {selectedShape}
            </div>

            <div
              className={`transition-all duration-300 flex items-center justify-center ${
                isAnimating ? 'scale-95 opacity-40 blur-xs' : 'scale-100 opacity-100'
              }`}
            >
              <img
                src={currentType.image}
                alt={currentType.name}
                className="max-h-[300px] sm:max-h-[380px] w-auto object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="mt-4 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                Live Configuration
              </span>
              <p className="font-mono text-xs font-semibold text-neutral-900 mt-0.5">
                {selectedMetal} • {selectedCarat} {selectedGemstone} ({selectedShape})
              </p>
            </div>
          </div>

          {/* Right Customization Controls */}
          <div className="lg:col-span-6 flex flex-col space-y-5">
            {/* Title & Live Price */}
            <div className="border-b border-neutral-200 pb-4">
              <span className="font-mono text-[11px] text-neutral-500 uppercase tracking-widest">
                Custom Fine Jewellery
              </span>
              <h3 className="text-2xl sm:text-3xl font-normal text-neutral-900 mt-1">
                {currentType.name}
              </h3>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-3xl font-light font-mono text-neutral-900">
                  {formatNZD(price)}
                </span>
                <span className="font-mono text-xs text-neutral-500 uppercase">
                  NZD (All Taxes Included)
                </span>
              </div>
            </div>

            {/* Notification Banner */}
            {addedBanner && (
              <div className="rounded bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-800 font-mono uppercase tracking-wider flex justify-between items-center">
                <span>✓ Custom piece added to your shopping bag</span>
                <Link to="/shop" className="underline font-semibold">
                  View Bag
                </Link>
              </div>
            )}

            {/* Metal Selector */}
            <div>
              <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
                <span className="text-neutral-500 uppercase tracking-wider">Precious Metal:</span>
                <span className="font-semibold text-neutral-900">{selectedMetal}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {METALS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMetal(m)}
                    className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded border transition-colors ${
                      selectedMetal === m
                        ? 'border-neutral-900 bg-neutral-900 text-white font-medium'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900'
                    }`}
                  >
                    {m.replace('Yellow Gold', 'Gold')}
                  </button>
                ))}
              </div>
            </div>

            {/* Gemstone Selector */}
            <div>
              <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
                <span className="text-neutral-500 uppercase tracking-wider">Gemstone:</span>
                <span className="font-semibold text-neutral-900">{selectedGemstone}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {GEMSTONES.map((gem) => (
                  <button
                    key={gem}
                    type="button"
                    onClick={() => setSelectedGemstone(gem)}
                    className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded border transition-colors ${
                      selectedGemstone === gem
                        ? 'border-neutral-900 bg-neutral-900 text-white font-medium'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900'
                    }`}
                  >
                    {gem}
                  </button>
                ))}
              </div>
            </div>

            {/* Stone Shape & Carat Weight */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500 mb-1.5">
                  Stone Shape:
                </label>
                <select
                  value={selectedShape}
                  onChange={(e) => setSelectedShape(e.target.value)}
                  className="w-full rounded border border-neutral-300 bg-white px-3 py-2 font-mono text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none uppercase"
                >
                  {SHAPES.map((sh) => (
                    <option key={sh} value={sh}>
                      {sh}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500 mb-1.5">
                  Carat Weight:
                </label>
                <select
                  value={selectedCarat}
                  onChange={(e) => setSelectedCarat(e.target.value)}
                  className="w-full rounded border border-neutral-300 bg-white px-3 py-2 font-mono text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none"
                >
                  {CARATS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Setting Style & Dimension/Size */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500 mb-1.5">
                  Setting Style:
                </label>
                <select
                  value={selectedSetting}
                  onChange={(e) => setSelectedSetting(e.target.value)}
                  className="w-full rounded border border-neutral-300 bg-white px-3 py-2 font-mono text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none"
                >
                  {currentType.settingStyles.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500 mb-1.5">
                  {currentType.dimensionLabel}:
                </label>
                <select
                  value={selectedDimension}
                  onChange={(e) => setSelectedDimension(e.target.value)}
                  className="w-full rounded border border-neutral-300 bg-white px-3 py-2 font-mono text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none"
                >
                  {currentType.dimensionOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom Engraving */}
            <div>
              <div className="flex justify-between items-center mb-1 font-mono text-xs">
                <span className="text-neutral-500 uppercase tracking-wider">
                  Inside Engraving (Optional):
                </span>
                <span className="text-[10px] text-neutral-400">+$45 • Max 16 chars</span>
              </div>
              <input
                type="text"
                maxLength={16}
                value={engraving}
                onChange={(e) => setEngraving(e.target.value)}
                placeholder="e.g. FOREVER • 12.04"
                className="w-full rounded border border-neutral-300 bg-white px-3 py-2 font-mono text-xs text-neutral-900 uppercase tracking-widest placeholder:normal-case focus:border-neutral-900 focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 rounded bg-[#171717] py-3.5 px-6 font-mono text-xs uppercase tracking-widest text-[#EDE8E1] hover:bg-neutral-800 transition-colors shadow-md text-center font-medium"
              >
                Add Configured Piece to Bag
              </button>

              <Link
                to={`/products/${currentType.slug}`}
                className="rounded border border-neutral-900 bg-white py-3.5 px-6 font-mono text-xs uppercase tracking-widest text-neutral-900 hover:bg-neutral-900 hover:text-white transition-colors text-center"
              >
                Inspect Full Specs →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
