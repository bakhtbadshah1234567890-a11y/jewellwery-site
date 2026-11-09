const articles = [
  {
    title: 'What documentation comes with your HEIREST piece',
    category: 'JOURNAL',
    summary:
      'From diamond grading certificates and independent valuations through to lifetime warranty documentation, every detail is accounted for with total transparency.',
    image: '/pics/journal-docs.jpg',
    href: '#journal',
  },
  {
    title: 'Understanding diamond certifications: IGI, GIA, and what the difference actually means',
    category: 'JOURNAL',
    summary:
      'We break down the grading methodologies, cut consistency, and why international certification standards protect the integrity of your heirloom fine jewellery.',
    image: '/pics/journal-cert.jpg',
    href: '#journal',
  },
]

export default function Journal() {
  return (
    <section className="border-b-2 border-dotted border-black bg-white py-16 px-5 sm:px-10 lg:px-16" aria-labelledby="journal-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-500 mb-1">From The Journal</p>
            <h2 id="journal-title" className="text-3xl sm:text-5xl font-normal tracking-tight text-neutral-900">
              A look into our world
            </h2>
          </div>

          <a
            href="#journal"
            className="font-mono text-xs uppercase tracking-wider text-neutral-900 border-b border-neutral-900 pb-0.5 hover:opacity-70"
          >
            Read all articles →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <article key={article.title} className="group flex flex-col justify-between">
              <a href={article.href} className="block aspect-[16/10] overflow-hidden rounded-md bg-neutral-100 mb-4">
                <img
                  src={article.image}
                  alt={article.title}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </a>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                    {article.category}
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-normal tracking-tight text-neutral-900 group-hover:underline">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <div className="mt-4">
                  <a
                    href={article.href}
                    className="font-mono text-xs uppercase tracking-wider text-neutral-900 border-b border-dotted border-current hover:opacity-70"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
