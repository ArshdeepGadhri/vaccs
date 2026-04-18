'use client'

import { useState } from 'react'
import { updateUserPassword } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useFormStatus } from 'react-dom'
import { PasswordInput } from '@/components/ui/password-input'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button className="w-full mt-6 bg-amber-500 text-black hover:bg-amber-400 transition-all font-medium py-5" type="submit" disabled={pending}>
      {pending ? 'Updating...' : 'Update Password'}
    </Button>
  )
}

export default function UpdatePasswordPage() {
  const [error, setError] = useState<string | null>(null)

  async function clientAction(formData: FormData) {
    setError(null)
    const result = await updateUserPassword(formData)
    if (result && result.error) {
      setError(result.error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative">
      <Card className="w-full max-w-sm rounded-2xl border-none shadow-2xl bg-zinc-950 text-white">
        <form action={clientAction}>
          <CardHeader className="space-y-1 mb-4">
            <div className="flex justify-center mb-6">
              <span className="text-3xl font-bold tracking-tighter text-white">
                vaccs
              </span>
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight text-center">
              New Password
            </CardTitle>
            <CardDescription className="text-center text-zinc-400">
              Enter your new secure password below to complete the recovery process.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pb-8">
            {error && (
              <div className="p-3 text-sm rounded-lg bg-red-950/50 text-red-400 border border-red-900/50 font-medium">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-zinc-300">New Password</Label>
              <PasswordInput
                id="password"
                name="password"
                required
                className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-amber-500/50 h-11 px-4 shadow-sm"
              />
            </div>
            <SubmitButton />
          </CardContent>
        </form>
      </Card>
    </div>
  )
}
