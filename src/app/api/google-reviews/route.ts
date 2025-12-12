import { NextRequest, NextResponse } from 'next/server';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
}

interface GooglePlaceResponse {
  result?: {
    reviews?: GoogleReview[];
    place_id?: string;
  };
  status: string;
  error_message?: string;
}

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    if (!apiKey) {
      console.error('Google Places API key not configured');
      return NextResponse.json(
        { error: 'Google Places API key not configured', reviews: [] },
        { status: 500 }
      );
    }

    // First, search for the place by name to get the Place ID
    const placeName = "Johnny G's Cafe";
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeName)}&key=${apiKey}`;
    
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    
    if (searchData.status !== 'OK' || !searchData.results || searchData.results.length === 0) {
      console.error('Place not found:', searchData.status);
      return NextResponse.json(
        { error: 'Place not found', reviews: [] },
        { status: 404 }
      );
    }

    // Get the first result's place_id
    const placeId = searchData.results[0].place_id;
    
    // Now fetch the place details including reviews
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews,rating&key=${apiKey}`;
    
    const detailsResponse = await fetch(detailsUrl);
    const detailsData: GooglePlaceResponse = await detailsResponse.json();
    
    if (detailsData.status !== 'OK' || !detailsData.result?.reviews) {
      console.error('Failed to fetch reviews:', detailsData.status, detailsData.error_message);
      return NextResponse.json(
        { error: 'Failed to fetch reviews', reviews: [] },
        { status: 500 }
      );
    }

    // Transform Google reviews to match our testimonial format
    const reviews = detailsData.result.reviews
      .slice(0, 5) // Google API returns up to 5 reviews
      .map((review) => ({
        id: review.time || Date.now() + Math.random(),
        name: review.author_name,
        text: review.text,
        rating: review.rating,
        profilePhoto: review.profile_photo_url,
      }));

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('Error fetching Google reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews', reviews: [] },
      { status: 500 }
    );
  }
}
