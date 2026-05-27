import { Insight } from  '@/lib/calculators/engine'

const styles = {
  green: 'border-l-4 border-primary bg-primary/10 text-primary',
  amber: 'border-l-4 border-middle-yellow bg-middle-yellow/10 text-middle-yellow',
  red: 'border-l-4 border-royal-red bg-royal-red/10 text-royal-red',
}
const icons = { green: '✓', amber: '⚠', red: '✕' }

export default function InsightCard({ insight }: { insight: Insight }) {
  return (
    <div className={`rounded-lg p-4 text-sm leading-relaxed ${styles[insight.type]}`}>
      <span className="font-bold mr-2">{icons[insight.type]}</span>
      {insight.message}
    </div>
  )
}