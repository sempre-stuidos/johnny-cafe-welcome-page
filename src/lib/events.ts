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
        // For weekly events, check if they have past occurrences
        if (event.is_weekly && event.day_of_week !== undefined) {
          return hasPastOccurrence(event.day_of_week, event.starts_at, event.ends_at)
        }
        
        // For non-weekly events, check if they are past:
        // 1. It has an ends_at date that is in the past, OR
        // 2. It has a publish_end_at that is in the past, OR
        // 3. Its computed status is 'past'
        if (!event.ends_at) {
          // For events without ends_at, check publish_end_at or status
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
 * Parse ISO string and extract components in Toronto timezone
 * Converts UTC time from database to Toronto timezone before extracting components
 */
function parseISOString(isoString: string): { year: number; month: number; day: number; hours: number; minutes: number } | null {
  const date = new Date(isoString)
  
  if (isNaN(date.getTime())) {
    return null
  }
  
  // Get date components in Toronto timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Toronto',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  
  const parts = formatter.formatToParts(date)
  const year = parseInt(parts.find(p => p.type === 'year')?.value || '0', 10)
  const month = parseInt(parts.find(p => p.type === 'month')?.value || '0', 10)
  const day = parseInt(parts.find(p => p.type === 'day')?.value || '0', 10)
  const hours = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10)
  const minutes = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10)
  
  return { year, month, day, hours, minutes }
}


/**
 * Format date from components (already in Toronto timezone from parseISOString)
 */
function formatDateUTC(year: number, month: number, day: number, uppercase: boolean = false): string {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const monthName = monthNames[month - 1]
  const dateStr = `${monthName} ${day}, ${year}`
  return uppercase ? dateStr.toUpperCase() : dateStr
}

/**
 * Get current date/time components in Toronto timezone
 */
function getTorontoNowComponents(): { year: number; month: number; day: number; hours: number; minutes: number } {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Toronto',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
  
  const parts = formatter.formatToParts(now)
  return {
    year: parseInt(parts.find(p => p.type === 'year')?.value || '0', 10),
    month: parseInt(parts.find(p => p.type === 'month')?.value || '0', 10),
    day: parseInt(parts.find(p => p.type === 'day')?.value || '0', 10),
    hours: parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10),
    minutes: parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10)
  }
}

/**
 * Get day of week in Toronto timezone (0 = Sunday, 6 = Saturday)
 */
function getTorontoDayOfWeek(): number {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Toronto',
    weekday: 'long'
  })
  
  const weekday = formatter.format(now)
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return dayNames.indexOf(weekday)
}

/**
 * Get date components in Toronto timezone
 */
function getTorontoDateComponents(date: Date): { year: number; month: number; day: number } {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Toronto',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })
  
  const parts = formatter.formatToParts(date)
  return {
    year: parseInt(parts.find(p => p.type === 'year')?.value || '0', 10),
    month: parseInt(parts.find(p => p.type === 'month')?.value || '0', 10),
    day: parseInt(parts.find(p => p.type === 'day')?.value || '0', 10)
  }
}

/**
 * Extract time portion from ISO string and convert to Toronto timezone (e.g., "21:00:00" -> "9:00 PM" in Toronto)
 * Converts UTC time from database to Toronto timezone for display
 */
function extractTimeFromISO(isoString: string): string {
  const date = new Date(isoString)
  
  if (isNaN(date.getTime())) {
    return ''
  }
  
  // Format time in Toronto timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Toronto',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
  
  return formatter.format(date)
}

/**
 * Format date and time for display with time included (e.g., "DECEMBER 5, 2025 at 8:00 PM")
 * All times are displayed in Toronto timezone
 */
export function formatEventDateWithTime(startsAt?: string, endsAt?: string): string {
  if (!startsAt) {
    return 'Invalid date'
  }

  const startParts = parseISOString(startsAt)
  if (!startParts) {
    return 'Invalid date'
  }
  
  const dateStr = formatDateUTC(startParts.year, startParts.month, startParts.day, true)
  const startTime = extractTimeFromISO(startsAt)
  
  if (endsAt) {
    const endTime = extractTimeFromISO(endsAt)
      
    if (endTime) {
      const endParts = parseISOString(endsAt)
      if (endParts) {
        // If same day, show date once with time range
        if (startParts.year === endParts.year && startParts.month === endParts.month && startParts.day === endParts.day) {
          return `${dateStr} · ${startTime} - ${endTime}`
        } else {
          // Different days
          const endDateStr = formatDateUTC(endParts.year, endParts.month, endParts.day, true)
          return `${dateStr} · ${startTime} → ${endDateStr} · ${endTime}`
        }
      }
    }
  }
  
  return `${dateStr} at ${startTime}`
}

