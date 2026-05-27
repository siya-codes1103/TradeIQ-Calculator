import { CalculatorConfig } from '../engine'


export const compoundConfig: CalculatorConfig = {
  id: 'compound',
  slug: 'compound-interest',
  title: 'Compound Interest Calculator',
  description: 'Visualise how your money grows exponentially over time',
  category: 'investing',
  icon: 'TrendingUp',
  inputs: [
    { id: 'principal', label: 'Initial Investment', type: 'number', default: 100000, prefix: '₹' },
    { id: 'annualReturn', label: 'Annual Return Rate', type: 'slider', default: 12, min: 1, max: 30, step: 0.5, unit: '%' },
    { id: 'years', label: 'Investment Duration', type: 'slider', default: 20, min: 1, max: 40, step: 1, unit: 'yrs' },
    { id: 'monthlyContribution', label: 'Monthly Contribution', type: 'number', default: 0, prefix: '₹' },
  ],
  formula: (inputs) => {
    const { principal, annualReturn, years, monthlyContribution } = inputs
    const r = annualReturn / 100
    const n = years
    const fv = principal * Math.pow(1 + r, n)
    const monthlyRate = r / 12
    const months = n * 12
    const fvContributions = monthlyContribution > 0
      ? monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
      : 0
    const totalFV = fv + fvContributions
    const totalInvested = principal + monthlyContribution * months
    const totalGain = totalFV - totalInvested
    return {
      primary: { label: 'Final Corpus', value: Math.round(totalFV), prefix: '₹' },
      metrics: [
        { label: 'Total Invested', value: Math.round(totalInvested), prefix: '₹' },
        { label: 'Total Gain', value: Math.round(totalGain), prefix: '₹' },
        { label: 'Growth Multiple', value: Math.round((totalFV / totalInvested) * 10) / 10, unit: 'x' },
      ],
    }
  },
  insights: (_result, inputs) => {
    if (inputs.years >= 15) return [{ type: 'green', message: `Compounding accelerates after year 10. Your wealth grows faster from returns than contributions in the final years.` }]
    if (inputs.years < 5) return [{ type: 'amber', message: 'Short duration limits compounding effect. Consider longer investment horizon.' }]
    return [{ type: 'green', message: 'Good investment duration. Compounding will work in your favour.' }]
  },
  seo: {
    title: 'Compound Interest Calculator | TradeVed',
    description: 'Calculate compound interest on investments. Visualise exponential wealth growth over time.',
    keywords: ['compound interest calculator', 'compound growth calculator', 'investment growth calculator india'],
    faqs: [
      { question: 'How does compound interest work?', answer: 'Compound interest earns returns on both principal and accumulated interest, creating exponential growth.' },
      { question: 'What is the rule of 72?', answer: 'Divide 72 by annual return rate to estimate years to double money. At 12%, money doubles in 6 years.' },
    ],
  },
}