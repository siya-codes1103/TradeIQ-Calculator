import { CalculatorConfig } from '../engine'

export const marginConfig: CalculatorConfig = {
  id: 'margin',
  slug: 'margin',
  title: 'Margin Calculator',
  description: 'Calculate margin required for F&O positions on NSE/BSE',
  category: 'trading',
  icon: 'Layers',
  inputs: [
    {
      id: 'lotSize',
      label: 'Lot Size',
      type: 'number',
      default: 50,
      unit: 'units',
    },
    {
      id: 'currentPrice',
      label: 'Current Price',
      type: 'number',
      default: 500,
      prefix: '₹',
    },
    {
      id: 'marginPercent',
      label: 'Margin Required',
      type: 'slider',
      default: 20,
      min: 5,
      max: 50,
      step: 1,
      unit: '%',
    },
    {
      id: 'numberOfLots',
      label: 'Number of Lots',
      type: 'number',
      default: 1,
      unit: 'lots',
    },
  ],
  formula: (inputs) => {
    const { lotSize, currentPrice, marginPercent, numberOfLots } = inputs
    const contractValue = lotSize * currentPrice * numberOfLots
    const marginRequired = contractValue * (marginPercent / 100)
    const exposureValue = contractValue
    return {
      primary: {
        label: 'Margin Required',
        value: Math.round(marginRequired),
        prefix: '₹',
      },
      metrics: [
        { label: 'Contract Value', value: Math.round(contractValue), prefix: '₹' },
        { label: 'Exposure Value', value: Math.round(exposureValue), prefix: '₹' },
        { label: 'Margin %', value: marginPercent, unit: '%' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const contractValue = inputs.lotSize * inputs.currentPrice * inputs.numberOfLots
    const marginRequired = contractValue * (inputs.marginPercent / 100)
    if (inputs.numberOfLots > 5) {
      return [{ type: 'amber', message: `Trading ${inputs.numberOfLots} lots blocks ₹${Math.round(marginRequired).toLocaleString('en-IN')} in margin. Ensure sufficient capital buffer.` }]
    }
    return [{ type: 'green', message: 'Margin requirement looks manageable. Always keep 20% extra buffer.' }]
  },
  seo: {
    title: 'Margin Calculator for F&O Trading | TradeVed',
    description: 'Calculate margin required for futures and options trading on NSE/BSE. Free F&O margin calculator.',
    keywords: ['margin calculator', 'f&o margin calculator', 'futures margin calculator india'],
    faqs: [
      {
        question: 'What is margin in F&O trading?',
        answer: 'Margin is the minimum capital required to take a futures or options position. It is a percentage of the total contract value.',
      },
      {
        question: 'How is F&O margin calculated?',
        answer: 'Margin = Lot Size × Current Price × Number of Lots × Margin %. SEBI mandates minimum margins for all F&O contracts.',
      },
    ],
  },
}