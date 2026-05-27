import { CalculatorConfig } from '../engine'


export const riskRewardConfig: CalculatorConfig = {
  id: 'risk-reward',
  slug: 'risk-reward',
  title: 'Risk Reward Calculator',
  description: 'Analyse trade quality before entering any position',
  category: 'trading',
  badge: 'POPULAR',
  icon: 'Scale',
  inputs: [
    { id: 'entryPrice', label: 'Entry Price', type: 'number', default: 500, prefix: '₹' },
    { id: 'stopLoss', label: 'Stop Loss', type: 'number', default: 480, prefix: '₹' },
    { id: 'targetPrice', label: 'Target Price', type: 'number', default: 560, prefix: '₹' },
    { id: 'quantity', label: 'Quantity', type: 'number', default: 100, unit: 'shares' },
  ],
  formula: (inputs) => {
    const { entryPrice, stopLoss, targetPrice, quantity } = inputs
    const risk = Math.abs(entryPrice - stopLoss) * quantity
    const reward = Math.abs(targetPrice - entryPrice) * quantity
    const rrRatio = risk > 0 ? reward / risk : 0
    const breakEvenWinRate = rrRatio > 0 ? (1 / (1 + rrRatio)) * 100 : 0
    return {
      primary: { label: 'Risk:Reward Ratio', value: Math.round(rrRatio * 100) / 100, unit: ':1' },
      metrics: [
        { label: 'Max Risk', value: Math.round(risk), prefix: '₹' },
        { label: 'Max Reward', value: Math.round(reward), prefix: '₹' },
        { label: 'Break-even Win Rate', value: Math.round(breakEvenWinRate), unit: '%' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const risk = Math.abs(inputs.entryPrice - inputs.stopLoss)
    const reward = Math.abs(inputs.targetPrice - inputs.entryPrice)
    const rr = risk > 0 ? reward / risk : 0
    if (rr < 1.5) return [{ type: 'red', message: `Poor setup. R:R of 1:${rr.toFixed(1)} requires ${Math.round(100/(1+rr))}% win rate to break even.` }]
    if (rr < 2) return [{ type: 'amber', message: 'Marginal setup. Most professionals require minimum 1:2 R:R before entry.' }]
    return [{ type: 'green', message: `Strong setup. At 1:${rr.toFixed(1)}, you only need ${Math.round(100/(1+rr))}% win rate to be profitable.` }]
  },
  seo: {
    title: 'Risk Reward Calculator for Traders | TradeVed',
    description: 'Calculate risk reward ratio for any trade setup. Analyse trade quality before entry.',
    keywords: ['risk reward calculator', 'rr ratio calculator', 'trade setup analyser'],
    faqs: [
      { question: 'What is a good risk reward ratio?', answer: 'Minimum 1:2. Professional traders prefer 1:3 or higher.' },
      { question: 'What is break-even win rate?', answer: 'The minimum win rate needed for a strategy to be profitable given the R:R ratio.' },
    ],
  },
}