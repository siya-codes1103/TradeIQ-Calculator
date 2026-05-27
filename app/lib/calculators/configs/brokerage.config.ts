import { CalculatorConfig } from '../engine'

export const brokerageConfig: CalculatorConfig = {
  id: 'brokerage',
  slug: 'brokerage',
  title: 'Brokerage Calculator',
  description: 'Calculate exact trading costs across Indian brokers',
  category: 'trading',
  icon: 'Receipt',
  inputs: [
    { id: 'buyPrice', label: 'Buy Price', type: 'number', default: 500, prefix: '₹' },
    { id: 'sellPrice', label: 'Sell Price', type: 'number', default: 550, prefix: '₹' },
    { id: 'quantity', label: 'Quantity', type: 'number', default: 100, unit: 'shares' },
    { id: 'brokeragePerSide', label: 'Brokerage per side', type: 'number', default: 20, prefix: '₹' },
  ],
  formula: (inputs) => {
    const { buyPrice, sellPrice, quantity, brokeragePerSide } = inputs
    const buyValue = buyPrice * quantity
    const sellValue = sellPrice * quantity
    const totalBrokerage = brokeragePerSide * 2
    const stt = sellValue * 0.00025
    const exchangeCharges = (buyValue + sellValue) * 0.0000345
    const sebi = (buyValue + sellValue) * 0.000001
    const gst = (totalBrokerage + exchangeCharges + sebi) * 0.18
    const stampDuty = buyValue * 0.00003
    const totalCharges = totalBrokerage + stt + exchangeCharges + sebi + gst + stampDuty
    const grossPnl = sellValue - buyValue
    const netPnl = grossPnl - totalCharges
    return {
      primary: { label: 'Total Charges', value: Math.round(totalCharges), prefix: '₹' },
      metrics: [
        { label: 'Brokerage', value: Math.round(totalBrokerage), prefix: '₹' },
        { label: 'STT', value: Math.round(stt), prefix: '₹' },
        { label: 'GST + Others', value: Math.round(gst + exchangeCharges + sebi + stampDuty), prefix: '₹' },
        { label: 'Net P&L', value: Math.round(netPnl), prefix: '₹' },
      ],
    }
  },
  insights: (_result, inputs) => {
    const buyValue = inputs.buyPrice * inputs.quantity
    const sellValue = inputs.sellPrice * inputs.quantity
    const totalBrokerage = inputs.brokeragePerSide * 2
    const totalCharges = totalBrokerage * 1.18 + sellValue * 0.00025
    const chargesPct = (totalCharges / buyValue) * 100
    if (chargesPct > 1) return [{ type: 'amber', message: `Charges are ${chargesPct.toFixed(2)}% of trade value. Consider larger positions to reduce relative cost.` }]
    return [{ type: 'green', message: 'Reasonable charge-to-trade ratio.' }]
  },
  seo: {
    title: 'Brokerage Calculator India — Zerodha, Groww | TradeVed',
    description: 'Calculate exact brokerage and trading costs for NSE/BSE trades. Compare Zerodha, Groww, Upstox charges.',
    keywords: ['brokerage calculator', 'zerodha brokerage calculator', 'trading charges calculator india'],
    faqs: [
      { question: 'What charges apply on NSE trades?', answer: 'Brokerage, STT, exchange transaction charges, SEBI charges, GST and stamp duty.' },
    ],
  },
}