"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    // Custom smooth scrolling implementation for aesthetic feel
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      isScrolling = true;

      // Slower scroll speed for aesthetic effect
      const scrollSpeed = 0.6; // Adjust this value (0.5 = slower, 1 = normal, 2 = faster)
      const deltaX = e.deltaX * scrollSpeed;
      const deltaY = e.deltaY * scrollSpeed;

      window.scrollBy({
        left: deltaX,
        top: deltaY,
        behavior: "smooth"
      });

      // Reset scrolling flag after animation
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100); // Adjust timing for smoother experience
    };

    // Add custom scroll behavior
    document.addEventListener("wheel", handleWheel, { passive: false });

    // Also handle touch scrolling for mobile
    let touchStartY = 0;
    let touchStartX = 0;
    let touchEndY = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY || !touchStartX) return;
      
      touchEndY = e.touches[0].clientY;
      touchEndX = e.touches[0].clientX;
      
      const deltaY = touchStartY - touchEndY;
      const deltaX = touchStartX - touchEndX;
      
      // Slower touch scrolling
      const touchScrollSpeed = 0.4;
      
      window.scrollBy({
        left: deltaX * touchScrollSpeed,
        top: deltaY * touchScrollSpeed,
        behavior: "smooth"
      });
    };

    const handleTouchEnd = () => {
      touchStartY = 0;
      touchStartX = 0;
      touchEndY = 0;
      touchEndX = 0;
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return null;
}
