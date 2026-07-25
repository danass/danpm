'use client'

import { useState } from 'react'

export default function ContactTrigger({ label = 'Me contacter', className = '' }) {
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
        {label}
      </button>

      {open && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Formulaire de contact"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
        >
          <div className="modal-panel">
            <button className="modal-close" onClick={() => setOpen(false)} aria-label="Fermer">
              ×
            </button>

            {status === 'sent' ? (
              <div>
                <h2>Message envoyé</h2>
                <p className="modal-note">Je vous répondrai par email.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <h2>Écrivez-moi</h2>
                <label>
                  Votre nom
                  <input name="name" required autoComplete="name" />
                </label>
                <label>
                  Votre email
                  <input name="email" type="email" required autoComplete="email" />
                </label>
                <label>
                  Message
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
                    L&rsquo;envoi a échoué. Réessayez, ou contactez-moi via LinkedIn.
                  </p>
                )}
                <button type="submit" className="modal-send" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Envoi…' : 'Envoyer'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
