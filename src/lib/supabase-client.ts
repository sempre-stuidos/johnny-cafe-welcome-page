import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'

// Client-side Supabase client
// Use different storage key when in iframe to avoid conflicts with parent window
// Use a getter to determine storage key at runtime
const getStorageKey = () => {
  if (typeof window === 'undefined') return 'sb-auth-token'
  return window.parent !== window ? 'sb-iframe-auth-token' : 'sb-auth-token'
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storageKey: getStorageKey(),
  }
})

