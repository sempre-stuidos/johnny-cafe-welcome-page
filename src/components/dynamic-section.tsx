import { HomeHeroSection } from './sections/HomeHeroSection'
import { HomeAboutSection } from './sections/HomeAboutSection'
import { HomeMenuSection } from './sections/HomeMenuSection'
import { HomeEventsSection } from './sections/HomeEventsSection'
import { HomeReservationSection } from './sections/HomeReservationSection'
import { normalizeContent } from '@/lib/normalize-content'

interface DynamicSectionProps {
  component: string
  content: Record<string, unknown>
  sectionKey?: string
  sectionId?: string
}

export default function DynamicSection({ component, content, sectionKey, sectionId }: DynamicSectionProps) {
  // Content structure is now guaranteed by Zod validation
  // All sections receive validated, flat structure - no special handling needed
  const normalizedContent = normalizeContent(content) as Record<string, unknown>

  // Props to pass to section components for canvas editor
  const sectionProps = {
    'data-section-key': sectionKey,
    'data-section-id': sectionId,
  }

  switch (component) {
    case 'HomeHeroSection':
      return <HomeHeroSection content={normalizedContent} {...sectionProps} />
    case 'HomeAboutSection':
      return <HomeAboutSection content={normalizedContent} {...sectionProps} />
    case 'HomeMenuSection':
      return <HomeMenuSection content={normalizedContent} {...sectionProps} />
    case 'HomeEventsSection':
      return <HomeEventsSection content={normalizedContent} {...sectionProps} />
    case 'HomeReservationSection':
      return <HomeReservationSection content={normalizedContent} {...sectionProps} />
    
    default:
      return (
        <div className="p-4 border rounded-lg">
          <p className="text-muted-foreground">Component {component} not found</p>
        </div>
      )
  }
}