/**
 * Get the current/next instance date for a weekly event in YYYY-MM-DD format
 * Uses the same logic as formatWeeklyEventDate but returns the date string instead of formatted display
 * All calculations use Toronto timezone
 */
export function getCurrentInstanceDate(dayOfWeek: number, startsAt?: string): string | null {
  if (dayOfWeek === undefined || dayOfWeek === null || dayOfWeek < 0 || dayOfWeek > 6) {
    return null
  }

  // Calculate the next occurrence date using Toronto timezone
  const currentDay = getTorontoDayOfWeek()
  
  // Calculate days until next occurrence
  let daysUntilNext = (dayOfWeek - currentDay + 7) % 7
  
  // If it's today, check if the event time has passed in Toronto timezone
  if (daysUntilNext === 0 && startsAt) {
    const startParts = parseISOString(startsAt)
    if (startParts) {
      const torontoNow = getTorontoNowComponents()
      
      // If the event time has already passed today in Toronto, show next week's occurrence
      if (torontoNow.hours > startParts.hours || (torontoNow.hours === startParts.hours && torontoNow.minutes >= startParts.minutes)) {
        daysUntilNext = 7
      }
    }
  }
  
  // Calculate next date in Toronto timezone
  const torontoNow = getTorontoNowComponents()
  // Create a date object for the next occurrence in Toronto timezone
  const nextDate = new Date(torontoNow.year, torontoNow.month - 1, torontoNow.day + daysUntilNext)
  
  // Get date components in Toronto timezone and format as YYYY-MM-DD
  const nextDateParts = getTorontoDateComponents(nextDate)
  const year = nextDateParts.year
  const month = String(nextDateParts.month).padStart(2, '0')
  const day = String(nextDateParts.day).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}

/**
 * Format weekly event date and time for display
 * Calculates the next occurrence of the specified day of week and displays it with the actual date
 * All times are displayed in Toronto timezone
 */
export function formatWeeklyEventDate(dayOfWeek: number, startsAt?: string, endsAt?: string): string {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayName = dayNames[dayOfWeek] || 'Unknown'

  // Calculate the next occurrence date using Toronto timezone
  const currentDay = getTorontoDayOfWeek()
  
  // Calculate days until next occurrence
  let daysUntilNext = (dayOfWeek - currentDay + 7) % 7
  
  // If it's today, check if the time has passed in Toronto timezone
  if (daysUntilNext === 0 && startsAt) {
    const startParts = parseISOString(startsAt)
    if (startParts) {
      const torontoNow = getTorontoNowComponents()
      
      // If the event time has already passed today in Toronto, show next week's occurrence
      if (torontoNow.hours > startParts.hours || (torontoNow.hours === startParts.hours && torontoNow.minutes >= startParts.minutes)) {
        daysUntilNext = 7
      }
    }
  }
  
  // Calculate next date in Toronto timezone
  const torontoNow = getTorontoNowComponents()
  // Create a date object for the next occurrence in Toronto timezone
  const nextDate = new Date(torontoNow.year, torontoNow.month - 1, torontoNow.day + daysUntilNext)
  
  // Format date as "DayName Month Day" (e.g., "Thursday Dec 18") in Toronto timezone
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const nextDateParts = getTorontoDateComponents(nextDate)
  const monthName = monthNames[nextDateParts.month - 1]
  const dateStr = `${dayName} ${monthName} ${nextDateParts.day}`

  if (!startsAt) {
    return dateStr
  }

  // Extract time in Toronto timezone
  const startTime = extractTimeFromISO(startsAt)
  if (!startTime) {
    return dateStr
  }

  if (!endsAt) {
    return `${dateStr} · ${startTime}`
  }

  const endTime = extractTimeFromISO(endsAt)
  if (!endTime) {
    return `${dateStr} · ${startTime}`
  }

  if (startTime === endTime) {
    return `${dateStr} · ${startTime}`
  }

  return `${dateStr} · ${startTime} - ${endTime}`
}

/**
 * Format weekly event date and time for display (past occurrence)
 * Calculates the last occurrence of the specified day of week and displays it with the actual date
 * All times are displayed in Toronto timezone
 */
