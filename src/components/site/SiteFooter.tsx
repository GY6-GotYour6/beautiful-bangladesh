'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#about', label: 'About' },
  { href: '/explore', label: 'Explore' },
  { href: '/explore', label: 'Destination' },
  { href: '#', label: 'Documentation' },
  { href: '#', label: 'Developers' },
]

const LEGAL_LINKS = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
]

function DiamondStrip() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full"
      height="35"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="bb-diamonds" width="23.3" height="35" patternUnits="userSpaceOnUse">
          <polygon
            points="11.65,2 19.15,17.5 11.65,33 4.15,17.5"
            fill="#f8ff98"
          />
        </pattern>
      </defs>
      <rect width="100%" height="35" fill="url(#bb-diamonds)" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 23.77 24" width="24" height="24" fill="none" aria-hidden="true">
      <path d="M23.39 12C23.4 15.06 22.2 18.01 20.04 20.18C17.89 22.36 14.96 23.6 11.89 23.62C10.37 23.61 8.87 23.31 7.46 22.72C6.06 22.13 4.79 21.27 3.72 20.19C2.65 19.11 1.81 17.83 1.23 16.42C0.66 15.02 0.37 13.51 0.38 11.99C0.37 8.92 1.57 5.98 3.73 3.8C5.89 1.63 8.82 0.4 11.88 0.38C14.95 0.4 17.88 1.64 20.04 3.82C22.19 5.99 23.4 8.93 23.39 12ZM15.19 13.48L15.66 10.47H12.87C12.87 9.69 12.86 8.96 12.88 8.24C12.87 8.02 12.93 7.81 13.05 7.63C13.17 7.46 13.33 7.32 13.53 7.23C13.85 7.1 14.2 7.02 14.55 6.99C14.93 6.95 15.32 6.98 15.76 6.98C15.76 6.24 15.75 5.54 15.77 4.84C15.77 4.56 15.67 4.5 15.41 4.49C14.76 4.48 14.1 4.45 13.44 4.41C12.64 4.31 11.82 4.51 11.16 4.99C10.5 5.46 10.05 6.17 9.89 6.96C9.78 7.46 9.72 7.97 9.72 8.48C9.69 9.14 9.71 9.8 9.71 10.51H7.1V13.49H9.73V20.75H12.88V13.48H15.19Z" fill="#f8ff98"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 23.77 24" width="24" height="24" fill="none" aria-hidden="true">
      <path d="M11.89 0.38C18.21 0.38 23.39 5.51 23.39 11.99C23.4 13.5 23.11 15.01 22.54 16.42C21.97 17.83 21.12 19.11 20.05 20.19C18.98 21.27 17.71 22.13 16.31 22.72C14.91 23.31 13.4 23.61 11.88 23.62C8.82 23.6 5.89 22.36 3.73 20.19C1.57 18.01 0.37 15.06 0.38 11.99C0.37 8.94 1.58 6 3.73 3.81C5.89 1.64 8.82 0.4 11.88 0.38ZM8.54 4.59C8.02 4.59 7.49 4.69 7 4.89C6.51 5.09 6.07 5.39 5.7 5.77C5.32 6.14 5.03 6.59 4.83 7.08C4.63 7.57 4.54 8.09 4.54 8.62C4.54 10.86 4.54 13.1 4.54 15.33C4.53 15.86 4.62 16.39 4.81 16.88C5 17.38 5.29 17.83 5.66 18.21C6.03 18.59 6.47 18.89 6.96 19.1C7.45 19.3 7.97 19.41 8.5 19.41C10.77 19.44 13.03 19.44 15.3 19.41C15.82 19.41 16.34 19.3 16.82 19.1C17.3 18.9 17.74 18.6 18.11 18.23C18.48 17.85 18.77 17.41 18.96 16.93C19.16 16.44 19.26 15.92 19.25 15.4C19.28 13.12 19.28 10.85 19.25 8.57C19.25 8.05 19.15 7.52 18.95 7.04C18.74 6.55 18.45 6.11 18.07 5.74C17.7 5.37 17.25 5.08 16.77 4.88C16.28 4.68 15.76 4.58 15.23 4.59C13.11 4.59 11 4.59 8.54 4.59ZM11.91 7.93C12.98 7.94 14 8.38 14.75 9.14C15.5 9.91 15.93 10.94 15.93 12.01C15.93 13.1 15.5 14.1 14.76 14.87C14.01 15.63 13.01 16.06 11.91 16.08C11.38 16.08 10.85 15.97 10.36 15.76C9.87 15.55 9.43 15.26 9.06 14.88C8.69 14.5 8.39 14.05 8.19 13.56C7.99 13.07 7.89 12.54 7.9 12.01C7.9 10.94 8.31 9.91 9.06 9.14C9.81 8.38 10.83 7.94 11.91 7.93ZM15.82 7.14C15.59 7.14 15.38 7.24 15.22 7.41C15.07 7.58 14.98 7.79 14.98 8.01C14.98 8.24 15.07 8.45 15.22 8.61C15.38 8.77 15.59 8.87 15.82 8.87C16.05 8.87 16.27 8.78 16.44 8.62C16.6 8.46 16.7 8.24 16.7 8.01C16.7 7.78 16.6 7.57 16.45 7.41C16.29 7.24 16.07 7.14 15.82 7.14ZM11.91 9.39C11.21 9.39 10.54 9.67 10.05 10.15C9.55 10.64 9.27 11.31 9.26 12.01C9.26 12.71 9.55 13.38 10.03 13.88C10.53 14.37 11.2 14.65 11.91 14.66C12.61 14.66 13.26 14.37 13.75 13.88C14.25 13.38 14.52 12.71 14.52 12.01C14.52 11.32 14.24 10.65 13.75 10.16C13.26 9.67 12.6 9.39 11.91 9.39Z" fill="#f8ff98"/>
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 22.9 22.9" width="23" height="23" fill="none" aria-hidden="true">
      <path d="M11.45 0C17.78 0 22.9 5.13 22.9 11.45C22.9 17.78 17.78 22.9 11.45 22.9C5.13 22.9 0 17.78 0 11.45C0 5.13 5.13 0 11.45 0ZM16.28 5.68C13.09 5.23 9.81 5.23 6.62 5.68C5.3 5.87 4.27 6.88 4.07 8.21C3.9 9.28 3.82 10.37 3.82 11.45C3.82 12.53 3.9 13.63 4.07 14.7C4.27 16 5.32 17.04 6.62 17.22C8.21 17.45 9.84 17.56 11.45 17.56C13.06 17.56 14.69 17.45 16.28 17.22C17.6 17.03 18.62 16.03 18.83 14.7C19 13.63 19.09 12.54 19.09 11.45C19.09 10.36 19 9.27 18.83 8.2C18.63 6.9 17.58 5.86 16.28 5.68ZM9.39 8.52C9.52 8.44 9.68 8.44 9.81 8.52L14.18 11.08C14.31 11.16 14.39 11.3 14.39 11.45C14.39 11.6 14.31 11.74 14.18 11.82L9.81 14.38C9.75 14.42 9.67 14.44 9.6 14.44C9.53 14.44 9.46 14.42 9.39 14.38C9.26 14.31 9.18 14.17 9.18 14.01V8.89C9.18 8.74 9.26 8.59 9.39 8.52Z" fill="#f8ff98"/>
    </svg>
  )
}

