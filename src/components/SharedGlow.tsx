'use client'

import { usePathname } from 'next/navigation'

export function SharedGlow() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none -z-20"
        style={{
          backgroundColor: '#09090b',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.08) 2px, transparent 0)',
          backgroundSize: '30px 30px',
          backgroundPosition: '-5px -5px'
        }}
      />

      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 -z-10 pointer-events-none flex justify-center w-full transition-all duration-1000 ${isHome ? 'opacity-100' : 'opacity-60 blur-md'}`}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[250vw] sm:w-[150vw] md:w-[120vw] lg:w-[110vw] h-[40vh] sm:h-[50vh] rounded-[100%] bg-amber-600/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[60%] w-[250vw] sm:w-[150vw] md:w-[120vw] lg:w-[110vw] h-[40vh] sm:h-[50vh] rounded-[100%] border-t border-amber-500/40 shadow-[0_-30px_100px_rgba(245,158,11,0.15)]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[70%] w-[250vw] sm:w-[150vw] md:w-[120vw] lg:w-[110vw] h-[40vh] sm:h-[50vh] rounded-[100%] border-t border-amber-300/20" />
      </div>
    </>
  )
}
