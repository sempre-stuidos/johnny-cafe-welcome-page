import { NextRequest, NextResponse } from 'next/server'
import { 
  getLiveEventsForBusiness, 
  getPastEventsForBusiness, 
  getWeeklyEventsForBusiness,
  formatEventDateUppercase,
  formatEventDateWithTime,
  formatWeeklyEventDate,
  formatWeeklyEventDatePast,
  formatWeeklyEventDateUppercase,
  getEventGalleryImagesForBusiness
} from '@/lib/events'
import { resolveBusinessSlug } from '@/lib/business-utils'

export async function GET(request: NextRequest) {
  try {
    // Get business slug and event type from query params
    const { searchParams } = new URL(request.url)
    const businessSlugParam = searchParams.get('businessSlug')
    const type = searchParams.get('type') || 'live' // 'weekly', 'live', 'past', or 'gallery'
    const format = searchParams.get('format') // 'uppercase' for uppercase date format
    
    const businessSlug = resolveBusinessSlug(
      businessSlugParam || undefined,
      process.env.NEXT_PUBLIC_BUSINESS_SLUG,
      'johnny-gs-brunch'
    )
    
    // Handle gallery images request
    if (type === 'gallery') {
      const galleryImages = await getEventGalleryImagesForBusiness(businessSlug)
      const response = NextResponse.json({ galleryImages })
      // Add cache headers for faster subsequent loads (cache for 5 minutes)
      response.headers.set('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
      return response
    }
    
    // Fetch events from database based on type
    let dbEvents
    if (type === 'weekly') {
      dbEvents = await getWeeklyEventsForBusiness(businessSlug)
    } else if (type === 'past') {
      dbEvents = await getPastEventsForBusiness(businessSlug)
    } else {
      // 'live' - upcoming one-time events
      dbEvents = await getLiveEventsForBusiness(businessSlug)
    }
    
    // Map database events to EventItemData format with proper date formatting
    const events = dbEvents.map(event => {
      let dateStr: string
      
      if (event.is_weekly && event.day_of_week !== undefined) {
        // Weekly events: use appropriate format based on type and format parameter
        if (type === 'past') {
          dateStr = formatWeeklyEventDatePast(event.day_of_week, event.starts_at, event.ends_at)
        } else if (format === 'uppercase') {
          dateStr = formatWeeklyEventDateUppercase(event.day_of_week, event.starts_at, event.ends_at)
        } else {
          dateStr = formatWeeklyEventDate(event.day_of_week, event.starts_at, event.ends_at)
        }
      } else if (event.starts_at) {
        // One-time events: format with date AND time
        dateStr = formatEventDateWithTime(event.starts_at, event.ends_at)
      } else {
        // Fallback
        dateStr = 'Date TBD'
      }
      
      return {
        date: dateStr,
        name: event.title,
        description: event.description || event.short_description || '',
        image: event.image_url,
        bands: event.bands?.map(band => ({ id: band.id, name: band.name })),
      }
    })

    const response = NextResponse.json({ events })
    // Add no-cache headers to ensure fresh data on every request
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    return response
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    )
  }
}

