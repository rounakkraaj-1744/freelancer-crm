"use server";

import { createServerSupabase } from '@/lib/supabase'

const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export async function sendMagicLink(email: string) {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: { 
      emailRedirectTo: `${origin}/auth/confirm`
    }
  })
  return { data, error }
}

export async function googleSignIn() {
  const supabase = await createServerSupabase()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { 
      redirectTo: `${origin}/auth/callback` 
    }
  })
  return { data, error }
}
