import { CalculatorConfig } from '../engine'


export const emiConfig: CalculatorConfig = {
  id: 'emi',
  slug: 'emi',
  title: 'EMI Calculator',
  description: 'Calculate monthly EMI for home, car or personal loans',
  category: 'investing',
  badge: 'HIGH TRAFFIC',
  icon: 'Home',
  inputs: [
    { id: 'loanAmount', label: 'Loan Amount', type: 'number', default: 2000000, prefix: '₹' },
    { id: 'annualRate', label: 'Annual Interest Rate', type: 'slider', default: 8.5, min: 1, max: 20, step: 0.1, unit: '%' },
    { id: 'tenureMonths', label: 'Loan Tenure', type: 'slider', default: 240, min: 12, max: 360, step: 12, unit: 'months' },
  ],
  formula: (inputs) => {
    const { loanAmount, annualRate, tenureMonths } = inputs
    const r = annualRate / 12 / 100
    const emi = r > 0
      ? loanAmount * r * Math.pow(1 + r, tenureMonths) / (Math.pow(1 + r, tenureMonths) - 1)
      : loanAmount / tenureMonths
    const totalPayment = emi * tenureMonths
    const totalInterest = totalPayment - loanAmount
    return {
      primary: { label: 'Monthly EMI', value: Math.round(emi), prefix: '₹' },
      metrics: [
        { label: 'Total Payment', value: Math.round(totalPayment), prefix: '₹' },
        { label: 'Total Interest', value: Math.round(totalInterest), prefix: '₹' },
        { label: 'Interest %', value: Math.round((totalInterest / loanAmount) * 100), unit: '%' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const r = inputs.annualRate / 12 / 100
    const emi = inputs.loanAmount * r * Math.pow(1 + r, inputs.tenureMonths) / (Math.pow(1 + r, inputs.tenureMonths) - 1)
    const totalInterest = emi * inputs.tenureMonths - inputs.loanAmount
    const interestPct = (totalInterest / inputs.loanAmount) * 100
    if (interestPct > 100) return [{ type: 'red', message: `You will pay ₹${Math.round(totalInterest).toLocaleString('en-IN')} in interest — more than the loan amount. Consider shorter tenure.` }]
    if (interestPct > 50) return [{ type: 'amber', message: `Total interest is ${Math.round(interestPct)}% of loan amount. Prepaying early saves significantly.` }]
    return [{ type: 'green', message: 'Reasonable interest burden. Prepaying in early years saves the most.' }]
  },
  seo: {
    title: 'EMI Calculator — Home Loan, Car Loan | TradeVed',
    description: 'Calculate monthly EMI for any loan. Free EMI calculator for home loan, car loan and personal loan in India.',
    keywords: ['emi calculator', 'home loan emi calculator', 'car loan emi calculator', 'emi calculator india'],
    faqs: [
      { question: 'How is EMI calculated?', answer: 'EMI = P × r × (1+r)^n / ((1+r)^n - 1) where P is principal, r is monthly rate, n is tenure in months.' },
      { question: 'How to reduce EMI?', answer: 'Increase tenure, negotiate lower rate, or make a larger down payment to reduce principal.' },
    ],
  },
}