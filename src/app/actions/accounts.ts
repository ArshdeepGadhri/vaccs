'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createAccount(formData: FormData) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Not authenticated' }

  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const region = formData.get('region') as string
  const current_rank = formData.get('current_rank') as string
  const target_rank = formData.get('target_rank') as string
  const status = formData.get('status') as string
  const notes = formData.get('notes') as string
  const login_email = formData.get('login_email') as string

  const { error } = await supabase
    .from('accounts')
    .insert({
      username,
      password,
      region,
      current_rank,
      target_rank,
      status,
      notes,
      login_email,
      user_id: user.id
    })

  if (error) {
    console.error('Error creating account:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateAccount(id: string, formData: FormData) {
  const supabase = await createClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Not authenticated' }

  const username = formData.get('username') as string
  const password = formData.get('password') as string
  const region = formData.get('region') as string
  const current_rank = formData.get('current_rank') as string
  const target_rank = formData.get('target_rank') as string
  const status = formData.get('status') as string
  const notes = formData.get('notes') as string
  const login_email = formData.get('login_email') as string

  const { error } = await supabase
    .from('accounts')
    .update({
      username,
      password,
      region,
      current_rank,
      target_rank,
      status,
      notes,
      login_email,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .eq('user_id', user.id) // Extra safety check

  if (error) {
    console.error('Error updating account:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteAccount(id: string) {
  const supabase = await createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('accounts')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    console.error('Error deleting account:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}
