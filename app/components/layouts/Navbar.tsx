'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      backgroundColor: '#181916',
      borderBottom: '1px solid #242620',
      height: '60px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px', gap: '24px',
    }}>

      {/* LOGO */}
      <Link href="/" style={{
        fontFamily: 'Raleway, sans-serif', fontWeight: 800,
        fontSize: '20px', color: '#F7FAF5', textDecoration: 'none',
        flexShrink: 0,
      }}>
        Trade<span style={{ color: '#9BEC00' }}>Ved</span>
      </Link>

      {/* CATEGORY LINKS — desktop only */}
      <div style={{
        display: 'flex', gap: '4px', flex: 1,
        justifyContent: 'center',
      }}>
        {[
          { label: 'Trading', href: '/#trading' },
          { label: 'Wealth', href: '/#investing' },
          { label: 'Crypto', href: '/#crypto' },
          { label: 'Loans', href: '/#loans' },
          { label: 'Valuation', href: '/#valuation' },
        ].map(item => (
          <Link key={item.label} href={item.href} style={{
            fontFamily: 'Open Sans, sans-serif', fontSize: '13px',
            color: '#A2AB9A', textDecoration: 'none',
            padding: '6px 12px', borderRadius: '6px',
            transition: 'color 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F7FAF5')}
            onMouseLeave={e => (e.currentTarget.style.color = '#A2AB9A')}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <Link href="/#calculators" style={{
        backgroundColor: '#9BEC00', color: '#0F1209',
        fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '13px',
        padding: '8px 18px', borderRadius: '8px', textDecoration: 'none',
        flexShrink: 0,
      }}>
        All Calculators
      </Link>

    </nav>
  )
}