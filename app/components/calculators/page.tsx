import Link from 'next/link'
import { getAllCalculators } from '@/lib/calculators/registry'

export const metadata = {
  title: 'Calculator Library | TradeVed',
  description: 'All trading and investment calculators in one place',
}

export default function CalculatorsPage() {
  const calculators = getAllCalculators()
  const trading = calculators.filter(c => c.category === 'trading')
  const investing = calculators.filter(c => c.category === 'investing')

  return (
    <main className="min-h-screen bg-background">

      {/* HEADER */}
      <div className="border-b border-surface-2 bg-surface-1">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <p className="text-muted text-sm mb-2">
            <Link href="/" className="hover:text-primary">Home</Link>
            {' '}/{' '}
            <span className="text-foreground">Calculators</span>
          </p>
          <h1 className="font-heading font-bold text-4xl text-foreground mb-3">
            Calculator Library
          </h1>
          <p className="text-muted">
            Professional tools for every trading and investing decision.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* TRADING */}
        <section className="mb-12">
          <h2 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
            Trading Calculators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trading.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="bg-surface-1 border border-surface-2 rounded-card p-5 hover:border-primary transition-colors group"
              >
                <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {calc.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {calc.description}
                </p>
                <span className="inline-block mt-4 text-primary text-xs font-bold">
                  Open Calculator →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* INVESTING */}
        <section>
          <h2 className="font-heading font-bold text-xl text-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-azure inline-block"></span>
            Investing Calculators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {investing.map((calc) => (
              <Link
                key={calc.slug}
                href={`/calculators/${calc.slug}`}
                className="bg-surface-1 border border-surface-2 rounded-card p-5 hover:border-primary transition-colors group"
              >
                <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {calc.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {calc.description}
                </p>
                <span className="inline-block mt-4 text-azure text-xs font-bold">
                  Open Calculator →
                </span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}