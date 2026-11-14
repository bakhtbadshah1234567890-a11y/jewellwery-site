import { Link } from 'react-router-dom'
import { JOURNAL_POSTS } from '../data/journalData'

export default function JournalPage() {
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="px-5 sm:px-10 lg:px-16 mx-auto max-w-7xl">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-10 mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-2">
            The GEMLY Archive
          </p>
          <h1 className="text-4xl sm:text-6xl font-normal tracking-tight text-neutral-900">
            Journal
          </h1>
          <p className="mt-4 text-base text-neutral-600 max-w-2xl leading-relaxed">
            Stories on craftsmanship, diamond education, care guides, and the philosophies shaping contemporary fine jewellery.
          </p>
        </div>

        {/* Featured Post (Hero) */}
        {JOURNAL_POSTS[0] && (
          <div className="mb-16 border-b border-neutral-200 pb-16">
            <Link
              to={`/journal/${JOURNAL_POSTS[0].slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer"
            >
              <div className="lg:col-span-7 aspect-16/10 overflow-hidden rounded-lg bg-neutral-100">
                <img
                  src={JOURNAL_POSTS[0].image}
                  alt={JOURNAL_POSTS[0].title}
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D6C2A1] mb-2 font-semibold">
                  Featured Article • {JOURNAL_POSTS[0].readTime}
                </span>
                <h2 className="text-2xl sm:text-4xl font-normal text-neutral-900 group-hover:underline leading-tight">
                  {JOURNAL_POSTS[0].title}
                </h2>
                <p className="mt-4 text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                  {JOURNAL_POSTS[0].excerpt}
                </p>
                <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-900 font-semibold">
                  <span>Read Article</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Grid of Remaining Posts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {JOURNAL_POSTS.slice(1).map((post) => (
            <Link
              key={post.id}
              to={`/journal/${post.slug}`}
              className="group flex flex-col cursor-pointer"
            >
              <div className="aspect-16/10 w-full overflow-hidden rounded-lg bg-neutral-100 mb-5">
                <img
                  src={post.image}
                  alt={post.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 mb-2">
                {post.category} • {post.readTime}
              </span>
              <h3 className="text-xl font-normal text-neutral-900 group-hover:underline leading-snug mb-3">
                {post.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
              <div className="mt-4 font-mono text-xs uppercase tracking-wider text-neutral-900 underline group-hover:opacity-75">
                Read Full Story →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
