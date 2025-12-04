import { NextRequest, NextResponse } from 'next/server'
import { sendReservationEmail } from '@/lib/email'

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

    // Send email via Brevo
    console.log('Sending reservation email:', {
      partySize,
      date,
      time,
      email,
      phone,
      hasApiKey: !!process.env.BREVO_API_KEY,
    })
    
    const emailResult = await sendReservationEmail({
      partySize,
      date,
      time,
      email,
      phone,
    })

    if (!emailResult.success) {
      console.error('Failed to send reservation email:', emailResult.error)
      return NextResponse.json(
        { 
          success: false, 
          error: emailResult.error || 'Failed to send reservation email' 
        },
        { status: 500 }
      )
    }

    console.log('Reservation email sent successfully')

    return NextResponse.json({
      success: true,
      message: 'Reservation request submitted successfully'
    })
  } catch (error) {
    console.error('Error in POST /api/reservation:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process reservation request' },
      { status: 500 }
    )
  }
}

