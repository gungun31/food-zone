import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when an element is intersecting the viewport.
 * @param {Object} options - Intersection Observer options (e.g., threshold, rootMargin).
 * @returns {[React.RefObject, boolean]} - A ref to attach to the element and a boolean indicating if it's intersecting.
 */
const useIntersectionObserver = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
        }
      },
      options
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [options]);

  return [containerRef, isVisible];
};

export default useIntersectionObserver;