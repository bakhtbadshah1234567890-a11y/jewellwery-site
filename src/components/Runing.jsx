const standards = [
  'Lifetime manufacturing warranty',
  'Every piece crafted by hand',
  'Clarity and transparency at every step',
  'Made for a lifetime of wear',
]

function StandardGroup({ duplicate = false }) {
  return (
    <div className="standards-ticker__group" aria-hidden={duplicate}>
      {standards.map((standard) => (
        <span className="standards-ticker__item" key={standard}>
          <span className="standards-ticker__dot" aria-hidden="true" />
          <span>{standard}</span>
        </span>
      ))}
    </div>
  )
}

export default function Runing() {
  return (
    <>
      <section className="standards-ticker" aria-label="Our jewellery standards">
        <div className="standards-ticker__track">
          <StandardGroup />
          <StandardGroup duplicate />
        </div>
      </section>
      <section className="brand-intro" aria-labelledby="brand-intro-heading">
        <h2 id="brand-intro-heading">
          Time-honoured finery,
          <br />
          authored by you.
        </h2>
      </section>
    </>
  )
}