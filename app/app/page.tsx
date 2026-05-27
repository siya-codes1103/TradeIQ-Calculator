import Link from 'next/link'
import { getAllCalculators } from '@/lib/calculators/registry'
import { SafeCalculator } from '@/types/calculator.types'
import CalcSection from '@/components/calculators/CalcSection'

function getSafeCalculators(): SafeCalculator[] {
  return getAllCalculators().map(c => ({
    id: c.id,
    slug: c.slug,
    title: c.title,
    description: c.description,
    category: c.category,
    badge: c.badge,
    icon: c.icon,
    comingSoon: c.comingSoon,
  }))
}

export default function HomePage() {
  const all      = getSafeCalculators()
  const trading  = all.filter(c => c.category === 'trading')
  const investing = all.filter(c => c.category === 'investing')
  const crypto   = all.filter(c => c.category === 'crypto')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0F1209', color: '#D3DEC8' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        backgroundColor: '#181916',
        borderBottom: '1px solid #242620',
        padding: '0 32px', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <span style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: '20px', color: '#F7FAF5' }}>
            Trade<span style={{ color: '#9BEC00' }}>Ved</span>
          </span>
          <div style={{ display: 'flex', gap: '28px' }}>
            {[
              { label: 'Calculators', href: '/calculators' },
              { label: 'Trading',     href: '/calculators' },
              { label: 'Investing',   href: '/calculators' },
            ].map(item => (
              <Link key={item.label} href={item.href} style={{
                fontFamily: 'Open Sans, sans-serif', fontSize: '13px',
                color: '#A2AB9A', textDecoration: 'none',
              }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <Link href="/calculators" style={{
          backgroundColor: '#9BEC00', color: '#0F1209',
          fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '13px',
          padding: '8px 20px', borderRadius: '8px', textDecoration: 'none',
        }}>
          All Calculators
        </Link>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '80px 32px 64px',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          backgroundColor: 'rgba(155,236,0,0.08)',
          border: '1px solid rgba(155,236,0,0.2)',
          borderRadius: '999px', padding: '5px 14px', marginBottom: '32px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#9BEC00', display: 'inline-block' }} />
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#9BEC00', fontWeight: 600 }}>
            Free · No signup required · 9 calculators live
          </span>
        </div>

        <h1 style={{
          fontFamily: 'Raleway, sans-serif', fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 52px)',
          color: '#F7FAF5', lineHeight: 1.1,
          marginBottom: '20px', maxWidth: '680px',
        }}>
          Financial Calculators for
          <br />
          <span style={{ color: '#9BEC00' }}>Serious Traders</span>
        </h1>

        <p style={{
          fontFamily: 'Open Sans, sans-serif', fontSize: '15px',
          color: '#A2AB9A', lineHeight: 1.7,
          maxWidth: '500px', marginBottom: '36px',
        }}>
          Position sizing, risk management, and investing tools —
          built for Indian traders who want precision over guesswork.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/calculators" style={{
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

      {/* ── STATS ── */}
      <div style={{ borderTop: '1px solid #242620', borderBottom: '1px solid #242620', backgroundColor: '#181916' }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto', padding: '0 32px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {[
            { value: '9+',   label: 'Live Calculators' },
            { value: '0ms',  label: 'Result Speed' },
            { value: '₹0',   label: 'Free Forever' },
            { value: '100%', label: 'Accurate' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '28px 24px', textAlign: 'center',
              borderRight: i < 3 ? '1px solid #242620' : 'none',
            }}>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '26px', color: '#9BEC00', marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#73786C' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CALCULATOR SECTIONS ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 32px' }}>

        <CalcSection title="Trading Calculators" subtitle="Size your positions, manage risk, and plan every trade professionally." accent="#9BEC00" calculators={trading} />
        <CalcSection title="Investment Calculators" subtitle="Plan SIPs, visualise compounding, and calculate real long-term returns." accent="#2F8EFF" calculators={investing} />
        <CalcSection title="Crypto Calculators" subtitle="Liquidation prices, leverage risk and crypto futures P&L." accent="#CC0066" calculators={crypto} />

        {/* CTA */}
        <div style={{
          marginTop: '48px', backgroundColor: '#181916',
          border: '1px solid #242620', borderRadius: '16px',
          padding: '48px 40px', textAlign: 'center',
        }}>
          <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: '26px', color: '#F7FAF5', marginBottom: '12px' }}>
            Start calculating smarter
          </h2>
          <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '14px', color: '#73786C', maxWidth: '400px', margin: '0 auto 28px', lineHeight: 1.6 }}>
            No signup. No ads. Just accurate financial tools built for Indian traders.
          </p>
          <Link href="/calculators" style={{
            display: 'inline-block', backgroundColor: '#9BEC00', color: '#0F1209',
            fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '14px',
            padding: '12px 32px', borderRadius: '10px', textDecoration: 'none',
          }}>
            View All Calculators →
          </Link>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #242620', backgroundColor: '#181916', padding: '40px 32px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <span style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: '18px', color: '#F7FAF5' }}>
              Trade<span style={{ color: '#9BEC00' }}>Ved</span>
            </span>
            <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#73786C', marginTop: '6px' }}>
              Professional calculator platform for Indian traders
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '11px', color: '#A2AB9A', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '12px' }}>
              Top Calculators
            </p>
            {[
              { label: 'SIP Calculator',      href: '/calculators/sip' },
              { label: 'EMI Calculator',      href: '/calculators/emi' },
              { label: 'Position Size',       href: '/calculators/position-size' },
              { label: 'Risk Reward',         href: '/calculators/risk-reward' },
              { label: 'Compound Interest',   href: '/calculators/compound-interest' },
            ].map(link => (
              <div key={link.href} style={{ marginBottom: '8px' }}>
                <Link href={link.href} style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '13px', color: '#73786C', textDecoration: 'none' }}>
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          maxWidth: '1100px', margin: '24px auto 0',
          borderTop: '1px solid #242620', paddingTop: '20px',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
        }}>
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '11px', color: '#73786C' }}>
            © 2025 TradeVed. Built for disciplined traders.
          </span>
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '11px', color: '#73786C' }}>
            Not SEBI registered financial advice.
          </span>
        </div>
      </footer>

    </div>
  )
}
