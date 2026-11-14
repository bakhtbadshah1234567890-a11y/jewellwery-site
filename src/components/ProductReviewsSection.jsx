import { useState } from 'react'
import {
  getProductReviews,
  saveProductReview,
  calculateReviewStats,
} from '../data/reviewsData'

export default function ProductReviewsSection({
  productSlug,
  productCategory,
  productName,
  selectedMetal = '14K Yellow Gold',
  selectedCarat = '1.00ct',
  autoOpenForm = false,
}) {
  const [reviews, setReviews] = useState(() =>
    getProductReviews(productSlug, productCategory)
  )
  const [userToggledForm, setUserToggledForm] = useState(null)
  const isFormOpen = userToggledForm !== null ? userToggledForm : Boolean(autoOpenForm)
  const [filterRating, setFilterRating] = useState('ALL')
  const [helpfulVotes, setHelpfulVotes] = useState({})
  const [submittedSuccess, setSubmittedSuccess] = useState(false)

  // Form State
  const [formRating, setFormRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [authorName, setAuthorName] = useState('')
  const [authorLocation, setAuthorLocation] = useState('')
  const [reviewTitle, setReviewTitle] = useState('')
  const [reviewBody, setReviewBody] = useState('')

  const stats = calculateReviewStats(reviews)

  const handleVoteHelpful = (id) => {
    if (helpfulVotes[id]) return
    setHelpfulVotes((prev) => ({ ...prev, [id]: true }))
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r
      )
    )
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!authorName.trim() || !reviewTitle.trim() || !reviewBody.trim()) return

    const newRev = {
      id: `usr-rev-${Date.now()}`,
      author: authorName.trim(),
      location: authorLocation.trim() || 'Auckland, NZ',
      date: new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date()),
      rating: formRating,
      verified: true,
      title: reviewTitle.trim(),
      comment: reviewBody.trim(),
      metalOrSpecs: `${selectedMetal} • ${selectedCarat}`,
      helpfulCount: 0,
    }

    saveProductReview(productSlug, newRev)
    setReviews((prev) => [newRev, ...prev])
    setSubmittedSuccess(true)
    setUserToggledForm(false)

    // Reset fields
    setAuthorName('')
    setAuthorLocation('')
    setReviewTitle('')
    setReviewBody('')
    setFormRating(5)

    setTimeout(() => setSubmittedSuccess(false), 4500)
  }

  const displayedReviews = reviews.filter((r) => {
    if (filterRating === 'ALL') return true
    return r.rating === Number(filterRating)
  })

  return (
    <div id="product-reviews-section" className="space-y-12">
      {/* Header and Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[#FAF9F6] border border-neutral-200/90 rounded-xl p-6 sm:p-10">
        {/* Left: Overall Score */}
        <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-neutral-200 pb-6 md:pb-0 md:pr-8">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl sm:text-5xl font-light font-mono text-neutral-900">
              {stats.average}
            </span>
            <span className="text-sm font-mono text-neutral-400">/ 5.0</span>
          </div>

          <div className="flex items-center gap-1 text-amber-500 my-2 text-lg" aria-label={`${stats.average} out of 5 stars`}>
            {'★'.repeat(Math.round(stats.average))}
            {'☆'.repeat(5 - Math.round(stats.average))}
          </div>

          <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
            Based on {stats.total} verified reviews
          </p>

          <button
            type="button"
            onClick={() => setUserToggledForm(!isFormOpen)}
            className="mt-6 w-full sm:w-auto rounded bg-neutral-900 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors font-medium shadow-xs"
          >
            {isFormOpen ? 'Cancel Review' : '+ Write a Review'}
          </button>
        </div>

        {/* Right: Star Breakdown Bars */}
        <div className="md:col-span-8 space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const pct = stats.breakdown[star] || 0
            return (
              <button
                key={star}
                type="button"
                onClick={() =>
                  setFilterRating((cur) => (cur === String(star) ? 'ALL' : String(star)))
                }
                className="w-full flex items-center gap-3 font-mono text-xs text-neutral-600 hover:text-neutral-900 group"
              >
                <span className="w-12 text-left shrink-0">{star} Stars</span>
                <div className="flex-1 h-2 rounded-full bg-neutral-200 overflow-hidden">
                  <div
                    className="h-full bg-neutral-900 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-10 text-right shrink-0 text-neutral-400 group-hover:text-neutral-900">
                  {pct}%
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Success Notification Alert */}
      {submittedSuccess && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 font-mono text-xs uppercase tracking-wider flex items-center justify-between">
          <span>✓ Thank you! Your verified client review has been published.</span>
        </div>
      )}

      {/* Write a Review Modal / Dropdown Form */}
      {isFormOpen && (
        <form
          onSubmit={handleSubmitReview}
          className="rounded-xl border border-neutral-300 bg-white p-6 sm:p-10 shadow-lg space-y-6"
        >
          <div className="border-b border-neutral-200 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#D6C2A1] font-semibold">
              Client Feedback
            </span>
            <h3 className="text-2xl font-normal text-neutral-900 mt-1">
              Reviewing: {productName}
            </h3>
            <p className="font-mono text-xs text-neutral-500 mt-1">
              Purchased configuration: {selectedMetal} • {selectedCarat}
            </p>
          </div>

          {/* Interactive Star Rating Picker */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500 mb-2">
              Overall Rating:
            </label>
            <div className="flex items-center gap-1.5 text-2xl cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setFormRating(star)}
                  className="transition-transform hover:scale-110 p-0.5"
                  aria-label={`Rate ${star} star`}
                >
                  <span
                    className={
                      (hoverRating || formRating) >= star
                        ? 'text-amber-500'
                        : 'text-neutral-300'
                    }
                  >
                    ★
                  </span>
                </button>
              ))}
              <span className="font-mono text-xs text-neutral-500 ml-2">
                ({formRating} of 5 Stars)
              </span>
            </div>
          </div>

          {/* Reviewer Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500 mb-1">
                Your Name:
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="e.g. Katherine E."
                className="w-full rounded border border-neutral-300 bg-white px-3 py-2 font-mono text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500 mb-1">
                Location (Optional):
              </label>
              <input
                type="text"
                value={authorLocation}
                onChange={(e) => setAuthorLocation(e.target.value)}
                placeholder="e.g. Auckland, NZ"
                className="w-full rounded border border-neutral-300 bg-white px-3 py-2 font-mono text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none"
              />
            </div>
          </div>

          {/* Review Headline */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500 mb-1">
              Review Headline:
            </label>
            <input
              type="text"
              required
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="e.g. Flawless setting, exceptional brilliance"
              className="w-full rounded border border-neutral-300 bg-white px-3 py-2 font-mono text-xs text-neutral-900 focus:border-neutral-900 focus:outline-none"
            />
          </div>

          {/* Review Body */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider text-neutral-500 mb-1">
              Your Experience & Detailed Comments:
            </label>
            <textarea
              required
              rows={4}
              value={reviewBody}
              onChange={(e) => setReviewBody(e.target.value)}
              placeholder="Share how the jewellery feels on your skin, the fire of the diamonds, and your thoughts on our craftsmanship..."
              className="w-full rounded border border-neutral-300 bg-white p-3 font-sans text-xs sm:text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setUserToggledForm(false)}
              className="rounded border border-neutral-300 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-neutral-700 hover:border-neutral-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-neutral-900 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white hover:bg-neutral-800 transition-colors font-medium"
            >
              Submit Client Review
            </button>
          </div>
        </form>
      )}

      {/* Filter indicator */}
      {filterRating !== 'ALL' && (
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-neutral-500">
            Filtering by: {filterRating} Stars ({displayedReviews.length} pieces)
          </span>
          <button
            type="button"
            onClick={() => setFilterRating('ALL')}
            className="underline hover:text-neutral-900"
          >
            Show All
          </button>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.length === 0 ? (
          <div className="py-12 text-center bg-[#FAF9F6] rounded border border-neutral-200">
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
              No reviews match this star filter.
            </p>
            <button
              type="button"
              onClick={() => setFilterRating('ALL')}
              className="mt-2 text-xs font-mono underline text-neutral-900"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          displayedReviews.map((rev) => (
            <article
              key={rev.id}
              className="border border-neutral-200/80 rounded-lg p-6 sm:p-8 bg-white transition-all hover:border-neutral-400"
            >
              {/* Top Row: Stars + Date */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex text-amber-500 text-sm" aria-label={`${rev.rating} stars`}>
                    {'★'.repeat(rev.rating)}
                    {'☆'.repeat(5 - rev.rating)}
                  </div>
                  {rev.verified && (
                    <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 font-mono text-[10px] text-emerald-800 uppercase tracking-wider flex items-center gap-1">
                      <span>✓</span> Verified Client
                    </span>
                  )}
                </div>

                <div className="font-mono text-[11px] text-neutral-400">
                  {rev.date}
                </div>
              </div>

              {/* Review Title & Body */}
              <h4 className="text-base sm:text-lg font-normal text-neutral-900 mb-2">
                {rev.title}
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light mb-4">
                {rev.comment}
              </p>

              {/* Bottom metadata & Helpful counter */}
              <div className="pt-3 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-mono text-xs">
                <div>
                  <span className="font-semibold text-neutral-900">{rev.author}</span>
                  {rev.location && (
                    <span className="text-neutral-400"> • {rev.location}</span>
                  )}
                  {rev.metalOrSpecs && (
                    <span className="text-neutral-500 block sm:inline sm:ml-2">
                      [{rev.metalOrSpecs}]
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleVoteHelpful(rev.id)}
                  disabled={helpfulVotes[rev.id]}
                  className={`text-[11px] uppercase tracking-wider transition-colors flex items-center gap-1.5 ${
                    helpfulVotes[rev.id]
                      ? 'text-emerald-700 font-semibold cursor-default'
                      : 'text-neutral-400 hover:text-neutral-900'
                  }`}
                >
                  <span>👍 Helpful</span>
                  <span>({rev.helpfulCount || 0})</span>
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
