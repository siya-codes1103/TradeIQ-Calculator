import { CalculatorConfig } from '../engine'

export const savingsGoalConfig: CalculatorConfig = {
  id: 'savings-goal',
  slug: 'savings-goal',
  title: 'Savings Goal Calculator',
  description: 'Find out exactly how much to save monthly to reach any financial goal',
  category: 'investing',
  icon: 'Target',
  inputs: [
    {
      id: 'goalAmount',
      label: 'Target Goal Amount',
      type: 'number',
      default: 1000000,
      prefix: '₹',
    },
    {
      id: 'currentSavings',
      label: 'Current Savings',
      type: 'number',
      default: 100000,
      prefix: '₹',
    },
    {
      id: 'years',
      label: 'Time to Achieve Goal',
      type: 'slider',
      default: 5,
      min: 1,
      max: 30,
      step: 1,
      unit: 'yrs',
    },
    {
      id: 'annualReturn',
      label: 'Expected Annual Return',
      type: 'slider',
      default: 12,
      min: 1,
      max: 25,
      step: 0.5,
      unit: '%',
    },
  ],
  formula: (inputs) => {
    const { goalAmount, currentSavings, years, annualReturn } = inputs
    const monthlyRate = annualReturn / 12 / 100
    const months = years * 12
    const fvCurrentSavings = currentSavings * Math.pow(1 + annualReturn / 100, years)
    const remainingGoal = goalAmount - fvCurrentSavings
    const monthlySavings = remainingGoal > 0
      ? remainingGoal * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1)
      : 0
    const totalSaved = monthlySavings * months + currentSavings
    const totalReturns = goalAmount - totalSaved
    return {
      primary: {
        label: 'Monthly Savings Needed',
        value: Math.max(0, Math.round(monthlySavings)),
        prefix: '₹',
      },
      metrics: [
        { label: 'Goal Amount', value: Math.round(goalAmount), prefix: '₹' },
        { label: 'Current Savings', value: Math.round(currentSavings), prefix: '₹' },
        { label: 'Total to Save', value: Math.max(0, Math.round(monthlySavings * months)), prefix: '₹' },
        { label: 'Returns Earned', value: Math.max(0, Math.round(totalReturns)), prefix: '₹' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const monthlyRate = inputs.annualReturn / 12 / 100
    const months = inputs.years * 12
    const fvCurrentSavings = inputs.currentSavings * Math.pow(1 + inputs.annualReturn / 100, inputs.years)
    const remainingGoal = inputs.goalAmount - fvCurrentSavings
    const monthlySavings = remainingGoal > 0
      ? remainingGoal * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1)
      : 0

    if (fvCurrentSavings >= inputs.goalAmount) {
      return [{ type: 'green', message: 'Your current savings alone will reach your goal! No additional monthly savings needed.' }]
    }
    if (monthlySavings > inputs.goalAmount * 0.1) {
      return [{ type: 'red', message: `Monthly savings of ₹${Math.round(monthlySavings).toLocaleString('en-IN')} is high. Consider extending your timeline or increasing expected returns.` }]
    }
    return [{ type: 'green', message: `Save ₹${Math.round(monthlySavings).toLocaleString('en-IN')} monthly and you will reach your goal of ₹${inputs.goalAmount.toLocaleString('en-IN')} in ${inputs.years} years.` }]
  },
  seo: {
    title: 'Savings Goal Calculator — Monthly Savings Planner | TradeVed',
    description: 'Calculate how much to save monthly to reach any financial goal. Free savings goal planner for Indian investors.',
    keywords: ['savings goal calculator', 'monthly savings calculator', 'financial goal planner india'],
    faqs: [
      {
        question: 'How much should I save monthly for ₹1 crore?',
        answer: 'At 12% annual return over 20 years, you need to save approximately ₹10,000 per month to accumulate ₹1 crore.',
      },
      {
        question: 'Does current savings affect monthly requirement?',
        answer: 'Yes. Existing savings compound over time and reduce the monthly amount you need to save to reach your goal.',
      },
    ],
  },
}