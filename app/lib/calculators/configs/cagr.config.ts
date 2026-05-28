import { CalculatorConfig } from '../engine'

export const cagrConfig: CalculatorConfig = {
  id: 'cagr',
  slug: 'cagr',
  title: 'CAGR Calculator',
  description: 'Calculate the compound annual growth rate of any investment',
  category: 'investing',
  icon: 'TrendingUp',
  inputs: [
    {
      id: 'initialValue',
      label: 'Initial Investment Value',
      type: 'number',
      default: 100000,
      prefix: '₹',
    },
    {
      id: 'finalValue',
      label: 'Final Investment Value',
      type: 'number',
      default: 200000,
      prefix: '₹',
    },
    {
      id: 'years',
      label: 'Investment Duration',
      type: 'slider',
      default: 5,
      min: 1,
      max: 30,
      step: 1,
      unit: 'yrs',
    },
  ],
  formula: (inputs) => {
    const { initialValue, finalValue, years } = inputs
    const cagr = (Math.pow(finalValue / initialValue, 1 / years) - 1) * 100
    const absoluteReturn = ((finalValue - initialValue) / initialValue) * 100
    const totalGain = finalValue - initialValue
    return {
      primary: {
        label: 'CAGR',
        value: Math.round(cagr * 100) / 100,
        unit: '%',
      },
      metrics: [
        { label: 'Initial Value', value: Math.round(initialValue), prefix: '₹' },
        { label: 'Final Value', value: Math.round(finalValue), prefix: '₹' },
        { label: 'Total Gain', value: Math.round(totalGain), prefix: '₹' },
        { label: 'Absolute Return', value: Math.round(absoluteReturn * 100) / 100, unit: '%' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const cagr = (Math.pow(inputs.finalValue / inputs.initialValue, 1 / inputs.years) - 1) * 100
    if (cagr < 0) {
      return [{ type: 'red', message: 'Negative CAGR — this investment lost value over time. Review your investment strategy.' }]
    }
    if (cagr < 6) {
      return [{ type: 'amber', message: `CAGR of ${cagr.toFixed(1)}% is below inflation (6%). Your real returns are negative.` }]
    }
    if (cagr < 12) {
      return [{ type: 'amber', message: `CAGR of ${cagr.toFixed(1)}% is decent but below typical equity market returns of 12-15%.` }]
    }
    return [{ type: 'green', message: `Excellent CAGR of ${cagr.toFixed(1)}%. This beats most market benchmarks.` }]
  },
  seo: {
    title: 'CAGR Calculator — Compound Annual Growth Rate | TradeVed',
    description: 'Calculate CAGR of any investment. Free compound annual growth rate calculator for Indian investors.',
    keywords: ['cagr calculator', 'compound annual growth rate calculator', 'investment return calculator india'],
    faqs: [
      {
        question: 'What is CAGR?',
        answer: 'CAGR (Compound Annual Growth Rate) is the rate at which an investment grows annually to reach its final value from its initial value over a given period.',
      },
      {
        question: 'What is a good CAGR?',
        answer: 'A CAGR above 12% is considered good for equity investments in India. Above 15% is excellent. Below 6% means you are losing to inflation.',
      },
      {
        question: 'How is CAGR different from absolute return?',
        answer: 'Absolute return shows total % gain regardless of time. CAGR normalizes it to an annual rate, making it easy to compare investments of different durations.',
      },
    ],
  },
}