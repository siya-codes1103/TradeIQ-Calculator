import { CalculatorConfig } from '../engine'

export const dcfConfig: CalculatorConfig = {
  id: 'dcf',
  slug: 'dcf',
  title: 'DCF Fair Value Calculator',
  description: 'Calculate the intrinsic value of any stock using Discounted Cash Flow analysis',
  category: 'investing',
  icon: 'BarChart2',
  inputs: [
    {
      id: 'currentEPS',
      label: 'Current EPS (₹)',
      type: 'number',
      default: 50,
      prefix: '₹',
    },
    {
      id: 'growthRate',
      label: 'Expected Growth Rate (5 yrs)',
      type: 'slider',
      default: 15,
      min: 1,
      max: 40,
      step: 0.5,
      unit: '%',
    },
    {
      id: 'terminalGrowth',
      label: 'Terminal Growth Rate',
      type: 'slider',
      default: 3,
      min: 1,
      max: 8,
      step: 0.5,
      unit: '%',
    },
    {
      id: 'discountRate',
      label: 'Discount Rate (WACC)',
      type: 'slider',
      default: 12,
      min: 8,
      max: 20,
      step: 0.5,
      unit: '%',
    },
    {
      id: 'currentPrice',
      label: 'Current Market Price',
      type: 'number',
      default: 500,
      prefix: '₹',
    },
  ],
  formula: (inputs) => {
    const { currentEPS, growthRate, terminalGrowth, discountRate, currentPrice } = inputs
    const g = growthRate / 100
    const r = discountRate / 100
    const tg = terminalGrowth / 100
    let totalPV = 0
    let eps = currentEPS
    for (let y = 1; y <= 10; y++) {
      eps = eps * (1 + g)
      totalPV += eps / Math.pow(1 + r, y)
    }
    const terminalValue = (eps * (1 + tg)) / (r - tg)
    const pvTerminal = terminalValue / Math.pow(1 + r, 10)
    const intrinsicValue = totalPV + pvTerminal
    const marginOfSafety = ((intrinsicValue - currentPrice) / intrinsicValue) * 100
    const upside = ((intrinsicValue - currentPrice) / currentPrice) * 100
    return {
      primary: {
        label: 'Intrinsic Value',
        value: Math.round(intrinsicValue),
        prefix: '₹',
      },
      metrics: [
        { label: 'Current Price', value: Math.round(currentPrice), prefix: '₹' },
        { label: 'Margin of Safety', value: Math.round(marginOfSafety), unit: '%' },
        { label: 'Upside / Downside', value: Math.round(upside), unit: '%' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const g = inputs.growthRate / 100
    const r = inputs.discountRate / 100
    const tg = inputs.terminalGrowth / 100
    let totalPV = 0
    let eps = inputs.currentEPS
    for (let y = 1; y <= 10; y++) {
      eps = eps * (1 + g)
      totalPV += eps / Math.pow(1 + r, y)
    }
    const terminalValue = (eps * (1 + tg)) / (r - tg)
    const pvTerminal = terminalValue / Math.pow(1 + r, 10)
    const intrinsicValue = totalPV + pvTerminal
    const marginOfSafety = ((intrinsicValue - inputs.currentPrice) / intrinsicValue) * 100

    if (marginOfSafety > 30) {
      return [{ type: 'green', message: `Stock appears undervalued with ${Math.round(marginOfSafety)}% margin of safety. Benjamin Graham recommended minimum 25-30% margin of safety.` }]
    }
    if (marginOfSafety > 0) {
      return [{ type: 'amber', message: `Stock is slightly undervalued (${Math.round(marginOfSafety)}% margin of safety) but below the recommended 25% threshold.` }]
    }
    return [{ type: 'red', message: `Stock appears overvalued — trading ${Math.abs(Math.round(marginOfSafety))}% above intrinsic value. Wait for a better entry price.` }]
  },
  seo: {
    title: 'DCF Calculator — Stock Intrinsic Value | TradeVed',
    description: 'Calculate fair value of any stock using DCF analysis. Free discounted cash flow calculator for Indian investors.',
    keywords: ['dcf calculator', 'intrinsic value calculator', 'stock fair value calculator india', 'discounted cash flow calculator'],
    faqs: [
      {
        question: 'What is DCF analysis?',
        answer: 'DCF (Discounted Cash Flow) estimates a stock\'s intrinsic value by projecting future earnings and discounting them to present value using a required rate of return.',
      },
      {
        question: 'What discount rate should I use?',
        answer: 'Most analysts use 10-15% for Indian stocks. Use 12% as a starting point — this represents your minimum expected annual return.',
      },
      {
        question: 'What is margin of safety?',
        answer: 'Margin of safety is the % difference between intrinsic value and current price. Benjamin Graham recommended buying only when margin of safety exceeds 25-30%.',
      },
    ],
  },
}