'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Nav from './Nav'

// Desktop: renders the same static <aside className="side"> as before (the
// .topbar / .scrim are display:none ≥769px, so desktop is untouched).
// Mobile (≤768px): the aside becomes a slide-in drawer driven by `open`.
export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Tapping a nav item navigates -> pathname changes -> drawer closes.
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock background scroll while the drawer is open.
  useEffect(() => {
    document.body.classList.toggle('nav-open', open)
    return () => document.body.classList.remove('nav-open')
  }, [open])

  return (
    <>
      <header className="topbar">
        <button
          className="burger"
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="app-sidebar"
          onClick={() => setOpen(true)}
        >
          <span className="burger-bars" aria-hidden="true" />
        </button>
        <span className="topbrand"><span className="logo" aria-hidden="true" /> Your AI HQ</span>
      </header>

      <div
        className={`scrim ${open ? 'show' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside id="app-sidebar" className={`side ${open ? 'open' : ''}`}>
        <div className="brand"><span className="logo" aria-hidden="true" /> Your AI HQ</div>
        {/* Clicking anywhere in the nav (i.e. any link) also closes the drawer —
            covers re-tapping the page you're already on. */}
        <div onClick={() => setOpen(false)}><Nav /></div>
        <p className="hint">One <code>records</code> table behind all 8 tabs.</p>
      </aside>
    </>
  )
}
