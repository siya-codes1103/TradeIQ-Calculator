import Link from 'next/link'
import { getAllCalculators } from '@/lib/calculators/registry'
import { SafeCalculator } from '@/types/calculator.types'
import Navbar from '@/components/layouts/Navbar'
import Footer from '@/components/layouts/Footer'
import SearchTool from '@/components/home/SearchTool'
import CalcCard from '@/components/calculators/CalcCard'

function getSafeCalculators(): SafeCalculator[] {
  return getAllCalculators().map(c => ({
    id: c.id, slug: c.slug, title: c.title,
    description: c.description, category: c.category,
    badge: c.badge, icon: c.icon, comingSoon: c.comingSoon,
  }))
}

const categories = [
  {
    id: 'trading',
    title: 'Trading Risk',
    subtitle: 'For active traders who want to manage risk professionally',
    accent: '#9BEC00',
    whoFor: 'Active traders, intraday traders, F&O traders',
    slugs: ['position-size', 'risk-reward', 'pnl', 'brokerage', 'margin', 'liquidation'],
  },
  {
    id: 'investing',
    title: 'Wealth Planning',
    subtitle: 'For investors building long-term wealth systematically',
    accent: '#2F8EFF',
    whoFor: 'Long-term investors, salaried professionals, retirement planners',
    slugs: ['sip', 'compound-interest', 'retirement', 'inflation', 'fd-rd', 'roi', 'portfolio-allocation', 'cagr', 'savings-goal', 'net-worth'],
  },
  {
    id: 'crypto',
    title: 'Crypto & Futures',
    subtitle: 'For crypto traders using leverage and derivatives',
    accent: '#CC0066',
    whoFor: 'Crypto traders, futures traders, derivatives users',
    slugs: ['liquidation', 'crypto-futures'],
  },
  {
    id: 'loans',
    title: 'Loans & Property',
    subtitle: 'For anyone planning a home loan, car loan, or personal loan',
    accent: '#FDE900',
    whoFor: 'Home buyers, borrowers, anyone repaying a loan',
    slugs: ['emi'],
  },
  {
    id: 'valuation',
    title: 'Stock Valuation',
    subtitle: 'For fundamental investors who analyse stocks before buying',
    accent: '#A855F7',
    whoFor: 'Value investors, fundamental analysts, long-term stock pickers',
    slugs: ['dcf', 'graham-number', 'piotroski', 'ytm'],
  },
]

export default function HomePage() {
  const all = getSafeCalculators()

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0F1209', color: '#D3DEC8' }}>
      <Navbar />

      {/* HERO */}
      <section style={{
        maxWidth: '800px', margin: '0 auto',
        padding: '72px 24px 48px', textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          backgroundColor: 'rgba(155,236,0,0.08)',
          border: '1px solid rgba(155,236,0,0.2)',
          borderRadius: '999px', padding: '5px 14px', marginBottom: '28px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#9BEC00', display: 'inline-block' }} />
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#9BEC00', fontWeight: 600 }}>
            22 free calculators · No signup needed
          </span>
        </div>

        <h1 style={{
          fontFamily: 'Raleway, sans-serif', fontWeight: 800,
          fontSize: 'clamp(28px, 5vw, 48px)',
          color: '#F7FAF5', lineHeight: 1.15, marginBottom: '16px',
        }}>
          Make Smarter Financial
          <br />
          <span style={{ color: '#9BEC00' }}>Decisions — Every Day</span>
        </h1>

        <p style={{
          fontFamily: 'Open Sans, sans-serif', fontSize: '15px',
          color: '#A2AB9A', lineHeight: 1.7,
          maxWidth: '520px', margin: '0 auto 32px',
        }}>
          From sizing your first trade to planning retirement —
          TradeVed gives Indian traders and investors the tools to
          calculate, understand, and act with confidence.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/#calculators" style={{
            backgroundColor: '#9BEC00', color: '#0F1209',
            fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '14px',
            padding: '12px 28px', borderRadius: '10px', textDecoration: 'none',
          }}>
            Explore All Calculators
          </Link>
          <Link href="/calculators/position-size" style={{
            backgroundColor: 'transparent', color: '#F7FAF5',
            fontFamily: 'Open Sans, sans-serif', fontSize: '14px',
            padding: '12px 28px', borderRadius: '10px', textDecoration: 'none',
            border: '1px solid #242620',
          }}>
            Try Position Size →
          </Link>
        </div>
      </section>

      {/* STATS */}
      <div style={{
        borderTop: '1px solid #242620', borderBottom: '1px solid #242620',
        backgroundColor: '#181916',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto', padding: '0 32px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {[
            { value: '22+', label: 'Calculators' },
            { value: '0ms', label: 'Result Speed' },
            { value: '₹0', label: 'Free Forever' },
            { value: '100%', label: 'Client-side' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '24px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid #242620' : 'none',
            }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '24px', color: '#9BEC00', marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#73786C' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH TOOL */}
      <section style={{ padding: '64px 24px' }}>
        <SearchTool />
      </section>

      {/* CALCULATOR CATEGORIES */}
      <div id="calculators" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 32px 80px' }}>
        {categories.map(cat => {
          const calcs = cat.slugs
            .map(slug => all.find(c => c.slug === slug))
            .filter(Boolean) as SafeCalculator[]
          if (calcs.length === 0) return null

          return (
            <section key={cat.id} style={{ marginBottom: '64px' }}>
              <section key={cat.id} id={cat.id} style={{ marginBottom: '64px' }}></section>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '8px' }}>
                <div style={{
                  width: '3px', minHeight: '52px',
                  backgroundColor: cat.accent,
                  borderRadius: '2px', flexShrink: 0, marginTop: '2px',
                }} />
                <div>
                  <h2 style={{
                    fontFamily: 'Raleway, sans-serif', fontWeight: 800,
                    fontSize: '22px', color: '#F7FAF5', marginBottom: '4px',
                  }}>
                    {cat.title}
                  </h2>
                  <p style={{
                    fontFamily: 'Open Sans, sans-serif', fontSize: '13px',
                    color: '#73786C', marginBottom: '4px',
                  }}>
                    {cat.subtitle}
                  </p>
                  <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '11px', color: '#73786C' }}>
                    <span style={{ color: cat.accent, fontWeight: 600 }}>Who uses this: </span>
                    {cat.whoFor}
                  </p>
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
                gap: '12px', marginTop: '20px',
              }}>
                {calcs.map(calc => (
                  <CalcCard key={calc.slug} calc={calc} accent={cat.accent} />
                  
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <Footer />
    </div>
  )
}