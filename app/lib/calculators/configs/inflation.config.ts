import { CalculatorConfig } from '../engine'

export const inflationConfig: CalculatorConfig = {
  id: 'inflation',
  slug: 'inflation',
  title: 'Inflation Calculator',
  description: 'See how inflation erodes purchasing power over time',
  category: 'investing',
  icon: 'Wind',
  inputs: [
    {
      id: 'currentValue',
      label: 'Current Amount',
      type: 'number',
      default: 1000000,
      prefix: '₹',
    },
    {
      id: 'inflationRate',
      label: 'Annual Inflation Rate',
      type: 'slider',
      default: 6,
      min: 1,
      max: 15,
      step: 0.5,
      unit: '%',
    },
    {
      id: 'years',
      label: 'Time Period',
      type: 'slider',
      default: 20,
      min: 1,
      max: 50,
      step: 1,
      unit: 'yrs',
    },
  ],
  formula: (inputs) => {
    const { currentValue, inflationRate, years } = inputs
    const futurePrice = currentValue * Math.pow(1 + inflationRate / 100, years)
    const realValue = currentValue / Math.pow(1 + inflationRate / 100, years)
    const purchasingPowerLost = ((futurePrice - currentValue) / futurePrice) * 100
    return {
      primary: {
        label: 'Future Price of Today\'s ₹1L',
        value: Math.round(futurePrice),
        prefix: '₹',
      },
      metrics: [
        { label: 'Real Value Today', value: Math.round(realValue), prefix: '₹' },
        { label: 'Purchasing Power Lost', value: Math.round(purchasingPowerLost), unit: '%' },
        { label: 'Years', value: years, unit: 'yrs' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const futurePrice = inputs.currentValue * Math.pow(1 + inputs.inflationRate / 100, inputs.years)
    const purchasingPowerLost = ((futurePrice - inputs.currentValue) / futurePrice) * 100
    if (purchasingPowerLost > 70) {
      return [{ type: 'red', message: `At ${inputs.inflationRate}% inflation, your money loses ${Math.round(purchasingPowerLost)}% purchasing power in ${inputs.years} years. Invest aggressively to beat inflation.` }]
    }
    if (purchasingPowerLost > 50) {
      return [{ type: 'amber', message: `Significant purchasing power erosion. Ensure your investments return more than ${inputs.inflationRate}% annually.` }]
    }
    return [{ type: 'green', message: 'Moderate inflation impact. Keep your investments growing above inflation rate.' }]
  },
  seo: {
    title: 'Inflation Calculator India | TradeVed',
    description: 'Calculate how inflation erodes purchasing power over time. Free inflation impact calculator for India.',
    keywords: ['inflation calculator india', 'purchasing power calculator', 'inflation impact calculator'],
    faqs: [
      {
        question: 'What is India\'s average inflation rate?',
        answer: 'India\'s average CPI inflation has been around 5-7% over the past decade. Use 6% as a conservative estimate for long-term planning.',
      },
    ],
  },
}