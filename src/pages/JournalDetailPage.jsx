import { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getJournalPostBySlug, JOURNAL_POSTS } from '../data/journalData'

export default function JournalDetailPage() {
  const { slug } = useParams()

  const post = useMemo(() => {
    return getJournalPostBySlug(slug) || JOURNAL_POSTS[0]
  }, [slug])

  const otherPosts = useMemo(() => {
    return JOURNAL_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3)
  }, [post.slug])

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-white text-neutral-900 min-h-screen">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-4xl px-5 sm:px-8 mb-6">
        <Link
          to="/journal"
          className="font-mono text-xs uppercase tracking-wider text-neutral-500 hover:text-neutral-900 flex items-center gap-1.5"
        >
          ← Back to All Articles
        </Link>
      </div>

      <article className="mx-auto max-w-4xl px-5 sm:px-8">
        {/* Header */}
        <div className="border-b border-neutral-200 pb-8 mb-10">
          <div className="font-mono text-xs uppercase tracking-widest text-[#D6C2A1] mb-2 font-semibold">
            {post.category} • {post.date} • {post.readTime}
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-900 leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-600 font-light leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Feature Image */}
        <div className="aspect-16/9 sm:aspect-21/9 w-full overflow-hidden rounded-lg bg-neutral-100 mb-12 shadow-sm">
          <img src={post.image} alt={post.title} className="size-full object-cover" />
        </div>

        {/* Article Body */}
        <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed text-base sm:text-lg space-y-6">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Share & Author bar */}
        <div className="mt-16 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs text-neutral-500 uppercase tracking-wider">
          <div>Published by HEIREST Atelier Editorial Team</div>
          <Link to="/journal" className="text-neutral-900 underline font-semibold">
            Return to Journal Archive
          </Link>
        </div>
      </article>

      {/* Recommended Reads */}
      {otherPosts.length > 0 && (
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 mt-24 pt-16 border-t border-neutral-200">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-normal text-neutral-900">
              Continue Reading
            </h2>
            <Link
              to="/journal"
              className="font-mono text-xs uppercase tracking-wider underline hover:opacity-70"
            >
              All Articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherPosts.map((other) => (
              <Link
                key={other.slug}
                to={`/journal/${other.slug}`}
                className="group flex flex-col"
              >
                <div className="aspect-16/10 w-full overflow-hidden rounded bg-neutral-100 mb-4">
                  <img
                    src={other.image}
                    alt={other.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                  {other.category} • {other.readTime}
                </span>
                <h3 className="text-base font-normal text-neutral-900 group-hover:underline mt-1 leading-snug">
                  {other.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
