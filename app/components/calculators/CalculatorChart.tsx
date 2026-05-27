'use client'

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend,
} from 'recharts'

// ── GROWTH CHART (SIP + Compound) ──────────────────
export function GrowthChart({
  data,
}: {
  data: { year: number; invested: number; returns: number }[]
}) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorReturns" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#9BEC00" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#9BEC00" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#242620" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#242620" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#242620" />
        <XAxis
          dataKey="year"
          tick={{ fontFamily: 'JetBrains Mono', fontSize: 11, fill: '#73786C' }}
          tickLine={false}
          axisLine={{ stroke: '#242620' }}
        />
        <YAxis
          tickFormatter={v =>
            v >= 10000000 ? `₹${(v / 10000000).toFixed(1)}Cr` :
            v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` :
            `₹${(v / 1000).toFixed(0)}K`
          }
          tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: '#73786C' }}
          tickLine={false}
          axisLine={false}
          width={60}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '8px', fontFamily: 'Open Sans, sans-serif', fontSize: '12px' }}
          labelStyle={{ color: '#A2AB9A', marginBottom: '4px' }}
          formatter={(value: number, name: string) => [`₹${value.toLocaleString('en-IN')}`, name === 'returns' ? 'Returns' : 'Invested']}
          labelFormatter={label => `Year ${label}`}
        />
        <Area type="monotone" dataKey="invested" stackId="1" stroke="none" fill="url(#colorInvested)" />
        <Area type="monotone" dataKey="returns" stackId="1" stroke="#9BEC00" strokeWidth={2} fill="url(#colorReturns)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// ── R:R BAR CHART ──────────────────────────────────
export function RRBarChart({ risk, reward }: { risk: number; reward: number }) {
  const data = [
    { name: 'Risk', value: risk },
    { name: 'Reward', value: reward },
  ]
  const colors = ['#CC0066', '#9BEC00']
  return (
    <ResponsiveContainer width="100%" height={120}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
        <XAxis
          type="number"
          tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: '#73786C' }}
          tickLine={false}
          axisLine={{ stroke: '#242620' }}
          tickFormatter={v => `₹${v.toLocaleString('en-IN')}`}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontFamily: 'Open Sans, sans-serif', fontSize: 12, fill: '#A2AB9A' }}
          tickLine={false}
          axisLine={false}
          width={50}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '8px', fontFamily: 'Open Sans, sans-serif', fontSize: '12px' }}
          formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {data.map((_, i) => (
            <rect key={i} fill={colors[i]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// ── EMI AMORTIZATION CHART ──────────────────────────
export function AmortizationChart({
  data,
}: {
  data: { year: number; principal: number; interest: number }[]
}) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#242620" />
        <XAxis
          dataKey="year"
          tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: '#73786C' }}
          tickLine={false}
          axisLine={{ stroke: '#242620' }}
        />
        <YAxis
          tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`}
          tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: '#73786C' }}
          tickLine={false}
          axisLine={false}
          width={55}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '8px', fontSize: '12px' }}
          formatter={(value: number, name: string) => [`₹${value.toLocaleString('en-IN')}`, name === 'principal' ? 'Principal' : 'Interest']}
          labelFormatter={label => `Year ${label}`}
        />
        <Legend wrapperStyle={{ fontFamily: 'Open Sans, sans-serif', fontSize: '11px', color: '#73786C' }} />
        <Bar dataKey="principal" stackId="a" fill="#9BEC00" name="principal" />
        <Bar dataKey="interest" stackId="a" fill="#CC0066" radius={[4, 4, 0, 0]} name="interest" />
      </BarChart>
    </ResponsiveContainer>
  )
}

