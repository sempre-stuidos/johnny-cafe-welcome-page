import { NextRequest, NextResponse } from 'next/server'
import { sendReservationEmail } from '@/lib/email'
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
    const body = await request.json()
    const { partySize, date, time, email, phone } = body

    // Validate required fields
    if (!partySize || !date || !time || !email || !phone) {
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

    // Get business ID first (needed for email recipients and database save)
    let businessId: string | null = null
    try {
      const { data: business, error: businessError } = await supabaseAdmin
        .from('businesses')
        .select('id')
        .eq('slug', 'johnny-gs-brunch')
        .single()

      if (businessError || !business) {
        console.error('Error finding business:', businessError)
        // Continue without business ID - will use fallback email or no email
      } else {
        businessId = business.id
      }
    } catch (dbError) {
      console.error('Error fetching business:', dbError)
      // Continue without business ID
    }

    // Send email via Brevo (with businessId for recipient lookup)
    const emailResult = await sendReservationEmail({
      partySize,
      date,
      time,
      email,
      phone,
    }, businessId || undefined)

    // Note: Email sending failure is not critical - reservation will still be saved
    if (!emailResult.success) {
      console.warn('Email sending failed:', emailResult.error)
      // Continue to save reservation anyway
    }

    // Save reservation to database
    try {
      if (!businessId) {
        // Try to get business ID again if we didn't get it earlier
        const { data: business, error: businessError } = await supabaseAdmin
          .from('businesses')
          .select('id')
          .eq('slug', 'johnny-gs-brunch')
          .single()

        if (businessError || !business) {
          console.error('Error finding business for database save:', businessError)
          return NextResponse.json({
            success: true,
            message: 'Reservation request submitted successfully (email sent, database save skipped)'
          })
        }
        businessId = business.id
      }

      // Extract customer name from email
      const customerName = extractCustomerNameFromEmail(email)

      // Insert reservation into database
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
        // Continue - email was sent successfully, database save failed
        return NextResponse.json({
          success: true,
          message: 'Reservation request submitted successfully (email sent, database save failed)'
        })
      }

      return NextResponse.json({
        success: true,
        message: 'Reservation request submitted successfully'
      })
    } catch (dbError) {
      console.error('Error in database operation:', dbError)
      // Continue - email was sent successfully
      return NextResponse.json({
        success: true,
        message: 'Reservation request submitted successfully (email sent, database save skipped)'
      })
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process reservation request' },
      { status: 500 }
    )
  }
}

