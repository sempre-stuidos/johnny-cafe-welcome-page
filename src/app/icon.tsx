import { readFile } from 'fs/promises'
import { join } from 'path'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}

export const contentType = 'image/png'

// Image generation
export default async function Icon() {
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
    // This creates a minimal 32x32 PNG with "JG" text
    const fallbackSvg = `<svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" fill="#334D2D"/>
      <text x="16" y="22" font-family="Arial" font-size="16" font-weight="bold" fill="#FAF2DD" text-anchor="middle">JG</text>
    </svg>`
    
    return new Response(fallbackSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, immutable, max-age=31536000',
      },
    })
  }
}

