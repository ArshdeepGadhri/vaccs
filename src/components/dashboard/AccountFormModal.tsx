'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createAccount, updateAccount } from '@/app/actions/accounts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Database } from '@/types/database.types'
import { Plus, Edit2 } from 'lucide-react'
import { PasswordInput } from '@/components/ui/password-input'

type Account = Database['public']['Tables']['accounts']['Row']

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Account'}
    </Button>
  )
}

interface AccountFormModalProps {
  account?: Account
  mode: 'add' | 'edit'
}

export function AccountFormModal({ account, mode }: AccountFormModalProps) {
  const [open, setOpen] = useState(false)
  const isEdit = mode === 'edit'

  async function action(formData: FormData) {
    if (isEdit && account) {
      const res = await updateAccount(account.id, formData)
      if (res.success) setOpen(false)
    } else {
      const res = await createAccount(formData)
      if (res.success) setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          isEdit ? (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-white">
              <Edit2 className="h-4 w-4" />
            </Button>
          ) : (
            <Button className="rounded-xl">
              <Plus className="w-4 h-4 mr-2" /> Add Account
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-zinc-800 text-zinc-100 rounded-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Account' : 'Add New Account'}</DialogTitle>
          <DialogDescription className="text-zinc-400">
            {isEdit ? 'Make changes to your account details here.' : 'Enter the details of the new account.'}
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-zinc-300">Username</Label>
              <Input id="username" name="username" defaultValue={account?.username} required className="bg-zinc-900 border-zinc-800 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region" className="text-zinc-300">Region</Label>
              <Input id="region" name="region" defaultValue={account?.region} required className="bg-zinc-900 border-zinc-800 rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current_rank" className="text-zinc-300">Current Rank</Label>
              <Input id="current_rank" name="current_rank" defaultValue={account?.current_rank} required className="bg-zinc-900 border-zinc-800 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target_rank" className="text-zinc-300">Target Rank</Label>
              <Input id="target_rank" name="target_rank" defaultValue={account?.target_rank} required className="bg-zinc-900 border-zinc-800 rounded-xl" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300">Password</Label>
              <PasswordInput id="password" name="password" defaultValue={account?.password} required className="bg-zinc-900 border-zinc-800 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-zinc-300">Status</Label>
              <Select name="status" defaultValue={account?.status || 'active'}>
                <SelectTrigger className="bg-zinc-900 border-zinc-800 rounded-xl mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 rounded-xl">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="for_sale">For Sale</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="login_email" className="text-zinc-300">Login Email</Label>
            <Input id="login_email" name="login_email" type="email" defaultValue={account?.login_email} required className="bg-zinc-900 border-zinc-800 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-zinc-300">Notes (Optional)</Label>
            <Input id="notes" name="notes" defaultValue={account?.notes || ''} className="bg-zinc-900 border-zinc-800 rounded-xl" />
          </div>
          <div className="flex justify-end pt-4">
            <SubmitButton isEdit={isEdit} />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
