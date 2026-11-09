const necklaceImage = '/pics/necklace.jpg'

export default function Necklace() {
  return (
    <section className="necklace-feature" aria-label="Bespoke necklace design">
      <img className="necklace-feature__background" src={necklaceImage} alt="" />
      <div className="necklace-feature__shade" />

      <p className="necklace-feature__story">
        Fine jewellery has long been shaped by convention,
        <br className="hidden sm:block" /> placing the decision in everyone&apos;s hands but yours.
        <br className="hidden sm:block" /> HEIREST resets that standard: modern engineering,
        <br className="hidden sm:block" /> with a reverence for craft to create timeless pieces
        <br className="hidden sm:block" /> with total transparency.
      </p>

      <h2 className="necklace-feature__headline">
        For those who choose to author what
        <br className="hidden sm:block" /> others inherit.
      </h2>

      <a className="necklace-feature__product" href="#bespoke">
        <img src={necklaceImage} alt="Diamond necklace on a dark display" />
        <span className="necklace-feature__product-copy">
          <span className="necklace-feature__product-name">
            Bezel graduated tennis necklace - 9k yellow gold
          </span>
          <span>White lab diamond / 8tcw</span>
          <span className="necklace-feature__shop">Shop this design</span>
        </span>
      </a>
    </section>
  )
}
