import { CalculatorConfig } from '../engine'

export const sipConfig: CalculatorConfig = {
  id: 'sip',
  slug: 'sip',
  title: 'SIP Calculator',
  description: 'Calculate returns on your monthly SIP investments',
  category: 'investing',
  badge: 'HIGH TRAFFIC',
  icon: 'CalendarCheck',
  inputs: [
    { id: 'monthlyAmount', label: 'Monthly SIP Amount', type: 'number', default: 5000, prefix: '₹' },
    { id: 'annualReturn', label: 'Expected Annual Return', type: 'slider', default: 12, min: 1, max: 30, step: 0.5, unit: '%' },
    { id: 'years', label: 'Investment Duration', type: 'slider', default: 15, min: 1, max: 40, step: 1, unit: 'yrs' },
  ],
  formula: (inputs) => {
    const { monthlyAmount, annualReturn, years } = inputs
    const r = annualReturn / 12 / 100
    const n = years * 12
    const fv = monthlyAmount * (((1 + r) ** n - 1) / r) * (1 + r)
    const invested = monthlyAmount * n
    const gained = fv - invested
    return {
      primary: { label: 'Maturity Value', value: Math.round(fv), prefix: '₹' },
      metrics: [
        { label: 'Total Invested', value: Math.round(invested), prefix: '₹' },
        { label: 'Wealth Gained', value: Math.round(gained), prefix: '₹' },
        { label: 'Duration', value: years, unit: 'yrs' },
      ],
    }
  },
  insights: (_result, inputs) => {
    if (inputs.years < 10) return [{ type: 'amber', message: 'SIP returns compound significantly after 10+ years. Consider extending duration.' }]
    if (inputs.annualReturn > 20) return [{ type: 'amber', message: 'Returns above 20% are aggressive estimates. Use 12% for realistic projections.' }]
    return [{ type: 'green', message: 'Great choice. Long-term SIP builds serious wealth through compounding.' }]
  },
  seo: {
    title: 'SIP Calculator — Monthly SIP Returns | TradeVed',
    description: 'Calculate SIP returns accurately. Get maturity value and compounding projections for free.',
    keywords: ['sip calculator', 'sip return calculator', 'monthly sip calculator india'],
    faqs: [
      { question: 'What is a SIP calculator?', answer: 'Estimates returns on monthly SIP investments based on expected return rate and duration.' },
      { question: 'How much can I earn with ₹5000 SIP?', answer: 'At 12% for 15 years, approximately ₹25 lakhs.' },
    ],
  },
}