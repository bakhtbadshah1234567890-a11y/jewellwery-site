import { Link } from 'react-router-dom'
import { JOURNAL_POSTS } from '../data/journalData'

export default function Journal() {
  const articles = JOURNAL_POSTS.slice(0, 2)

  return (
    <section
      className="border-b-2 border-dotted border-black bg-white py-16 px-5 sm:px-10 lg:px-16"
      aria-labelledby="journal-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">
              From The Journal
            </p>
            <h2 id="journal-title" className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-900">
              A look into our world
            </h2>
          </div>

          <Link
            to="/journal"
            className="font-mono text-xs uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-0.5 hover:opacity-70"
          >
            Read all articles →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article key={article.slug} className="group flex flex-col justify-between">
              <Link
                to={`/journal/${article.slug}`}
                className="block aspect-16/10 overflow-hidden rounded-md bg-neutral-100 mb-4"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                    {article.category} • {article.readTime}
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-normal tracking-tight text-neutral-900 group-hover:underline">
                    <Link to={`/journal/${article.slug}`}>{article.title}</Link>
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed font-light">
                    {article.excerpt}
                  </p>
                </div>

                <div className="mt-4">
                  <Link
                    to={`/journal/${article.slug}`}
                    className="font-mono text-xs uppercase tracking-wider text-neutral-900 border-b border-dotted border-current hover:opacity-70 inline-block"
                  >
                    Read article →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
