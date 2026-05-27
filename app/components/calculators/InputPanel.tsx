'use client'
import { InputField } from '@/lib/calculators/engine'
interface Props {
  inputs: InputField[]
  values: Record<string, number>
  onChange: (id: string, value: number) => void
}

export default function InputPanel({ inputs, values, onChange }: Props) {
  return (
    <div className="bg-surface-1 border border-surface-2 rounded-card p-6 space-y-6 h-fit">
      <h2 className="font-heading font-semibold text-foreground text-lg">Input Values</h2>
      {inputs.map((field) => (
        <div key={field.id}>
          <div className="flex items-center justify-between mb-2">
            <label className="text-body text-sm">{field.label}</label>
            <span className="font-mono text-sm text-primary bg-surface-2 px-2 py-0.5 rounded-md">
              {field.prefix}{values[field.id]?.toLocaleString('en-IN')}{field.unit && ` ${field.unit}`}
            </span>
          </div>
          {field.type === 'slider' && (
            <div className="space-y-1">
              <input
                type="range"
                min={field.min} max={field.max} step={field.step}
                value={values[field.id]}
                onChange={(e) => onChange(field.id, Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-surface-2 accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-xs text-subtle">
                <span>{field.min}{field.unit}</span>
                <span>{field.max}{field.unit}</span>
              </div>
            </div>
          )}
          {field.type === 'number' && (
            <input
              type="number"
              value={values[field.id]}
              onChange={(e) => onChange(field.id, Number(e.target.value))}
              className="w-full bg-surface-2 border border-surface-2 focus:border-primary rounded-input px-4 py-3 text-foreground font-mono text-sm outline-none transition-colors"
            />
          )}
        </div>
      ))}
    </div>
  )
}