import { createClient } from '@/lib/supabase/server'
import { AccountsList } from '@/components/dashboard/AccountsList'
import { AccountFormModal } from '@/components/dashboard/AccountFormModal'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/actions/auth'
import { LogOut, Settings } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  // Fetch accounts specific to the authenticated user
  const { data: accounts, error } = await supabase
    .from('accounts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching accounts:', error)
  }

  return (
    <div className="min-h-screen">
      {/* Navbar/Header */}
      <header className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg tracking-tight text-white">
              vaccs
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="text-zinc-400 hover:text-white rounded-xl">
                <Settings className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Settings</span>
              </Button>
            </Link>
            <form action={logout}>
              <Button type="submit" variant="ghost" className="text-zinc-400 hover:text-white rounded-xl">
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-1">Accounts</h1>
          </div>
          <div className="shrink-0">
            <AccountFormModal mode="add" />
          </div>
        </div>

        {/* Data List */}
        <AccountsList initialAccounts={accounts || []} />
      </main>
    </div>
  )
}
