import { CalculatorConfig } from '../engine'

export const ytmConfig: CalculatorConfig = {
  id: 'ytm',
  slug: 'ytm',
  title: 'YTM Calculator',
  description: 'Calculate Yield to Maturity for bonds and fixed income instruments',
  category: 'investing',
  icon: 'Landmark',
  inputs: [
    {
      id: 'faceValue',
      label: 'Face Value',
      type: 'number',
      default: 1000,
      prefix: '₹',
    },
    {
      id: 'couponRate',
      label: 'Annual Coupon Rate',
      type: 'slider',
      default: 8,
      min: 1,
      max: 20,
      step: 0.25,
      unit: '%',
    },
    {
      id: 'currentPrice',
      label: 'Current Market Price',
      type: 'number',
      default: 950,
      prefix: '₹',
    },
    {
      id: 'yearsToMaturity',
      label: 'Years to Maturity',
      type: 'slider',
      default: 5,
      min: 1,
      max: 30,
      step: 1,
      unit: 'yrs',
    },
  ],
  formula: (inputs) => {
    const { faceValue, couponRate, currentPrice, yearsToMaturity } = inputs
    const annualCoupon = faceValue * (couponRate / 100)
    // YTM approximation formula
    const ytm = (annualCoupon + (faceValue - currentPrice) / yearsToMaturity) /
      ((faceValue + currentPrice) / 2) * 100
    const currentYield = (annualCoupon / currentPrice) * 100
    const totalReturn = (annualCoupon * yearsToMaturity + (faceValue - currentPrice))
    return {
      primary: {
        label: 'Yield to Maturity',
        value: Math.round(ytm * 100) / 100,
        unit: '%',
      },
      metrics: [
        { label: 'Annual Coupon', value: Math.round(annualCoupon), prefix: '₹' },
        { label: 'Current Yield', value: Math.round(currentYield * 100) / 100, unit: '%' },
        { label: 'Total Return', value: Math.round(totalReturn), prefix: '₹' },
        { label: 'Years to Maturity', value: yearsToMaturity, unit: 'yrs' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const annualCoupon = inputs.faceValue * (inputs.couponRate / 100)
    const ytm = (annualCoupon + (inputs.faceValue - inputs.currentPrice) / inputs.yearsToMaturity) /
      ((inputs.faceValue + inputs.currentPrice) / 2) * 100

    if (inputs.currentPrice < inputs.faceValue) {
      return [{ type: 'green', message: `Bond trading at discount (below face value). YTM of ${ytm.toFixed(2)}% is higher than coupon rate — better than stated return.` }]
    }
    if (inputs.currentPrice > inputs.faceValue) {
      return [{ type: 'amber', message: `Bond trading at premium (above face value). YTM of ${ytm.toFixed(2)}% is lower than coupon rate — actual return is less than stated.` }]
    }
    return [{ type: 'green', message: `Bond trading at par. YTM equals coupon rate of ${inputs.couponRate}%.` }]
  },
  seo: {
    title: 'YTM Calculator — Yield to Maturity | TradeVed',
    description: 'Calculate yield to maturity for any bond. Free YTM calculator for Indian bond investors.',
    keywords: ['ytm calculator', 'yield to maturity calculator', 'bond yield calculator india'],
    faqs: [
      {
        question: 'What is Yield to Maturity?',
        answer: 'YTM is the total return expected on a bond if held until maturity, accounting for coupon payments and any gain/loss from buying below/above face value.',
      },
      {
        question: 'Why is YTM different from coupon rate?',
        answer: 'YTM differs from coupon rate when a bond trades at a discount or premium. If you buy below face value, YTM > coupon rate. If above, YTM < coupon rate.',
      },
    ],
  },
}