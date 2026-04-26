import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <h1 className="text-9xl font-bold text-zinc-800 tracking-tighter">404</h1>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Page not found</h2>
          <p className="text-zinc-400">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>

        <div className="pt-4">
          <Button className="rounded-xl bg-zinc-100 text-zinc-900 hover:bg-white transition-colors">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
