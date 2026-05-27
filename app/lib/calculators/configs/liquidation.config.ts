import { CalculatorConfig } from '../engine'


export const liquidationConfig: CalculatorConfig = {
  id: 'liquidation',
  slug: 'liquidation',
  title: 'Liquidation Calculator',
  description: 'Find your exact liquidation price for crypto leverage trades',
  category: 'crypto',
  badge: 'CRITICAL',
  icon: 'AlertOctagon',
  inputs: [
    { id: 'entryPrice', label: 'Entry Price', type: 'number', default: 50000, prefix: '$' },
    { id: 'leverage', label: 'Leverage', type: 'slider', default: 10, min: 1, max: 125, step: 1, unit: 'x' },
    { id: 'accountBalance', label: 'Account Balance', type: 'number', default: 1000, prefix: '$' },
    { id: 'positionType', label: 'Position Type (1=Long, 0=Short)', type: 'slider', default: 1, min: 0, max: 1, step: 1 },
  ],
  formula: (inputs) => {
    const { entryPrice, leverage, accountBalance, positionType } = inputs
    const maintenanceMargin = 0.004
    const isLong = positionType === 1
    const liquidationPrice = isLong
      ? entryPrice * (1 - 1 / leverage + maintenanceMargin)
      : entryPrice * (1 + 1 / leverage - maintenanceMargin)
    const distancePct = Math.abs((liquidationPrice - entryPrice) / entryPrice) * 100
    const marginUsed = accountBalance / leverage
    return {
      primary: { label: 'Liquidation Price', value: Math.round(liquidationPrice), prefix: '$' },
      metrics: [
        { label: 'Distance to Liq.', value: Math.round(distancePct * 100) / 100, unit: '%' },
        { label: 'Margin Used', value: Math.round(marginUsed), prefix: '$' },
        { label: 'Leverage', value: leverage, unit: 'x' },
      ],
    }
  },
  insights: (_result, inputs) => {
    if (inputs.leverage > 20) return [{ type: 'red', message: `At ${inputs.leverage}x leverage, a ${(100 / inputs.leverage).toFixed(1)}% adverse move liquidates your position. Extremely high risk.` }]
    if (inputs.leverage > 10) return [{ type: 'amber', message: `High leverage warning. At ${inputs.leverage}x, small moves can cause significant losses.` }]
    return [{ type: 'green', message: 'Conservative leverage. Position has reasonable buffer before liquidation.' }]
  },
  seo: {
    title: 'Crypto Liquidation Calculator | TradeVed',
    description: 'Calculate exact liquidation price for crypto leverage trades on Binance, Bybit and OKX.',
    keywords: ['liquidation calculator', 'crypto liquidation price', 'binance liquidation calculator'],
    faqs: [
      { question: 'What is liquidation in crypto?', answer: 'Liquidation occurs when losses exceed margin. Exchange forcibly closes position to prevent negative balance.' },
    ],
  },
}