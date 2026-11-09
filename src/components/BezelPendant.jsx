import { useState } from 'react'

const stoneCuts = [
  { name: 'Round', image: '/pics/pendant-round.png' },
  { name: 'Pear', image: '/pics/pendant-pear.png' },
  { name: 'Emerald', image: '/pics/pendant-emerald.png' },
  { name: 'Oval', image: '/pics/pendant-oval.png' },
  { name: 'Marquise', image: '/pics/pendant-marquise.png' },
  { name: 'Cushion', image: '/pics/pendant-cushion.png' },
  { name: 'Heart', image: '/pics/pendant-heart.png' },
]

export default function BezelPendant() {
  const [selectedCut, setSelectedCut] = useState(0)

  return (
    <section className="border-b-2 border-dotted border-black bg-white" aria-labelledby="pendant-title">
      <div className="py-16 px-5 sm:px-10 lg:px-16 mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">Spotlight Feature</p>
            <h2 id="pendant-title" className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-900">
              Collection: Bezel Pendant
            </h2>
          </div>

          <div className="flex items-center gap-8 font-mono text-xs uppercase">
            <div>
              <span className="text-neutral-400 block">Family</span>
              <span className="text-neutral-900 font-medium">Pendant</span>
            </div>
            <div>
              <span className="text-neutral-400 block">Setting</span>
              <span className="text-neutral-900 font-medium">Bezel</span>
            </div>
            <a
              href="#bespoke"
              className="inline-flex min-h-10 items-center justify-center rounded-md border border-neutral-900 px-6 font-mono text-xs uppercase tracking-wider text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
            >
              Design yours
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#faf8f5] p-6 sm:p-10 rounded-lg">
          <div className="lg:col-span-5 flex flex-col justify-center items-center py-6">
            <img
              src={stoneCuts[selectedCut].image}
              alt={`Bezel pendant with ${stoneCuts[selectedCut].name} cut diamond`}
              className="h-64 sm:h-80 w-auto object-contain drop-shadow-lg transition-transform duration-300"
            />
            <span className="mt-4 font-mono text-xs uppercase tracking-widest text-neutral-600">
              {stoneCuts[selectedCut].name} Cut Bezel Pendant
            </span>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {stoneCuts.map((cut, idx) => (
                <button
                  key={cut.name}
                  type="button"
                  onClick={() => setSelectedCut(idx)}
                  className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded transition-all ${
                    selectedCut === idx
                      ? 'bg-neutral-900 text-white'
                      : 'border border-neutral-300 bg-white text-neutral-700 hover:border-neutral-900'
                  }`}
                >
                  {cut.name}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 overflow-hidden rounded-md">
            <img
              src="/pics/pendant-model.png"
              alt="Model wearing HEIREST Bezel Pendant"
              className="w-full h-[400px] sm:h-[480px] object-cover rounded-md"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
