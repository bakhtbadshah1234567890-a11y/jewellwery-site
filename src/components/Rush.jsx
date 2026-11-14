import { useState } from 'react'
import { Link } from 'react-router-dom'

const publications = [
  {
    name: 'RUSSH',
    quote:
      '“Innovative jewellery brand is celebrating its Australian launch on September 30 with a one-day pop up at Prim Haus in Sydney.” – RUSSH',
    paragraphs: [
      'There will be more than 200 pieces available to try on, as well as access to GEMLY’s 3D configurator, so you can design your very own piece.',
    ],
    image: '/pics/rushh.webp',
    imageAlt: 'RUSSH magazine feature with a GEMLY ring',
  },
  {
    name: 'The Australian Women’s Weekly',
    quote:
      '“I’m newly divorced, and these 9 divorce rings are on my shortlist. I’ve started looking for something for the woman I am now, and there’s a name for it...a divorce ring.”',
    paragraphs: [
      'If I’m honest, this is the one. The Signature 5-Stone lifts each stone on its own prongs above the band, so you get five distinct points of light that still read as a single line. It’s elegant without trying too hard.',
      'Each ring is made to order, so you choose the metal, stone shape and colour yourself. I’m leaning towards rose gold with lab-grown sapphires, as I love a coloured stone.',
    ],
    image: '/pics/women.webp',
    imageAlt: 'The Australian Women’s Weekly feature showing diamond rings',
  },
  {
    name: 'Together Journal',
    quote:
      '“GEMLY’s digital configurator offers more than 250,000 possible combinations across metals, diamonds, gemstones, cuts, sizes and settings. Your selections are rendered in photorealistic 3D in real time, while the price changes as you make them.” – Together Journal',
    paragraphs: [
      'If a beautiful piece of jewellery has been sitting somewhere on your wish list, the timing of The GEMLY Experience in Sydney could hardly be better.',
    ],
    image: '/pics/together.webp',
    imageAlt: 'Together Journal feature with a GEMLY diamond ring',
  },
  {
    name: 'Elle',
    quote:
      '“According to Liam Whittaker, founder of jeweller GEMLY, ‘The centre stone looks to be a cushion-cut fancy yellow diamond, surrounded by a halo of white diamonds.’” – Elle',
    paragraphs: [
      'GEMLY founder, Liam Whittaker comments on the heirloom engagement ring of Milly Bobbie Brown. He adds, “The band appears to be either platinum or 18-karat white gold, with pavé-set white diamonds adding to the overall sparkle and presence of the ring.”',
    ],
    image: '/pics/elle.webp',
    imageAlt: 'Elle feature on an heirloom diamond engagement ring',
  },
  {
    name: 'marie claire',
    quote:
      '“A clever way to create something that feels genuinely personal, without the traditional fine jewellery price tag.” – marie claire',
    paragraphs: [
      'The digital-first brand lets you design your own piece from more than 250,000 combinations of metals, stones, cuts and settings (with a 3D rendering and live pricing as you build), so you can create something that feels entirely yours.',
    ],
    image: '/pics/marie.webp',
    imageAlt: 'marie claire feature showing a diamond necklace',
  },
  {
    name: 'Remix',
    quote:
      '“New Zealand business owner Liam Whittaker describes himself as ‘the least likely jewellery founder of all time’ – but then again, a fine jewellery brand that operates entirely online isn’t exactly the status quo.” – Remix',
    paragraphs: [
      'But it’s not only the online component that sets GEMLY apart. Its other unique selling point is that customers are handed creative control, with every component – from the metal to the gemstone to the cut to the carat – being completely customisable.',
    ],
    image: '/pics/remix.webp',
    imageAlt: 'Remix Magazine feature on GEMLY jewellery',
  },
  {
    name: 'Screenshot This',
    quote:
      '“I’ve been wearing them daily and have had so many questions about them from friends.” – Screenshot This, Australia’s most-read style Substack',
    paragraphs: [
      'Zara Wong shares her stacking hack: “For whatever mood you want to be in; earrings worn conventionally across two lobes reads pulled together and conventionally polished, but doubled on one ear gives it more of a twist. And more, eye-catching sparkle.”',
    ],
    image: '/pics/screen.webp',
    imageAlt: 'Screenshot This by Zara Wong feature on GEMLY earrings',
  },
  {
    name: 'NZ Herald',
    quote:
      '“An online jewellery store where customers can customise every detail – from metal and gemstone to cut, carat and engraving – with every choice visualised instantly and pricing updated in real time.” – NZ Herald',
    paragraphs: [
      'NZ Herald Business captures how the brand is aiming to reset the category by combining modern engineering with complete visibility and control over every stage of the process, from design and pricing through to production.',
    ],
    image: '/pics/nz.webp',
    imageAlt: 'NZ Herald feature on GEMLY jewellery',
  },
  {
    name: 'ausbiz',
    quote:
      '“GEMLY offers more than 250,000 configurable options online, with fully dynamic pricing that adjusts in real time to choices such as stone size, metal type and setting.” – ausbiz',
    paragraphs: [
      'Whittaker argues this transparency contrasts with traditional boutiques where prices are often opaque and the experience can feel overwhelming.',
    ],
    image: '/pics/ausbiz.webp',
    imageAlt: 'ausbiz feature on the GEMLY custom jewellery experience',
  },
  {
    name: 'Style Machine',
    quote: '“GEMLY’s Liam Whittaker on Lab-Grown Diamonds”',
    paragraphs: [
      'GEMLY is the made-to-order fine jewellery brand making lab-grown diamonds feel like a treat you’re allowed to buy yourself. It has just launched in Australia, and its tennis bracelets and pinky rings are already the pieces everyone wants.',
    ],
    image: '/pics/machine.webp',
    imageAlt: 'Style Machine feature with a woman wearing GEMLY jewellery',
  },
]

export default function Rush() {
  const [activePublication, setActivePublication] = useState(0)
  const active = publications[activePublication]

  return (
    <section className="press-feature" aria-labelledby="press-feature-title">
      <div className="press-feature__publications">
        <p className="press-feature__eyebrow">As seen in</p>
        <h2 className="visually-hidden" id="press-feature-title">
          GEMLY in the press
        </h2>
        <ul>
          {publications.map((publication, index) => {
            const isActive = activePublication === index

            return (
              <li className={isActive ? 'is-featured' : ''} key={publication.name}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActivePublication(index)}
                >
                  <span className="press-feature__bullet" aria-hidden="true">
                    {isActive ? '• ' : ''}
                  </span>
                  {publication.name}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="press-feature__story">
        {active.quote ? (
          <>
            <blockquote>{active.quote}</blockquote>
            {active.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <Link className="press-feature__read-more rounded-lg" to="/journal">
              Read more
            </Link>
          </>
        ) : (
          <p>More from {active.name} coming soon.</p>
        )}
      </div>

      {active.image ? (
        <img
          className="press-feature__image"
          src={active.image}
          alt={active.imageAlt}
          key={active.image}
        />
      ) : (
        <div className="press-feature__image-placeholder" aria-hidden="true" />
      )}
    </section>
  )
}
