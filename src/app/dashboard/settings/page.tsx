import { createClient } from '@/lib/supabase/server'
import { ExportAccountsButton } from '@/components/dashboard/ExportAccountsButton'
import { UpdatePasswordForm } from '@/components/dashboard/UpdatePasswordForm'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/actions/auth'
import { LogOut, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default async function SettingsPage() {
  const supabase = await createClient()

  // Fetch accounts to pass to the export button directly on layout render
  const { data: accounts, error } = await supabase
    .from('accounts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching accounts for export context:', error)
  }

  return (
    <div className="min-h-screen">
      {/* Navbar/Header */}
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <span className="font-semibold text-lg tracking-tight text-white">
              Settings
            </span>
          </div>
          <form action={logout}>
            <Button type="submit" variant="ghost" className="text-zinc-400 hover:text-white rounded-xl">
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        <section className="space-y-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold tracking-tight text-white">Update Password</h2>
          <p className="text-zinc-400 text-sm mb-4">
            Ensure your account uses a long, random password to stay secure.
          </p>
          <UpdatePasswordForm />
        </section>

        <section className="space-y-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold tracking-tight text-white">Data Export</h2>
          <p className="text-zinc-400 text-sm mb-4">
            Download a compiled .csv list format containing all of your dashboard accounts and current tracking values natively.
          </p>
          <ExportAccountsButton accounts={accounts || []} />
        </section>

      </main>
    </div>
  )
}
