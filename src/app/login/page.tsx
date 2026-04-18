'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { login, signup, recoverPassword } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PasswordInput } from '@/components/ui/password-input'

function SubmitButton({ mode }: { mode: 'login' | 'signup' | 'forgot' }) {
  const { pending } = useFormStatus()
  return (
    <Button className="w-full mt-6 bg-zinc-200 text-black hover:bg-white transition-all font-medium py-5" type="submit" disabled={pending}>
      {pending ? 'Processing...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Sign Up' : 'Send Reset Link'}
    </Button>
  )
}

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login')
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  async function clientAction(formData: FormData) {
    setError(null)
    setSuccessMsg(null)

    if (mode === 'forgot') {
      const result = await recoverPassword(formData)
      if (result?.error) setError(result.error)
      else setSuccessMsg('Check your email for the reset link.')
      return
    }

    const result = mode === 'login' ? await login(formData) : await signup(formData)
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 relative">
      <Link href="/" className="absolute top-8 left-6 sm:left-10 text-zinc-500 hover:text-white transition-colors flex items-center gap-2 font-medium text-sm">
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>
      <Card className="w-full max-w-sm rounded-2xl border-none shadow-2xl bg-zinc-950 text-white">
        <form action={clientAction}>
          <CardHeader className="space-y-1 mb-4">
            <div className="flex justify-center mb-6">
              <span className="text-3xl font-bold tracking-tighter text-white">
                vaccs
              </span>
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight text-center">
              {mode === 'login' ? 'Welcome back' : mode === 'signup' ? 'Create an account' : 'Reset password'}
            </CardTitle>
            <CardDescription className="text-center text-zinc-400">
              {mode === 'login' ? 'Enter your credentials to access your dashboard.' 
                : mode === 'signup' ? 'Enter your email below to create your account.'
                : 'Enter your email address and we will send you a recovery link.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pb-8">
            {error && (
              <div className="p-3 text-sm rounded-lg bg-red-950/50 text-red-400 border border-red-900/50 font-medium">
                {error}
              </div>
            )}
            {successMsg && (
              <div className="p-3 text-sm rounded-lg bg-emerald-950/50 text-emerald-400 border border-emerald-900/50 font-medium">
                {successMsg}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-zinc-300">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                required
                className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-amber-500/50 h-11 px-4 shadow-sm"
              />
            </div>
            {mode !== 'forgot' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-semibold text-zinc-300">Password</Label>
                  {mode === 'login' && (
                    <button type="button" onClick={() => setMode('forgot')} className="text-xs font-medium text-zinc-500 hover:text-white transition-colors">
                      Forgot password?
                    </button>
                  )}
                </div>
                <PasswordInput
                  id="password"
                  name="password"
                  required
                  className="bg-zinc-900/50 border-zinc-800 focus-visible:ring-amber-500/50 h-11 px-4 shadow-sm"
                />
              </div>
            )}
            <SubmitButton mode={mode} />
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-sm text-center pb-8 border-t border-zinc-900 pt-6">
            <div className="text-zinc-500">
              {mode === 'login' ? "Don't have an account? " : mode === 'signup' ? "Already have an account? " : "Remember your password? "}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-zinc-300 hover:text-white transition-colors"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
