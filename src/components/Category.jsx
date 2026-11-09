import { useRef } from 'react'
import { Link } from 'react-router-dom'

const categories = [
  { name: 'Studs', image: 'img1.webp', href: '/shop?cat=EARRINGS' },
  { name: 'Pinky Rings', image: 'img2.webp', href: '/shop?cat=RINGS' },
  { name: 'Tennis Bracelets', image: 'img3.webp', href: '/shop?cat=BRACELETS' },
  { name: 'Solitaire Necklaces', image: 'img4.webp', href: '/shop?cat=NECKLACES' },
  { name: 'Earrings', image: 'img5.webp', href: '/shop?cat=EARRINGS' },
  { name: 'Bracelets', image: 'img6.webp', href: '/shop?cat=BRACELETS' },
  { name: 'Diamond Rings', image: 'img7.webp', href: '/shop?cat=RINGS' },
  { name: 'Layered Necklaces', image: 'img8.webp', href: '/shop?cat=NECKLACES' },
  { name: 'Chain Bracelets', image: 'img9.webp', href: '/shop?cat=BRACELETS' },
  { name: 'Pendants', image: 'img10.webp', href: '/shop?cat=PENDANTS' },
  { name: 'Fine Jewellery', image: 'img11.webp', href: '/shop' },
]

export default function Category() {
  const categoriesRef = useRef(null)

  const scrollCategories = (direction) => {
    const scroller = categoriesRef.current
    const card = scroller?.querySelector('.category-card')
    if (!scroller || !card) return

    const gap = Number.parseFloat(getComputedStyle(scroller).columnGap) || 0
    scroller.scrollBy({
      left: direction * (card.getBoundingClientRect().width + gap),
      behavior: 'smooth',
    })
  }

  return (
    <section className="category-section" aria-labelledby="category-title">
      <div className="category-section__header">
        <h2 id="category-title" className="category-section__title">
          Start with a category
        </h2>
        <div className="category-section__arrows">
          <button type="button" onClick={() => scrollCategories(-1)} aria-label="Scroll to previous categories">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={() => scrollCategories(1)} aria-label="Scroll to next categories">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      <div
        className="category-scroller"
        ref={categoriesRef}
        tabIndex={0}
        aria-label="Scroll through jewellery categories"
      >
        {categories.map((category, index) => (
          <Link className="category-card" to={category.href} key={category.image}>
            <img
              className="category-card__image"
              src={`/pics/${category.image}`}
              alt={category.name}
              loading={index < 4 ? 'eager' : 'lazy'}
            />
            <span className="category-card__name">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
