import { useState } from 'react'

const journalPosts = [
  {
    id: 1,
    title: 'What documentation comes with your HEIREST piece',
    category: 'CERTIFICATIONS & HERITAGE',
    date: 'OCTOBER 2026',
    readTime: '4 MIN READ',
    image: '/pics/journal-docs.jpg',
    excerpt:
      'From diamond grading certificates and independent valuations through to lifetime warranty documentation, every detail is accounted for with total transparency.',
    content:
      'Every piece from HEIREST arrives with comprehensive documentation verifying its exact metal purity, gemstone carat weight, color grade, and structural specifications. Our documentation package includes the official independent grading report from IGI or GIA for all center stones, an itemized valuation appraisal for insurance purposes, and your serial-numbered lifetime warranty registration card.',
  },
  {
    id: 2,
    title: 'Understanding diamond certifications: IGI, GIA, and what the difference actually means',
    category: 'DIAMOND EDUCATION',
    date: 'SEPTEMBER 2026',
    readTime: '6 MIN READ',
    image: '/pics/journal-cert.jpg',
    excerpt:
      'We break down the grading methodologies, cut consistency, and why international certification standards protect the integrity of your heirloom fine jewellery.',
    content:
      'When investing in a fine jewellery piece, independent certification provides objective verification of the 4Cs: Cut, Color, Clarity, and Carat weight. The International Gemological Institute (IGI) and Gemological Institute of America (GIA) are the global benchmarks. We explain how laser inscription numbers match your paper certificate to the diamond itself.',
  },
  {
    id: 3,
    title: 'How to clean and preserve fine jewellery at home',
    category: 'PRODUCT CARE',
    date: 'AUGUST 2026',
    readTime: '3 MIN READ',
    image: '/pics/necklace.jpg',
    excerpt:
      'Simple, jeweller-approved steps to maintain the brilliance of yellow gold, white gold, platinum, and lab-grown diamonds for decades to come.',
    content:
      'Regular wear exposes jewellery to daily lotions, perfumes, and natural skin oils that can diminish shine. Using a mild solution of warm water and gentle surfactant soap with an ultra-soft bristle brush will safely remove everyday buildup without harming delicate micro-prongs or gemstone settings.',
  },
  {
    id: 4,
    title: 'The rise of lab-grown diamonds in contemporary fine jewellery',
    category: 'INDUSTRY PERSPECTIVES',
    date: 'JULY 2026',
    readTime: '5 MIN READ',
    image: '/pics/pic%205.jpg',
    excerpt:
      'How modern engineering and chemical vapor deposition allow customers to access larger, higher-purity Type IIa stones without compromise.',
    content:
      'Lab-grown diamonds are 100% real diamonds sharing the identical crystal lattice, hardness of 10 on the Mohs scale, and refractive index of 2.42. Free from the environmental footprint of heavy earth extraction, they represent the modern future of luxury jewellery authored with purpose.',
  },
]

export default function JournalPage() {
  const [selectedPost, setSelectedPost] = useState(null)

  return (
    <div className="pt-28 pb-20 bg-white">
      <div className="px-5 sm:px-10 lg:px-16 mx-auto max-w-7xl">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-10 mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
            The HEIREST Archive
          </p>
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-900">
            Journal
          </h1>
          <p className="mt-4 text-base text-neutral-600 max-w-2xl leading-relaxed">
            Stories on craftsmanship, diamond education, care guides, and the philosophies shaping contemporary fine jewellery.
          </p>
        </div>

        {/* Modal if reading full post */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-10 relative">
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 font-mono text-xs uppercase text-neutral-500 hover:text-neutral-900"
              >
                Close [✕]
              </button>
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500 block mb-2">
                {selectedPost.category} • {selectedPost.readTime}
              </span>
              <h2 className="text-2xl sm:text-3xl font-normal text-neutral-900 mb-4">
                {selectedPost.title}
              </h2>
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-64 object-cover rounded mb-6"
              />
              <p className="text-sm sm:text-base text-neutral-700 leading-relaxed space-y-4">
                {selectedPost.content}
              </p>
            </div>
          </div>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {journalPosts.map((post) => (
            <article key={post.id} className="group flex flex-col justify-between">
              <div
                onClick={() => setSelectedPost(post)}
                className="cursor-pointer block aspect-[16/10] overflow-hidden rounded-md bg-neutral-100 mb-4"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div>
                <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-neutral-500 mb-2">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h2
                  onClick={() => setSelectedPost(post)}
                  className="cursor-pointer text-xl sm:text-2xl font-normal tracking-tight text-neutral-900 group-hover:underline leading-snug"
                >
                  {post.title}
                </h2>

                <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                  {post.excerpt}
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="mt-4 font-mono text-xs uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-0.5 hover:opacity-70"
                >
                  Read full article →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
