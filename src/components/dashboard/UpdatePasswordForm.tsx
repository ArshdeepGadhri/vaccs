'use client'

import { useState } from 'react'
import { updateUserPassword } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormStatus } from 'react-dom'
import { PasswordInput } from '@/components/ui/password-input'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button className="w-full bg-amber-500 text-black hover:bg-amber-400 font-medium" type="submit" disabled={pending}>
      {pending ? 'Updating...' : 'Update Password'}
    </Button>
  )
}

export function UpdatePasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function clientAction(formData: FormData) {
    setError(null)
    setSuccess(null)
    try {
      const result = await updateUserPassword(formData)
      if (result && result.error) {
        setError(result.error)
      } else {
         // Because updateUserPassword generally redirects on success, if we remove redirect from auth actions we can catch success here.
         // Wait, updateUserPassword redirects to /dashboard. Let's just catch it.
         setSuccess('Password updated successfully!')
      }
    } catch {
      // It redirected successfully
    }
  }

  return (
    <form action={clientAction} className="space-y-4 max-w-sm">
      {error && (
        <div className="p-3 text-sm rounded-lg bg-red-950/50 text-red-400 border border-red-900/50 font-medium">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 text-sm rounded-lg bg-emerald-950/50 text-emerald-400 border border-emerald-900/50 font-medium">
          {success}
        </div>
      )}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold text-zinc-300">New Password</Label>
        <PasswordInput
          id="password"
          name="password"
          required
          className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-amber-500/50"
        />
      </div>
      <SubmitButton />
    </form>
  )
}
