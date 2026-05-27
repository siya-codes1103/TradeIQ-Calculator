'use client'

import { SafeCalculator } from '@/types/calculator.types'
import CalcCard from './CalcCard'

export default function CalcSection({
  title,
  subtitle,
  accent,
  calculators,
}: {
  title: string
  subtitle: string
  accent: string
  calculators: SafeCalculator[]
}) {
  if (calculators.length === 0) return null

  return (
    <section style={{ marginBottom: '56px' }}>
      <div style={{
        display: 'flex', alignItems: 'flex-start',
        gap: '14px', marginBottom: '24px',
      }}>
        <div style={{
          width: '3px', minHeight: '44px',
          backgroundColor: accent,
          borderRadius: '2px', flexShrink: 0, marginTop: '2px',
        }} />
        <div>
          <h2 style={{
            fontFamily: 'Raleway, sans-serif', fontWeight: 700,
            fontSize: '20px', color: '#F7FAF5', marginBottom: '4px',
          }}>
            {title}
          </h2>
          <p style={{
            fontFamily: 'Open Sans, sans-serif',
            fontSize: '13px', color: '#73786C',
          }}>
            {subtitle}
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '12px',
      }}>
        {calculators.map(calc => (
          <CalcCard key={calc.slug} calc={calc} accent={accent} />
        ))}
      </div>
    </section>
  )
}