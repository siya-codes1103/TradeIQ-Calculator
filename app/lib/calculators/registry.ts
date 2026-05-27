import { CalculatorConfig } from './engine'
import { positionSizeConfig } from './configs/position-size.config'
import { riskRewardConfig } from './configs/risk-reward.config'
import { compoundConfig } from './configs/compound.config'
import { emiConfig } from './configs/emi.config'
import { pnlConfig } from './configs/pnl.config'
import { liquidationConfig } from './configs/liquidation.config'
import { roiConfig } from './configs/roi.config'
import { brokerageConfig } from './configs/brokerage.config'
import { sipConfig } from './configs/sip.config'
import { marginConfig } from './configs/margin.config'
import { cryptoFuturesConfig } from './configs/crypto-futures.config'
import { retirementConfig } from './configs/retirement.config'
import { inflationConfig } from './configs/inflation.config'
import { fdRdConfig } from './configs/fd-rd.config'
import { portfolioAllocationConfig } from './configs/portfolio-allocation.config'

export const registry: Record<string, CalculatorConfig> = {
  'position-size':        positionSizeConfig,
  'risk-reward':          riskRewardConfig,
  'compound-interest':    compoundConfig,
  'emi':                  emiConfig,
  'pnl':                  pnlConfig,
  'liquidation':          liquidationConfig,
  'roi':                  roiConfig,
  'brokerage':            brokerageConfig,
  'sip':                  sipConfig,
  'margin':               marginConfig,
  'crypto-futures':       cryptoFuturesConfig,
  'retirement':           retirementConfig,
  'inflation':            inflationConfig,
  'fd-rd':                fdRdConfig,
  'portfolio-allocation': portfolioAllocationConfig,
}

export function getCalculator(slug: string): CalculatorConfig | null {
  return registry[slug] ?? null
}

export function getAllCalculators(): CalculatorConfig[] {
  return Object.values(registry)
}

export function getCalculatorsByCategory(category: string): CalculatorConfig[] {
  if (category === 'all') return getAllCalculators()
  return Object.values(registry).filter(c => c.category === category)
}