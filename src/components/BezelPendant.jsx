import { Link } from 'react-router-dom'

const pendants = [
  {
    title: 'Pear EW - White Lab Diamond - 14K Rose Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Pear_EW___WLD___14K_RG_no_bg.png',
    hoverImg: '/pics/pendants/Pear_EW___WLD___14K_RG_ANGLE_no_bg.png',
  },
  {
    title: 'Pear NS - Blue Sapphire - 14K White Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Pear_NS___RBS___14K_WG_no_bg.png',
    hoverImg: '/pics/pendants/Pear_NS___RBS___14K_WG_ANGLE_no_bg.png',
  },
  {
    title: 'Emerald EW - White Lab Diamond - 14K Yellow Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Emerald_EW___WLD___14K_YG_no_bg.png',
    hoverImg: '/pics/pendants/Emerald_EW___WLD___14K_YG_ANGLE_no_bg.png',
  },
  {
    title: 'Emerald EW - Green Emerald - 14K White Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Emerald_EW___ZEM___14K_WG_no_bg.png',
    hoverImg: '/pics/pendants/Emerald_EW___ZEM___14K_WG_ANGLE_no_bg.png',
  },
  {
    title: 'Marquise EW - White Lab Diamond - 14K White Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Marquise_EW___WLD___14K_WG_no_bg.png',
    hoverImg: '/pics/pendants/Marquise_EW___WLD___14K_WG_ANGLE_no_bg.png',
  },
  {
    title: 'Marquise EW - Red Ruby - 14K Yellow Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Marquise_EW___PBR___14K_YG_no_bg.png',
    hoverImg: '/pics/pendants/Marquise_EW___PBR___14K_YG_ANGLE_no_bg.png',
  },
  {
    title: 'Marquise EW - Blue Sapphire - 14K White Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Marquise_EW___RBS___14K_WG_no_bg.png',
    hoverImg: '/pics/pendants/Marquise_EW___RBS___14K_WG_ANGLE_no_bg.png',
  },
  {
    title: 'Cushion - White Lab Diamond - 14K Yellow Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Cushion___WLD___14K_YG_no_bg.png',
    hoverImg: '/pics/pendants/Cushion___WLD___14K_YG_ANGLE_no_bg.png',
  },
  {
    title: 'Cushion - Green Emerald - 14K Yellow Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Cushion___ZEM___14K_YG_no_bg.png',
    hoverImg: '/pics/pendants/Cushion___ZEM___14K_YG_ANGLE_no_bg.png',
  },
  {
    title: 'Round - White Lab Diamond - 14K Rose Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Round___WLD___14K_RG_no_bg.png',
    hoverImg: '/pics/pendants/Round___WLD___14K_RG_ANGLE_no_bg.png',
  },
  {
    title: 'Round - Blue Sapphire - 14K White Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Round___RBS___14K_WG_no_bg.png',
    hoverImg: '/pics/pendants/Round___RBS___14K_WG_ANGLE_no_bg.png',
  },
  {
    title: 'Round - White Lab Diamond - 14K Yellow Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Round___WLD___14K_YG_no_bg.png',
    hoverImg: '/pics/pendants/Round___WLD___14K_YG_ANGLE_no_bg.png',
  },
  {
    title: 'Round - Green Emerald - 14K White Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Round___ZEM___14K_WG_no_bg.png',
    hoverImg: '/pics/pendants/Round___ZEM___14K_WG_ANGLE_no_bg.png',
  },
  {
    title: 'Heart - White Lab Diamond - 14K Yellow Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Heart___WLD___14K_YG_no_bg.png',
    hoverImg: '/pics/pendants/Heart___WLD___14K_YG_ANGLE_no_bg.png',
  },
  {
    title: 'Heart - Red Ruby - 14K Yellow Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Heart___PBR___14K_YG_no_bg.png',
    hoverImg: '/pics/pendants/Heart___PBR___14K_YG_ANGLE_no_bg.png',
  },
  {
    title: 'Oval EW - White Lab Diamond - 14K White Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Oval_EW___WLD___14K_WG_no_bg.png',
    hoverImg: '/pics/pendants/Oval_EW___WLD___14K_WG_ANGLE_no_bg.png',
  },
  {
    title: 'Oval EW - Green Emerald - 14K Yellow Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Oval_EW___ZEM___14K_YG_no_bg.png',
    hoverImg: '/pics/pendants/Oval_EW___ZEM___14K_YG_ANGLE_no_bg.png',
  },
  {
    title: 'Oval EW - Red Ruby - 14K Yellow Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Oval_EW___PBR___14K_YG_no_bg.png',
    hoverImg: '/pics/pendants/Oval_EW___PBR___14K_YG_ANGLE_no_bg.png',
  },
  {
    title: 'Pear EW - Green Emerald - 14K Yellow Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Pear_EW___ZEM___14K_YG_no_bg.png',
    hoverImg: '/pics/pendants/Pear_EW___ZEM___14K_YG_ANGLE_no_bg.png',
  },
  {
    title: 'Pear NS - White Lab Diamond - 14K Yellow Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Pear_NS___WLD___14K_YG_no_bg.png',
    hoverImg: '/pics/pendants/Pear_NS___WLD___14K_YG_ANGLE_no_bg.png',
  },
  {
    title: 'Emerald EW - Red Ruby - 14K Yellow Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Emerald_EW___PBR___14K_YG_no_bg.png',
    hoverImg: '/pics/pendants/Emerald_EW___PBR___14K_YG_ANGLE_no_bg.png',
  },
  {
    title: 'Cushion - White Lab Diamond - 14K Rose Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Cushion___WLD___14K_RG_no_bg.png',
    hoverImg: '/pics/pendants/Cushion___WLD___14K_RG_ANGLE_no_bg.png',
  },
  {
    title: 'Heart - White Lab Diamond - 14K White Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Heart___WLD___14K_WG_no_bg.png',
    hoverImg: '/pics/pendants/Heart___WLD___14K_WG_ANGLE_no_bg.png',
  },
  {
    title: 'Cushion - Blue Sapphire - 14K White Gold',
    href: '/shop?cat=PENDANTS',
    defaultImg: '/pics/pendants/Cushion___RBS___14K_WG_no_bg.png',
    hoverImg: '/pics/pendants/Cushion___RBS___14K_WG_ANGLE_no_bg.png',
  },
]