// ── RETIREMENT GAP CHART ────────────────────────────
export function RetirementGapChart({
  needed,
  projected,
}: {
  needed: number
  projected: number
}) {
  const data = [
    { name: 'Corpus Needed', value: needed },
    { name: 'Your Projection', value: projected },
  ]
  const colors = ['#73786C', projected >= needed ? '#9BEC00' : '#CC0066']
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#242620" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fill: '#73786C' }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickFormatter={v =>
            v >= 10000000 ? `₹${(v / 10000000).toFixed(1)}Cr` :
            v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` :
            `₹${(v / 1000).toFixed(0)}K`
          }
          tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: '#73786C' }}
          tickLine={false}
          axisLine={false}
          width={65}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '8px', fontFamily: 'Open Sans, sans-serif', fontSize: '12px' }}
          formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']}
        />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((_, i) => (
            <rect key={i} fill={colors[i]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// ── INFLATION LINE CHART ────────────────────────────
export function InflationChart({
  data,
}: {
  data: { year: number; nominal: number; real: number }[]
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorNominal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#73786C" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#73786C" stopOpacity={0.05} />
          </linearGradient>
          <linearGradient id="colorReal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#CC0066" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#CC0066" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#242620" />
        <XAxis
          dataKey="year"
          tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: '#73786C' }}
          tickLine={false}
          axisLine={{ stroke: '#242620' }}
        />
        <YAxis
          tickFormatter={v =>
            v >= 10000000 ? `₹${(v / 10000000).toFixed(1)}Cr` :
            v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` :
            `₹${(v / 1000).toFixed(0)}K`
          }
          tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: '#73786C' }}
          tickLine={false}
          axisLine={false}
          width={65}
        />
        <Tooltip
          contentStyle={{ backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '8px', fontFamily: 'Open Sans, sans-serif', fontSize: '12px' }}
          formatter={(value: number, name: string) => [`₹${value.toLocaleString('en-IN')}`, name === 'nominal' ? 'Future Price' : 'Real Value Today']}
          labelFormatter={label => `Year ${label}`}
        />
        <Area type="monotone" dataKey="nominal" stroke="#73786C" strokeWidth={2} fill="url(#colorNominal)" />
        <Area type="monotone" dataKey="real" stroke="#CC0066" strokeWidth={2} fill="url(#colorReal)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// ── RISK METER ──────────────────────────────────────
export function RiskMeter({ riskPercent }: { riskPercent: number }) {
  const max = 10
  const pct = Math.min(riskPercent / max, 1)
  const color = riskPercent <= 2 ? '#9BEC00' : riskPercent <= 5 ? '#FDE900' : '#CC0066'
  const label = riskPercent <= 2 ? 'Safe' : riskPercent <= 5 ? 'Moderate' : 'High Risk'

  return (
    <div style={{ padding: '8px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#73786C' }}>
          Risk Level
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color, fontWeight: 700 }}>
          {label} ({riskPercent}%)
        </span>
      </div>
      <div style={{ width: '100%', height: '10px', backgroundColor: '#242620', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{ width: `${pct * 100}%`, height: '100%', backgroundColor: color, borderRadius: '999px', transition: 'width 0.3s ease' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '10px', color: '#73786C' }}>0%</span>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '10px', color: '#73786C' }}>10%</span>
      </div>
    </div>
  )
}
// ── P&L BREAKDOWN CHART ─────────────────────────────
export function PnLChart({
  grossPnl,
  charges,
  netPnl,
}: {
  grossPnl: number
  charges: number
  netPnl: number
}) {
  const data = [
    { name: 'Gross P&L', value: Math.abs(grossPnl), fill: grossPnl >= 0 ? '#9BEC00' : '#CC0066' },
    { name: 'Charges', value: charges, fill: '#FDE900' },
    { name: 'Net P&L', value: Math.abs(netPnl), fill: netPnl >= 0 ? '#9BEC00' : '#CC0066' },
  ]
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#242620" vertical={false} />
        <XAxis dataKey="name" tick={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fill: '#73786C' }} tickLine={false} axisLine={false} />
        <YAxis tickFormatter={v => `₹${Math.abs(v).toLocaleString('en-IN')}`} tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: '#73786C' }} tickLine={false} axisLine={false} width={70} />
        <Tooltip contentStyle={{ backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => <rect key={i} fill={entry.fill} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// ── ROI COMPARISON CHART ────────────────────────────
export function ROIChart({
  invested,
  returned,
}: {
  invested: number
  returned: number
}) {
  const data = [
    { name: 'Invested', value: invested, fill: '#73786C' },
    { name: 'Final Value', value: returned, fill: returned >= invested ? '#9BEC00' : '#CC0066' },
  ]
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#242620" vertical={false} />
        <XAxis dataKey="name" tick={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fill: '#73786C' }} tickLine={false} axisLine={false} />
        <YAxis tickFormatter={v => `₹${v.toLocaleString('en-IN')}`} tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: '#73786C' }} tickLine={false} axisLine={false} width={70} />
        <Tooltip contentStyle={{ backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, '']} />
        <Bar dataKey="value" radius={[6, 6, 0, 0]}>
          {data.map((entry, i) => <rect key={i} fill={entry.fill} />)}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

