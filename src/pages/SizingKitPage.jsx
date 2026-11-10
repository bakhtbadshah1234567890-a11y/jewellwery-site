import { useState } from 'react'
import { useCart } from '../context/useCart'

const gallery = [
  '/pics/sizing-kit-1.png',
  '/pics/sizing-kit-2.png',
  '/pics/sizing-kit-3.png',
  '/pics/sizing-kit-4.png',
]

const accordions = [
  {
    title: "What's in the kit?",
    content:
      'The HEIREST Sizing Kit includes our precision ring multisizer belt (accurate to 0.25 sizes), millimeter bracelet measuring ribbon, international size conversion card, and instructions on measuring across different temperatures and finger knuckles.',
  },
  {
    title: 'How does the $15 credit work?',
    content:
      'Every sizing kit comes with a unique $15 redemption code included inside the box. When you order your ring, bracelet, or bespoke piece, enter your code at checkout to have the full $15 deducted from your order.',
  },
  {
    title: 'Complimentary shipping details',
    content:
      'Sizing kits are dispatched within 24 business hours via expedited post with door-to-door tracking. International delivery takes 3 to 7 business days.',
  },
]

export default function SizingKitPage() {
  const [selectedImg, setSelectedImg] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [openAcc, setOpenAcc] = useState(0)
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: 'sizing-kit-full',
      name: 'Ring + Bracelet Sizing Kit',
      price: 15,
      image: gallery[0],
      quantity,
      details: 'Physical multisizer + millimeter bracelet band',
    })
  }

  return (
    <div className="pt-28 pb-20 bg-white">
      <div className="px-5 sm:px-10 lg:px-16 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-[#f7f6f4] p-8 flex items-center justify-center border border-neutral-200">
              <img
                src={gallery[selectedImg]}
                alt="Ring and Bracelet Sizing Kit preview"
                className="max-h-[460px] w-auto object-contain drop-shadow-md"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {gallery.map((img, idx) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setSelectedImg(idx)}
                  className={`aspect-square rounded border bg-[#f9f8f6] p-2 transition-all ${
                    selectedImg === idx ? 'border-neutral-900 ring-1 ring-neutral-900' : 'border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  <img src={img} alt={`View angle ${idx + 1}`} className="size-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Essential Sizing</span>
              <h1 className="mt-1 text-3xl sm:text-4xl font-normal tracking-tight text-neutral-900">
                Ring + Bracelet Sizing Kit
              </h1>
              <p className="mt-2 font-mono text-xl font-medium text-neutral-900">
                $15 NZD
              </p>
            </div>

            <div className="rounded bg-[#f9f8f6] p-3.5 border border-neutral-200 font-mono text-xs text-neutral-700">
              ★ Includes a $15 store credit voucher redeemable against your next HEIREST fine jewellery piece.
            </div>

            <p className="text-sm text-neutral-600 leading-relaxed">
              Find your exact size from home with total precision before commissioning your piece. Tested and certified by our master setters for both ring diameter and bracelet circumference.
            </p>

            {/* Quantity & CTA */}
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs uppercase text-neutral-500">Quantity</span>
                <div className="flex items-center border border-neutral-300 rounded font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 hover:bg-neutral-100"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 font-medium">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 hover:bg-neutral-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full rounded bg-neutral-900 py-3.5 font-mono text-xs uppercase tracking-widest text-white transition-opacity hover:opacity-85 shadow-sm"
              >
                Add to Bag • ${(15 * quantity).toLocaleString()} NZD
              </button>
            </div>

            {/* Accordions */}
            <div className="space-y-3 pt-6 border-t border-neutral-200">
              {accordions.map((acc, i) => (
                <div key={acc.title} className="border-b border-neutral-100 pb-3">
                  <button
                    type="button"
                    onClick={() => setOpenAcc(openAcc === i ? null : i)}
                    className="flex w-full items-center justify-between text-left font-mono text-xs uppercase tracking-wider text-neutral-900 py-1"
                  >
                    <span>{acc.title}</span>
                    <span>{openAcc === i ? '−' : '+'}</span>
                  </button>
                  {openAcc === i && (
                    <p className="mt-2 text-xs text-neutral-600 leading-relaxed">
                      {acc.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
