import { CalculatorConfig } from '../engine'

export const portfolioAllocationConfig: CalculatorConfig = {
  id: 'portfolio-allocation',
  slug: 'portfolio-allocation',
  title: 'Portfolio Allocation Calculator',
  description: 'Check your asset allocation and get rebalancing suggestions',
  category: 'investing',
  icon: 'PieChart',
  inputs: [
    {
      id: 'equity',
      label: 'Equity (Stocks/MF)',
      type: 'number',
      default: 500000,
      prefix: '₹',
    },
    {
      id: 'debt',
      label: 'Debt (FD/Bonds)',
      type: 'number',
      default: 200000,
      prefix: '₹',
    },
    {
      id: 'gold',
      label: 'Gold',
      type: 'number',
      default: 100000,
      prefix: '₹',
    },
    {
      id: 'crypto',
      label: 'Crypto',
      type: 'number',
      default: 50000,
      prefix: '₹',
    },
    {
      id: 'cash',
      label: 'Cash / Liquid',
      type: 'number',
      default: 150000,
      prefix: '₹',
    },
  ],
  formula: (inputs) => {
    const { equity, debt, gold, crypto, cash } = inputs
    const total = equity + debt + gold + crypto + cash
    const equityPct = total > 0 ? (equity / total) * 100 : 0
    const debtPct = total > 0 ? (debt / total) * 100 : 0
    const goldPct = total > 0 ? (gold / total) * 100 : 0
    const cryptoPct = total > 0 ? (crypto / total) * 100 : 0
    const riskScore = Math.round((equityPct * 1 + cryptoPct * 1.5 + goldPct * 0.3 + debtPct * 0.1 + ((cash / total) * 100) * 0.1))
    return {
      primary: {
        label: 'Total Portfolio',
        value: Math.round(total),
        prefix: '₹',
      },
      metrics: [
        { label: 'Equity %', value: Math.round(equityPct), unit: '%' },
        { label: 'Debt %', value: Math.round(debtPct), unit: '%' },
        { label: 'Gold %', value: Math.round(goldPct), unit: '%' },
        { label: 'Risk Score', value: Math.min(riskScore, 100), unit: '/100' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const total = inputs.equity + inputs.debt + inputs.gold + inputs.crypto + inputs.cash
    const equityPct = (inputs.equity / total) * 100
    const cryptoPct = (inputs.crypto / total) * 100
    if (cryptoPct > 20) {
      return [{ type: 'red', message: `Crypto is ${Math.round(cryptoPct)}% of your portfolio. Most advisors recommend keeping crypto below 5-10% due to high volatility.` }]
    }
    if (equityPct > 80) {
      return [{ type: 'amber', message: `Portfolio is ${Math.round(equityPct)}% equity. Consider adding some debt for stability, especially if nearing financial goals.` }]
    }
    return [{ type: 'green', message: 'Balanced allocation. Review quarterly and rebalance if any asset class drifts more than 5% from target.' }]
  },
  seo: {
    title: 'Portfolio Allocation Calculator | TradeVed',
    description: 'Check your asset allocation across equity, debt, gold and crypto. Get rebalancing suggestions.',
    keywords: ['portfolio allocation calculator', 'asset allocation calculator india', 'portfolio rebalancing calculator'],
    faqs: [
      {
        question: 'What is the ideal asset allocation?',
        answer: 'A common rule: 100 minus your age in equity. A 30-year-old would hold 70% equity, 20% debt, 10% gold. Adjust based on risk tolerance.',
      },
    ],
  },
}