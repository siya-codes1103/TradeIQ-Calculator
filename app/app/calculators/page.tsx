'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { getAllCalculators } from '@/lib/calculators/registry'
import type { CalculatorConfig } from '@/lib/calculators/engine'


const categoryTabs = [
  { id: 'all', label: 'All' },
  { id: 'trading', label: 'Trading' },
  { id: 'investing', label: 'Investing' },
  { id: 'crypto', label: 'Crypto' },
]


const badgeStyle: Record<string, string> = {
  'MOST USED':    'bg-primary text-background',
  'HIGH TRAFFIC': 'bg-azure/20 text-azure border border-azure/40',
  'POPULAR':      'bg-primary/20 text-primary border border-primary/40',
  'CRITICAL':     'bg-royal-red/20 text-royal-red border border-royal-red/40',
}


const trendingCalcs = ['position-size', 'sip', 'emi']


export default function CalculatorsPage() {
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const all = getAllCalculators()


  const filtered = all.filter(c => {
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase())
    const matchTab = activeTab === 'all' || c.category === activeTab
    return matchSearch && matchTab
  })


  const popular = all.filter(c => trendingCalcs.includes(c.slug))
  const trading  = filtered.filter(c => c.category === 'trading')
  const investing = filtered.filter(c => c.category === 'investing')
  const crypto   = filtered.filter(c => c.category === 'crypto')


  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-10">


        {/* HEADER */}
        <h1 className="font-heading font-bold text-4xl text-foreground mb-1">
          Calculator Library
        </h1>
        <p className="text-subtle text-sm mb-8">
          Professional tools for every trading and investing decision.
        </p>


        {/* SEARCH + FILTER ROW */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          {/* Search */}
          <input
            type="text"
            placeholder="Search calculators..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-96 bg-surface-1 border border-surface-2 hover:border-muted focus:border-primary rounded-xl px-5 py-3 text-body text-sm outline-none transition-colors placeholder:text-subtle"
          />
          {/* Tabs */}
          <div className="flex items-center gap-2">
            {categoryTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-heading font-semibold transition-all
                  ${activeTab === tab.id
                    ? 'bg-primary text-background'
                    : 'bg-surface-2 text-muted hover:text-foreground hover:bg-surface-1'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>


        {/* POPULAR THIS WEEK */}
        {activeTab === 'all' && !search && (
          <section className="mb-12">
            <h2 className="font-heading font-semibold text-base text-foreground mb-5 flex items-center gap-2">
              <span className="text-lg">🔥</span>
              Popular this week
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {popular.map(calc => (
                <CalcCard key={calc.slug} calc={calc} trending />
              ))}
            </div>
          </section>
        )}


        {/* TRADING */}
        {trading.length > 0 && (
          <section className="mb-12">
            <h2 className="font-heading font-bold text-xl text-foreground mb-5">
              Trading Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trading.map(calc => (
                <CalcCard key={calc.slug} calc={calc} />
              ))}
            </div>
          </section>
        )}


        {/* INVESTING */}
        {investing.length > 0 && (
          <section className="mb-12">
            <h2 className="font-heading font-bold text-xl text-foreground mb-5">
              Investment Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {investing.map(calc => (
                <CalcCard key={calc.slug} calc={calc} />
              ))}
            </div>
          </section>
        )}


        {/* CRYPTO */}
        {crypto.length > 0 && (
          <section className="mb-12">
            <h2 className="font-heading font-bold text-xl text-foreground mb-5">
              Crypto Calculators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {crypto.map(calc => (
                <CalcCard key={calc.slug} calc={calc} />
              ))}
            </div>
          </section>
        )}


      </div>
    </main>
  )
}


// ── CALC CARD ──────────────────────────────────────
function CalcCard({
  calc,
  trending = false,
}: {
  calc: CalculatorConfig
  trending?: boolean
}) {
  const isLive = !calc.comingSoon


  return (
    <div className="relative bg-surface-1 border border-surface-2 rounded-xl p-5 flex flex-col gap-0 hover:border-primary/50 transition-all duration-200 group min-h-[160px]">


      {/* TRENDING badge — top left */}
      {trending && (
        <span className="absolute top-0 left-5 -translate-y-1/2 bg-primary text-background text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide">
          TRENDING
        </span>
      )}


      {/* STATUS badge — top right */}
      {calc.badge && (
        <span className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wide ${badgeStyle[calc.badge] ?? 'bg-surface-2 text-muted'}`}>
          {calc.badge}
        </span>
      )}


      {/* ICON */}
      <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
        <CalcIcon name={calc.icon} />
      </div>


      {/* TITLE */}
      <h3 className={`font-heading font-semibold text-sm text-foreground mb-1.5 leading-snug group-hover:text-primary transition-colors ${calc.badge ? 'pr-20' : ''}`}>
        {calc.title}
      </h3>


      {/* DESCRIPTION */}
      <p className="text-subtle text-xs leading-relaxed mb-4 flex-1">
        {calc.description}
      </p>


      {/* CTA */}
      {isLive ? (
        <Link
          href={`/calculators/${calc.slug}`}
          className="text-primary text-xs font-bold font-heading hover:underline underline-offset-2 mt-auto"
        >
          Open Calculator →
        </Link>
      ) : (
        <span className="text-primary/50 text-xs font-body mt-auto">
          Coming soon
        </span>
      )}
    </div>
  )
}


// ── ICON COMPONENT ─────────────────────────────────
function CalcIcon({ name }: { name: string }) {
  const icons: Record<string, string> = {
    Target:       '◎',
    Scale:        '⚖',
    TrendingUp:   '↗',
    Home:         '⌂',
    Receipt:      '≡',
    AlertOctagon: '⊗',
    BarChart2:    '▦',
    CalendarCheck:'▣',
    Bitcoin:      '₿',
    Layers:       '◫',
  }
  return (
    <span className="text-primary text-base leading-none">
      {icons[name] ?? '◎'}
    </span>
  )
}

