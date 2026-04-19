if (typeof window !== 'undefined') {
  const initPostHog = () => {
    import('posthog-js').then(({ default: posthog }) => {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        defaults: '2025-11-30',
        disable_session_recording: true,
        autocapture: false,
        capture_pageview: true,
        capture_pageleave: true,
        loaded: (ph) => {
          ph.opt_out_of_session_recording()
        },
      })
    })
  }

  // Wait until page is fully loaded, then defer to idle time
  const scheduleInit = () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(initPostHog, { timeout: 8000 })
    } else {
      setTimeout(initPostHog, 5000)
    }
  }

  if (document.readyState === 'complete') {
    scheduleInit()
  } else {
    window.addEventListener('load', scheduleInit)
  }
}
