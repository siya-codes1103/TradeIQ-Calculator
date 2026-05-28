import { CalculatorConfig } from '../engine'

export const grahamNumberConfig: CalculatorConfig = {
  id: 'graham-number',
  slug: 'graham-number',
  title: 'Graham Number Calculator',
  description: 'Find the maximum fair price to pay for a stock using Benjamin Graham\'s formula',
  category: 'investing',
  icon: 'Scale',
  inputs: [
    {
      id: 'eps',
      label: 'Earnings Per Share (EPS)',
      type: 'number',
      default: 50,
      prefix: '₹',
    },
    {
      id: 'bookValue',
      label: 'Book Value Per Share',
      type: 'number',
      default: 300,
      prefix: '₹',
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
    const { eps, bookValue, currentPrice } = inputs
    const grahamNumber = Math.sqrt(22.5 * eps * bookValue)
    const discount = ((grahamNumber - currentPrice) / grahamNumber) * 100
    const peRatio = currentPrice / eps
    const pbRatio = currentPrice / bookValue
    return {
      primary: {
        label: 'Graham Number',
        value: Math.round(grahamNumber),
        prefix: '₹',
      },
      metrics: [
        { label: 'Current Price', value: Math.round(currentPrice), prefix: '₹' },
        { label: 'Discount / Premium', value: Math.round(discount), unit: '%' },
        { label: 'P/E Ratio', value: Math.round(peRatio * 10) / 10, unit: 'x' },
        { label: 'P/B Ratio', value: Math.round(pbRatio * 10) / 10, unit: 'x' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const grahamNumber = Math.sqrt(22.5 * inputs.eps * inputs.bookValue)
    const discount = ((grahamNumber - inputs.currentPrice) / grahamNumber) * 100
    const peRatio = inputs.currentPrice / inputs.eps
    const pbRatio = inputs.currentPrice / inputs.bookValue

    if (peRatio > 15 && pbRatio > 1.5) {
      return [{ type: 'red', message: `Stock violates Graham's criteria — P/E is ${peRatio.toFixed(1)}x (max 15) and P/B is ${pbRatio.toFixed(1)}x (max 1.5). Overvalued by Graham standards.` }]
    }
    if (discount > 20) {
      return [{ type: 'green', message: `Stock trades ${Math.round(discount)}% below Graham Number — a strong value signal. Graham recommended buying well below this number.` }]
    }
    if (discount > 0) {
      return [{ type: 'amber', message: `Stock trades below Graham Number but margin is thin (${Math.round(discount)}%). Look for 20%+ discount for safer entry.` }]
    }
    return [{ type: 'red', message: `Stock trades ${Math.abs(Math.round(discount))}% above Graham Number. Not a value buy at current price.` }]
  },
  seo: {
    title: 'Graham Number Calculator — Stock Valuation | TradeVed',
    description: 'Calculate Graham Number to find maximum fair price for any stock. Free Benjamin Graham stock valuation calculator.',
    keywords: ['graham number calculator', 'benjamin graham calculator', 'stock valuation calculator india'],
    faqs: [
      {
        question: 'What is the Graham Number?',
        answer: 'Graham Number = √(22.5 × EPS × Book Value). It represents the maximum price a defensive investor should pay for a stock based on Benjamin Graham\'s principles.',
      },
      {
        question: 'What are Graham\'s valuation criteria?',
        answer: 'Graham recommended: P/E ratio below 15, P/B ratio below 1.5, and the product of P/E and P/B below 22.5.',
      },
    ],
  },
}