export default function BezelPendant() {
  return (
    <section className="bg-white" aria-labelledby="pendant-collection-title">
      {/* Header Container */}
      <div className="pt-20 sm:pt-24 lg:pt-28 pb-8 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-6">
          <h2
            id="pendant-collection-title"
            className="text-4xl sm:text-5xl lg:text-[62px] font-normal tracking-tight text-neutral-900 leading-[1.05]"
          >
            Collection: Bezel Pendant
          </h2>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
            <div className="flex items-center gap-10 font-mono text-[11px] sm:text-xs uppercase tracking-wider">
              <div>
                <span className="text-neutral-400 block mb-0.5">family</span>
                <span className="text-neutral-900 font-medium">pendant</span>
              </div>
              <div>
                <span className="text-neutral-400 block mb-0.5">setting</span>
                <span className="text-neutral-900 font-medium">bezel</span>
              </div>
            </div>

            <div>
              <Link
                to="/shop?cat=PENDANTS"
                className="inline-flex items-center justify-center border border-neutral-900 px-7 py-3 font-mono text-xs uppercase tracking-wider font-semibold text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white"
              >
                design yours
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 8-Column Grid of 24 Pendants */}
      <div className="w-full">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-[3px] bg-[#e5e5e5] p-[3px]">
          {pendants.map((item, idx) => (
            <Link
              key={idx}
              to={item.href}
              className="group relative aspect-[173/216] bg-[#f6f6f6] flex items-center justify-center p-3 sm:p-4 overflow-hidden transition-colors hover:bg-[#eceae6]"
            >
              <img
                src={item.defaultImg}
                alt={item.title}
                className="h-full w-full object-contain p-2 sm:p-3 transition-opacity duration-300 group-hover:opacity-0"
                loading="lazy"
              />
              <img
                src={item.hoverImg}
                alt={`${item.title} angled`}
                className="absolute inset-0 h-full w-full object-contain p-2 sm:p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Full-width Editorial Banner */}
      <div className="w-full overflow-hidden">
        <img
          src="/pics/bezel-pendant-banner.png"
          alt="Collection: Bezel Pendant Editorial Banner"
          className="w-full h-auto min-h-[360px] sm:min-h-[460px] lg:min-h-[620px] object-cover"
          loading="lazy"
        />
      </div>
    </section>
  )
}
