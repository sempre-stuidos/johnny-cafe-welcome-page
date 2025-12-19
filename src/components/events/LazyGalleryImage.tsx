"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface LazyGalleryImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export default function LazyGalleryImage({ src, alt, priority = false }: LazyGalleryImageProps) {
  const [isInView, setIsInView] = useState(priority); // Load immediately if priority
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If priority, load immediately and preload
    if (priority) {
      // Preload the image for faster rendering
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      link.fetchPriority = "high";
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }

    // Use Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Once in view, we can disconnect the observer
            observer.disconnect();
          }
        });
      },
      {
        // Start loading when image is 200px away from viewport
        rootMargin: "200px",
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [priority, src]);

  return (
    <div ref={imgRef} className="relative w-full h-full">
      {isInView ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            className={`object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            unoptimized
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            sizes="(max-width: 768px) 33vw, (max-width: 1024px) 33vw, 33vw"
          />
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
          )}
          {hasError && (
            <div className="absolute inset-0 bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              <span className="text-gray-500 text-xs">Failed to load</span>
            </div>
          )}
        </>
      ) : (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
    </div>
  );
}

