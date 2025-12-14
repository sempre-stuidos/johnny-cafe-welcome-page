import { supabaseAdmin } from './supabase'

export interface Band {
  id: string
  name: string
  description?: string
  image_url?: string
}

export interface Event {
  id: string
  org_id: string
  title: string
  short_description?: string
  description?: string
  image_url?: string
  event_type?: string
  starts_at?: string // Optional for weekly events
  ends_at?: string // Optional for weekly events
  publish_start_at?: string
  publish_end_at?: string
  status: 'draft' | 'scheduled' | 'live' | 'past' | 'archived'
  is_featured: boolean
  is_weekly?: boolean
  day_of_week?: number // 0-6, where 0=Sunday, 6=Saturday
  created_at: string
  updated_at: string
  bands?: Band[] // Bands associated with this event
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
    starts_at: record.starts_at as string | undefined,
    ends_at: record.ends_at as string | undefined,
    publish_start_at: record.publish_start_at as string | undefined,
    publish_end_at: record.publish_end_at as string | undefined,
    status: record.status as Event['status'],
    is_featured: record.is_featured as boolean,
    is_weekly: record.is_weekly as boolean | undefined,
    day_of_week: record.day_of_week !== null && record.day_of_week !== undefined 
      ? (record.day_of_week as number) 
      : undefined,
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
    // For weekly events, starts_at might be null, so we'll order by created_at as fallback
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('org_id', business.id)
      .order('starts_at', { ascending: true, nullsFirst: false })

    if (error) {
      console.error('Error fetching events:', error)
      return []
    }

    if (!data) {
      return []
    }

    // Transform and filter to only live events
    const events = (data || []).map(transformEventRecord)
    
    // Compute status for each event and filter to only live one-time events (exclude weekly)
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
      .filter(event => event.status === 'live' && !event.is_weekly)

    // Fetch bands for all events
    const eventIds = liveEvents.map(e => e.id)
    const bandsByEventId = await fetchBandsForEvents(eventIds)

    // Attach bands to events
    return liveEvents.map(event => ({
      ...event,
      bands: bandsByEventId[event.id] || []
    }))
  } catch (error) {
    console.error('Error in getLiveEventsForBusiness:', error)
    return []
  }
}

/**
 * Get past events for a business by slug
 * Only returns events that have ended (past events)
 */
export async function getPastEventsForBusiness(businessSlug: string): Promise<Event[]> {
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
    // For weekly events, starts_at might be null, so we'll order by created_at as fallback
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('org_id', business.id)
      .order('starts_at', { ascending: false, nullsFirst: false }) // Most recent first for past events

    if (error) {
      console.error('Error fetching events:', error)
      return []
    }

    if (!data) {
      return []
    }

    // Transform and filter to only past events
    const events = (data || []).map(transformEventRecord)
    const now = new Date()
    
    // Filter to past events - events where ends_at is in the past
    const pastEvents = events
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
      .filter(event => {
        // An event is past if:
        // 1. It has an ends_at date that is in the past, OR
        // 2. It has a publish_end_at that is in the past, OR
        // 3. Its computed status is 'past'
        // Note: Weekly events might not have ends_at
        if (!event.ends_at) {
          // For weekly events without ends_at, check publish_end_at or status
          const publishEndAt = event.publish_end_at ? new Date(event.publish_end_at) : null
          return (publishEndAt && publishEndAt < now) || event.status === 'past'
        }
        const endsAt = new Date(event.ends_at)
        const publishEndAt = event.publish_end_at ? new Date(event.publish_end_at) : null
        
        return endsAt < now || (publishEndAt && publishEndAt < now) || event.status === 'past'
      })

    // Fetch bands for all events
    const eventIds = pastEvents.map(e => e.id)
    const bandsByEventId = await fetchBandsForEvents(eventIds)

    // Attach bands to events
    return pastEvents.map(event => ({
      ...event,
      bands: bandsByEventId[event.id] || []
    }))
  } catch (error) {
    console.error('Error in getPastEventsForBusiness:', error)
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
 * Format date and time for display with time included (e.g., "DECEMBER 5, 2025 at 8:00 PM")
 */
export function formatEventDateWithTime(startsAt?: string, endsAt?: string): string {
  if (!startsAt) {
    return 'Invalid date'
  }

  const start = new Date(startsAt)
  
  if (isNaN(start.getTime())) {
    return 'Invalid date'
  }
  
  const dateStr = start.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  }).toUpperCase()
  
  const startTime = start.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  })
  
  if (endsAt) {
    const end = new Date(endsAt)
    if (!isNaN(end.getTime())) {
      const endTime = end.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      })
      
      // If same day, show date once with time range
      if (start.toDateString() === end.toDateString()) {
        return `${dateStr} · ${startTime} - ${endTime}`
      } else {
        // Different days
        const endDateStr = end.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric', 
          year: 'numeric' 
        }).toUpperCase()
        return `${dateStr} · ${startTime} → ${endDateStr} · ${endTime}`
      }
    }
  }
  
  return `${dateStr} at ${startTime}`
}

