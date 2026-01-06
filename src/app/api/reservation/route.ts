import { NextRequest, NextResponse } from 'next/server'
import { sendReservationEmail, sendReservationConfirmationEmail } from '@/lib/email'
import { supabaseAdmin } from '@/lib/supabase'
import { resolveBusinessSlug } from '@/lib/business-utils'

/**
 * Extract customer name from email address
 * e.g., "john.doe@email.com" -> "John Doe"
 */
function extractCustomerNameFromEmail(email: string): string {
  const emailPrefix = email.split('@')[0]
  // Replace dots, dashes, and underscores with spaces, then capitalize
  const nameParts = emailPrefix
    .replace(/[._-]/g, ' ')
    .split(' ')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .filter(part => part.length > 0)
  
  return nameParts.join(' ') || emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as {
      partySize: string
      mealType: string
      date: string
      time: string
      email: string
      phone: string
    }
    
    const { partySize, mealType, date, time, email, phone } = body

    // Validate required fields
    if (!partySize || !mealType || !date || !time || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate party size is a positive number
    const partySizeNum = parseInt(partySize, 10)
    if (isNaN(partySizeNum) || partySizeNum < 1) {
      return NextResponse.json(
        { success: false, error: 'Party size must be at least 1' },
        { status: 400 }
      )
    }

    // Validate date is not in the past
    const reservationDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (reservationDate < today) {
      return NextResponse.json(
        { success: false, error: 'Reservation date cannot be in the past' },
        { status: 400 }
      )
    }

    // Get business ID (needed for database save and email recipients)
    // Use NEXT_PUBLIC_ORG_SLUG or fallback to 'johnny-gs-brunch'
    const businessSlug = resolveBusinessSlug(
      undefined,
      process.env.NEXT_PUBLIC_ORG_SLUG,
      'johnny-gs-brunch'
    )
    
    let businessId: string | null = null
    try {
      const { data: business, error: businessError } = await supabaseAdmin
        .from('businesses')
        .select('id')
        .eq('slug', businessSlug)
        .single()

      if (businessError || !business) {
        console.error(`[RESERVATION_API] Error finding business with slug "${businessSlug}":`, businessError)
        // Log error but continue - will try to save anyway
      } else {
        businessId = business.id
        console.log(`[RESERVATION_API] Business found:`, JSON.stringify({
          slug: businessSlug,
          businessId,
          source: process.env.NEXT_PUBLIC_ORG_SLUG ? 'NEXT_PUBLIC_ORG_SLUG' : 'fallback',
        }))
      }
    } catch (dbError) {
      console.error(`[RESERVATION_API] Error fetching business with slug "${businessSlug}":`, dbError)
      // Log error but continue - will try to save anyway
    }

    // Extract customer name from email
    const customerName = extractCustomerNameFromEmail(email)

    // Save reservation to database first
    // If businessId is not found, try to save anyway (database may handle it)
    let reservationId: string | null = null
    try {
      if (!businessId) {
        // Try one more time to get business ID
        const { data: business, error: businessError } = await supabaseAdmin
          .from('businesses')
          .select('id')
          .eq('slug', businessSlug)
          .single()

        if (!businessError && business) {
          businessId = business.id
          console.log(`[RESERVATION_API] Business ID retrieved on retry:`, businessId)
        }
      }

      // Only attempt to save if we have a businessId (required by database)
      if (businessId) {
        const { data: insertedReservation, error: insertError } = await supabaseAdmin
          .from('reservations')
          .insert({
            org_id: businessId,
            customer_name: customerName,
            customer_email: email,
            customer_phone: phone,
            reservation_date: date,
            reservation_time: time,
            party_size: partySizeNum,
            status: 'pending',
          })
          .select('id')
          .single()

        if (insertError) {
          console.error('Error saving reservation to database:', insertError)
          // Continue anyway - emails will still be sent
        } else if (insertedReservation) {
          reservationId = insertedReservation.id
          console.log(`[RESERVATION_API] Reservation saved successfully. ID: ${reservationId}`, JSON.stringify({
            reservationId,
            customerEmail: email,
            date,
            time,
            partySize: partySizeNum,
            mealType,
            businessId,
          }))
        }
      } else {
        console.warn('Business ID not found - reservation not saved to database, but emails will be sent')
      }
    } catch (dbError) {
      console.error('Error in database operation:', dbError)
      // Continue anyway - emails will still be sent
    }

    // Send emails - wait with timeout to ensure they complete
    // In Vercel, background promises may be killed if function returns too early
    const emailStartTime = Date.now()
    
    // Wait for emails with a timeout (max 15 seconds)
    const emailPromise = Promise.all([
      // Send reservation request email to client (restaurant)
      sendReservationEmail({
        partySize: partySize as string,
        mealType: mealType as string,
        date: date as string,
        time: time as string,
        email: email as string,
        phone: phone as string,
      }, businessId || undefined).then((result) => {
        const duration = Date.now() - emailStartTime
        console.log(`[RESERVATION_API] Reservation request email result:`, JSON.stringify({
          reservationId,
          customerEmail: email,
          date,
          time,
          emailType: 'reservation_request',
          success: result.success,
          error: result.error,
          duration,
          businessId: businessId || undefined,
          timestamp: new Date().toISOString(),
        }))
        if (!result.success) {
          console.error(`[RESERVATION_API] Failed to send reservation request email:`, result.error)
        }
        return result
      }).catch((error) => {
        const duration = Date.now() - emailStartTime
        console.error(`[RESERVATION_API] Error sending reservation request email to client:`, JSON.stringify({
          reservationId,
          customerEmail: email,
          date,
          time,
          emailType: 'reservation_request',
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          duration,
          businessId: businessId || undefined,
          timestamp: new Date().toISOString(),
        }))
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      }),
      // Send automatic confirmation email to customer
      sendReservationConfirmationEmail({
        customerEmail: email,
        customerName: customerName,
        reservationDate: date,
        reservationTime: time,
        partySize: partySizeNum,
        mealType: mealType,
      }).then((result) => {
        const duration = Date.now() - emailStartTime
        console.log(`[RESERVATION_API] Confirmation email result:`, JSON.stringify({
          reservationId,
          customerEmail: email,
          date,
          time,
          emailType: 'confirmation',
          success: result.success,
          error: result.error,
          duration,
          timestamp: new Date().toISOString(),
        }))
        if (!result.success) {
          console.error(`[RESERVATION_API] Failed to send confirmation email:`, result.error)
        }
        return result
      }).catch((error) => {
        const duration = Date.now() - emailStartTime
        console.error(`[RESERVATION_API] Error sending confirmation email to customer:`, JSON.stringify({
          reservationId,
          customerEmail: email,
          date,
          time,
          emailType: 'confirmation',
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          duration,
          timestamp: new Date().toISOString(),
        }))
        return { success: false, error: error instanceof Error ? error.message : String(error) }
      })
    ]).then((results) => {
      const duration = Date.now() - emailStartTime
      const [reservationEmailResult, confirmationEmailResult] = results
      const allSuccessful = reservationEmailResult.success && confirmationEmailResult.success
      
      console.log(`[RESERVATION_API] All emails processed:`, JSON.stringify({
        reservationId,
        customerEmail: email,
        date,
        time,
        reservationRequestEmail: {
          success: reservationEmailResult.success,
          error: reservationEmailResult.error,
        },
        confirmationEmail: {
          success: confirmationEmailResult.success,
          error: confirmationEmailResult.error,
        },
        allSuccessful,
        totalDuration: duration,
        timestamp: new Date().toISOString(),
      }))
      
      if (!allSuccessful) {
        console.warn(`[RESERVATION_API] One or more emails failed to send. Reservation ID: ${reservationId || 'N/A'}`)
      }
    }).catch((error) => {
      const duration = Date.now() - emailStartTime
      // Log any unexpected errors, but don't affect the response
      console.error(`[RESERVATION_API] Unexpected error in background email sending:`, JSON.stringify({
        reservationId,
        customerEmail: email,
        date,
        time,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        duration,
        timestamp: new Date().toISOString(),
      }))
    })
    
    // Wait for emails with timeout (don't block response for more than 12 seconds)
    const emailTimeout = new Promise((resolve) => {
      setTimeout(() => {
        console.warn(`[RESERVATION_API] Email sending timeout - returning response. Emails may still be processing.`)
        resolve({ timedOut: true })
      }, 12000)
    })
    
    await Promise.race([emailPromise, emailTimeout])

    return NextResponse.json({
      success: true,
      message: 'Reservation request submitted successfully'
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process reservation request' },
      { status: 500 }
    )
  }
}

