/**
 * Script to check if environment variables are properly set up in Vercel
 * Run this locally - it will check your local .env and also provide instructions for Vercel
 */

import * as dotenv from 'dotenv'
import * as path from 'path'

// Load .env.local if it exists
dotenv.config({ path: path.join(process.cwd(), '.env.local') })
dotenv.config({ path: path.join(process.cwd(), '.env') })

interface EnvCheck {
  name: string
  required: boolean
  value: string | undefined
  status: '✅ Set' | '❌ Missing' | '⚠️  Empty'
  description: string
}

const requiredEnvVars: EnvCheck[] = [
  {
    name: 'BREVO_API_KEY',
    required: true,
    value: process.env.BREVO_API_KEY,
    status: process.env.BREVO_API_KEY ? '✅ Set' : '❌ Missing',
    description: 'Brevo API key for sending emails'
  },
  {
    name: 'BREVO_FROM_EMAIL',
    required: false,
    value: process.env.BREVO_FROM_EMAIL || process.env.BREVO_SENDER_EMAIL,
    status: (process.env.BREVO_FROM_EMAIL || process.env.BREVO_SENDER_EMAIL) ? '✅ Set' : '⚠️  Empty',
    description: 'Sender email address (defaults to system@semprestudios.com)'
  },
  {
    name: 'BREVO_FROM_NAME',
    required: false,
    value: process.env.BREVO_FROM_NAME || process.env.BREVO_SENDER_NAME,
    status: (process.env.BREVO_FROM_NAME || process.env.BREVO_SENDER_NAME) ? '✅ Set' : '⚠️  Empty',
    description: 'Sender name (defaults to Johnny Cafe)'
  },
  {
    name: 'BREVO_RESERVATION_EMAIL_TEMPLATE_ID',
    required: false,
    value: process.env.BREVO_RESERVATION_EMAIL_TEMPLATE_ID,
    status: process.env.BREVO_RESERVATION_EMAIL_TEMPLATE_ID ? '✅ Set' : '⚠️  Empty',
    description: 'Template ID for reservation request emails (to restaurant)'
  },
  {
    name: 'BREVO_RESERVATION_CONFIRMATION_TEMPLATE_ID',
    required: false,
    value: process.env.BREVO_RESERVATION_CONFIRMATION_TEMPLATE_ID,
    status: process.env.BREVO_RESERVATION_CONFIRMATION_TEMPLATE_ID ? '✅ Set' : '⚠️  Empty',
    description: 'Template ID for confirmation emails (to customer)'
  },
  {
    name: 'RECIPIENT_EMAIL',
    required: false,
    value: process.env.RECIPIENT_EMAIL,
    status: process.env.RECIPIENT_EMAIL ? '✅ Set' : '⚠️  Empty',
    description: 'Fallback recipient email (if reservation_settings table has no recipients)'
  },
  {
    name: 'NEXT_PUBLIC_ORG_SLUG',
    required: true,
    value: process.env.NEXT_PUBLIC_ORG_SLUG,
    status: process.env.NEXT_PUBLIC_ORG_SLUG ? '✅ Set' : '❌ Missing',
    description: 'Business slug for finding business and reservation settings'
  },
  {
    name: 'SUPABASE_SERVICE_ROLE_KEY',
    required: true,
    value: process.env.SUPABASE_SERVICE_ROLE_KEY,
    status: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing',
    description: 'Supabase service role key for database access'
  },
  {
    name: 'NEXT_PUBLIC_SUPABASE_URL',
    required: true,
    value: process.env.NEXT_PUBLIC_SUPABASE_URL,
    status: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
    description: 'Supabase project URL'
  },
]

function checkEnvVars() {
  console.log('\n🔍 Checking Environment Variables\n')
  console.log('=' .repeat(60))
  
  let hasErrors = false
  let hasWarnings = false
  
  requiredEnvVars.forEach(env => {
    const value = env.value ? (env.value.length > 20 ? `${env.value.substring(0, 20)}...` : env.value) : 'Not set'
    console.log(`${env.status} ${env.name}`)
    console.log(`   Value: ${value}`)
    console.log(`   Description: ${env.description}`)
    console.log('')
    
    if (env.status === '❌ Missing' && env.required) {
      hasErrors = true
    }
    if (env.status === '⚠️  Empty') {
      hasWarnings = true
    }
  })
  
  console.log('=' .repeat(60))
  
  if (hasErrors) {
    console.log('\n❌ CRITICAL: Missing required environment variables!')
    console.log('   These must be set in Vercel for emails to work.\n')
  } else if (hasWarnings) {
    console.log('\n⚠️  WARNING: Some optional environment variables are not set.')
    console.log('   Emails may still work, but with default values.\n')
  } else {
    console.log('\n✅ All environment variables are set!\n')
  }
  
  console.log('📋 To check/set environment variables in Vercel:')
  console.log('   1. Go to: https://vercel.com/your-project/settings/environment-variables')
  console.log('   2. Or run: vercel env ls')
  console.log('   3. To add: vercel env add BREVO_API_KEY production')
  console.log('')
  
  console.log('🔧 To view Vercel environment variables via CLI:')
  console.log('   vercel env ls')
  console.log('')
  
  console.log('📝 To pull Vercel env vars to local .env.local:')
  console.log('   vercel env pull .env.local')
  console.log('')
  
  return { hasErrors, hasWarnings }
}

// Run the check
const result = checkEnvVars()

// Exit with appropriate code
process.exit(result.hasErrors ? 1 : 0)

