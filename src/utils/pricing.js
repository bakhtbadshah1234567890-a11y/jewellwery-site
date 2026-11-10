/**
 * Deterministic pricing utility for custom jewellery calculations
 */

export const METAL_PRICE_MODIFIERS = {
  '9K Yellow Gold': 0,
  '14K Yellow Gold': 220,
  '18K Yellow Gold': 540,
  '14K White Gold': 240,
  '18K White Gold': 560,
  '14K Rose Gold': 220,
  '18K Rose Gold': 540,
  'Platinum': 780,
}

export const GEMSTONE_PRICE_MODIFIERS = {
  'White Lab Diamond': 0,
  'Emerald': 180,
  'Sapphire': 150,
  'Ruby': 190,
}

export const CARAT_PRICE_MODIFIERS = {
  '0.50ct': 0,
  '0.75ct': 350,
  '1.00ct': 850,
  '1.50ct': 1650,
  '2.00ct': 2900,
  '2.50ct': 4400,
  '3.00ct': 6200,
}

/**
 * Calculates deterministic total price in NZD
 */
export function calculateCustomPrice({
  basePrice = 1500,
  metal = '9K Yellow Gold',
  gemstone = 'White Lab Diamond',
  carat = '0.50ct',
  engraving = '',
}) {
  const metalMod = METAL_PRICE_MODIFIERS[metal] ?? 0
  const gemMod = GEMSTONE_PRICE_MODIFIERS[gemstone] ?? 0
  const caratMod = CARAT_PRICE_MODIFIERS[carat] ?? 0
  const engravingMod = engraving && engraving.trim().length > 0 ? 45 : 0

  return Math.round(basePrice + metalMod + gemMod + caratMod + engravingMod)
}

export function formatNZD(amount) {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
    maximumFractionDigits: 0,
  }).format(amount)
}