// ── LIQUIDATION ZONE CHART ──────────────────────────
export function LiquidationChart({
  entry,
  liquidation,
  isLong,
}: {
  entry: number
  liquidation: number
  isLong: boolean
}) {
  const distancePct = Math.abs((liquidation - entry) / entry) * 100
  const data = [
    { name: 'Entry Price', value: entry, fill: '#9BEC00' },
    { name: 'Liquidation', value: liquidation, fill: '#CC0066' },
  ]
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '11px', color: '#73786C', marginBottom: '4px' }}>Entry Price</p>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '18px', color: '#9BEC00' }}>${entry.toLocaleString('en-IN')}</p>
        </div>
        <div style={{ flex: 1, margin: '0 16px' }}>
          <div style={{ height: '8px', backgroundColor: '#242620', borderRadius: '999px', position: 'relative', overflow: 'visible' }}>
            <div style={{
              position: 'absolute',
              left: isLong ? 0 : 'auto',
              right: isLong ? 'auto' : 0,
              width: `${Math.min(distancePct * 3, 90)}%`,
              height: '100%',
              backgroundColor: '#CC006644',
              borderRadius: '999px',
            }} />
          </div>
          <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '10px', color: '#CC0066', textAlign: 'center', marginTop: '6px' }}>
            {distancePct.toFixed(1)}% away from liquidation
          </p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '11px', color: '#73786C', marginBottom: '4px' }}>Liquidation</p>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '18px', color: '#CC0066' }}>${liquidation.toLocaleString('en-IN')}</p>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={data} margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fontFamily: 'Open Sans, sans-serif', fontSize: 11, fill: '#73786C' }} tickLine={false} axisLine={false} />
          <YAxis tick={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fill: '#73786C' }} tickLine={false} axisLine={false} width={70} />
          <Tooltip contentStyle={{ backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`$${value.toLocaleString('en-IN')}`, '']} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => <rect key={i} fill={data[i].fill} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── PORTFOLIO DONUT CHART ───────────────────────────
export function PortfolioDonut({
  equity, debt, gold, crypto, cash,
}: {
  equity: number; debt: number; gold: number; crypto: number; cash: number
}) {
  const { PieChart, Pie, Cell } = require('recharts')
  const total = equity + debt + gold + crypto + cash
  const data = [
    { name: 'Equity', value: Math.round((equity / total) * 100) },
    { name: 'Debt', value: Math.round((debt / total) * 100) },
    { name: 'Gold', value: Math.round((gold / total) * 100) },
    { name: 'Crypto', value: Math.round((crypto / total) * 100) },
    { name: 'Cash', value: Math.round((cash / total) * 100) },
  ].filter(d => d.value > 0)
  const COLORS = ['#9BEC00', '#2F8EFF', '#FDE900', '#CC0066', '#73786C']
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
      <ResponsiveContainer width={160} height={160}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={75} dataKey="value" strokeWidth={0}>
            {data.map((_: unknown, i: number) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`${value}%`, '']} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {data.map((item: {name: string; value: number}, i: number) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: COLORS[i % COLORS.length], flexShrink: 0 }} />
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#A2AB9A' }}>{item.name}</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: '#F7FAF5', marginLeft: 'auto' }}>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── FD GROWTH CHART ─────────────────────────────────
export function FDGrowthChart({
  principal,
  maturity,
  years,
}: {
  principal: number
  maturity: number
  years: number
}) {
  const data = []
  for (let y = 1; y <= Math.min(years, 10); y++) {
    const fv = principal * Math.pow(maturity / principal, y / years)
    data.push({ year: y, value: Math.round(fv) })
  }
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorFD" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2F8EFF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#2F8EFF" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#242620" />
        <XAxis dataKey="year" tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: '#73786C' }} tickLine={false} axisLine={{ stroke: '#242620' }} />
        <YAxis tickFormatter={v => v >= 100000 ? `₹${(v / 100000).toFixed(1)}L` : `₹${(v / 1000).toFixed(0)}K`} tick={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: '#73786C' }} tickLine={false} axisLine={false} width={60} />
        <Tooltip contentStyle={{ backgroundColor: '#181916', border: '1px solid #242620', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Value']} labelFormatter={label => `Year ${label}`} />
        <Area type="monotone" dataKey="value" stroke="#2F8EFF" strokeWidth={2} fill="url(#colorFD)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// ── MARGIN UTILIZATION BAR ──────────────────────────
export function MarginBar({
  marginRequired,
  accountSize,
}: {
  marginRequired: number
  accountSize: number
}) {
  const pct = Math.min((marginRequired / accountSize) * 100, 100)
  const color = pct < 50 ? '#9BEC00' : pct < 75 ? '#FDE900' : '#CC0066'
  const label = pct < 50 ? 'Safe' : pct < 75 ? 'Moderate' : 'High Utilization'
  return (
    <div style={{ padding: '8px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#73786C' }}>
          Margin Utilization
        </span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color, fontWeight: 700 }}>
          {label} ({pct.toFixed(1)}%)
        </span>
      </div>
      <div style={{ width: '100%', height: '10px', backgroundColor: '#242620', borderRadius: '999px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', backgroundColor: color, borderRadius: '999px', transition: 'width 0.3s ease' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '10px', color: '#73786C' }}>₹0</span>
        <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '10px', color: '#73786C' }}>₹{accountSize.toLocaleString('en-IN')}</span>
      </div>
    </div>
  )
}

