'use client'

import { useLanguage } from '../contexts/LanguageContext'

export default function ImpactMetrics() {
  const { t } = useLanguage()
  const metrics = t?.metrics

  if (!metrics || metrics.length === 0) return null

  return (
    <section aria-label="Key impact metrics" className="mt-8 print:mt-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 print:grid-cols-3 print:gap-2">
        {metrics.map((m, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-200 bg-white/60 p-4 transition-all hover:border-slate-300 hover:bg-white print:rounded-lg print:border-slate-300 print:bg-white print:p-2"
          >
            <div className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl print:text-xl">
              {m.value}
            </div>
            <div className="mt-1 text-xs leading-snug text-slate-500 sm:text-sm print:text-[10px]">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
