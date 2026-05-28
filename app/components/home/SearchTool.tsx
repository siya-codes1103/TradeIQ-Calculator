'use client'

import { useState } from 'react'
import Link from 'next/link'

const keywordMap: Record<string, { slug: string; title: string; reason: string }[]> = {
  retirement: [
    { slug: 'retirement', title: 'Retirement Calculator', reason: 'Plan your corpus target' },
    { slug: 'sip', title: 'SIP Calculator', reason: 'Build wealth monthly' },
    { slug: 'inflation', title: 'Inflation Calculator', reason: 'Adjust for real value' },
  ],
  risk: [
    { slug: 'position-size', title: 'Position Size Calculator', reason: 'Size trades safely' },
    { slug: 'risk-reward', title: 'Risk Reward Calculator', reason: 'Evaluate trade quality' },
    { slug: 'margin', title: 'Margin Calculator', reason: 'Know your exposure' },
  ],
  trade: [
    { slug: 'position-size', title: 'Position Size Calculator', reason: 'Never oversize a trade' },
    { slug: 'pnl', title: 'P&L Calculator', reason: 'Real profit after charges' },
    { slug: 'risk-reward', title: 'Risk Reward Calculator', reason: 'Quality check every trade' },
  ],
  sip: [
    { slug: 'sip', title: 'SIP Calculator', reason: 'Monthly investment returns' },
    { slug: 'compound-interest', title: 'Compound Interest', reason: 'See compounding power' },
    { slug: 'inflation', title: 'Inflation Calculator', reason: 'Real inflation-adjusted returns' },
  ],
  loan: [
    { slug: 'emi', title: 'EMI Calculator', reason: 'Calculate monthly EMI' },
    { slug: 'roi', title: 'ROI Calculator', reason: 'Compare loan vs investment' },
    { slug: 'fd-rd', title: 'FD/RD Calculator', reason: 'Compare FD returns' },
  ],
  emi: [
    { slug: 'emi', title: 'EMI Calculator', reason: 'Calculate monthly EMI' },
    { slug: 'roi', title: 'ROI Calculator', reason: 'Compare alternatives' },
    { slug: 'inflation', title: 'Inflation Calculator', reason: 'Real cost of borrowing' },
  ],
  invest: [
    { slug: 'sip', title: 'SIP Calculator', reason: 'Start a monthly SIP' },
    { slug: 'compound-interest', title: 'Compound Interest', reason: 'Lumpsum growth' },
    { slug: 'roi', title: 'ROI Calculator', reason: 'Measure your returns' },
  ],
  crypto: [
    { slug: 'liquidation', title: 'Liquidation Calculator', reason: 'Know your liquidation price' },
    { slug: 'crypto-futures', title: 'Crypto Futures', reason: 'Full futures P&L' },
    { slug: 'position-size', title: 'Position Size Calculator', reason: 'Risk management' },
  ],
  leverage: [
    { slug: 'liquidation', title: 'Liquidation Calculator', reason: 'Liquidation risk' },
    { slug: 'margin', title: 'Margin Calculator', reason: 'Margin required' },
    { slug: 'position-size', title: 'Position Size Calculator', reason: 'Safe position sizing' },
  ],
  inflation: [
    { slug: 'inflation', title: 'Inflation Calculator', reason: 'Purchasing power erosion' },
    { slug: 'sip', title: 'SIP Calculator', reason: 'Beat inflation with SIP' },
    { slug: 'fd-rd', title: 'FD/RD Calculator', reason: 'Real FD returns vs inflation' },
  ],
  fd: [
    { slug: 'fd-rd', title: 'FD/RD Calculator', reason: 'FD maturity with tax' },
    { slug: 'inflation', title: 'Inflation Calculator', reason: 'Real return check' },
    { slug: 'compound-interest', title: 'Compound Interest', reason: 'Compare alternatives' },
  ],
  wealth: [
    { slug: 'compound-interest', title: 'Compound Interest', reason: 'Exponential growth' },
    { slug: 'sip', title: 'SIP Calculator', reason: 'Monthly wealth building' },
    { slug: 'retirement', title: 'Retirement Calculator', reason: 'Long-term planning' },
  ],
  profit: [
    { slug: 'pnl', title: 'P&L Calculator', reason: 'Net profit after all charges' },
    { slug: 'roi', title: 'ROI Calculator', reason: 'Return on investment' },
    { slug: 'brokerage', title: 'Brokerage Calculator', reason: 'Hidden trading costs' },
  ],
  portfolio: [
    { slug: 'portfolio-allocation', title: 'Portfolio Allocation', reason: 'Check asset balance' },
    { slug: 'roi', title: 'ROI Calculator', reason: 'Measure portfolio returns' },
    { slug: 'sip', title: 'SIP Calculator', reason: 'Add monthly investments' },
  ],
  compound: [
    { slug: 'compound-interest', title: 'Compound Interest', reason: 'See exponential growth' },
    { slug: 'sip', title: 'SIP Calculator', reason: 'Monthly compounding' },
    { slug: 'fd-rd', title: 'FD/RD Calculator', reason: 'Compare with FD' },
  ],
  save: [
    { slug: 'sip', title: 'SIP Calculator', reason: 'Systematic savings plan' },
    { slug: 'fd-rd', title: 'FD/RD Calculator', reason: 'Fixed deposit returns' },
    { slug: 'compound-interest', title: 'Compound Interest', reason: 'See savings grow' },
  ],
  stock: [
    { slug: 'roi', title: 'ROI Calculator', reason: 'Measure stock returns' },
    { slug: 'portfolio-allocation', title: 'Portfolio Allocation', reason: 'Balance your holdings' },
    { slug: 'risk-reward', title: 'Risk Reward Calculator', reason: 'Evaluate stock trade' },
  ],
  brokerage: [
    { slug: 'brokerage', title: 'Brokerage Calculator', reason: 'Real trading costs' },
    { slug: 'pnl', title: 'P&L Calculator', reason: 'Net profit after charges' },
  ],
  margin: [
    { slug: 'margin', title: 'Margin Calculator', reason: 'F&O margin required' },
    { slug: 'position-size', title: 'Position Size Calculator', reason: 'Safe position sizing' },
    { slug: 'liquidation', title: 'Liquidation Calculator', reason: 'Avoid liquidation' },
  ],
  cagr: [
  { slug: 'cagr', title: 'CAGR Calculator', reason: 'Annualized return rate' },
  { slug: 'roi', title: 'ROI Calculator', reason: 'Total return on investment' },
  { slug: 'compound-interest', title: 'Compound Interest', reason: 'See compounding effect' },
],
annual: [
  { slug: 'cagr', title: 'CAGR Calculator', reason: 'Annual growth rate' },
  { slug: 'roi', title: 'ROI Calculator', reason: 'Investment returns' },
],
growth: [
  { slug: 'cagr', title: 'CAGR Calculator', reason: 'Measure investment growth' },
  { slug: 'compound-interest', title: 'Compound Interest', reason: 'Exponential growth' },
  { slug: 'sip', title: 'SIP Calculator', reason: 'Monthly wealth building' },
],
'net worth': [
  { slug: 'net-worth', title: 'Net Worth Calculator', reason: 'Total assets minus liabilities' },
  { slug: 'portfolio-allocation', title: 'Portfolio Allocation', reason: 'Asset distribution' },
],
'savings': [
  { slug: 'savings-goal', title: 'Savings Goal Calculator', reason: 'Monthly savings needed' },
  { slug: 'sip', title: 'SIP Calculator', reason: 'Systematic savings plan' },
  { slug: 'compound-interest', title: 'Compound Interest', reason: 'See savings grow' },
],
'goal': [
  { slug: 'savings-goal', title: 'Savings Goal Calculator', reason: 'Reach any financial goal' },
  { slug: 'retirement', title: 'Retirement Calculator', reason: 'Retirement goal planning' },
  { slug: 'sip', title: 'SIP Calculator', reason: 'Goal-based investing' },
],
dcf: [
  { slug: 'dcf', title: 'DCF Fair Value Calculator', reason: 'Stock intrinsic value' },
  { slug: 'graham-number', title: 'Graham Number', reason: 'Max price to pay' },
  { slug: 'piotroski', title: 'Piotroski F-Score', reason: 'Financial health check' },
],
graham: [
  { slug: 'graham-number', title: 'Graham Number Calculator', reason: 'Value investing formula' },
  { slug: 'dcf', title: 'DCF Calculator', reason: 'Intrinsic value analysis' },
],
bond: [
  { slug: 'ytm', title: 'YTM Calculator', reason: 'Bond yield to maturity' },
  { slug: 'fd-rd', title: 'FD/RD Calculator', reason: 'Fixed deposit returns' },
],
yield: [
  { slug: 'ytm', title: 'YTM Calculator', reason: 'Bond yield calculation' },
  { slug: 'roi', title: 'ROI Calculator', reason: 'Investment returns' },
],
value: [
  { slug: 'dcf', title: 'DCF Calculator', reason: 'Stock fair value' },
  { slug: 'graham-number', title: 'Graham Number', reason: 'Max buy price' },
  { slug: 'piotroski', title: 'Piotroski F-Score', reason: 'Company health' },
],
fundamental: [
  { slug: 'piotroski', title: 'Piotroski F-Score', reason: 'Financial health score' },
  { slug: 'graham-number', title: 'Graham Number', reason: 'Value buy price' },
  { slug: 'dcf', title: 'DCF Calculator', reason: 'Intrinsic value' },
],
}

