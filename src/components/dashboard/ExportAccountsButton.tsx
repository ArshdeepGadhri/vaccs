'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { Database } from '@/types/database.types'

type Account = Database['public']['Tables']['accounts']['Row']

export function ExportAccountsButton({ accounts }: { accounts: Account[] }) {
  const downloadCSV = () => {
    if (accounts.length === 0) return

    // Explicitly define order to prevent UUIDs from cluttering the front.
    const headers = ['username', 'riot_id', 'password', 'login_email', 'region', 'current_rank', 'peak_rank', 'target_rank', 'status', 'notes', 'created_at']
    const csvRows = []
    
    // Header block
    csvRows.push(headers.join(','))

    for (const account of accounts) {
      const values = headers.map(header => {
        const val = account[header as keyof Account]
        // Clean nulls
        if (val === null || val === undefined) return '""'
        
        // Escape quotes to prevent CSV breaks
        const escaped = ('' + val).replace(/"/g, '""')
        return `"${escaped}"`
      })
      csvRows.push(values.join(','))
    }

    const csvString = csvRows.join('\n')
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `vaccs_export_${new Date().toISOString().split('T')[0]}.csv`) // Dynamic dating
    document.body.appendChild(link)
    
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <Button 
      onClick={downloadCSV}
      className="bg-zinc-200 text-black hover:bg-white transition-all font-medium"
      disabled={accounts.length === 0}
    >
      <Download className="w-4 h-4 mr-2" />
      Download CSV
    </Button>
  )
}
