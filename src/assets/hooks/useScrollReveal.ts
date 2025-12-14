import { useEffect, useRef, useState } from 'react';

interface Options {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollReveal = (options: Options = {}) => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [isRevealed, setIsRevealed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // entry.isIntersecting est TRUE quand l'élément ENTRE dans le viewport
        if (entry.isIntersecting) {
          setIsRevealed(true);
          
          // Si triggerOnce est vrai, on arrête d'observer l'élément
          // pour que l'animation ne se joue qu'une seule fois.
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          // Si triggerOnce est faux, on cache l'élément quand il sort
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    // Nettoyage : on arrête d'observer quand le composant est démonté
    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isRevealed };
};