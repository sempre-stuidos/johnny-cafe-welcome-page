import { HomeHeroSection } from './sections/HomeHeroSection'
import { normalizeContent } from '@/lib/normalize-content'

interface DynamicSectionProps {
  component: string
  content: Record<string, unknown>
}

export default function DynamicSection({ component, content }: DynamicSectionProps) {
  // Content structure is now guaranteed by Zod validation
  // All sections receive validated, flat structure - no special handling needed
  const normalizedContent = normalizeContent(content) as Record<string, unknown>

  switch (component) {
    case 'HomeHeroSection':
      return <HomeHeroSection content={normalizedContent} />
    
    default:
      return (
        <div className="p-4 border rounded-lg">
          <p className="text-muted-foreground">Component {component} not found</p>
        </div>
      )
  }
}
