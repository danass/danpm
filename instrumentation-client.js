if (typeof window !== 'undefined') {
  // Defer PostHog init until after page is interactive
  const initPostHog = () => {
    import('posthog-js').then(({ default: posthog }) => {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        defaults: '2025-11-30',
        loaded: (ph) => {
          // Disable session recording to reduce JS payload
          if (process.env.NEXT_PUBLIC_POSTHOG_DISABLE_RECORDING === 'true') {
            ph.opt_out_of_session_recording()
          }
        },
      })
    })
  }

  if (document.readyState === 'complete') {
    setTimeout(initPostHog, 2000)
  } else {
    window.addEventListener('load', () => setTimeout(initPostHog, 2000))
  }
}
