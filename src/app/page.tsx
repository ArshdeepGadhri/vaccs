import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { redirect } from 'next/navigation'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center font-sans">

      {/* Top Navbar */}
      <div className="absolute top-0 w-full p-6 flex justify-between items-center z-20 max-w-7xl mx-auto">
        <span className="text-xl font-bold tracking-tighter text-white">vaccs</span>
        <Link href="/login">
          <Button variant="ghost" className="text-zinc-400 hover:text-white rounded-xl">Sign In</Button>
        </Link>
      </div>

      {/* Main Hero Content */}
      <div className="z-10 flex flex-col items-center text-center px-4 max-w-4xl -mt-20">
        <h1 className="text-5xl sm:text-6xl md:text-[80px] font-bold tracking-tight text-zinc-100 mb-8 leading-[1.1] selection:bg-amber-500/30">
          The one shop stop<br className="hidden sm:block" /> for all your accounts
        </h1>

        <Link href="/login" className="mt-4">
          <Button className="h-12 px-8 bg-zinc-200 text-black hover:bg-white rounded-md whitespace-nowrap font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Get Started
          </Button>
        </Link>
      </div>

      {/* Glow is now managed globally by SharedGlow in layout.tsx */}

    </div>
  )
}