const chips = [
  { label: '🎯 Plan retirement', query: 'retirement' },
  { label: '📊 Size my trades', query: 'trade risk' },
  { label: '🏠 Calculate EMI', query: 'loan emi' },
  { label: '📈 Beat inflation', query: 'inflation' },
  { label: '₿ Crypto leverage', query: 'crypto leverage' },
  { label: '💰 Start a SIP', query: 'sip invest' },
  { label: '📁 Check portfolio', query: 'portfolio' },
]

function getResults(query: string) {
  const q = query.toLowerCase()
  const found: { slug: string; title: string; reason: string }[] = []
  const seen = new Set<string>()
  for (const [keyword, results] of Object.entries(keywordMap)) {
    if (q.includes(keyword)) {
      for (const r of results) {
        if (!seen.has(r.slug)) {
          seen.add(r.slug)
          found.push(r)
        }
      }
    }
  }
  return found.slice(0, 4)
}

export default function SearchTool() {
  const [query, setQuery] = useState('')
  const results = query.length > 1 ? getResults(query) : []

  return (
    <section style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>

      {/* HEADING */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{
          fontFamily: 'Raleway, sans-serif', fontWeight: 800,
          fontSize: 'clamp(20px, 3vw, 28px)', color: '#F7FAF5',
          marginBottom: '8px',
        }}>
          Find the Right Tool
        </h2>
        <p style={{
          fontFamily: 'Open Sans, sans-serif', fontSize: '14px',
          color: '#73786C',
        }}>
          Describe your financial goal — we will suggest the right calculator.
        </p>
      </div>

      {/* INPUT */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <span style={{
          position: 'absolute', left: '16px', top: '50%',
          transform: 'translateY(-50%)',
          color: '#73786C', fontSize: '16px', pointerEvents: 'none',
        }}>
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder='Try "retirement", "risk", "loan", "crypto"...'
          style={{
            width: '100%',
            backgroundColor: '#181916',
            border: '1px solid #242620',
            borderRadius: '12px',
            padding: '16px 16px 16px 46px',
            color: '#F7FAF5',
            fontFamily: 'Open Sans, sans-serif', fontSize: '15px',
            outline: 'none', boxSizing: 'border-box',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => (e.target.style.borderColor = '#9BEC00')}
          onBlur={e => (e.target.style.borderColor = '#242620')}
        />
      </div>

      {/* CHIPS — show when empty */}
      {query.length === 0 && (
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          gap: '8px', justifyContent: 'center',
          marginBottom: '8px',
        }}>
          {chips.map(chip => (
            <button
              key={chip.query}
              onClick={() => setQuery(chip.query)}
              style={{
                backgroundColor: '#181916',
                border: '1px solid #242620',
                borderRadius: '999px',
                padding: '7px 16px',
                fontFamily: 'Open Sans, sans-serif', fontSize: '12px',
                color: '#A2AB9A', cursor: 'pointer',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                const b = e.currentTarget
                b.style.borderColor = '#9BEC00'
                b.style.color = '#9BEC00'
              }}
              onMouseLeave={e => {
                const b = e.currentTarget
                b.style.borderColor = '#242620'
                b.style.color = '#A2AB9A'
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}

      {/* RESULTS — show when typing */}
      {results.length > 0 && (
        <div style={{
          backgroundColor: '#181916',
          border: '1px solid rgba(155,236,0,0.3)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}>
          <p style={{
            fontFamily: 'Open Sans, sans-serif', fontSize: '10px',
            color: '#73786C', padding: '10px 14px 6px',
            textTransform: 'uppercase', letterSpacing: '0.8px',
            borderBottom: '1px solid #242620',
          }}>
            Recommended for you
          </p>
          {results.map((r, i) => (
            <Link
              key={r.slug}
              href={`/calculators/${r.slug}`}
              style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                textDecoration: 'none',
                borderBottom: i < results.length - 1 ? '1px solid #242620' : 'none',
                backgroundColor: 'transparent',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#242620')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <div>
                <p style={{
                  fontFamily: 'Raleway, sans-serif', fontWeight: 700,
                  fontSize: '14px', color: '#F7FAF5', marginBottom: '2px',
                }}>
                  {r.title}
                </p>
                <p style={{
                  fontFamily: 'Open Sans, sans-serif', fontSize: '12px',
                  color: '#73786C',
                }}>
                  {r.reason}
                </p>
              </div>
              <span style={{
                color: '#9BEC00', fontSize: '18px',
                fontWeight: 700, marginLeft: '12px',
              }}>
                →
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* NO RESULTS */}
      {query.length > 2 && results.length === 0 && (
        <div style={{
          textAlign: 'center', padding: '20px',
          backgroundColor: '#181916',
          border: '1px solid #242620',
          borderRadius: '12px',
        }}>
          <p style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '13px', color: '#73786C',
            marginBottom: '10px',
          }}>
            No match found. Try one of these:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
            {['retirement', 'risk', 'sip', 'loan', 'crypto', 'inflation', 'portfolio'].map(s => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                style={{
                  background: 'none',
                  border: '1px solid rgba(155,236,0,0.3)',
                  borderRadius: '999px',
                  color: '#9BEC00', cursor: 'pointer',
                  fontFamily: 'Open Sans, sans-serif',
                  fontSize: '12px', padding: '4px 12px',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

    </section>
  )
}