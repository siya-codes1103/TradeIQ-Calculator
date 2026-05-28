
export interface SafeCalculator {
  id: string
  slug: string
  title: string
  description: string
  category: 'trading' | 'investing' | 'crypto'
  badge?: string
  icon: string
  comingSoon?: boolean
}