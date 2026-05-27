import { CalculatorConfig } from '../engine'


export const pnlConfig: CalculatorConfig = {
  id: 'pnl',
  slug: 'pnl',
  title: 'P&L Calculator',
  description: 'Calculate real profit after brokerage, STT and taxes',
  category: 'trading',
  badge: 'POPULAR',
  icon: 'TrendingUp',
  inputs: [
    { id: 'buyPrice', label: 'Buy Price', type: 'number', default: 500, prefix: '₹' },
    { id: 'sellPrice', label: 'Sell Price', type: 'number', default: 550, prefix: '₹' },
    { id: 'quantity', label: 'Quantity', type: 'number', default: 100, unit: 'shares' },
    { id: 'brokerageRate', label: 'Brokerage per side', type: 'number', default: 20, prefix: '₹' },
  ],
  formula: (inputs) => {
    const { buyPrice, sellPrice, quantity, brokerageRate } = inputs
    const buyValue = buyPrice * quantity
    const sellValue = sellPrice * quantity
    const grossPnl = sellValue - buyValue
    const totalBrokerage = brokerageRate * 2
    const stt = sellValue * 0.00025
    const exchangeCharges = (buyValue + sellValue) * 0.0000345
    const gst = (totalBrokerage + exchangeCharges) * 0.18
    const totalCharges = totalBrokerage + stt + exchangeCharges + gst
    const netPnl = grossPnl - totalCharges
    const returnPct = buyValue > 0 ? (netPnl / buyValue) * 100 : 0
    return {
      primary: { label: 'Net P&L', value: Math.round(netPnl), prefix: '₹' },
      metrics: [
        { label: 'Gross P&L', value: Math.round(grossPnl), prefix: '₹' },
        { label: 'Total Charges', value: Math.round(totalCharges), prefix: '₹' },
        { label: 'Net Return', value: Math.round(returnPct * 100) / 100, unit: '%' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const buyValue = inputs.buyPrice * inputs.quantity
    const sellValue = inputs.sellPrice * inputs.quantity
    const grossPnl = sellValue - buyValue
    const totalBrokerage = inputs.brokerageRate * 2
    const totalCharges = totalBrokerage * 1.18
    if (grossPnl > 0 && grossPnl < totalCharges) return [{ type: 'red', message: 'Charges exceed gross profit. This trade results in a net loss after costs.' }]
    if (grossPnl < 0) return [{ type: 'red', message: 'Trade is in loss. Review your setup before entering similar positions.' }]
    return [{ type: 'green', message: 'Profitable trade after all charges.' }]
  },
  seo: {
    title: 'P&L Calculator for Traders India | TradeVed',
    description: 'Calculate real profit and loss after brokerage, STT and exchange charges for NSE/BSE trades.',
    keywords: ['pnl calculator', 'profit loss calculator india', 'trading pnl calculator nse'],
    faqs: [
      { question: 'What charges are included in P&L?', answer: 'Brokerage, STT (Securities Transaction Tax), exchange transaction charges, GST and SEBI charges.' },
    ],
  },
}