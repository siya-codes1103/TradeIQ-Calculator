export interface InputField {
  id: string
  label: string
  type: 'number' | 'slider' | 'select'
  default: number
  min?: number
  max?: number
  step?: number
  unit?: string
  prefix?: string
  options?: { label: string; value: number }[]
}

export interface Insight {
  type: 'green' | 'amber' | 'red'
  message: string
}

export interface MetricItem {
  label: string
  value: number
  unit?: string
  prefix?: string
}

export interface CalculatorResult {
  primary: MetricItem
  metrics: MetricItem[]
}

export interface CalculatorConfig {
  id: string
  slug: string
  title: string
  description: string
  category: 'trading' | 'investing' | 'crypto'
  badge?: string
  icon: string
  comingSoon?: boolean
  inputs: InputField[]
  formula: (inputs: Record<string, number>) => CalculatorResult
  insights: (result: CalculatorResult, inputs: Record<string, number>) => Insight[]
  seo: {
    title: string
    description: string
    keywords: string[]
    faqs: { question: string; answer: string }[]
  }
}