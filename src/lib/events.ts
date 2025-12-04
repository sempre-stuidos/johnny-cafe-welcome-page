import { supabaseAdmin } from './supabase'

export interface Event {
  id: string
  org_id: string
  title: string
  short_description?: string
  description?: string
  image_url?: string
  event_type?: string
  starts_at: string
  ends_at: string
  publish_start_at?: string
  publish_end_at?: string
  status: 'draft' | 'scheduled' | 'live' | 'past' | 'archived'
  is_featured: boolean
  created_at: string
  updated_at: string
}

/**
 * Compute event status based on current time and publish dates
 * Note: If status is explicitly set to 'draft', it will be preserved
 */
function computeEventStatus(event: Event | Partial<Event>): Event['status'] {
  // If archived, always return archived
  if (event.status === 'archived') {
    return 'archived'
  }

  // If explicitly set to draft, preserve it (user saved as draft)
  if (event.status === 'draft') {
    return 'draft'
  }

  const now = new Date()
  
  // If no publish_start_at, it's a draft
  if (!event.publish_start_at) {
    return 'draft'
  }

  const publishStart = new Date(event.publish_start_at)
  const publishEnd = event.publish_end_at ? new Date(event.publish_end_at) : null

  // If now < publish_start, it's scheduled
  if (now < publishStart) {
    return 'scheduled'
  }

  // If publish_end exists and now > publish_end, it's past
  if (publishEnd && now > publishEnd) {
    return 'past'
  }

  // If publish_start <= now <= publish_end (or no publish_end), it's live
  if (now >= publishStart && (!publishEnd || now <= publishEnd)) {
    return 'live'
  }

  // Default to draft
  return 'draft'
}

/**
 * Transform database record to Event interface
 */
function transformEventRecord(record: Record<string, unknown>): Event {
  return {
    id: record.id as string,
    org_id: record.org_id as string,
    title: record.title as string,
    short_description: record.short_description as string | undefined,
    description: record.description as string | undefined,
    image_url: record.image_url as string | undefined,
    event_type: record.event_type as string | undefined,
    starts_at: record.starts_at as string,
    ends_at: record.ends_at as string,
    publish_start_at: record.publish_start_at as string | undefined,
    publish_end_at: record.publish_end_at as string | undefined,
    status: record.status as Event['status'],
    is_featured: record.is_featured as boolean,
    created_at: record.created_at as string,
    updated_at: record.updated_at as string,
  }
}

/**
 * Get live events for a business by slug
 * Only returns events that are currently live (visible to public)
 */
export async function getLiveEventsForBusiness(businessSlug: string): Promise<Event[]> {
  try {
    // Use admin client to bypass RLS for public landing pages
    const supabase = supabaseAdmin
    
    // First get business by slug
    const { data: businesses, error: businessError } = await supabase
      .from('businesses')
      .select('id, name, slug')
      .eq('slug', businessSlug)
      .limit(1)

    if (businessError || !businesses || businesses.length === 0) {
      console.error('Error fetching business:', businessError)
      return []
    }

    const business = businesses[0]

    // Get all events for this business
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('org_id', business.id)
      .order('starts_at', { ascending: true })

    if (error) {
      console.error('Error fetching events:', error)
      return []
    }

    if (!data) {
      return []
    }

    // Transform and filter to only live events
    const events = (data || []).map(transformEventRecord)
    
    // Compute status for each event and filter to only live ones
    const liveEvents = events
      .map(event => {
        // Compute status, but preserve draft and archived status
        const finalStatus = (event.status === 'draft' || event.status === 'archived') 
          ? event.status 
          : computeEventStatus(event)
        return {
          ...event,
          status: finalStatus,
        }
      })
      .filter(event => event.status === 'live')

    return liveEvents
  } catch (error) {
    console.error('Error in getLiveEventsForBusiness:', error)
    return []
  }
}

/**
 * Format date for display (e.g., "Dec 15, 2024")
 */
export function formatEventDate(dateString: string): string {
  const date = new Date(dateString)
  
  if (isNaN(date.getTime())) {
    return 'Invalid date'
  }
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

/**
 * Format date and time for display (e.g., "DECEMBER 5, 2025")
 */
export function formatEventDateUppercase(dateString: string): string {
  const date = new Date(dateString)
  
  if (isNaN(date.getTime())) {
    return 'Invalid date'
  }
  
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }).toUpperCase()
}

/**
 * Format date and time for display
 */
export function formatEventDateTime(startsAt: string, endsAt: string): string {
  const start = new Date(startsAt)
  const end = new Date(endsAt)
  
  // Check for invalid dates
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Invalid date'
  }
  
  const startDate = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const startTime = start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  const endTime = end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  
  // If same day
  if (start.toDateString() === end.toDateString()) {
    return `${startDate} · ${startTime} - ${endTime}`
  }
  
  // Different days
  const endDate = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return `${startDate} · ${startTime} → ${endDate} · ${endTime}`
}

