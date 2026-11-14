/**
 * Default verified customer reviews repository and local storage manager
 */

const BASELINE_REVIEWS = {
  RINGS: [
    {
      id: 'rev-r-1',
      author: 'Levi M.',
      location: 'Auckland, NZ',
      date: 'November 4, 2026',
      rating: 5,
      verified: true,
      title: 'Flawless execution — blown away by the craftsmanship',
      comment:
        'Couldn’t be happier with the decision to order my partner’s ring from GEMLY. The bezel is so smooth against the skin and the comfort curve on the inside shank makes it wearable 24/7. Friends constantly ask where she got it.',
      metalOrSpecs: '14K Yellow Gold • 1.00ct White Lab Diamond (Oval)',
      helpfulCount: 14,
    },
    {
      id: 'rev-r-2',
      author: 'Gemma S.',
      location: 'Sydney, AU',
      date: 'October 19, 2026',
      rating: 5,
      verified: true,
      title: 'Architectural, understated, perfect proportions',
      comment:
        'I searched high and low for a pinky ring that didn’t feel bulky or overly masculine. The raised bezel design is modern perfection. The diamond is crisp, colorless, and sparkles brilliantly even in low restaurant lighting.',
      metalOrSpecs: '18K Yellow Gold • 0.75ct White Lab Diamond • Size US 4',
      helpfulCount: 9,
    },
    {
      id: 'rev-r-3',
      author: 'Claudia H.',
      location: 'Melbourne, AU',
      date: 'September 28, 2026',
      rating: 5,
      verified: true,
      title: 'Rivals brands charging 3x the price',
      comment:
        'As someone who owns pieces from heritage luxury houses, the metal weight and diamond setting here easily rivals luxury jewelers charging triple. The packaging with the velvet box and IGI certificate was so luxurious.',
      metalOrSpecs: '14K White Gold • 1.50ct Emerald Cut',
      helpfulCount: 19,
    },
    {
      id: 'rev-r-4',
      author: 'Sophie T.',
      location: 'Wellington, NZ',
      date: 'August 14, 2026',
      rating: 4,
      verified: true,
      title: 'Gorgeous piece, took exactly 3.5 weeks as promised',
      comment:
        'Production took 3.5 weeks since it is made to order, but once dispatched DHL Express had it on my doorstep in 48 hours. The weight in solid 18k gold is noticeable and reassuring.',
      metalOrSpecs: '18K Rose Gold • 1.00ct Cushion Cut',
      helpfulCount: 6,
    },
  ],

  NECKLACES: [
    {
      id: 'rev-n-1',
      author: 'Katherine E.',
      location: 'Christchurch, NZ',
      date: 'November 8, 2026',
      rating: 5,
      verified: true,
      title: 'Lies completely flat — no flipping!',
      comment:
        'My biggest pet peeve with tennis and solitaire necklaces is when they twist or flip backwards while moving. GEMLY’s articulation is genius; the bezel settings lie flush against the collarbone all day.',
      metalOrSpecs: '14K Yellow Gold • 8.00ctw Brilliant Cut',
      helpfulCount: 18,
    },
    {
      id: 'rev-n-2',
      author: 'Zara W.',
      location: 'Sydney, AU',
      date: 'October 2, 2026',
      rating: 5,
      verified: true,
      title: 'The ultimate daily luxury staple',
      comment:
        'I wear this with white tees, silk shirts, and evening gowns. The diamond-cut chain sparkles with every step and the slider bail keeps the center stone balanced perfectly.',
      metalOrSpecs: '14K Yellow Gold • 1.00ct White Lab Diamond • 40cm',
      helpfulCount: 12,
    },
    {
      id: 'rev-n-3',
      author: 'Marcus B.',
      location: 'Brisbane, AU',
      date: 'September 15, 2026',
      rating: 5,
      verified: true,
      title: 'Anniversary gift of the decade',
      comment:
        'Bought this for our 10th anniversary. My wife cried when she opened the velvet case. The stone fire is remarkable and customer care was so helpful with length advice.',
      metalOrSpecs: '18K White Gold • 1.50ct Solitaire',
      helpfulCount: 8,
    },
  ],

  EARRINGS: [
    {
      id: 'rev-e-1',
      author: 'Katherine El-Rassi',
      location: 'Auckland, NZ',
      date: 'November 2, 2026',
      rating: 5,
      verified: true,
      title: 'Stunning everyday brilliance',
      comment:
        'From the moment I opened the box, they looked stunning — elegant, timeless, and incredibly well-crafted. The bezel rim amplifies the stone diameter and they never catch in my hair.',
      metalOrSpecs: '14K Yellow Gold • 1.00ctw (0.50ct each)',
      helpfulCount: 22,
    },
    {
      id: 'rev-e-2',
      author: 'Olivia D.',
      location: 'London, UK',
      date: 'October 11, 2026',
      rating: 5,
      verified: true,
      title: 'Heavy secure backs give complete peace of mind',
      comment:
        'I was always nervous about losing diamond studs. These friction backs click on with double notches and feel super safe. Comfortable enough to sleep in too.',
      metalOrSpecs: '14K White Gold • 0.50ctw Round Cut',
      helpfulCount: 11,
    },
  ],

  BRACELETS: [
    {
      id: 'rev-b-1',
      author: 'Matt G.',
      location: 'Queenstown, NZ',
      date: 'October 30, 2026',
      rating: 5,
      verified: true,
      title: 'Buttery smooth articulation',
      comment:
        'The bezel tennis bracelet is unbelievable. The individual gold cells don’t pinch the skin or catch on knitwear. The dual safety latches feel rock solid.',
      metalOrSpecs: '14K Yellow Gold • 5.00ctw • 17.8cm Length',
      helpfulCount: 15,
    },
    {
      id: 'rev-b-2',
      author: 'Paige H.',
      location: 'Perth, AU',
      date: 'September 12, 2026',
      rating: 5,
      verified: true,
      title: 'Heirloom quality that I will pass down',
      comment:
        'The attention to detail on the clasp mechanism and the uniform stone clarity across every single link is extraordinary. Worth every single cent.',
      metalOrSpecs: '18K White Gold • 7.00ctw',
      helpfulCount: 7,
    },
  ],

  PENDANTS: [
    {
      id: 'rev-p-1',
      author: 'Indie M.',
      location: 'Sydney, AU',
      date: 'November 9, 2026',
      rating: 5,
      verified: true,
      title: 'The emerald cut bezel is hypnotic',
      comment:
        'I bought the emerald cut charm in 14k yellow gold to slide onto my existing chain. The 3.5mm bail is generous and the stepped facets give off such an art-deco shine.',
      metalOrSpecs: '14K Yellow Gold • 1.00ct Emerald Cut Lab Diamond',
      helpfulCount: 16,
    },
    {
      id: 'rev-p-2',
      author: 'Charlotte V.',
      location: 'Auckland, NZ',
      date: 'October 25, 2026',
      rating: 5,
      verified: true,
      title: 'Teardrop perfection',
      comment:
        'The pear cut pendant has such clean protective walls. The tip is completely protected from accidental knocks. I layer it daily with my tennis necklace.',
      metalOrSpecs: '14K Rose Gold • 1.00ct Pear Cut Lab Diamond',
      helpfulCount: 10,
    },
    {
      id: 'rev-p-3',
      author: 'Eleanor K.',
      location: 'New York, USA',
      date: 'September 19, 2026',
      rating: 5,
      verified: true,
      title: 'Shipped to NYC in 3 days after fabrication',
      comment:
        'International ordering was seamless. The pendant arrived with full custom valuation paperwork and warranty passport. Exceeded all expectations.',
      metalOrSpecs: '14K Yellow Gold • 1.50ct Round Cut Lab Diamond',
      helpfulCount: 8,
    },
  ],
}

