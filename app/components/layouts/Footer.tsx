import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #242620',
      backgroundColor: '#181916',
      padding: '48px 32px 32px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* TOP ROW */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '40px', marginBottom: '40px',
        }}>

          {/* BRAND */}
          <div>
            <span style={{
              fontFamily: 'Raleway, sans-serif', fontWeight: 800,
              fontSize: '20px', color: '#F7FAF5',
            }}>
              Trade<span style={{ color: '#9BEC00' }}>Ved</span>
            </span>
            <p style={{
              fontFamily: 'Open Sans, sans-serif', fontSize: '12px',
              color: '#73786C', marginTop: '8px', lineHeight: 1.6,
              maxWidth: '200px',
            }}>
              Professional financial calculators for Indian traders and investors.
            </p>
          </div>

          {/* TRADING */}
          <div>
            <p style={{
              fontFamily: 'Raleway, sans-serif', fontWeight: 700,
              fontSize: '11px', color: '#A2AB9A',
              letterSpacing: '1px', textTransform: 'uppercase',
              marginBottom: '14px',
            }}>
              Trading
            </p>
            {[
              { label: 'Position Size', href: '/calculators/position-size' },
              { label: 'Risk Reward', href: '/calculators/risk-reward' },
              { label: 'P&L Calculator', href: '/calculators/pnl' },
              { label: 'Liquidation', href: '/calculators/liquidation' },
              { label: 'Brokerage', href: '/calculators/brokerage' },
            ].map(l => (
              <div key={l.href} style={{ marginBottom: '8px' }}>
                <Link href={l.href} style={{
                  fontFamily: 'Open Sans, sans-serif', fontSize: '13px',
                  color: '#73786C', textDecoration: 'none',
                }}>
                  {l.label}
                </Link>
              </div>
            ))}
          </div>

          {/* INVESTING */}
          <div>
            <p style={{
              fontFamily: 'Raleway, sans-serif', fontWeight: 700,
              fontSize: '11px', color: '#A2AB9A',
              letterSpacing: '1px', textTransform: 'uppercase',
              marginBottom: '14px',
            }}>
              Investing
            </p>
            {[
              { label: 'SIP Calculator', href: '/calculators/sip' },
              { label: 'Compound Interest', href: '/calculators/compound-interest' },
              { label: 'EMI Calculator', href: '/calculators/emi' },
              { label: 'Retirement', href: '/calculators/retirement' },
              { label: 'FD / RD', href: '/calculators/fd-rd' },
            ].map(l => (
              <div key={l.href} style={{ marginBottom: '8px' }}>
                <Link href={l.href} style={{
                  fontFamily: 'Open Sans, sans-serif', fontSize: '13px',
                  color: '#73786C', textDecoration: 'none',
                }}>
                  {l.label}
                </Link>
              </div>
            ))}
          </div>

          {/* MORE */}
          <div>
            <p style={{
              fontFamily: 'Raleway, sans-serif', fontWeight: 700,
              fontSize: '11px', color: '#A2AB9A',
              letterSpacing: '1px', textTransform: 'uppercase',
              marginBottom: '14px',
            }}>
              More Tools
            </p>
            {[
              { label: 'ROI Calculator', href: '/calculators/roi' },
              { label: 'Inflation', href: '/calculators/inflation' },
              { label: 'Margin Calculator', href: '/calculators/margin' },
              { label: 'Crypto Futures', href: '/calculators/crypto-futures' },
              { label: 'Portfolio Allocation', href: '/calculators/portfolio-allocation' },
            ].map(l => (
              <div key={l.href} style={{ marginBottom: '8px' }}>
                <Link href={l.href} style={{
                  fontFamily: 'Open Sans, sans-serif', fontSize: '13px',
                  color: '#73786C', textDecoration: 'none',
                }}>
                  {l.label}
                </Link>
              </div>
            ))}
          </div>

        </div>

        {/* BOTTOM ROW */}
        <div style={{
          borderTop: '1px solid #242620', paddingTop: '20px',
          display: 'flex', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '8px',
        }}>
          <span style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '11px', color: '#73786C',
          }}>
            © 2025 TradeVed. Built for disciplined traders.
          </span>
          <span style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '11px', color: '#73786C',
          }}>
            Not SEBI registered. Not financial advice.
          </span>
        </div>

      </div>
    </footer>
  )
}