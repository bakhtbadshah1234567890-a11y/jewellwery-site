import { useState } from 'react'

const categories = [
  {
    type: 'Necklace',
    name: 'PRONG SOLITAIRE NECKLACE - 14K YELLOW GOLD',
    spec: 'WHITE LAB DIAMOND / ROUND / 1CT',
    price: '$2,450 NZD',
    image: '/pics/gen-necklace.png',
  },
  {
    type: 'Ring',
    name: 'RAISED BEZEL PINKY RING - 9K YELLOW GOLD',
    spec: 'WHITE LAB DIAMOND / ROUND / 0.5CT',
    price: '$1,751 NZD',
    image: '/pics/gen-ring.png',
  },
  {
    type: 'Earrings',
    name: 'BEZEL STUD EARRINGS - 9K YELLOW GOLD',
    spec: 'WHITE LAB DIAMOND / ROUND / 0.5TCW',
    price: '$1,290 NZD',
    image: '/pics/gen-earrings.png',
  },
  {
    type: 'Bracelet',
    name: 'BEZEL TENNIS BRACELET - 9K YELLOW GOLD',
    spec: 'WHITE LAB DIAMOND / ROUND / 2TCW',
    price: '$3,820 NZD',
    image: '/pics/gen-bracelet.png',
  },
]

const metals = ['14k yellow gold', '14k white gold', '14k rose gold', 'platinum']

export default function GenerateDesign() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [selectedMetal, setSelectedMetal] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)

  const current = categories[selectedCategory]

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setSelectedCategory((prev) => (prev + 1) % categories.length)
      setSelectedMetal((prev) => (prev + 1) % metals.length)
      setIsGenerating(false)
    }, 400)
  }

  return (
    <section className="border-b-2 border-dotted border-black bg-white py-16 px-5 sm:px-10 lg:px-16" aria-labelledby="generate-title">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-2">3D Configurator</p>
            <h2 id="generate-title" className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-900">
              Generate your design
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Jewellery types">
            {categories.map((cat, idx) => (
              <button
                key={cat.type}
                role="tab"
                aria-selected={selectedCategory === idx}
                onClick={() => setSelectedCategory(idx)}
                type="button"
                className={`rounded-full px-5 py-2 text-xs font-mono uppercase tracking-wider transition-all ${
                  selectedCategory === idx
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'border border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900'
                }`}
              >
                {cat.type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-lg bg-[#f6f5f3] p-6 sm:p-12">
          <div className="lg:col-span-7 flex justify-center items-center relative min-h-[340px] sm:min-h-[460px]">
            <div className={`transition-all duration-300 flex items-center justify-center ${isGenerating ? 'scale-95 opacity-50 blur-sm' : 'scale-100 opacity-100'}`}>
              <img
                src={current.image}
                alt={current.name}
                className="max-h-[380px] sm:max-h-[460px] w-auto object-contain drop-shadow-xl"
              />
            </div>
            <div className="absolute top-4 left-4 font-mono text-[11px] uppercase tracking-wider bg-white/80 backdrop-blur-sm px-3 py-1 rounded">
              Photorealistic 3D Preview
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Configured Piece</span>
              <h3 className="mt-2 text-xl sm:text-2xl font-normal leading-snug tracking-tight text-neutral-900">
                {current.name}
              </h3>
              <p className="mt-1 font-mono text-sm text-neutral-600 uppercase tracking-wide">
                {current.spec}
              </p>
              <p className="mt-4 text-2xl font-medium tracking-tight text-neutral-900">
                {current.price}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <span className="font-mono text-xs text-neutral-500 uppercase tracking-widest">Select Metal</span>
              <div className="flex flex-wrap gap-2">
                {metals.map((metal, mIdx) => (
                  <button
                    key={metal}
                    type="button"
                    onClick={() => setSelectedMetal(mIdx)}
                    className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-colors ${
                      selectedMetal === mIdx
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    {metal}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="#bespoke"
                className="inline-flex min-h-12 items-center justify-center rounded-md bg-neutral-900 px-6 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-85"
              >
                Shop this design
              </a>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="inline-flex min-h-12 items-center justify-center rounded-md border border-neutral-900 bg-transparent px-6 font-mono text-xs uppercase tracking-widest text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
              >
                {isGenerating ? 'Generating...' : 'Generate a new design'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