export function SiteFooter() {
  const pathname = usePathname()
  if (pathname.startsWith('/cms') || pathname.startsWith('/admin')) return null

  return (
    <footer
      className="relative w-full overflow-hidden bg-[#31542a]"
      data-node-id="428:486"
    >
      {/* Noise texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-[0.12]"
        style={{
          backgroundImage: 'url(/footer/noise.png)',
          backgroundSize: '512px 512px',
        }}
        aria-hidden="true"
      />

      {/* Desktop layout */}
      <div className="hidden md:flex flex-col items-center gap-16 px-40 pt-20 pb-[52px]">
        {/* Wordmark + tagline */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="font-[family-name:var(--font-display)] text-[32px] font-bold leading-[1.1] tracking-[-0.64px] text-[#f8ff98] uppercase">
            beautiful Bangladesh
          </span>
          <p className="max-w-[460px] font-[family-name:var(--font-ui)] text-[20px] leading-[1.4] tracking-[-0.6px] text-[#f8ff98]/60">
            From mangrove forests and rolling hills to waterfalls, tea estates, and endless coastlines
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col items-center gap-8 font-[family-name:var(--font-ui)] text-[14px] tracking-[-0.56px] text-[#f8ff98]" aria-label="Footer">
          <div className="flex gap-[72px]">
            {NAV_LINKS.slice(0, 5).map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-[#f8ff98]/70 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-[72px]">
            <Link href={NAV_LINKS[5].href} className="hover:text-[#f8ff98]/70 transition-colors">
              {NAV_LINKS[5].label}
            </Link>
            {LEGAL_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="hover:text-[#f8ff98]/70 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Social icons */}
        <div className="flex gap-2 items-center">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-70 transition-opacity"><FacebookIcon /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-70 transition-opacity"><InstagramIcon /></a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:opacity-70 transition-opacity"><YouTubeIcon /></a>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex md:hidden flex-col items-center gap-12 px-4 pt-10 pb-[52px]">
        {/* Wordmark + tagline */}
        <div className="flex flex-col items-center gap-2 text-center w-full">
          <span className="font-[family-name:var(--font-display)] text-[20px] font-bold leading-[1.1] tracking-[-0.4px] text-[#f8ff98] uppercase">
            beautiful Bangladesh
          </span>
          <p className="font-[family-name:var(--font-ui)] text-[14px] leading-[1.4] tracking-[-0.42px] text-[#f8ff98]/60">
            From mangrove forests and rolling hills to waterfalls, tea estates, and endless coastlines
          </p>
        </div>

        {/* Nav links — 3-column grid layout matching Figma */}
        <nav className="flex flex-col gap-8 w-full font-[family-name:var(--font-ui)] text-[14px] tracking-[-0.56px] text-[#f8ff98]" aria-label="Footer">
          <div className="flex justify-between w-full">
            <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
            <Link href="/#about" className="hover:opacity-70 transition-opacity">About</Link>
            <Link href="/explore" className="hover:opacity-70 transition-opacity">Explore</Link>
          </div>
          <div className="flex justify-between w-full">
            <Link href="#" className="hover:opacity-70 transition-opacity">Documentation</Link>
            <Link href="/explore" className="hover:opacity-70 transition-opacity">Destination</Link>
            <Link href="#" className="hover:opacity-70 transition-opacity">Developers</Link>
          </div>
          <div className="flex justify-center gap-9 w-full">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.label} href={l.href} className="hover:opacity-70 transition-opacity">
                {l.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Social icons */}
        <div className="flex gap-2 items-center">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:opacity-70 transition-opacity"><FacebookIcon /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:opacity-70 transition-opacity"><InstagramIcon /></a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:opacity-70 transition-opacity"><YouTubeIcon /></a>
        </div>
      </div>

      {/* Diamond strip */}
      <DiamondStrip />
    </footer>
  )
}
