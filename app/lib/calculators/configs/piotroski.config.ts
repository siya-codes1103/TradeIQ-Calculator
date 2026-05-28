import { CalculatorConfig } from '../engine'

export const piotroskiConfig: CalculatorConfig = {
  id: 'piotroski',
  slug: 'piotroski',
  title: 'Piotroski F-Score Calculator',
  description: 'Score a company\'s financial health across 9 criteria — 0 to 9',
  category: 'investing',
  icon: 'BarChart2',
  inputs: [
    {
      id: 'netIncome',
      label: 'Net Income (positive = 1)',
      type: 'slider',
      default: 1,
      min: 0,
      max: 1,
      step: 1,
      unit: '',
    },
    {
      id: 'operatingCashflow',
      label: 'Operating Cashflow Positive',
      type: 'slider',
      default: 1,
      min: 0,
      max: 1,
      step: 1,
      unit: '',
    },
    {
      id: 'roaImproved',
      label: 'ROA Improved YoY',
      type: 'slider',
      default: 1,
      min: 0,
      max: 1,
      step: 1,
      unit: '',
    },
    {
      id: 'cashflowVsIncome',
      label: 'Cashflow > Net Income',
      type: 'slider',
      default: 1,
      min: 0,
      max: 1,
      step: 1,
      unit: '',
    },
    {
      id: 'leverageReduced',
      label: 'Long-term Debt Reduced',
      type: 'slider',
      default: 1,
      min: 0,
      max: 1,
      step: 1,
      unit: '',
    },
    {
      id: 'liquidityImproved',
      label: 'Current Ratio Improved',
      type: 'slider',
      default: 0,
      min: 0,
      max: 1,
      step: 1,
      unit: '',
    },
    {
      id: 'noNewShares',
      label: 'No New Shares Issued',
      type: 'slider',
      default: 1,
      min: 0,
      max: 1,
      step: 1,
      unit: '',
    },
    {
      id: 'grossMarginImproved',
      label: 'Gross Margin Improved',
      type: 'slider',
      default: 0,
      min: 0,
      max: 1,
      step: 1,
      unit: '',
    },
    {
      id: 'assetTurnoverImproved',
      label: 'Asset Turnover Improved',
      type: 'slider',
      default: 1,
      min: 0,
      max: 1,
      step: 1,
      unit: '',
    },
  ],
  formula: (inputs) => {
    const score = Object.values(inputs).reduce((sum, val) => sum + val, 0)
    const profitability = (inputs.netIncome || 0) + (inputs.operatingCashflow || 0) + (inputs.roaImproved || 0) + (inputs.cashflowVsIncome || 0)
    const leverage = (inputs.leverageReduced || 0) + (inputs.liquidityImproved || 0) + (inputs.noNewShares || 0)
    const efficiency = (inputs.grossMarginImproved || 0) + (inputs.assetTurnoverImproved || 0)
    return {
      primary: {
        label: 'Piotroski F-Score',
        value: Math.round(score),
        unit: '/ 9',
      },
      metrics: [
        { label: 'Profitability', value: Math.round(profitability), unit: '/ 4' },
        { label: 'Leverage', value: Math.round(leverage), unit: '/ 3' },
        { label: 'Efficiency', value: Math.round(efficiency), unit: '/ 2' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const score = Object.values(inputs).reduce((sum, val) => sum + val, 0)
    if (score >= 8) {
      return [{ type: 'green', message: `Strong F-Score of ${score}/9 — company shows excellent financial health across profitability, leverage and efficiency criteria.` }]
    }
    if (score >= 6) {
      return [{ type: 'green', message: `Good F-Score of ${score}/9 — company is financially healthy. Scores above 6 indicate strong fundamentals.` }]
    }
    if (score >= 3) {
      return [{ type: 'amber', message: `Moderate F-Score of ${score}/9 — mixed financial signals. Review each criteria carefully before investing.` }]
    }
    return [{ type: 'red', message: `Weak F-Score of ${score}/9 — company shows poor financial health. Piotroski scores below 3 are considered high risk.` }]
  },
  seo: {
    title: 'Piotroski F-Score Calculator | TradeVed',
    description: 'Calculate Piotroski F-Score to assess company financial health. Free stock analysis tool for Indian investors.',
    keywords: ['piotroski f score calculator', 'piotroski score', 'fundamental analysis calculator india'],
    faqs: [
      {
        question: 'What is the Piotroski F-Score?',
        answer: 'The Piotroski F-Score is a number from 0-9 that measures a company\'s financial strength across 9 criteria covering profitability, leverage, and efficiency.',
      },
      {
        question: 'What is a good Piotroski F-Score?',
        answer: 'Score 8-9: Strong. Score 6-7: Good. Score 3-5: Average. Score 0-2: Weak. Investors often buy stocks with scores 7-9 and avoid scores 0-2.',
      },
    ],
  },
}