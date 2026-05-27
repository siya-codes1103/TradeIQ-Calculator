import { getAllCalculators } from '@/lib/calculators/registry'
import { notFound } from 'next/navigation'
import CalculatorShell from '@/components/calculators/CalculatorShell'
import type { Metadata } from 'next'
import { getCalculator } from '@/lib/calculators/registry'

export async function generateStaticParams() {
  return getAllCalculators().map(c => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getCalculator(slug)
  if (!config) return {}
  return {
    title: config.seo.title,
    description: config.seo.description,
  }
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const exists = getCalculator(slug)
  if (!exists) notFound()
  return <CalculatorShell slug={slug} />
}