import { CalculatorConfig } from '../engine'

export const netWorthConfig: CalculatorConfig = {
  id: 'net-worth',
  slug: 'net-worth',
  title: 'Net Worth Calculator',
  description: 'Calculate your total net worth — all assets minus all liabilities',
  category: 'investing',
  icon: 'BarChart2',
  inputs: [
    {
      id: 'cash',
      label: 'Cash & Bank Balance',
      type: 'number',
      default: 200000,
      prefix: '₹',
    },
    {
      id: 'equity',
      label: 'Stocks & Mutual Funds',
      type: 'number',
      default: 500000,
      prefix: '₹',
    },
    {
      id: 'realEstate',
      label: 'Real Estate Value',
      type: 'number',
      default: 5000000,
      prefix: '₹',
    },
    {
      id: 'gold',
      label: 'Gold & Jewellery',
      type: 'number',
      default: 300000,
      prefix: '₹',
    },
    {
      id: 'otherAssets',
      label: 'Other Assets (FD, PF etc)',
      type: 'number',
      default: 500000,
      prefix: '₹',
    },
    {
      id: 'homeLoan',
      label: 'Home Loan Outstanding',
      type: 'number',
      default: 2000000,
      prefix: '₹',
    },
    {
      id: 'otherLoans',
      label: 'Other Loans & Credit Cards',
      type: 'number',
      default: 200000,
      prefix: '₹',
    },
  ],
  formula: (inputs) => {
    const { cash, equity, realEstate, gold, otherAssets, homeLoan, otherLoans } = inputs
    const totalAssets = cash + equity + realEstate + gold + otherAssets
    const totalLiabilities = homeLoan + otherLoans
    const netWorth = totalAssets - totalLiabilities
    const debtRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0
    return {
      primary: {
        label: 'Net Worth',
        value: Math.round(netWorth),
        prefix: '₹',
      },
      metrics: [
        { label: 'Total Assets', value: Math.round(totalAssets), prefix: '₹' },
        { label: 'Total Liabilities', value: Math.round(totalLiabilities), prefix: '₹' },
        { label: 'Debt-to-Asset Ratio', value: Math.round(debtRatio), unit: '%' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const totalAssets = inputs.cash + inputs.equity + inputs.realEstate + inputs.gold + inputs.otherAssets
    const totalLiabilities = inputs.homeLoan + inputs.otherLoans
    const netWorth = totalAssets - totalLiabilities
    const debtRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0

    if (netWorth < 0) {
      return [{ type: 'red', message: 'Your liabilities exceed your assets. Focus on paying down high-interest debt immediately.' }]
    }
    if (debtRatio > 50) {
      return [{ type: 'red', message: `Debt is ${Math.round(debtRatio)}% of your assets. This is high. Work on reducing liabilities.` }]
    }
    if (debtRatio > 30) {
      return [{ type: 'amber', message: `Debt ratio of ${Math.round(debtRatio)}% is moderate. Keep reducing loans to improve financial health.` }]
    }
    return [{ type: 'green', message: `Healthy net worth of ₹${Math.round(netWorth).toLocaleString('en-IN')}. Debt ratio is well under control at ${Math.round(debtRatio)}%.` }]
  },
  seo: {
    title: 'Net Worth Calculator India | TradeVed',
    description: 'Calculate your total net worth across all assets and liabilities. Free net worth calculator for Indian investors.',
    keywords: ['net worth calculator india', 'personal net worth calculator', 'assets liabilities calculator'],
    faqs: [
      {
        question: 'What is net worth?',
        answer: 'Net worth = Total Assets − Total Liabilities. It represents your true financial position at any point in time.',
      },
      {
        question: 'What is a good net worth by age in India?',
        answer: 'A common benchmark: your net worth should be at least your annual income × your age ÷ 10. At 30 with ₹10L income, target ₹30L net worth.',
      },
      {
        question: 'Should I include home value in net worth?',
        answer: 'Yes, but subtract the outstanding home loan. Only include the equity portion (current value − loan outstanding).',
      },
    ],
  },
}