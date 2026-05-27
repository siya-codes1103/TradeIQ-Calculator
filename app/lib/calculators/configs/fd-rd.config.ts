import { CalculatorConfig } from '../engine'

export const fdRdConfig: CalculatorConfig = {
  id: 'fd-rd',
  slug: 'fd-rd',
  title: 'FD / RD Calculator',
  description: 'Calculate maturity amount for Fixed Deposits and Recurring Deposits',
  category: 'investing',
  icon: 'Landmark',
  inputs: [
    {
      id: 'principal',
      label: 'Principal Amount',
      type: 'number',
      default: 100000,
      prefix: '₹',
    },
    {
      id: 'annualRate',
      label: 'Annual Interest Rate',
      type: 'slider',
      default: 7,
      min: 3,
      max: 10,
      step: 0.1,
      unit: '%',
    },
    {
      id: 'tenureMonths',
      label: 'Tenure',
      type: 'slider',
      default: 12,
      min: 1,
      max: 120,
      step: 1,
      unit: 'months',
    },
    {
      id: 'compoundingFrequency',
      label: 'Compounding (times/year)',
      type: 'slider',
      default: 4,
      min: 1,
      max: 12,
      step: 1,
      unit: 'x/yr',
    },
    {
      id: 'taxSlab',
      label: 'Tax Slab',
      type: 'slider',
      default: 30,
      min: 0,
      max: 30,
      step: 10,
      unit: '%',
    },
  ],
  formula: (inputs) => {
    const { principal, annualRate, tenureMonths, compoundingFrequency, taxSlab } = inputs
    const r = annualRate / 100 / compoundingFrequency
    const n = compoundingFrequency * (tenureMonths / 12)
    const maturity = principal * Math.pow(1 + r, n)
    const interest = maturity - principal
    const taxOnInterest = interest * (taxSlab / 100)
    const postTaxInterest = interest - taxOnInterest
    const postTaxMaturity = principal + postTaxInterest
    const effectiveYield = (postTaxInterest / principal) / (tenureMonths / 12) * 100
    return {
      primary: {
        label: 'Maturity Amount',
        value: Math.round(maturity),
        prefix: '₹',
      },
      metrics: [
        { label: 'Interest Earned', value: Math.round(interest), prefix: '₹' },
        { label: 'Post-Tax Maturity', value: Math.round(postTaxMaturity), prefix: '₹' },
        { label: 'Effective Yield', value: Math.round(effectiveYield * 100) / 100, unit: '%' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const realReturn = inputs.annualRate - 6
    if (realReturn < 0) {
      return [{ type: 'red', message: `FD rate of ${inputs.annualRate}% is below 6% inflation. Your real return is negative. Consider equity investments for better inflation-adjusted returns.` }]
    }
    if (inputs.taxSlab === 30) {
      return [{ type: 'amber', message: 'At 30% tax slab, FD interest is heavily taxed. Consider tax-saving alternatives like ELSS or PPF.' }]
    }
    return [{ type: 'green', message: `Post-tax return looks reasonable. FD is a safe option for capital preservation.` }]
  },
  seo: {
    title: 'FD Calculator — Fixed Deposit Returns | TradeVed',
    description: 'Calculate FD maturity amount with tax. Free fixed deposit and recurring deposit calculator India.',
    keywords: ['fd calculator', 'fixed deposit calculator india', 'rd calculator', 'recurring deposit calculator'],
    faqs: [
      {
        question: 'Is FD interest taxable?',
        answer: 'Yes. FD interest is added to your income and taxed at your applicable slab rate. TDS is deducted at 10% if interest exceeds ₹40,000 per year.',
      },
      {
        question: 'Which bank offers best FD rates?',
        answer: 'Small finance banks like AU, Jana, and Ujjivan often offer higher FD rates (7.5-9%) compared to PSU banks (6.5-7.5%).',
      },
    ],
  },
}