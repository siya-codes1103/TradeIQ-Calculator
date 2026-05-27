'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { getCalculator } from '@/lib/calculators/registry'
import {
  GrowthChart, RRBarChart, AmortizationChart,
  RetirementGapChart, InflationChart, RiskMeter,
  PnLChart, ROIChart, LiquidationChart,
  PortfolioDonut, FDGrowthChart, MarginBar,
} from './CalculatorChart'

// ── CHART DATA HELPERS ──────────────────────────────
function generateGrowthData(slug: string, inputs: Record<string, number>) {
  const data = []
  const years = Math.min(inputs.years || 20, 40)
  if (slug === 'sip') {
    const r = (inputs.annualReturn || 12) / 12 / 100
    for (let y = 1; y <= years; y++) {
      const n = y * 12
      const fv = (inputs.monthlyAmount || 5000) * (((1 + r) ** n - 1) / r) * (1 + r)
      const invested = (inputs.monthlyAmount || 5000) * n
      data.push({ year: y, invested: Math.round(invested), returns: Math.round(fv - invested) })
    }
  } else if (slug === 'compound-interest') {
    const r = (inputs.annualReturn || 12) / 100
    const principal = inputs.principal || 100000
    for (let y = 1; y <= years; y++) {
      const fv = principal * Math.pow(1 + r, y)
      data.push({ year: y, invested: Math.round(principal), returns: Math.round(fv - principal) })
    }
  }
  return data
}

function generateEMIData(inputs: Record<string, number>) {
  const { loanAmount = 2000000, annualRate = 8.5, tenureMonths = 240 } = inputs
  const r = annualRate / 12 / 100
  const emi = loanAmount * r * Math.pow(1 + r, tenureMonths) / (Math.pow(1 + r, tenureMonths) - 1)
  const data = []
  const years = Math.ceil(tenureMonths / 12)
  for (let y = 1; y <= Math.min(years, 30); y++) {
    const monthsStart = (y - 1) * 12
    const monthsEnd = Math.min(y * 12, tenureMonths)
    let yearPrincipal = 0
    let yearInterest = 0
    let balance = loanAmount * Math.pow(1 + r, monthsStart) - emi * ((Math.pow(1 + r, monthsStart) - 1) / r)
    for (let m = monthsStart; m < monthsEnd; m++) {
      const interest = balance * r
      const principal = emi - interest
      yearInterest += interest
      yearPrincipal += principal
      balance -= principal
    }
    data.push({ year: y, principal: Math.round(yearPrincipal), interest: Math.round(yearInterest) })
  }
  return data
}

function generateInflationData(inputs: Record<string, number>) {
  const { currentValue = 1000000, inflationRate = 6, years = 20 } = inputs
  const data = []
  for (let y = 1; y <= Math.min(years, 40); y++) {
    const nominal = currentValue * Math.pow(1 + inflationRate / 100, y)
    const real = currentValue / Math.pow(1 + inflationRate / 100, y)
    data.push({ year: y, nominal: Math.round(nominal), real: Math.round(real) })
  }
  return data
}

// ── MAIN COMPONENT ──────────────────────────────────
export default function CalculatorShell({ slug }: { slug: string }) {
  const config = useMemo(() => getCalculator(slug), [slug])

  const defaultInputs = useMemo(() => {
    if (!config) return {}
    return Object.fromEntries(config.inputs.map(i => [i.id, i.default]))
  }, [slug])

  const [inputs, setInputs] = useState<Record<string, number>>(defaultInputs)

  const result = useMemo(() => {
    if (!config) return null
    try { return config.formula(inputs) } catch { return null }
  }, [inputs, slug])

  const insights = useMemo(() => {
    if (!config || !result) return []
    try { return config.insights(result, inputs) } catch { return [] }
  }, [result, slug])

  const insightStyles = {
    green: { bg: 'rgba(155,236,0,0.08)', border: 'rgba(155,236,0,0.3)', color: '#9BEC00', icon: '✓' },
    amber: { bg: 'rgba(253,233,0,0.08)', border: 'rgba(253,233,0,0.3)', color: '#FDE900', icon: '⚠' },
    red:   { bg: 'rgba(204,0,102,0.08)', border: 'rgba(204,0,102,0.3)', color: '#CC0066', icon: '✕' },
  }

  if (!config) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0F1209', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#73786C' }}>Calculator not found.</p>
    </div>
  )

  const showGrowthChart     = ['sip', 'compound-interest'].includes(slug)
  const showRRChart         = slug === 'risk-reward'
  const showEMIChart        = slug === 'emi'
  const showRetirementChart = slug === 'retirement'
  const showInflationChart  = slug === 'inflation'
  const showRiskMeter       = slug === 'position-size'
  const showPnLChart        = slug === 'pnl'
