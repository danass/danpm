'use client'

import { useState } from 'react'
import { UI } from '@/lib/i18n'

export default function ContactTrigger({ label, className = '', lang = 'fr' }) {
  const t = UI[lang]
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          website: data.website,
        }),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          setOpen(true)
          setStatus('idle')
        }}
      >
        {label || t.contactMe}
      </button>

      {open && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={t.form}
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div className="modal-panel">
            <button className="modal-close" onClick={() => setOpen(false)} aria-label={t.close}>
              ×
            </button>

            {status === 'sent' ? (
              <div>
                <h2>{t.sent}</h2>
                <p className="modal-note">{t.sentNote}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <h2>{t.writeMe}</h2>
                <label>
                  {t.yourName}
                  <input name="name" required autoComplete="name" />
                </label>
                <label>
                  {t.yourEmail}
                  <input name="email" type="email" required autoComplete="email" />
                </label>
                <label>
                  {t.message}
                  <textarea name="message" rows={6} required />
                </label>
                {/* Honeypot anti-bot : caché aux humains */}
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="modal-hp"
                  aria-hidden="true"
                />
                {status === 'error' && (
                  <p className="modal-error">
                    {t.error}
                  </p>
                )}
                <button type="submit" className="modal-send" disabled={status === 'sending'}>
                  {status === 'sending' ? t.sending : t.send}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
