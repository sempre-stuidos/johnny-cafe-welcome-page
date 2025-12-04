import { NextRequest, NextResponse } from 'next/server'
import { getLiveEventsForBusiness, formatEventDateUppercase } from '@/lib/events'
import { resolveBusinessSlug } from '@/lib/business-utils'

export async function GET(request: NextRequest) {
  try {
    // Get business slug from query params or environment
    const { searchParams } = new URL(request.url)
    const businessSlugParam = searchParams.get('businessSlug')
    
    const businessSlug = resolveBusinessSlug(
      businessSlugParam || undefined,
      process.env.NEXT_PUBLIC_BUSINESS_SLUG,
      'johnny-gs-brunch'
    )
    
    // Fetch live events from database
    const dbEvents = await getLiveEventsForBusiness(businessSlug)
    
    // Map database events to EventItemData format
    const events = dbEvents.map(event => ({
      date: formatEventDateUppercase(event.starts_at),
      name: event.title,
      description: event.description || event.short_description || '',
      image: event.image_url,
    }))

    return NextResponse.json({ events })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

