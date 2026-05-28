'use client'

import Link from 'next/link'
import { CalculatorConfig } from '@/lib/calculators/engine'
import { SafeCalculator } from '@/types/calculator.types'

const badgeStyle: Record<string, { bg: string; color: string }> = {
  'MOST USED':    { bg: 'rgba(155,236,0,0.15)',  color: '#9BEC00' },
  'HIGH TRAFFIC': { bg: 'rgba(47,142,255,0.15)', color: '#2F8EFF' },
  'POPULAR':      { bg: 'rgba(155,236,0,0.15)',  color: '#9BEC00' },
  'CRITICAL':     { bg: 'rgba(204,0,102,0.15)',  color: '#CC0066' },
}

export default function CalcCard({
  calc,
  accent,
}: {
  calc: CalculatorConfig
  accent: string
}) {
  const isLive = !calc.comingSoon

  return (
    <div
      style={{
        backgroundColor: '#181916',
        border: '1px solid #242620',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '150px',
        position: 'relative',
        transition: 'border-color 0.15s ease',
        cursor: isLive ? 'pointer' : 'default',
      }}
      onMouseEnter={e => {
        if (isLive)
          (e.currentTarget as HTMLDivElement).style.borderColor = accent
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#242620'
      }}
    >
      {/* Badge */}
      {calc.badge && badgeStyle[calc.badge] && (
        <span style={{
          position: 'absolute', top: '16px', right: '16px',
          backgroundColor: badgeStyle[calc.badge].bg,
          color: badgeStyle[calc.badge].color,
          fontFamily: 'Open Sans, sans-serif',
          fontSize: '10px', fontWeight: 700,
          padding: '3px 8px', borderRadius: '999px',
          letterSpacing: '0.5px',
        }}>
          {calc.badge}
        </span>
      )}

      {/* Icon */}
      <div style={{
        width: '36px', height: '36px',
        backgroundColor: `${accent}18`,
        border: `1px solid ${accent}30`,
        borderRadius: '8px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '14px',
        flexShrink: 0,
      }}>
        <span style={{ color: accent, fontSize: '15px', lineHeight: '1' }}>◎</span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'Raleway, sans-serif', fontWeight: 700,
        fontSize: '14px', color: '#F7FAF5',
        marginBottom: '6px', lineHeight: '1.3',
        paddingRight: calc.badge ? '80px' : '0',
      }}>
        {calc.title}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: 'Open Sans, sans-serif', fontSize: '12px',
        color: '#73786C', lineHeight: '1.6',
        marginBottom: '16px', flex: 1,
      }}>
        {calc.description}
      </p>

      {/* CTA */}
      {isLive ? (
        <Link href={`/calculators/${calc.slug}`} style={{
          fontFamily: 'Raleway, sans-serif', fontWeight: 700,
          fontSize: '12px', color: accent,
          textDecoration: 'none', marginTop: 'auto',
        }}>
          Open Calculator →
        </Link>
      ) : (
        <span style={{
          fontFamily: 'Open Sans, sans-serif',
          fontSize: '12px', color: '#73786C',
          marginTop: 'auto',
        }}>
          Coming soon
        </span>
      )}
    </div>
  )
}