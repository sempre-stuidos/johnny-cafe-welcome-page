import { ImageResponse } from 'next/og'
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
    
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
          }}
        >
          {/* @ts-ignore */}
          <img
            src={`data:image/png;base64,${imageBuffer.toString('base64')}`}
            alt="Johnny G's"
            width={32}
            height={32}
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
      ),
      {
        ...size,
      }
    )
  } catch (error) {
    // Fallback to a simple icon if image can't be loaded
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 20,
            background: '#334D2D',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FAF2DD',
            fontWeight: 'bold',
          }}
        >
          JG
        </div>
      ),
      {
        ...size,
      }
    )
  }
}

