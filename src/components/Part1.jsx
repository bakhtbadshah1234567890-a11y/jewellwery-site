import { useRef } from 'react'
import { Link } from 'react-router-dom'

const designs = [
  { image: '/pics/pic%201.jpg', author: '@INDIEMOXLEY', time: '11:07:26', name: 'Bezel eternity ring / 14k yellow gold / white lab diamond / oval' },
  { image: '/pics/pic%202.jpg', author: '@GRACIE_HITCHCOCK', time: '20:07:26', name: 'Bezel tennis bracelet / 9k yellow gold / white lab diamond / round' },
  { image: '/pics/pic%203.jpg', author: '@INDIEMOXLEY', time: '11:07:26', name: 'Bezel eternity ring / 14k yellow gold / white lab diamond' },
  { image: '/pics/pic%204.jpg', author: '@ALICE_DESIGNS', time: '09:18:42', name: 'Heirloom gold band / recycled yellow gold' },
  { image: '/pics/pic%205.jpg', author: '@MILA_STUDIO', time: '14:32:10', name: 'Oval solitaire ring / lab grown diamond' },
  { image: '/pics/pic%206.jpg', author: '@ELLA_ROSE', time: '16:05:33', name: 'Classic diamond studs / 14k yellow gold' },
  { image: '/pics/pic%207.jpg', author: '@JUNE_AND_CO', time: '10:44:08', name: 'Sculpted gold signet / custom engraving' },
  { image: '/pics/pic%208.jpg', author: '@THEA_MAKES', time: '18:21:55', name: 'Diamond tennis bracelet / 9k yellow gold' },
  { image: '/pics/pic%209.jpg', author: '@LIV_ARCHIVE', time: '12:16:19', name: 'Stacking rings / recycled solid gold' },
  { image: '/pics/pic%2010.jpg', author: '@ROSE_AND_STONE', time: '15:39:47', name: 'Bespoke oval signet / 14k yellow gold' },
]

export default function Part1() {
  const galleryRef = useRef(null)

  const scrollGallery = (direction) => {
    const gallery = galleryRef.current
    if (!gallery) return

    const card = gallery.querySelector('.design-gallery__card')
    if (!card) return

    const gap = Number.parseFloat(getComputedStyle(gallery).columnGap) || 0
    gallery.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: 'smooth' })
  }

  return (
    <section className="design-gallery" aria-label="Community-designed jewellery">
      <div className="design-gallery__controls">
        <p>Made yours. Worn yours.</p>
        <div className="design-gallery__arrows">
          <button type="button" onClick={() => scrollGallery(-1)} aria-label="Scroll to previous designs">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" onClick={() => scrollGallery(1)} aria-label="Scroll to next designs">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="design-gallery__scroller" ref={galleryRef} tabIndex={0} aria-label="Scroll through ten jewellery designs">
        {designs.map((design, index) => (
          <article className="design-gallery__card" key={design.image}>
            <Link className="design-gallery__image-link" to="/shop" aria-label={`Shop this design: ${design.name}`}>
              <img
                className="design-gallery__image"
                src={design.image}
                alt={design.name}
                loading={index > 2 ? 'lazy' : 'eager'}
              />
              <span className="design-gallery__shop">Shop this design</span>
            </Link>
            <div className="design-gallery__details">
              <div>
                <span className="design-gallery__label">Author</span>
                <span>{design.author}</span>
              </div>
              <div>
                <span className="design-gallery__label">{design.time}</span>
                <span>{design.name}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