export function formatWeeklyEventDatePast(dayOfWeek: number, startsAt?: string, endsAt?: string): string {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayName = dayNames[dayOfWeek] || 'Unknown'

  // Calculate the last occurrence date using Toronto timezone
  const currentDay = getTorontoDayOfWeek()
  
  // Calculate days since last occurrence
  let daysSinceLast = (currentDay - dayOfWeek + 7) % 7
  
  // If it's today, check if the time has passed in Toronto timezone
  if (daysSinceLast === 0 && startsAt) {
    const startParts = parseISOString(startsAt)
    if (startParts) {
      const torontoNow = getTorontoNowComponents()
      
      // If the event time has already passed today in Toronto, show last week's occurrence
      if (torontoNow.hours > startParts.hours || (torontoNow.hours === startParts.hours && torontoNow.minutes >= startParts.minutes)) {
        daysSinceLast = 7
      }
    }
  }
  
  // Calculate last date in Toronto timezone
  const torontoNow = getTorontoNowComponents()
  // Create a date object for the last occurrence in Toronto timezone
  const lastDate = new Date(torontoNow.year, torontoNow.month - 1, torontoNow.day - daysSinceLast)
  
  // Format date as "DayName Month Day" (e.g., "Thursday Dec 18") in Toronto timezone
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const lastDateParts = getTorontoDateComponents(lastDate)
  const monthName = monthNames[lastDateParts.month - 1]
  const dateStr = `${dayName} ${monthName} ${lastDateParts.day}`

  if (!startsAt) {
    return dateStr
  }

  // Extract time in Toronto timezone
  const startTime = extractTimeFromISO(startsAt)
  if (!startTime) {
    return dateStr
  }

  if (!endsAt) {
    return `${dateStr} · ${startTime}`
  }

  const endTime = extractTimeFromISO(endsAt)
  if (!endTime) {
    return `${dateStr} · ${startTime}`
  }

  if (startTime === endTime) {
    return `${dateStr} · ${startTime}`
  }

  return `${dateStr} · ${startTime} - ${endTime}`
}

/**
 * Format weekly event date and time for display with uppercase date format
 * Calculates the next occurrence of the specified day of week and displays it with uppercase date
 * Used for home page display
 * All times are displayed in Toronto timezone
 */
export function formatWeeklyEventDateUppercase(dayOfWeek: number, startsAt?: string, endsAt?: string): string {
  // Calculate the next occurrence date using Toronto timezone
  const currentDay = getTorontoDayOfWeek()
  
  // Calculate days until next occurrence
  let daysUntilNext = (dayOfWeek - currentDay + 7) % 7
  
  // If it's today, check if the time has passed in Toronto timezone
  if (daysUntilNext === 0 && startsAt) {
    const startParts = parseISOString(startsAt)
    if (startParts) {
      const torontoNow = getTorontoNowComponents()
      
      // If the event time has already passed today in Toronto, show next week's occurrence
      if (torontoNow.hours > startParts.hours || (torontoNow.hours === startParts.hours && torontoNow.minutes >= startParts.minutes)) {
        daysUntilNext = 7
      }
    }
  }
  
  // Calculate next date in Toronto timezone
  const torontoNow = getTorontoNowComponents()
  // Create a date object for the next occurrence in Toronto timezone
  const nextDate = new Date(torontoNow.year, torontoNow.month - 1, torontoNow.day + daysUntilNext)
  
  // Format date as "MONTH DAY, YEAR" in uppercase (e.g., "DECEMBER 18, 2025") in Toronto timezone
  const nextDateParts = getTorontoDateComponents(nextDate)
  const dateStr = formatDateUTC(nextDateParts.year, nextDateParts.month, nextDateParts.day, true)

  if (!startsAt) {
    return dateStr
  }

  // Extract time in Toronto timezone
  const startTime = extractTimeFromISO(startsAt)
  if (!startTime) {
    return dateStr
  }

  if (!endsAt) {
    return `${dateStr} · ${startTime}`
  }

  const endTime = extractTimeFromISO(endsAt)
  if (!endTime) {
    return `${dateStr} · ${startTime}`
  }

  if (startTime === endTime) {
    return `${dateStr} · ${startTime}`
  }

  return `${dateStr} · ${startTime} - ${endTime}`
}

/**
 * Check if a weekly event has at least one past occurrence
 * Returns true if the last occurrence date/time is in the past
 */