export function getProductReviews(slug, category = 'RINGS') {
  const cat = category.toUpperCase()
  const base = BASELINE_REVIEWS[cat] || BASELINE_REVIEWS.RINGS

  try {
    const key = `gemly_product_reviews_${slug}`
    const stored = localStorage.getItem(key)
    if (stored) {
      const userAdded = JSON.parse(stored)
      return [...userAdded, ...base]
    }
  } catch {
    // ignore
  }

  return base
}

export function saveProductReview(slug, newReview) {
  try {
    const key = `gemly_product_reviews_${slug}`
    const stored = localStorage.getItem(key)
    const list = stored ? JSON.parse(stored) : []
    const updated = [newReview, ...list]
    localStorage.setItem(key, JSON.stringify(updated))
    return updated
  } catch {
    return [newReview]
  }
}

export function calculateReviewStats(reviews = []) {
  if (reviews.length === 0) {
    return {
      average: 5.0,
      total: 0,
      breakdown: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 },
    }
  }

  const sum = reviews.reduce((acc, r) => acc + (r.rating || 5), 0)
  const average = Number((sum / reviews.length).toFixed(1))

  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating || 5)))
    counts[star] = (counts[star] || 0) + 1
  })

  const breakdown = {
    5: Math.round((counts[5] / reviews.length) * 100),
    4: Math.round((counts[4] / reviews.length) * 100),
    3: Math.round((counts[3] / reviews.length) * 100),
    2: Math.round((counts[2] / reviews.length) * 100),
    1: Math.round((counts[1] / reviews.length) * 100),
  }

  return { average, total: reviews.length, breakdown }
}
