import { readFile } from 'fs/promises'
import { join } from 'path'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}

export const contentType = 'image/png'

// Image generation
export default async function AppleIcon() {
  try {
    // Read the cafe-logo.png file from public directory
    const imagePath = join(process.cwd(), 'public', 'cafe-logo.png')
    const imageBuffer = await readFile(imagePath)
    
    // Return the image buffer as a Response
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, immutable, max-age=31536000',
      },
    })
  } catch {
    // If image can't be loaded, return a simple fallback
    // This creates a minimal 180x180 PNG with "JG" text
    const fallbackSvg = `<svg width="180" height="180" xmlns="http://www.w3.org/2000/svg">
      <rect width="180" height="180" fill="#334D2D"/>
      <text x="90" y="110" font-family="Arial" font-size="80" font-weight="bold" fill="#FAF2DD" text-anchor="middle">JG</text>
    </svg>`
    
    return new Response(fallbackSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, immutable, max-age=31536000',
      },
    })
  }
}