export function hasPastOccurrence(dayOfWeek: number, startsAt?: string, endsAt?: string): boolean {
  // endsAt parameter is kept for API consistency but not used in this function
  void endsAt
  if (dayOfWeek === undefined || dayOfWeek === null) {
    return false
  }

  // Use Toronto timezone for day of week calculation
  const currentDay = getTorontoDayOfWeek()
  
  // Calculate days since last occurrence
  const daysSinceLast = (currentDay - dayOfWeek + 7) % 7
  
  // If it's today, check if the time has passed in Toronto timezone
  if (daysSinceLast === 0 && startsAt) {
    const startParts = parseISOString(startsAt)
    if (startParts) {
      const torontoNow = getTorontoNowComponents()
      
      // If the event time has already passed today in Toronto, it's in the past
      if (torontoNow.hours > startParts.hours || (torontoNow.hours === startParts.hours && torontoNow.minutes >= startParts.minutes)) {
        return true
      }
      // If time hasn't passed today, check if there was a previous occurrence
      // (i.e., if this event has been running for at least a week)
      // For now, we'll consider it past if time has passed, otherwise not
      return false
    }
  }
  
  // If daysSinceLast > 0, there was a past occurrence
  // If daysSinceLast === 0 and we're here, it means either no startsAt or time hasn't passed
  // In that case, check if there was a previous week's occurrence
  if (daysSinceLast === 0) {
    // If it's today and time hasn't passed, check if event has been running (has publish_start_at in past)
    // For simplicity, if it's today and time hasn't passed, we'll say it's not past yet
    return false
  }
  
  // There was a past occurrence (daysSinceLast > 0)
  return true
}

/**
 * Fetch bands for a specific event instance
 */
async function fetchBandsForInstance(instanceId: string): Promise<Band[]> {
  try {
    const supabase = supabaseAdmin
    
    const { data: instanceBands, error } = await supabase
      .from('event_instance_bands')
      .select(`
        order,
        band:bands(id, name, description, image_url)
      `)
      .eq('instance_id', instanceId)
      .order('order', { ascending: true })

    if (error) {
      console.error('Error fetching instance bands:', error)
      return []
    }

    if (!instanceBands) {
      return []
    }

    // Extract bands from the nested relationship
    const bands: Band[] = []
    
    for (const instanceBand of instanceBands) {
      // The nested relationship is aliased as 'band' in the query
      // Supabase returns it as an object, not an array
      const bandData = (instanceBand as unknown as { band: Band | null }).band
      
      if (bandData && typeof bandData === 'object' && 'id' in bandData && 'name' in bandData) {
        const band: Band = {
          id: bandData.id,
          name: bandData.name,
          description: bandData.description,
          image_url: bandData.image_url,
        }
        
        bands.push(band)
      }
    }

    return bands
  } catch (error) {
    console.error('Error in fetchBandsForInstance:', error)
    return []
  }
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

    // For each event, fetch current instance and apply instance data if available
    const eventsWithInstanceData = await Promise.all(
      liveWeeklyEvents.map(async (event) => {
        // Calculate current instance date
        const instanceDate = getCurrentInstanceDate(event.day_of_week || 0, event.starts_at)
        
        if (!instanceDate) {
          // No valid instance date, use event defaults
          return {
            ...event,
            bands: bandsByEventId[event.id] || []
          }
        }

        // Fetch instance for this date
        const { data: instance, error: instanceError } = await supabase
          .from('event_instances')
          .select('id, custom_description, custom_image_url')
          .eq('event_id', event.id)
          .eq('instance_date', instanceDate)
          .single()

        if (instanceError || !instance) {
          // Instance not found, use event defaults
          return {
            ...event,
            bands: bandsByEventId[event.id] || []
          }
        }

        // Instance found - apply instance data with fallbacks to event defaults
        const description = instance.custom_description || event.description || event.short_description || ''
        const image_url = instance.custom_image_url || event.image_url
        
        // Fetch instance bands
        const instanceBands = await fetchBandsForInstance(instance.id)
        
        // Use instance bands if available, otherwise use event bands
        const bands = instanceBands.length > 0 ? instanceBands : (bandsByEventId[event.id] || [])

        return {
          ...event,
          description,
          image_url,
          bands
        }
      })
    )

    return eventsWithInstanceData
  } catch (error) {
    console.error('Error in getWeeklyEventsForBusiness:', error)
    return []
  }
}

/**
 * Format date and time for display
 * All times are displayed in Toronto timezone
 */
export function formatEventDateTime(startsAt: string, endsAt: string): string {
  const startParts = parseISOString(startsAt)
  const endParts = parseISOString(endsAt)
  
  // Check for invalid dates
  if (!startParts || !endParts) {
    return 'Invalid date'
  }
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const startDate = `${monthNames[startParts.month - 1]} ${startParts.day}, ${startParts.year}`
  
  // Extract time in Toronto timezone
  const startTime = extractTimeFromISO(startsAt)
  const endTime = extractTimeFromISO(endsAt)
  
  if (!startTime || !endTime) {
    return 'Invalid date'
  }
  
  // If same day
  if (startParts.year === endParts.year && startParts.month === endParts.month && startParts.day === endParts.day) {
    return `${startDate} · ${startTime} - ${endTime}`
  }
  
  // Different days
  const endDate = `${monthNames[endParts.month - 1]} ${endParts.day}, ${endParts.year}`
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