/**
 * Format weekly event date and time for display
 * Calculates the next occurrence of the specified day of week and displays it with the actual date
 * For weekly events, times are stored with placeholder dates, so we extract the time portion
 */
export function formatWeeklyEventDate(dayOfWeek: number, startsAt?: string, endsAt?: string): string {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayName = dayNames[dayOfWeek] || 'Unknown'

  // Calculate the next occurrence date
  const today = new Date()
  const currentDay = today.getDay()
  
  // Calculate days until next occurrence
  let daysUntilNext = (dayOfWeek - currentDay + 7) % 7
  
  // If it's today, check if the time has passed
  if (daysUntilNext === 0 && startsAt) {
    const start = new Date(startsAt)
    if (!isNaN(start.getTime())) {
      const startHours = start.getHours()
      const startMinutes = start.getMinutes()
      const now = new Date()
      const currentHours = now.getHours()
      const currentMinutes = now.getMinutes()
      
      // If the event time has already passed today, show next week's occurrence
      if (currentHours > startHours || (currentHours === startHours && currentMinutes >= startMinutes)) {
        daysUntilNext = 7
      }
    }
  }
  
  // If daysUntilNext is 0, it means it's today and time hasn't passed, so use 0
  // Otherwise, use the calculated days
  const nextDate = new Date(today)
  nextDate.setDate(today.getDate() + daysUntilNext)
  
  // Format date as "DayName Month Day" (e.g., "Thursday Dec 18")
  const monthName = nextDate.toLocaleDateString('en-US', { month: 'short' })
  const dayNumber = nextDate.getDate()
  const dateStr = `${dayName} ${monthName} ${dayNumber}`

  if (!startsAt) {
    return dateStr
  }

  const start = new Date(startsAt)
  
  if (isNaN(start.getTime())) {
    return dateStr
  }

  // Extract time from the Date object using local time methods
  // This will show the time as it appears in the database timezone context
  // For weekly events stored with placeholder dates, this preserves the original time entry
  const startHours = start.getHours()
  const startMinutes = start.getMinutes()
  const startHour12 = startHours % 12 || 12
  const startAmPm = startHours >= 12 ? 'PM' : 'AM'
  const startTime = `${startHour12}:${startMinutes.toString().padStart(2, '0')} ${startAmPm}`

  if (!endsAt) {
    return `${dateStr} · ${startTime}`
  }

  const end = new Date(endsAt)
  
  if (isNaN(end.getTime())) {
    return `${dateStr} · ${startTime}`
  }

  const endHours = end.getHours()
  const endMinutes = end.getMinutes()
  const endHour12 = endHours % 12 || 12
  const endAmPm = endHours >= 12 ? 'PM' : 'AM'
  const endTime = `${endHour12}:${endMinutes.toString().padStart(2, '0')} ${endAmPm}`

  if (startTime === endTime) {
    return `${dateStr} · ${startTime}`
  }

  return `${dateStr} · ${startTime} - ${endTime}`
}

/**
 * Fetch bands for a list of events
 */
