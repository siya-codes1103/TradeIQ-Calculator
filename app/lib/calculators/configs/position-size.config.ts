import { CalculatorConfig } from '../engine'

export const positionSizeConfig: CalculatorConfig = {
  id: 'position-size',
  slug: 'position-size',
  title: 'Position Size Calculator',
  description: 'Calculate exact shares to buy based on your risk tolerance',
  category: 'trading',
  badge: 'MOST USED',
  icon: 'Target',
  inputs: [
    { id: 'accountSize', label: 'Account Size', type: 'number', default: 100000, prefix: '₹' },
    { id: 'riskPercent', label: 'Risk Per Trade', type: 'slider', default: 2, min: 0.5, max: 10, step: 0.25, unit: '%' },
    { id: 'entryPrice', label: 'Entry Price', type: 'number', default: 500, prefix: '₹' },
    { id: 'stopLoss', label: 'Stop Loss Price', type: 'number', default: 480, prefix: '₹' },
    { id: 'targetPrice', label: 'Target Price', type: 'number', default: 540, prefix: '₹' },
  ],
  formula: (inputs) => {
    const { accountSize, riskPercent, entryPrice, stopLoss, targetPrice } = inputs
    const riskAmount = accountSize * (riskPercent / 100)
    const diff = Math.abs(entryPrice - stopLoss)
    const positionSize = diff > 0 ? Math.floor(riskAmount / diff) : 0
    const tradeValue = positionSize * entryPrice
    const potentialProfit = (targetPrice - entryPrice) * positionSize
    const rrRatio = riskAmount > 0 ? potentialProfit / riskAmount : 0
    return {
      primary: { label: 'Position Size', value: positionSize, unit: 'shares' },
      metrics: [
        { label: 'Risk Amount', value: Math.round(riskAmount), prefix: '₹' },
        { label: 'Trade Value', value: Math.round(tradeValue), prefix: '₹' },
        { label: 'Potential Profit', value: Math.round(potentialProfit), prefix: '₹' },
        { label: 'Risk:Reward', value: Math.round(rrRatio * 100) / 100, unit: 'R:R' },
      ],
    }
  },
  insights: (_result, inputs) => {
    if (inputs.riskPercent > 5) return [{ type: 'red', message: 'Risk exceeds 5%. Professional standard is 1–2% per trade. Reduce your position size.' }]
    if (inputs.riskPercent > 2) return [{ type: 'amber', message: 'Moderate risk. Consider reducing to 1–2% for long-term capital preservation.' }]
    return [{ type: 'green', message: 'Risk within professional standards. Well-sized position.' }]
  },
  seo: {
    title: 'Position Size Calculator for Traders | TradeVed',
    description: 'Calculate exact position size based on account size, risk % and stop loss. Free trading calculator for Indian traders.',
    keywords: ['position size calculator', 'lot size calculator', 'risk calculator trading india'],
    faqs: [
      { question: 'How to calculate position size?', answer: 'Position size = (Account × Risk%) ÷ (Entry − Stop Loss).' },
      { question: 'What is ideal risk per trade?', answer: 'Professional traders risk 1–2% per trade for long-term survival.' },
    ],
  },
}