const showROIChart        = slug === 'roi'
const showLiquidation     = slug === 'liquidation'
const showPortfolio       = slug === 'portfolio-allocation'
const showFDChart         = slug === 'fd-rd'
const showMarginBar       = slug === 'margin'
const showCryptoChart     = slug === 'crypto-futures'

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0F1209', paddingBottom: '96px' }}>

      {/* NAVBAR */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: '#181916', borderBottom: '1px solid #242620',
        padding: '0 32px', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <Link href="/" style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: '20px', color: '#F7FAF5', textDecoration: 'none' }}>
          Trade<span style={{ color: '#9BEC00' }}>Ved</span>
        </Link>
        <Link href="/calculators" style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '13px', color: '#A2AB9A', textDecoration: 'none' }}>
          ← All Calculators
        </Link>
      </nav>

      {/* HEADER */}
      <div style={{ backgroundColor: '#181916', borderBottom: '1px solid #242620', padding: '32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#73786C', marginBottom: '12px' }}>
            <Link href="/" style={{ color: '#73786C', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href="/calculators" style={{ color: '#73786C', textDecoration: 'none' }}>Calculators</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <span style={{ color: '#A2AB9A' }}>{config.title}</span>
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
            <h1 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: '28px', color: '#F7FAF5', margin: 0 }}>
              {config.title}
            </h1>
            {config.badge && (
              <span style={{ backgroundColor: 'rgba(155,236,0,0.15)', color: '#9BEC00', fontFamily: 'Open Sans, sans-serif', fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px' }}>
                {config.badge}
              </span>
            )}
          </div>
          <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#73786C', margin: 0 }}>
            {config.description}
          </p>
        </div>
      </div>

      {/* BODY */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px' }}>

        {/* CALCULATOR GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>

          {/* LEFT — INPUTS */}
          <div style={{ backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F7FAF5', marginBottom: '24px' }}>
              Input Values
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {config.inputs.map(field => (
                <div key={field.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '13px', color: '#D3DEC8' }}>
                      {field.label}
                    </label>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#9BEC00', backgroundColor: '#242620', padding: '2px 8px', borderRadius: '6px' }}>
                      {field.prefix}{inputs[field.id]?.toLocaleString('en-IN')}{field.unit && ` ${field.unit}`}
                    </span>
                  </div>
                  {field.type === 'slider' && (
                    <div>
                      <input
                        type="range"
                        min={field.min} max={field.max} step={field.step}
                        value={inputs[field.id]}
                        onChange={e => setInputs(prev => ({ ...prev, [field.id]: Number(e.target.value) }))}
                        style={{ width: '100%', accentColor: '#9BEC00', cursor: 'pointer' }}
                      />
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '10px', color: '#73786C' }}>{field.min}{field.unit}</span>
                        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '10px', color: '#73786C' }}>{field.max}{field.unit}</span>
                      </div>
                    </div>
                  )}
                  {field.type === 'number' && (
                    <input
                      type="number"
                      value={inputs[field.id]}
                      onChange={e => setInputs(prev => ({ ...prev, [field.id]: Number(e.target.value) }))}
                      style={{ width: '100%', backgroundColor: '#242620', border: '1px solid #242620', borderRadius: '8px', padding: '10px 14px', color: '#F7FAF5', fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — RESULTS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {result && (
              <div style={{ backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
                <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid #242620', marginBottom: '20px' }}>
                  <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '13px', color: '#73786C', marginBottom: '8px' }}>
                    {result.primary.label}
                  </p>
                  <p style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '42px', margin: 0, color: result.primary.value < 0 ? '#CC0066' : '#9BEC00' }}>
                    {result.primary.prefix}
                    {result.primary.value.toLocaleString('en-IN')}
                    {result.primary.unit && (
                      <span style={{ fontSize: '20px', color: '#73786C', marginLeft: '6px' }}>{result.primary.unit}</span>
                    )}
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {result.metrics.map((metric, i) => (
                    <div key={i} style={{ backgroundColor: '#242620', borderRadius: '8px', padding: '14px' }}>
                      <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '11px', color: '#73786C', marginBottom: '4px' }}>
                        {metric.label}
                      </p>
                      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 600, fontSize: '16px', color: '#F7FAF5', margin: 0 }}>
                        {metric.prefix}{metric.value.toLocaleString('en-IN')}
                        {metric.unit && <span style={{ fontSize: '12px', color: '#73786C', marginLeft: '4px' }}>{metric.unit}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {insights.map((insight, i) => {
              const s = insightStyles[insight.type]
              return (
                <div key={i} style={{ backgroundColor: s.bg, border: `1px solid ${s.border}`, borderLeft: `4px solid ${s.color}`, borderRadius: '8px', padding: '14px 16px', fontFamily: 'Open Sans, sans-serif', fontSize: '13px', color: s.color, lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700, marginRight: '8px' }}>{s.icon}</span>
                  {insight.message}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── CHARTS ── */}

        {result && showGrowthChart && (
          <div style={{ marginTop: '24px', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F7FAF5', marginBottom: '20px' }}>
              Growth Projection
            </h2>
            <GrowthChart data={generateGrowthData(slug, inputs)} />
          </div>
        )}

        {result && showRRChart && (
          <div style={{ marginTop: '24px', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F7FAF5', marginBottom: '20px' }}>
              Risk vs Reward
            </h2>
            <RRBarChart
              risk={Math.abs((inputs.entryPrice || 0) - (inputs.stopLoss || 0)) * (inputs.quantity || 1)}
              reward={Math.abs((inputs.targetPrice || 0) - (inputs.entryPrice || 0)) * (inputs.quantity || 1)}
            />
          </div>
        )}

        {result && showEMIChart && (
          <div style={{ marginTop: '24px', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F7FAF5', marginBottom: '20px' }}>
              Amortization Schedule
            </h2>
            <AmortizationChart data={generateEMIData(inputs)} />
          </div>
        )}

        {result && showRetirementChart && (
          <div style={{ marginTop: '24px', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F7FAF5', marginBottom: '20px' }}>
              Retirement Corpus — Needed vs Projected
            </h2>
            <RetirementGapChart
              needed={result.primary.value}
              projected={result.metrics[0]?.value ?? 0}
            />
            <div style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#73786C' }} />
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '11px', color: '#73786C' }}>Corpus Needed</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: '#9BEC00' }} />
                <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '11px', color: '#73786C' }}>Your Projection</span>
              </div>
            </div>
          </div>
        )}

        {result && showInflationChart && (
          <div style={{ marginTop: '24px', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F7FAF5', marginBottom: '4px' }}>
              Purchasing Power Over Time
            </h2>
            <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#73786C', marginBottom: '20px' }}>
              Grey = future price · Red = real value in today's money
            </p>
            <InflationChart data={generateInflationData(inputs)} />
          </div>
        )}

        {result && showRiskMeter && (
          <div style={{ marginTop: '24px', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F7FAF5', marginBottom: '20px' }}>
              Risk Level
            </h2>
            <RiskMeter riskPercent={inputs.riskPercent ?? 2} />
          </div>
        )}
        {/* P&L CHART */}
{result && showPnLChart && (
  <div style={{ marginTop: '24px', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F7FAF5', marginBottom: '20px' }}>
      P&L Breakdown
    </h2>
    <PnLChart
      grossPnl={(inputs.sellPrice - inputs.buyPrice) * inputs.quantity}
      charges={result.metrics[1]?.value ?? 0}
      netPnl={result.primary.value}
    />
  </div>
)}

{/* ROI CHART */}
{result && showROIChart && (
  <div style={{ marginTop: '24px', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F7FAF5', marginBottom: '20px' }}>
      Investment vs Returns
    </h2>
    <ROIChart
      invested={inputs.investmentAmount ?? 100000}
      returned={inputs.finalValue ?? 150000}
    />
  </div>
)}

{/* LIQUIDATION CHART */}
{result && showLiquidation && (
  <div style={{ marginTop: '24px', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F7FAF5', marginBottom: '20px' }}>
      Liquidation Zone
    </h2>
    <LiquidationChart
      entry={inputs.entryPrice ?? 50000}
      liquidation={result.primary.value}
      isLong={(inputs.positionType ?? 1) === 1}
    />
  </div>
)}

{/* PORTFOLIO DONUT */}
{result && showPortfolio && (
  <div style={{ marginTop: '24px', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F7FAF5', marginBottom: '20px' }}>
      Portfolio Allocation
    </h2>
    <PortfolioDonut
      equity={inputs.equity ?? 500000}
      debt={inputs.debt ?? 200000}
      gold={inputs.gold ?? 100000}
      crypto={inputs.crypto ?? 50000}
      cash={inputs.cash ?? 150000}
    />
  </div>
)}

{/* FD GROWTH */}
{result && showFDChart && (
  <div style={{ marginTop: '24px', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F7FAF5', marginBottom: '20px' }}>
      FD Growth Over Time
    </h2>
    <FDGrowthChart
      principal={inputs.principal ?? 100000}
      maturity={result.primary.value}
      years={Math.ceil((inputs.tenureMonths ?? 12) / 12)}
    />
  </div>
)}

{/* MARGIN BAR */}
{result && showMarginBar && (
  <div style={{ marginTop: '24px', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F7FAF5', marginBottom: '20px' }}>
      Margin Utilization
    </h2>
    <MarginBar
      marginRequired={result.primary.value}
      accountSize={inputs.lotSize * inputs.currentPrice * inputs.numberOfLots * 5}
    />
  </div>
)}

{/* CRYPTO FUTURES — reuse RR chart */}
{result && showCryptoChart && (
  <div style={{ marginTop: '24px', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '24px' }}>
    <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#F7FAF5', marginBottom: '20px' }}>
      Position Analysis
    </h2>
    <RRBarChart
      risk={inputs.collateral ?? 1000}
      reward={Math.abs(result.primary.value)}
    />
  </div>
)}

        {/* ── FAQ ── */}
        {config.seo.faqs.length > 0 && (
          <div style={{ marginTop: '40px', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '12px', padding: '28px 32px' }}>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '18px', color: '#F7FAF5', marginBottom: '20px' }}>
              Frequently Asked Questions
            </h2>
            {config.seo.faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: i < config.seo.faqs.length - 1 ? '1px solid #242620' : 'none', padding: '16px 0' }}>
                <h3 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600, fontSize: '14px', color: '#F7FAF5', marginBottom: '8px' }}>
                  {faq.question}
                </h3>
                <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '13px', color: '#73786C', lineHeight: 1.7, margin: 0 }}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── RELATED ── */}
        <div style={{ marginTop: '28px' }}>
          <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '15px', color: '#A2AB9A', marginBottom: '12px' }}>
            Related Calculators
          </h2>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['position-size', 'sip', 'emi', 'compound-interest', 'risk-reward']
              .filter(s => s !== slug).slice(0, 4)
              .map(s => (
                <Link key={s} href={`/calculators/${s}`} style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#A2AB9A', textDecoration: 'none', backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '8px', padding: '7px 14px' }}>
                  {s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* MOBILE STICKY */}
      {result && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#181916', borderTop: '1px solid #242620', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50 }}>
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#73786C' }}>
            {result.primary.label}
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '18px', color: result.primary.value < 0 ? '#CC0066' : '#9BEC00' }}>
            {result.primary.prefix}{result.primary.value.toLocaleString('en-IN')}
            {result.primary.unit && ` ${result.primary.unit}`}
          </span>
        </div>
      )}

    </main>
  )
}