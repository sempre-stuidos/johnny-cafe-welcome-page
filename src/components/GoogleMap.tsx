"use client";

import { useEffect, useRef } from "react";

interface GoogleMapProps {
  address: string;
  zoom?: number;
  className?: string;
}

// Custom map styles matching the retro theme specification
const mapStyles = [
  // Natural land
  {
    featureType: "landscape.natural",
    elementType: "geometry.fill",
    stylers: [{ color: "#dfd2ae" }],
  },
  // Water
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [{ color: "#b9d3c2" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#92998d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#ebe3cd" }],
  },
  // Road network - general
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#f5f1e6" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#f5f1e6" }, { weight: 1 }],
  },
  // Arterial roads
  {
    featureType: "road.arterial",
    elementType: "geometry.fill",
    stylers: [{ color: "#fdfcf8" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry.stroke",
    stylers: [{ color: "#fdfcf8" }, { weight: 1 }],
  },
  // Highways
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [{ color: "#f8c967" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#e9bc62" }, { weight: 1.4 }],
  },
  // Local roads - labels
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#806b63" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#f5f1e6" }],
  },
  // Points of interest
  {
    featureType: "poi",
    elementType: "geometry.fill",
    stylers: [{ color: "#dfd2ae" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#93817c" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#f5f1e6" }],
  },
  // Parks
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [{ color: "#a5b076" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#447530" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#ebe3cd" }],
  },
  // Land parcels
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ae9e90" }],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#ebe3cd" }],
  },
];

export default function GoogleMap({ address, zoom = 16, className = "" }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Check if Google Maps API is loaded
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    
    if (typeof window === "undefined" || !win.google) {
      // Load Google Maps API
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    function initializeMap() {
      if (!mapRef.current || !win.google) return;

      const geocoder = new win.google.maps.Geocoder();
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      geocoder.geocode({ address }, (results: any, status: string) => {
        if (status === "OK" && results && results[0]) {
          const location = results[0].geometry.location;

          const map = new win.google.maps.Map(mapRef.current!, {
            center: location,
            zoom: zoom,
            styles: mapStyles,
            backgroundColor: "#ebe3cd", // Background color from the theme
            disableDefaultUI: true,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            gestureHandling: "none",
            keyboardShortcuts: false,
            draggable: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
          });

          // Add marker
          new win.google.maps.Marker({
            position: location,
            map: map,
            title: address,
          });

          mapInstanceRef.current = map;
        }
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current = null;
      }
    };
  }, [address, zoom]);

  return (
    <div className={`w-full h-full relative ${className}`}>
      <div ref={mapRef} className="w-full h-full" />
      {/* Overlay to completely disable all interactions */}
      <div
        className="absolute inset-0 z-10 cursor-not-allowed"
        style={{ pointerEvents: "all" }}
        onClick={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        onTouchStart={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        aria-label="Map view only - interactions disabled"
      />
    </div>
  );
}
