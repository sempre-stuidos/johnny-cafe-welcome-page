import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

// Note: Client components should import from '@/lib/supabase-client' instead of this file
// This file is for server-side use only (supabaseAdmin, createServerSupabaseClient)

// Server-side Supabase client with service role key (bypasses RLS)
// For public landing pages, we need to bypass RLS to read pages and businesses
// Falls back to anon key if service role key is not provided (for development)
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Server-side Supabase client (for authenticated requests)
// For public landing pages, we only need to read cookies, not set them
export async function createServerSupabaseClient() {
  const cookieStore = await cookies()
  
  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {
          // No-op: Public landing pages don't need to set cookies
          // Cookies can only be modified in Server Actions or Route Handlers
        },
      },
    }
  )
}
