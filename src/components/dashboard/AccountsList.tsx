'use client'

import { useState } from 'react'
import { Database } from '@/types/database.types'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'
import { AccountFormModal } from './AccountFormModal'
import { DeleteAccountDialog } from './DeleteAccountDialog'

type Account = Database['public']['Tables']['accounts']['Row']

function getStatusColor(status: string) {
  switch (status) {
    case 'active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
    case 'for_sale': return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
    case 'sold': return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
    default: return 'bg-zinc-500/10 text-zinc-500 border-zinc-500/20'
  }
}

export function AccountsList({ initialAccounts }: { initialAccounts: Account[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [rankFilter, setRankFilter] = useState<string>('all')

  const uniqueRanks = Array.from(new Set(initialAccounts.map(acc => acc.current_rank)))

  const filteredAccounts = initialAccounts.filter(acc => {
    const matchesSearch = acc.username.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || acc.status === statusFilter
    const matchesRank = rankFilter === 'all' || acc.current_rank === rankFilter
    return matchesSearch && matchesStatus && matchesRank
  })

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <div className="relative w-full flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <Input 
            placeholder="Search by username..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-zinc-900 border-zinc-800 rounded-xl w-full h-11"
          />
        </div>
        <div className="flex flex-row gap-3 w-full md:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="flex-1 md:w-[160px] bg-zinc-900 border-zinc-800 rounded-xl h-11">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 rounded-xl">
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="for_sale">For Sale</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
            </SelectContent>
          </Select>

          <Select value={rankFilter} onValueChange={setRankFilter}>
            <SelectTrigger className="flex-1 md:w-[160px] bg-zinc-900 border-zinc-800 rounded-xl h-11">
              <SelectValue placeholder="Filter by rank" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800 rounded-xl">
              <SelectItem value="all">All Ranks</SelectItem>
              {uniqueRanks.map(rank => (
                <SelectItem key={rank} value={rank}>{rank}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table Section (Hidden on Mobile) */}
      <div className="hidden md:block rounded-2xl border border-zinc-800 bg-zinc-950/50 overflow-x-auto">
        <Table className="min-w-[800px]">
          <TableHeader className="bg-zinc-900/50">
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 font-medium h-12 whitespace-nowrap">Username</TableHead>
              <TableHead className="text-zinc-400 font-medium h-12 whitespace-nowrap">Region</TableHead>
              <TableHead className="text-zinc-400 font-medium h-12 whitespace-nowrap">Rank</TableHead>
              <TableHead className="text-zinc-400 font-medium h-12 whitespace-nowrap">Password</TableHead>
              <TableHead className="text-zinc-400 font-medium h-12 whitespace-nowrap">Status</TableHead>
              <TableHead className="text-right text-zinc-400 font-medium h-12 whitespace-nowrap">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.length === 0 ? (
              <TableRow className="border-none hover:bg-transparent">
                <TableCell colSpan={6} className="h-32 text-center text-zinc-500">
                  No accounts found.
                </TableCell>
              </TableRow>
            ) : (
              filteredAccounts.map((account) => (
                <TableRow key={account.id} className="border-zinc-800/50 hover:bg-zinc-900/50 transition-colors">
                  <TableCell className="font-medium text-zinc-200 whitespace-nowrap">
                    <div>{account.username}</div>
                    <div className="text-xs text-zinc-500 font-normal">{account.login_email}</div>
                  </TableCell>
                  <TableCell className="text-zinc-300 whitespace-nowrap">{account.region}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex flex-col gap-1 w-max">
                      <span className="text-sm text-zinc-300">{account.current_rank}</span>
                      <span className="text-xs text-zinc-500">Target: {account.target_rank}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-300 whitespace-nowrap">
                    {account.password}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    <Badge variant="outline" className={`font-normal ${getStatusColor(account.status)}`}>
                      {account.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <div className="flex justify-end gap-2">
                      <AccountFormModal account={account} mode="edit" />
                      <DeleteAccountDialog id={account.id} username={account.username} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards Section (Hidden on Desktop) */}
      <div className="flex md:hidden flex-col gap-4">
        {filteredAccounts.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 bg-zinc-950/50 rounded-2xl border border-zinc-800">
            No accounts found.
          </div>
        ) : (
          filteredAccounts.map((account) => (
            <div key={account.id} className="bg-zinc-950/50 border border-zinc-800 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="text-lg font-medium text-white break-all">{account.username}</h3>
                  <p className="text-sm text-zinc-500 break-all">{account.login_email}</p>
                </div>
                <Badge variant="outline" className={`font-normal whitespace-nowrap shrink-0 ${getStatusColor(account.status)}`}>
                  {account.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm bg-zinc-900/50 rounded-xl p-4">
                <div>
                  <p className="text-zinc-500 mb-0.5 text-xs">Region</p>
                  <p className="text-zinc-300 font-medium">{account.region}</p>
                </div>
                <div>
                  <p className="text-zinc-500 mb-0.5 text-xs">Password</p>
                  <p className="text-zinc-300 font-medium break-all">{account.password}</p>
                </div>
                <div>
                  <p className="text-zinc-500 mb-0.5 text-xs">Current Rank</p>
                  <p className="text-zinc-300 font-medium">{account.current_rank}</p>
                </div>
                <div>
                  <p className="text-zinc-500 mb-0.5 text-xs">Target Rank</p>
                  <p className="text-zinc-300 font-medium">{account.target_rank}</p>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-2">
                <AccountFormModal account={account} mode="edit" />
                <DeleteAccountDialog id={account.id} username={account.username} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
