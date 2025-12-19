import { NextRequest, NextResponse } from 'next/server'
import { sendReservationEmail, sendReservationConfirmationEmail } from '@/lib/email'
import { supabaseAdmin } from '@/lib/supabase'

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
    let businessId: string | null = null
    try {
      const { data: business, error: businessError } = await supabaseAdmin
        .from('businesses')
        .select('id')
        .eq('slug', 'johnny-gs-brunch')
        .single()

      if (businessError || !business) {
        console.error('Error finding business:', businessError)
        // Log error but continue - will try to save anyway
      } else {
        businessId = business.id
      }
    } catch (dbError) {
      console.error('Error fetching business:', dbError)
      // Log error but continue - will try to save anyway
    }

    // Extract customer name from email
    const customerName = extractCustomerNameFromEmail(email)

    // Save reservation to database first
    // If businessId is not found, try to save anyway (database may handle it)
    try {
      if (!businessId) {
        // Try one more time to get business ID
        const { data: business, error: businessError } = await supabaseAdmin
          .from('businesses')
          .select('id')
          .eq('slug', 'johnny-gs-brunch')
          .single()

        if (!businessError && business) {
          businessId = business.id
        }
      }

      // Only attempt to save if we have a businessId (required by database)
      if (businessId) {
        const { error: insertError } = await supabaseAdmin
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

        if (insertError) {
          console.error('Error saving reservation to database:', insertError)
          // Continue anyway - emails will still be sent
        }
      } else {
        console.warn('Business ID not found - reservation not saved to database, but emails will be sent')
      }
    } catch (dbError) {
      console.error('Error in database operation:', dbError)
      // Continue anyway - emails will still be sent
    }

    // Return success response immediately (don't wait for emails)
    // Send emails asynchronously in the background
    Promise.all([
      // Send reservation request email to client (restaurant)
      sendReservationEmail({
        partySize: partySize as string,
        mealType: mealType as string,
        date: date as string,
        time: time as string,
        email: email as string,
        phone: phone as string,
      }, businessId || undefined).catch((error) => {
        console.error('Error sending reservation request email to client:', error)
      }),
      // Send automatic confirmation email to customer
      sendReservationConfirmationEmail({
        customerEmail: email,
        customerName: customerName,
        reservationDate: date,
        reservationTime: time,
        partySize: partySizeNum,
        mealType: mealType,
      }).catch((error) => {
        console.error('Error sending confirmation email to customer:', error)
      })
    ]).catch((error) => {
      // Log any unexpected errors, but don't affect the response
      console.error('Error in background email sending:', error)
    })

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

