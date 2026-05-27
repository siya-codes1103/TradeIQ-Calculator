import { CalculatorResult, MetricItem } from '@/lib/calculators/engine'

export default function ResultPanel({ result }: { result: CalculatorResult }) {
  const isNegative = result.primary.value < 0
  return (
    <div className="bg-surface-1 border border-surface-2 rounded-card p-6">
      <div className="text-center py-6 border-b border-surface-2 mb-6">
        <p className="text-muted text-sm mb-3">{result.primary.label}</p>
        <p className={`font-mono font-bold text-5xl ${isNegative ? 'text-royal-red' : 'text-primary'}`}>
          {result.primary.prefix}
          {result.primary.value.toLocaleString('en-IN')}
          {result.primary.unit && (
            <span className="text-2xl ml-1 text-muted">{result.primary.unit}</span>
          )}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {result.metrics.map((metric: MetricItem, i: number) => (
          <div key={i} className="bg-surface-2 rounded-lg p-4">
            <p className="text-subtle text-xs mb-1">{metric.label}</p>
            <p className="font-mono font-semibold text-foreground text-lg">
              {metric.prefix}
              {metric.value.toLocaleString('en-IN')}
              {metric.unit && (
                <span className="text-sm text-muted ml-1">{metric.unit}</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}