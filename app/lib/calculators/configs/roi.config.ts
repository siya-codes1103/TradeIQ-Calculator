import { CalculatorConfig } from '../engine'

export const roiConfig: CalculatorConfig = {
  id: 'roi',
  slug: 'roi',
  title: 'ROI Calculator',
  description: 'Calculate return on investment for any asset',
  category: 'investing',
  icon: 'BarChart2',
  inputs: [
    { id: 'investmentAmount', label: 'Investment Amount', type: 'number', default: 100000, prefix: '₹' },
    { id: 'finalValue', label: 'Final Value', type: 'number', default: 150000, prefix: '₹' },
    { id: 'years', label: 'Holding Period', type: 'slider', default: 3, min: 0.5, max: 30, step: 0.5, unit: 'yrs' },
  ],
  formula: (inputs) => {
    const { investmentAmount, finalValue, years } = inputs
    const absoluteReturn = finalValue - investmentAmount
    const roiPct = investmentAmount > 0 ? (absoluteReturn / investmentAmount) * 100 : 0
    const cagr = investmentAmount > 0 && years > 0
      ? (Math.pow(finalValue / investmentAmount, 1 / years) - 1) * 100
      : 0
    return {
      primary: { label: 'ROI', value: Math.round(roiPct * 100) / 100, unit: '%' },
      metrics: [
        { label: 'Absolute Return', value: Math.round(absoluteReturn), prefix: '₹' },
        { label: 'CAGR', value: Math.round(cagr * 100) / 100, unit: '%' },
        { label: 'Holding Period', value: years, unit: 'yrs' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const roiPct = ((inputs.finalValue - inputs.investmentAmount) / inputs.investmentAmount) * 100
    const cagr = (Math.pow(inputs.finalValue / inputs.investmentAmount, 1 / inputs.years) - 1) * 100
    if (roiPct < 0) return [{ type: 'red', message: 'Investment is in loss. Review your strategy.' }]
    if (cagr < 8) return [{ type: 'amber', message: `CAGR of ${cagr.toFixed(1)}% is below inflation-adjusted returns. Consider better alternatives.` }]
    return [{ type: 'green', message: `CAGR of ${cagr.toFixed(1)}% beats typical market benchmarks.` }]
  },
  seo: {
    title: 'ROI Calculator — Return on Investment | TradeVed',
    description: 'Calculate ROI and CAGR for any investment. Free return on investment calculator India.',
    keywords: ['roi calculator', 'return on investment calculator', 'cagr calculator india'],
    faqs: [
      { question: 'What is CAGR?', answer: 'Compound Annual Growth Rate — the annualized return of an investment over a period, accounting for compounding.' },
    ],
  },
}