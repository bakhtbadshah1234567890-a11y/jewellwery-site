import { useRef } from 'react'

const reviews = [
  {
    author: 'LEVI MELVILLE',
    badge: 'VERIFIED',
    rating: 5,
    quote:
      'Couldn’t be happier with the decision to use GEMLY for my partner’s engagement ring. The ring is absolutely flawless - it has blown everyone away. My partner said the most common statement when friends see the ring is “Levi did so well”, I would love to take the credit but it’s really owed to Liam and his Team. Thanks again guys for creating such a beautiful piece that my partner is so very proud to wear.',
  },
  {
    author: 'KATHERINE EL-RASSI',
    badge: 'VERIFIED',
    rating: 5,
    quote:
      'I’m absolutely thrilled with these 1 Carat white gold earrings! From the moment I opened the box, they looked stunning — elegant, timeless, and incredibly well-crafted. The white gold has such a beautiful shine, and the stones sparkle brilliantly in every light without being overly flashy. They’re the perfect size for everyday wear while still looking luxurious.',
  },
  {
    author: 'CLAUDIA HUI',
    badge: 'VERIFIED',
    rating: 5,
    quote:
      'Purchased an infinity band and a pair of stud earrings for my wedding and I love them! The style came out exactly as I envisioned it in my head and the quality is truly impressive for the price point. As someone who owns pieces both from GEMLY and name brands that charge 2-3x markup, I’d say the craftsmanship definitely rivals the higher priced pieces.',
  },
  {
    author: 'PAIGE HARRIS',
    badge: 'VERIFIED',
    rating: 5,
    quote:
      'I am so grateful to the GEMLY team for their exceptional level of care bringing this very special piece to life. Every detail from the stone selection itself through to the finer engraving details have been so well considered and delivered with such an emphasis on quality.',
  },
  {
    author: 'CATHERINE EMERSON',
    badge: 'VERIFIED',
    rating: 5,
    quote:
      'Buying from GEMLY has been an absolute dream - top quality workmanship and diamonds, with a phenomenal price point. It has truly never been easier to buy a lifetime, heirloom piece. I’m so so glad they exist!',
  },
  {
    author: 'MATT GANLEY',
    badge: 'VERIFIED',
    rating: 5,
    quote:
      'We couldn’t be happier with the necklace and earrings purchased from GEMLY - the quality is genuinely incredible and the process couldn’t have been easier. We continue to receive compliments on both pieces, and have only good things to say about the GEMLY team. A great product, brand and team!',
  },
]

export default function Reviews() {
  const scrollRef = useRef(null)

  const handleScroll = (direction) => {
    if (!scrollRef.current) return
    const card = scrollRef.current.querySelector('.review-card')
    const width = card ? card.offsetWidth + 24 : 360
    scrollRef.current.scrollBy({ left: direction * width, behavior: 'smooth' })
  }

  return (
    <section className="border-b-2 border-dotted border-black bg-white py-16 px-5 sm:px-10 lg:px-16" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">Customer Stories</p>
            <h2 id="reviews-title" className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-900">
              The experience, as told by you
            </h2>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleScroll(-1)}
              className="grid size-10 place-items-center rounded-full border border-neutral-900 text-lg transition-colors hover:bg-neutral-900 hover:text-white"
              aria-label="Previous reviews"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => handleScroll(1)}
              className="grid size-10 place-items-center rounded-full border border-neutral-900 text-lg transition-colors hover:bg-neutral-900 hover:text-white"
              aria-label="Next reviews"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin snap-x snap-mandatory"
          style={{ scrollbarWidth: 'thin' }}
        >
          {reviews.map((rev) => (
            <article
              key={rev.author}
              className="review-card flex flex-col justify-between shrink-0 w-[300px] sm:w-[380px] bg-[#f9f8f6] border border-neutral-200/80 rounded-md p-6 sm:p-8 snap-start"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-600 mb-4" aria-label="5 out of 5 stars">
                  {'★★★★★'}
                </div>
                <blockquote className="text-neutral-800 text-sm sm:text-base leading-relaxed italic">
                  &ldquo;{rev.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between font-mono text-xs">
                <span className="font-semibold text-neutral-900">{rev.author}</span>
                <span className="text-neutral-500">{rev.badge} • 5 STARS</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
