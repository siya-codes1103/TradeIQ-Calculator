import { CalculatorConfig } from '../engine'

export const retirementConfig: CalculatorConfig = {
  id: 'retirement',
  slug: 'retirement',
  title: 'Retirement Calculator',
  description: 'Calculate how much corpus you need for a comfortable retirement',
  category: 'investing',
  icon: 'Sunset',
  inputs: [
    {
      id: 'currentAge',
      label: 'Current Age',
      type: 'slider',
      default: 30,
      min: 20,
      max: 60,
      step: 1,
      unit: 'yrs',
    },
    {
      id: 'retirementAge',
      label: 'Retirement Age',
      type: 'slider',
      default: 60,
      min: 45,
      max: 70,
      step: 1,
      unit: 'yrs',
    },
    {
      id: 'monthlyExpense',
      label: 'Monthly Expense Today',
      type: 'number',
      default: 50000,
      prefix: '₹',
    },
    {
      id: 'currentSavings',
      label: 'Current Savings',
      type: 'number',
      default: 500000,
      prefix: '₹',
    },
    {
      id: 'monthlyInvestment',
      label: 'Monthly Investment',
      type: 'number',
      default: 20000,
      prefix: '₹',
    },
    {
      id: 'expectedReturn',
      label: 'Expected Return',
      type: 'slider',
      default: 12,
      min: 6,
      max: 20,
      step: 0.5,
      unit: '%',
    },
    {
      id: 'inflationRate',
      label: 'Inflation Rate',
      type: 'slider',
      default: 6,
      min: 3,
      max: 10,
      step: 0.5,
      unit: '%',
    },
  ],
  formula: (inputs) => {
    const {
      currentAge, retirementAge, monthlyExpense,
      currentSavings, monthlyInvestment, expectedReturn, inflationRate,
    } = inputs
    const yearsToRetirement = retirementAge - currentAge
    const inflatedExpense = monthlyExpense * Math.pow(1 + inflationRate / 100, yearsToRetirement)
    const corpusNeeded = inflatedExpense * 12 * 25
    const monthlyRate = expectedReturn / 12 / 100
    const months = yearsToRetirement * 12
    const fvSavings = currentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement)
    const fvSIP = monthlyInvestment * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate)
    const projectedCorpus = fvSavings + fvSIP
    const gap = corpusNeeded - projectedCorpus
    return {
      primary: {
        label: 'Corpus Needed',
        value: Math.round(corpusNeeded),
        prefix: '₹',
      },
      metrics: [
        { label: 'Projected Corpus', value: Math.round(projectedCorpus), prefix: '₹' },
        { label: 'Gap / Surplus', value: Math.round(Math.abs(gap)), prefix: gap > 0 ? '-₹' : '+₹' },
        { label: 'Years to Retire', value: yearsToRetirement, unit: 'yrs' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const yearsToRetirement = inputs.retirementAge - inputs.currentAge
    const inflatedExpense = inputs.monthlyExpense * Math.pow(1 + inputs.inflationRate / 100, yearsToRetirement)
    const corpusNeeded = inflatedExpense * 12 * 25
    const monthlyRate = inputs.expectedReturn / 12 / 100
    const months = yearsToRetirement * 12
    const fvSavings = inputs.currentSavings * Math.pow(1 + inputs.expectedReturn / 100, yearsToRetirement)
    const fvSIP = inputs.monthlyInvestment * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate)
    const projectedCorpus = fvSavings + fvSIP
    const gap = corpusNeeded - projectedCorpus
    if (gap > 0) {
      return [{ type: 'red', message: `You are ₹${Math.round(gap).toLocaleString('en-IN')} short of your retirement goal. Increase monthly investment to close the gap.` }]
    }
    return [{ type: 'green', message: `You are on track for retirement. Projected surplus of ₹${Math.round(Math.abs(gap)).toLocaleString('en-IN')}.` }]
  },
  seo: {
    title: 'Retirement Calculator India | TradeVed',
    description: 'Calculate retirement corpus needed and check if you are on track. Free retirement planning calculator for India.',
    keywords: ['retirement calculator india', 'retirement corpus calculator', 'retirement planning calculator'],
    faqs: [
      {
        question: 'How much corpus do I need to retire?',
        answer: 'Use the 25x rule: multiply your annual expenses at retirement by 25. This corpus, invested at 4% withdrawal rate, lasts 30+ years.',
      },
      {
        question: 'What is the 4% rule?',
        answer: 'The 4% rule suggests withdrawing 4% of your corpus annually in retirement. This means you need 25x your annual expenses as corpus.',
      },
    ],
  },
}