async function fetchBandsForEvents(eventIds: string[]): Promise<Record<string, Band[]>> {
  if (eventIds.length === 0) {
    return {}
  }

  try {
    const supabase = supabaseAdmin
    
    const { data: eventBands, error } = await supabase
      .from('event_bands')
      .select(`
        event_id,
        order,
        band:bands(id, name, description, image_url)
      `)
      .in('event_id', eventIds)
      .order('order', { ascending: true })

    if (error) {
      console.error('Error fetching event bands:', error)
      return {}
    }

    if (!eventBands) {
      return {}
    }

    // Group bands by event_id
    const bandsByEventId: Record<string, Band[]> = {}
    
    for (const eventBand of eventBands) {
      const eventId = eventBand.event_id as string
      // The nested relationship is aliased as 'band' in the query
      // Supabase returns it as an object, not an array
      const bandData = (eventBand as unknown as { band: Band | null }).band
      
      if (bandData && typeof bandData === 'object' && 'id' in bandData && 'name' in bandData) {
        const band: Band = {
          id: bandData.id,
          name: bandData.name,
          description: bandData.description,
          image_url: bandData.image_url,
        }
        
        if (!bandsByEventId[eventId]) {
          bandsByEventId[eventId] = []
        }
        bandsByEventId[eventId].push(band)
      }
    }

    // Debug logging
    if (Object.keys(bandsByEventId).length > 0) {
      console.log('Fetched bands for events:', bandsByEventId)
    }

    return bandsByEventId
  } catch (error) {
    console.error('Error in fetchBandsForEvents:', error)
    return {}
  }
}

/**
 * Get weekly events for a business by slug
 * Only returns weekly events that are currently live (visible to public)
 */
export async function getWeeklyEventsForBusiness(businessSlug: string): Promise<Event[]> {
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
      .eq('is_weekly', true)
      .order('day_of_week', { ascending: true })

    if (error) {
      console.error('Error fetching events:', error)
      return []
    }

    if (!data) {
      return []
    }

    // Transform and filter to only live weekly events
    const events = (data || []).map(transformEventRecord)
    
    // Compute status for each event and filter to only live ones
    const liveWeeklyEvents = events
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

    // Fetch bands for all events
    const eventIds = liveWeeklyEvents.map(e => e.id)
    const bandsByEventId = await fetchBandsForEvents(eventIds)

    // Attach bands to events
    return liveWeeklyEvents.map(event => ({
      ...event,
      bands: bandsByEventId[event.id] || []
    }))
  } catch (error) {
    console.error('Error in getWeeklyEventsForBusiness:', error)
    return []
  }
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

export interface GalleryImage {
  id: string
  url: string
  name?: string
}

/**
 * Get gallery images with Event category for a business
 */
export async function getEventGalleryImagesForBusiness(businessSlug: string): Promise<GalleryImage[]> {
  try {
    // Sanitize business slug for matching
    const sanitizedSlug = businessSlug.replace(/[^a-zA-Z0-9-_]/g, '-')

    // Fetch gallery images with Event category
    // Filter by file_url containing the business slug (same pattern as agency-light)
    const { data: filesAssets, error } = await supabaseAdmin
      .from('files_assets')
      .select('id, name, file_url, image_category')
      .eq('type', 'Images')
      .eq('project', 'Gallery')
      .eq('image_category', 'Event')
      .order('uploaded', { ascending: false })

    if (error) {
      console.error('Error fetching gallery images:', error)
      return []
    }

    if (!filesAssets || filesAssets.length === 0) {
      return []
    }

    // Filter by business slug in file_url (same pattern as agency-light)
    const businessImages = filesAssets.filter((file) => 
      file.file_url?.includes(`${sanitizedSlug}/gallery/`)
    )

    if (businessImages.length === 0) {
      return []
    }

    // Transform to GalleryImage format
    return businessImages
      .filter(file => file.file_url) // Only include files with URLs
      .map(file => {
        // Get public URL using Supabase storage API
        // file_url format: business-slug/gallery/filename.png
        const { data } = supabaseAdmin.storage
          .from('gallery')
          .getPublicUrl(file.file_url)
        
        return {
          id: file.id,
          url: data.publicUrl,
          name: file.name || undefined,
        }
      })
  } catch (error) {
    console.error('Error in getEventGalleryImagesForBusiness:', error)
    return []
  }
}

