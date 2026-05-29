import { getCalculator, getAllCalculators } from '@/lib/calculators/registry'
import { notFound } from 'next/navigation'
import CalculatorShell from '@/components/calculators/CalculatorShell'

export async function generateStaticParams() {
  const all = getAllCalculators()
  return all.map(c => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const config = getCalculator(params.slug)
  if (!config) return {}
  return {
    title: config.seo.title,
    description: config.seo.description,
  }
}

export default function CalculatorPage({
  params,
}: {
  params: { slug: string }
}) {
  const config = getCalculator(params.slug)
  if (!config) notFound()

  return <CalculatorShell slug={params.slug}/>
}