import { CalculatorConfig } from '../engine'

export const cryptoFuturesConfig: CalculatorConfig = {
  id: 'crypto-futures',
  slug: 'crypto-futures',
  title: 'Crypto Futures Calculator',
  description: 'Calculate P&L, margin and liquidation for crypto perpetual futures',
  category: 'crypto',
  icon: 'Bitcoin',
  inputs: [
    {
      id: 'entryPrice',
      label: 'Entry Price',
      type: 'number',
      default: 50000,
      prefix: '$',
    },
    {
      id: 'exitPrice',
      label: 'Exit Price',
      type: 'number',
      default: 55000,
      prefix: '$',
    },
    {
      id: 'leverage',
      label: 'Leverage',
      type: 'slider',
      default: 10,
      min: 1,
      max: 125,
      step: 1,
      unit: 'x',
    },
    {
      id: 'collateral',
      label: 'Collateral (USDT)',
      type: 'number',
      default: 1000,
      prefix: '$',
    },
    {
      id: 'positionType',
      label: 'Long=1 / Short=0',
      type: 'slider',
      default: 1,
      min: 0,
      max: 1,
      step: 1,
    },
  ],
  formula: (inputs) => {
    const { entryPrice, exitPrice, leverage, collateral, positionType } = inputs
    const isLong = positionType === 1
    const positionSize = collateral * leverage
    const contracts = positionSize / entryPrice
    const pnl = isLong
      ? (exitPrice - entryPrice) * contracts
      : (entryPrice - exitPrice) * contracts
    const pnlPercent = (pnl / collateral) * 100
    const maintenanceMargin = 0.004
    const liquidationPrice = isLong
      ? entryPrice * (1 - 1 / leverage + maintenanceMargin)
      : entryPrice * (1 + 1 / leverage - maintenanceMargin)
    return {
      primary: {
        label: isLong ? 'Long P&L' : 'Short P&L',
        value: Math.round(pnl * 100) / 100,
        prefix: '$',
      },
      metrics: [
        { label: 'P&L %', value: Math.round(pnlPercent * 100) / 100, unit: '%' },
        { label: 'Position Size', value: Math.round(positionSize), prefix: '$' },
        { label: 'Liquidation', value: Math.round(liquidationPrice), prefix: '$' },
      ],
    }
  },
  insights: (_result, inputs) => {
    if (inputs.leverage > 20) {
      return [{ type: 'red', message: `At ${inputs.leverage}x leverage, a ${(100 / inputs.leverage).toFixed(1)}% move liquidates your position. Extremely high risk.` }]
    }
    if (inputs.leverage > 10) {
      return [{ type: 'amber', message: `High leverage of ${inputs.leverage}x. Small price moves cause large P&L swings.` }]
    }
    return [{ type: 'green', message: 'Conservative leverage. Good risk management.' }]
  },
  seo: {
    title: 'Crypto Futures Calculator — P&L & Liquidation | TradeVed',
    description: 'Calculate crypto futures P&L, margin and liquidation price for Binance, Bybit and OKX.',
    keywords: ['crypto futures calculator', 'binance futures calculator', 'perpetual futures pnl calculator'],
    faqs: [
      {
        question: 'How is crypto futures P&L calculated?',
        answer: 'P&L = (Exit Price - Entry Price) × Position Size / Entry Price. For shorts, the formula is reversed.',
      },
    ],
  },
}